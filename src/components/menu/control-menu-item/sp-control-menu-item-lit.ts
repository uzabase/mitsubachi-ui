import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { spControlMenuItemLitStyles } from "./sp-control-menu-item-lit-styles";

/**
 * @summary Litで実装されたメニューの項目を表すコンポーネントです。
 *
 * @attr {string} text - 項目のテキスト
 *
 * @attr {boolean} selected - 項目が選択されていることを示します。属性があるときはチェックマークが表示されます。
 *
 * @attr {boolean} disabled - 項目が無効であることを示します。属性があれば、灰色で項目が表示されます。
 */
@customElement("sp-control-menu-item-lit")
export class SpControlMenuItemLit extends LitElement {
  static styles = spControlMenuItemLitStyles;

  @property({ type: String, reflect: true })
  text = "";

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent("menu-item-click", {
        detail: {
          text: this.text,
          selected: this.selected,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <span class="text">${this.text}</span>
      <sp-icon-lit class="icon" type="check-small"></sp-icon-lit>
      <slot></slot>
      <div @click=${this.handleClick}></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu-item-lit": SpControlMenuItemLit;
  }
}
