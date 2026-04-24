/**
 * Dialog 共通ベースクラス（内部用）
 * @internal
 */
import "../button/mi-danger-button";
import "../button/mi-neutral-button";

import { html, LitElement, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { dialogStyles } from "./dialog.styles";

export type DialogSize = "small" | "medium" | "large";
export type DialogVariant = "action" | "information" | "form";

/**
 * モーダルダイアログの共通ベースクラス。
 * mi-action-dialog / mi-form-dialog / mi-information-dialog が継承する。
 *
 * イベント:
 * - **close**: ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。
 */
export abstract class DialogBase extends LitElement {
  static styles = makeStyles(...dialogStyles);

  /** 開閉状態 */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** ヘッダーに表示するタイトルテキスト */
  @property({ type: String, attribute: "header-text" })
  headerText = "";

  /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
  @property({ type: String, attribute: "cancel-label" })
  cancelLabel = "";

  /** アクションボタンのラベル */
  @property({ type: String, attribute: "action-label" })
  actionLabel = "";

  /** 破壊的アクション（削除等）の場合は true。アクションボタンに mi-danger-button を使用 */
  @property({ type: Boolean, reflect: true })
  danger = false;

  /**
   * slot 内 `<form id="...">` の id。フッターのアクションボタンに `form` 属性として渡す。
   * mi-form-dialog で `actionButtonType` と組み合わせて Enter 送信を opt-in する。
   */
  @property({ type: String, attribute: "form-id" })
  formId = "";

  @query(".body")
  private _bodyEl!: HTMLElement;

  @state()
  private _isScrolledFromTop = false;

  @state()
  private _isScrolledFromBottom = false;

  private _resizeObserver?: ResizeObserver;

  /** フッターのキャンセル／アクションで閉じた直後の close では open-change を出さない */
  private _closingFromFooterButton = false;

  /** 継承クラスでオーバーライド: ダイアログのサイズ */
  protected abstract get dialogSize(): DialogSize;

  /** 継承クラスでオーバーライド: ダイアログのバリアント（phone 時のスタイル用） */
  protected abstract get variant(): DialogVariant;

  protected get sizeClass() {
    return `size-${this.dialogSize}`;
  }

  /** フッターアクションボタンの `type`。mi-form-dialog は `form-id` 指定時に `submit` を返す。 */
  protected get actionButtonType(): "button" | "submit" {
    return "button";
  }

  private _boundCheckScroll = () => this._checkScroll();

  disconnectedCallback() {
    super.disconnectedCallback();
    this._bodyEl?.removeEventListener("scroll", this._boundCheckScroll);
    this._resizeObserver?.disconnect();
  }

  updated(changed: Map<PropertyKey, unknown>) {
    super.updated(changed);
    if (changed.has("open")) {
      this._handleOpenChange();
      if (!this.open) {
        this._resizeObserver?.disconnect();
      }
    }
    if (this._bodyEl) {
      this._bodyEl.removeEventListener("scroll", this._boundCheckScroll);
      this._bodyEl.addEventListener("scroll", this._boundCheckScroll);
      if (!this._resizeObserver) {
        this._resizeObserver = new ResizeObserver(this._boundCheckScroll);
      }
      this._resizeObserver.disconnect();
      this._resizeObserver.observe(this._bodyEl);
      this._checkScroll();
    }
  }

  private _checkScroll() {
    if (!this._bodyEl) return;
    const { scrollTop, scrollHeight, clientHeight } = this._bodyEl;
    this._isScrolledFromTop = scrollTop > 0;
    this._isScrolledFromBottom = scrollTop + clientHeight < scrollHeight - 1;
  }

  private _handleOpenChange() {
    const dialog = this._nativeDialog();
    if (!dialog) return;
    if (this.open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }

  private _handleClose = () => {
    if (this._closingFromFooterButton) {
      this.open = false;
      return;
    }
    // イベントを先にディスパッチしてから open を変更する
    // （Lit の更新サイクルがイベント処理に干渉しないようにするため）
    this.dispatchEvent(new Event("close", { bubbles: false, composed: false }));
    this.open = false;
  };

  private _nativeDialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector("dialog");
  }

  private _handleCancelClick = () => {
    this._closingFromFooterButton = true;
    this._nativeDialog()?.close();
    this._closingFromFooterButton = false;
    // 環境によっては同期がずれるため、フッター経路では明示して確実に閉じ状態に揃える。
    this.open = false;
    this.dispatchEvent(new Event("close", { bubbles: false, composed: false }));
  };

  private _handleActionClick = () => {
    // form-id 指定時はフォームのバリデーションを確認
    if (this.formId) {
      const form = document.getElementById(
        this.formId,
      ) as HTMLFormElement | null;
      if (form && !form.checkValidity()) {
        form.reportValidity();
        return; // バリデーション失敗時は閉じない
      }
    }
    this._closingFromFooterButton = true;
    this._nativeDialog()?.close();
    this._closingFromFooterButton = false;
    // キャンセルと同じくフッター確定で `open` を確実に false にする
    this.open = false;
    this.dispatchEvent(new Event("close", { bubbles: false, composed: false }));
  };

  render() {
    if (!this.open) return nothing;
    return html`
      <dialog
        class="dialog-root"
        @close=${this._handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby=${this.headerText ? "dialog-title" : nothing}
        aria-describedby="dialog-body"
      >
        <div
          class="viewport"
          data-variant=${this.variant}
          data-size=${this.dialogSize}
          data-testid="dialog-viewport"
        >
          <div
            class="popup ${this.sizeClass}"
            data-variant=${this.variant}
            data-testid="dialog-popup"
          >
            ${this.headerText
              ? html`
                  <header class="header" data-testid="dialog-header">
                    <h2 id="dialog-title" class="title">${this.headerText}</h2>
                  </header>
                `
              : nothing}
            <div
              class="body"
              id="dialog-body"
              data-scrolled-from-top=${this._isScrolledFromTop
                ? "true"
                : "false"}
              data-scrolled-from-bottom=${this._isScrolledFromBottom
                ? "true"
                : "false"}
              data-testid="dialog-body"
            >
              <slot></slot>
            </div>
            <footer class="footer" data-testid="dialog-footer">
              ${this.cancelLabel
                ? html`
                    <mi-neutral-button
                      class="footer-action"
                      variant="ghost"
                      size="large"
                      @click=${this._handleCancelClick}
                    >
                      ${this.cancelLabel}
                    </mi-neutral-button>
                  `
                : nothing}
              ${this.danger
                ? html`
                    <mi-danger-button
                      class="footer-action"
                      variant="primary"
                      size="large"
                      type=${this.actionButtonType}
                      form=${this.formId || nothing}
                      @click=${this._handleActionClick}
                    >
                      ${this.actionLabel}
                    </mi-danger-button>
                  `
                : html`
                    <mi-neutral-button
                      class="footer-action"
                      variant="primary"
                      size="large"
                      type=${this.actionButtonType}
                      form=${this.formId || nothing}
                      @click=${this._handleActionClick}
                    >
                      ${this.actionLabel}
                    </mi-neutral-button>
                  `}
            </footer>
          </div>
        </div>
      </dialog>
    `;
  }
}
