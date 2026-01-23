import "../../icon";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

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
export class MiControlMenuItem extends LitElement {
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
      <mi-icon class="icon" type="check-small"></mi-icon>
    `;
  }
}

/** @deprecated 代わりに MiControlMenuItem を使用してください */
export class SpControlMenuItem extends MiControlMenuItem {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-control-menu-item": MiControlMenuItem;
    "sp-control-menu-item": SpControlMenuItem;
  }
}

if (!customElements.get("mi-control-menu-item")) {
  customElements.define("mi-control-menu-item", MiControlMenuItem);
}

if (!customElements.get("sp-control-menu-item")) {
  customElements.define("sp-control-menu-item", SpControlMenuItem);
}
