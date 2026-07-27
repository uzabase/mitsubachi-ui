import "../icon";

import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { menuItemLayoutStyles, menuItemRootStyles } from "./menu-item.styles";

/**
 * @summary 選択状態を持つメニュー項目。
 *
 * mi-menu-radio-group 内に配置し、グループ内で1つだけ選択できる（Single-select）。
 * 選択中の項目にはチェックアイコンが表示される。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 *
 * @fires menu-item-activate - メニュー項目がアクティブになったとき。mi-menu がメニューを閉じるために使用する。
 */
export class MiSelectMenuItem extends LitElement {
  static styles = makeStyles(
    menuItemRootStyles,
    menuItemLayoutStyles,
    css`
      :host {
        gap: var(--spacing-large, 12px);
        padding-block: var(--spacing-small, 4px);
        padding-inline-start: var(--spacing-x-large, 16px);
        padding-inline-end: var(--spacing-large, 12px);
        overflow: clip;
        color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
        --_menu-item-icon-color: var(
          --icon-regular-default,
          rgba(0, 0, 0, 0.84)
        );
        --_menu-item-support-text-color: var(
          --text-weak-default,
          rgba(0, 0, 0, 0.54)
        );
        --_select-menu-item-check-color: var(
          --object-regular-default,
          rgba(0, 0, 0, 0.84)
        );
      }

      .item-layout {
        flex: 1;
        min-inline-size: 0;
      }

      /* selected */
      :host([selected]) {
        background-color: var(--surface-selected-default, #e8edff);
      }

      :host([selected]:hover:not([disabled])) {
        background-color: var(--surface-selected-hover, #dbe4ff);
      }

      :host([selected]:active:not([disabled])) {
        background-color: var(--surface-selected-active, #d5dfff);
      }

      :host([selected]:focus-visible) {
        background-color: var(--surface-selected-default, #e8edff);
      }

      /* disabled */
      :host([disabled]) {
        --_menu-item-icon-color: var(--icon-disabled, rgba(0, 0, 0, 0.25));
        --_menu-item-support-text-color: var(
          --text-disabled,
          rgba(0, 0, 0, 0.35)
        );
        --_select-menu-item-check-color: var(
          --icon-disabled,
          rgba(0, 0, 0, 0.25)
        );
        color: var(--text-disabled, rgba(0, 0, 0, 0.35));
        cursor: not-allowed;
      }

      /* check icon */
      .check-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: var(--icon-size-medium, 20px);
        block-size: var(--icon-size-medium, 20px);
        color: var(--_select-menu-item-check-color);
      }

      @media (max-width: 720px) {
        .check-icon {
          inline-size: var(--icon-size-large, 22px);
          block-size: var(--icon-size-large, 22px);
        }
      }
    `,
  );

  /** RadioGroup の value として使われる識別子 */
  @property({ type: String, reflect: true })
  value = "";

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

  /** 選択状態（mi-menu-radio-group から自動設定） */
  get selected(): boolean {
    const group = this.closest("mi-menu-radio-group");
    return group ? group.value === this.value : false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menuitemradio");
    this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  updated() {
    // selected 状態を属性とARIAに反映
    if (this.selected) {
      this.setAttribute("selected", "");
      this.setAttribute("aria-checked", "true");
    } else {
      this.removeAttribute("selected");
      this.setAttribute("aria-checked", "false");
    }
  }

  private _handleClick = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 内部通信用イベント: mi-menu がメニューを閉じるために使用する
    // bubbles: true — Light DOM の子要素から mi-menu までバブリングさせるために必要
    this.dispatchEvent(
      new Event("menu-item-activate", { bubbles: true, composed: false }),
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
      ${this.selected
        ? html`<span class="check-icon" aria-hidden="true">
            <mi-icon type="check-small"></mi-icon>
          </span>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-select-menu-item": MiSelectMenuItem;
  }
}

if (!customElements.get("mi-select-menu-item")) {
  customElements.define("mi-select-menu-item", MiSelectMenuItem);
}
