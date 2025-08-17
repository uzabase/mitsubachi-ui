import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { spControlMenuLitStyles } from "./sp-control-menu-lit-styles";

/**
 * @summary Litで実装されたドロップダウンメニューのコンポーネントです。<sp-control-menu-lit><sp-control-menu-item-lit><sp-control-menu-item-lit></sp-control-menu-lit>のように使います。
 */
@customElement("sp-control-menu-lit")
export class SpControlMenuLit extends LitElement {
  static styles = spControlMenuLitStyles;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu-lit": SpControlMenuLit;
  }
}
