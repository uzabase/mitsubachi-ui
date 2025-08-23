import "../../icon";

import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { makeStyles } from "../../styles";
import spControlMenuItemLitStyle from "./styles.css?inline";

/**
 * @summary メニューの項目を表すコンポーネントです。
 *
 * @attr {text} text - 項目のテキスト
 *
 * @attr {boolean} selected - 項目が選択されていることを示します。属性があるときはチェックマークが表示されます。
 *
 * @attr {boolean} disabled - 項目が無効であることを示します。属性があれば、灰色で項目が表示されます。
 */
@customElement("sp-control-menu-item")
export class SpControlMenuItem extends LitElement {
  static styles = makeStyles(unsafeCSS(spControlMenuItemLitStyle));

  @property({ type: String, reflect: true })
  text = "";

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`
      <span class="text">${this.text}</span>
      <sp-icon class="icon" type="check-small"></sp-icon>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu-item": SpControlMenuItem;
  }
}
