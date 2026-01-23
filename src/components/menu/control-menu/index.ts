import { html, LitElement, unsafeCSS } from "lit";

import { makeStyles } from "../../styles";
import spControlMenuLitStyle from "./styles.css?inline";

/**
 * @summary ドロップダウンメニューのコンポーネントです。<mi-control-menu><mi-control-menu-item><mi-control-menu-item></mi-control-menu>のように使います。
 */
export class MiControlMenu extends LitElement {
  static styles = makeStyles(unsafeCSS(spControlMenuLitStyle));

  render() {
    return html`<slot></slot>`;
  }
}

/** @deprecated 代わりに MiControlMenu を使用してください */
export class SpControlMenu extends MiControlMenu {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-control-menu": MiControlMenu;
    "sp-control-menu": SpControlMenu;
  }
}

if (!customElements.get("mi-control-menu")) {
  customElements.define("mi-control-menu", MiControlMenu);
}

if (!customElements.get("sp-control-menu")) {
  customElements.define("sp-control-menu", SpControlMenu);
}
