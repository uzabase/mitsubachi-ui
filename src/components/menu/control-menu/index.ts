import { html, LitElement, unsafeCSS } from "lit";

import { makeStyles } from "../../styles";
import spControlMenuLitStyle from "./styles.css?inline";

/**
 * @summary ドロップダウンメニューのコンポーネントです。<sp-control-menu><sp-control-menu-item><sp-control-menu-item></sp-control-menu>のように使います。
 */
export class SpControlMenu extends LitElement {
  static styles = makeStyles(unsafeCSS(spControlMenuLitStyle));

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu": SpControlMenu;
  }
}

if (!customElements.get("sp-control-menu")) {
  customElements.define("sp-control-menu", SpControlMenu);
}
