import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { menuItemLayoutStyles, menuItemRootStyles } from "./menu-item.styles";

/** ActionMenuItem のバリアント */
export type ActionMenuItemVariant = "neutral" | "danger";

/**
 * @summary 画面遷移を伴わずに特定のアクションを実行するメニュー項目。
 *
 * 選択すると、データの更新、実行、削除などの操作が即座に実行される。
 * データの削除や取り消し困難な変更など、不可逆的な操作には `variant="danger"` を使用する。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 */
export class MiActionMenuItem extends LitElement {
  static styles = makeStyles(
    menuItemRootStyles,
    menuItemLayoutStyles,
    css`
      :host {
        padding-block: var(--spacing-small, 4px);
        padding-inline: var(--spacing-x-large, 16px);
      }

      /* neutral */
      :host([variant="neutral"]),
      :host(:not([variant])) {
        --_menu-item-icon-color: var(
          --icon-regular-default,
          rgba(0, 0, 0, 0.84)
        );
        --_menu-item-support-text-color: var(
          --text-weak-default,
          rgba(0, 0, 0, 0.54)
        );
        color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      }

      /* danger */
      :host([variant="danger"]) {
        --_menu-item-icon-color: var(--text-negative, #c92812);
        --_menu-item-support-text-color: var(
          --text-weak-default,
          rgba(0, 0, 0, 0.54)
        );
        color: var(--text-negative, #c92812);
      }

      /* disabled */
      :host([disabled]) {
        --_menu-item-icon-color: var(--icon-disabled, rgba(0, 0, 0, 0.25));
        --_menu-item-support-text-color: var(
          --text-disabled,
          rgba(0, 0, 0, 0.35)
        );
        color: var(--text-disabled, rgba(0, 0, 0, 0.35));
        cursor: not-allowed;
      }
    `,
  );

  /**
   * バリアント。danger は削除などの破壊的操作に使用
   * @default 'neutral'
   */
  @property({ type: String, reflect: true })
  variant: ActionMenuItemVariant = "neutral";

  /**
   * 無効化状態
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** ラベル下に表示する補助テキスト */
  @property({ type: String, attribute: "support-text" })
  supportText = "";

  @state()
  private _hasIcon = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _handleClick = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new Event("menu-item-activate", { bubbles: true, composed: true }),
    );
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  };

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <span class="item-layout">
        ${this._hasIcon
          ? html`<span class="icon-wrapper" aria-hidden="true">
              <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
            </span>`
          : html`<slot
              name="icon"
              @slotchange=${this._onIconSlotChange}
              hidden
            ></slot>`}
        <span class="text-area">
          <span class="label"><slot></slot></span>
          ${this.supportText
            ? html`<span class="support-text">${this.supportText}</span>`
            : nothing}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-action-menu-item": MiActionMenuItem;
  }
}

if (!customElements.get("mi-action-menu-item")) {
  customElements.define("mi-action-menu-item", MiActionMenuItem);
}
