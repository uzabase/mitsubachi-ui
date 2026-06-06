import { css, html, LitElement } from "lit";

import { makeStyles } from "../styles";

/**
 * @summary テーブルヘッダー。`<thead>` に相当。
 */
export class MiTableHead extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: table-header-group;
    }
  `);

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "rowgroup");
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-head": MiTableHead;
  }
}

if (!customElements.get("mi-table-head")) {
  customElements.define("mi-table-head", MiTableHead);
}
