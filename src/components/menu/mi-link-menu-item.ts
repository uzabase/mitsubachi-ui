import "../icon";

import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { menuItemLayoutStyles, menuItemRootStyles } from "./menu-item.styles";

/**
 * @summary 別のページや画面に遷移するためのメニュー項目。
 *
 * 選択すると指定されたリンク先へ移動する。
 * `new-window` を指定すると新しいウィンドウで開くアイコンが表示される。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 *
 * @fires menu-item-activate - メニュー項目がアクティブになったとき。mi-menu がメニューを閉じるために使用する。
 */
export class MiLinkMenuItem extends LitElement {
  static styles = makeStyles(
    menuItemRootStyles,
    menuItemLayoutStyles,
    css`
      :host {
        gap: var(--spacing-medium, 8px);
        padding-block: var(--spacing-small, 4px);
        padding-inline-start: var(--spacing-x-large, 16px);
        padding-inline-end: var(--spacing-large, 12px);
        text-decoration: none;
        color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
        --_menu-item-icon-color: var(
          --icon-regular-default,
          rgba(0, 0, 0, 0.84)
        );
        --_menu-item-support-text-color: var(
          --text-weak-default,
          rgba(0, 0, 0, 0.54)
        );
      }

      .item-layout {
        flex: 1;
        min-inline-size: 0;
      }

      a {
        display: contents;
        color: inherit;
        text-decoration: none;
      }

      .new-window-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: var(--icon-size-medium, 20px);
        block-size: var(--icon-size-medium, 20px);
        color: var(--_menu-item-icon-color);
      }

      @media (max-width: 720px) {
        .new-window-icon {
          inline-size: var(--icon-size-large, 22px);
          block-size: var(--icon-size-large, 22px);
        }
      }
    `,
  );

  /** リンク先URL */
  @property({ type: String })
  href = "";

  /**
   * 新しいウィンドウで開くかどうか
   * @default false
   */
  @property({ type: Boolean, attribute: "new-window", reflect: true })
  newWindow = false;

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

  private _handleClick = () => {
    // 内部通信用イベント: mi-menu がメニューを閉じるために使用する
    // bubbles: true — Light DOM の子要素から mi-menu までバブリングさせるために必要
    this.dispatchEvent(
      new Event("menu-item-activate", { bubbles: true, composed: false }),
    );
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const anchor = this.shadowRoot?.querySelector("a") as HTMLAnchorElement;
      anchor?.click();
    }
  };

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <a
        href=${this.href}
        target=${this.newWindow ? "_blank" : nothing}
        rel=${this.newWindow ? "noopener noreferrer" : nothing}
      >
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
        ${this.newWindow
          ? html`<span class="new-window-icon" aria-hidden="true">
              <mi-icon type="open-in-new"></mi-icon>
            </span>`
          : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-link-menu-item": MiLinkMenuItem;
  }
}

if (!customElements.get("mi-link-menu-item")) {
  customElements.define("mi-link-menu-item", MiLinkMenuItem);
}
