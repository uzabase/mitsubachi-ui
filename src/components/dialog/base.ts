/**
 * ダイアログ共通ベースクラス（内部用）
 * @internal Storybookからは見えない
 */
import "../button/mi-neutral-button";

import { html, LitElement, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";

export type DialogSize = "small" | "medium" | "large";

/**
 * ダイアログ共通ベースクラス。mi-action-dialog / mi-information-dialog / mi-form-dialog が継承する。
 * @internal
 *
 * ネイティブ `<dialog>` 要素を使用し、以下を自動的に提供する:
 * - showModal() によるモーダル表示とフォーカストラップ
 * - ESC キーによるキャンセル
 * - ::backdrop によるオーバーレイ
 * - aria-labelledby によるアクセシビリティ
 *
 * @fires mi-action - アクションボタンクリック時（cancelable: preventDefault() で閉じを阻止）
 * @fires mi-cancel - キャンセルボタンまたは ESC キー押下時（cancelable: preventDefault() で閉じを阻止）
 */
export class DialogBase extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, attribute: "header-text" })
  headerText = "";

  @property({ type: String, attribute: "cancel-label" })
  cancelLabel = "";

  @property({ type: String, attribute: "action-label" })
  actionLabel = "";

  @query("dialog")
  private _dialogEl!: HTMLDialogElement | null;

  @query(".body")
  private _bodyEl!: HTMLElement | null;

  @state()
  private _headerBordered = false;

  @state()
  private _footerBordered = false;

  private _scrollAbort?: AbortController;
  private _resizeObserver?: ResizeObserver;

  protected getSize(): DialogSize {
    return "small";
  }

  protected get popupClasses() {
    return `popup size-${this.getSize()}`;
  }

  protected override updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed);
    if (changed.has("open")) {
      if (this.open) {
        this._showDialog();
      } else {
        this._closeDialog();
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupScrollDetection();
  }

  private _showDialog() {
    if (!this._dialogEl || this._dialogEl.open) return;
    this._dialogEl.showModal();
    this._setupScrollDetection();
  }

  private _closeDialog() {
    if (!this._dialogEl?.open) return;
    this._dialogEl.close();
    this._cleanupScrollDetection();
    this._headerBordered = false;
    this._footerBordered = false;
  }

  private _setupScrollDetection() {
    this._cleanupScrollDetection();

    const body = this._bodyEl;
    if (!body) return;

    const check = () => {
      const { scrollTop, scrollHeight, clientHeight } = body;
      this._headerBordered = scrollTop > 0;
      this._footerBordered = scrollTop + clientHeight < scrollHeight - 1;
    };

    requestAnimationFrame(check);

    this._scrollAbort = new AbortController();
    body.addEventListener("scroll", check, {
      signal: this._scrollAbort.signal,
    });

    this._resizeObserver = new ResizeObserver(check);
    this._resizeObserver.observe(body);
  }

  private _cleanupScrollDetection() {
    this._scrollAbort?.abort();
    this._scrollAbort = undefined;
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  private _handleNativeCancel = (e: Event) => {
    e.preventDefault();
    const event = new CustomEvent("mi-cancel", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (this.dispatchEvent(event)) {
      this.open = false;
    }
  };

  private _handleActionClick = () => {
    const event = new CustomEvent("mi-action", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (this.dispatchEvent(event)) {
      this.open = false;
    }
  };

  private _handleCancelClick = () => {
    const event = new CustomEvent("mi-cancel", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (this.dispatchEvent(event)) {
      this.open = false;
    }
  };

  override render() {
    return html`
      <dialog @cancel=${this._handleNativeCancel} aria-labelledby="dialog-title">
        <div class="${this.popupClasses}" role="document">
          <div class="header ${this._headerBordered ? "bordered" : ""}">
            <h2 class="title" id="dialog-title">${this.headerText}</h2>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          ${this.actionLabel
            ? html`
                <div
                  class="footer ${this._footerBordered ? "bordered" : ""}"
                >
                  ${this.cancelLabel
                    ? html`
                        <mi-neutral-button
                          variant="ghost"
                          size="large"
                          @click=${this._handleCancelClick}
                        >${this.cancelLabel}</mi-neutral-button>
                      `
                    : nothing}
                  <mi-neutral-button
                    variant="primary"
                    size="large"
                    @click=${this._handleActionClick}
                  >${this.actionLabel}</mi-neutral-button>
                </div>
              `
            : nothing}
        </div>
      </dialog>
    `;
  }
}
