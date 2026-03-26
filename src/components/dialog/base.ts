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

/** フッター以外で閉じたときの `open-change` の detail（`open` は常に false） */
export type DialogOpenChangeDetail = {
  open: false;
  /** Esc で閉じたとき `"escape"`。ホストが `open` を false にした場合・`dialog.close()` などでは `null`（オーバーレイクリックでは閉じない） */
  reason: "escape" | null;
};

/**
 * モーダルダイアログの共通ベースクラス。
 * mi-action-dialog / mi-form-dialog / mi-information-dialog が継承する。
 *
 * カスタムイベント（各具象要素の `@fires` と一致）:
 * - **open-change**: ネイティブ `<dialog>` の `close` かつフッターボタン由来でないとき（Esc・ホストの `open=false`・`dialog.close()` 等。オーバーレイクリックでは閉じない）。bubbles / composed。detail `{ open: false, reason: "escape" | null }`（Esc のみ `reason` が `"escape"`）。
 * - **mi-cancel**: キャンセル（ghost）クリック時。非 cancelable。`open-change` は出さない。
 * - **action**: アクション（primary/danger）クリック時。cancelable。`preventDefault()` で閉じ中止。閉じた場合も `open-change` は出さない。
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

  /**
   * ネイティブ `cancel`（Esc）のあと続く `close` で `open-change` の reason を付ける。
   * 合成イベントは無視（`close()` 経由の誤検知を避ける）。
   */
  private _closeSource: "escape" | null = null;

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

  private _handleNativeDialogCancel = (e: Event) => {
    if (!e.isTrusted) return;
    this._closeSource = "escape";
  };

  private _handleClose = () => {
    const reason = this._closeSource;
    this._closeSource = null;
    this.open = false;
    if (this._closingFromFooterButton) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<DialogOpenChangeDetail>("open-change", {
        detail: { open: false, reason },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _nativeDialog(): HTMLDialogElement | null {
    return this.renderRoot.querySelector("dialog");
  }

  private _handleCancelClick = () => {
    this._closingFromFooterButton = true;
    this._nativeDialog()?.close();
    this._closingFromFooterButton = false;
    this.dispatchEvent(
      new Event("mi-cancel", { bubbles: true, composed: true }),
    );
    // `close` イベントの `_handleClose` でも `open` は false になるが、
    // 環境によっては同期がずれるため、フッター経路では明示して確実に閉じ状態に揃える。
    this.open = false;
  };

  private _handleActionClick = () => {
    const actionEvent = new Event("action", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    if (!this.dispatchEvent(actionEvent)) {
      return;
    }
    this._closingFromFooterButton = true;
    this._nativeDialog()?.close();
    this._closingFromFooterButton = false;
    // 同上（キャンセルと同じくフッター確定で `open` を確実に false にする）
    this.open = false;
  };

  render() {
    if (!this.open) return nothing;
    return html`
      <dialog
        class="dialog-root"
        @cancel=${this._handleNativeDialogCancel}
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
