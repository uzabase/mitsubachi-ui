import { css, html, LitElement } from "lit";

import { makeStyles } from "../styles";

/**
 * @summary テーブルボディ。`<tbody>` に相当。
 */
export class MiTableBody extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: table-row-group;
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
    "mi-table-body": MiTableBody;
  }
}

if (!customElements.get("mi-table-body")) {
  customElements.define("mi-table-body", MiTableBody);
}
