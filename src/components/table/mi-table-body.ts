import { css, html, LitElement } from "lit";

import { makeStyles } from "../styles";

/**
 * @summary テーブルのボディ行グループ。
 *
 * `<tbody>` に相当する。`mi-table-row` を子として配置する。
 *
 * @slot - mi-table-row
 */
export class MiTableBody extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: table-row-group;
    }
  `);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "rowgroup");
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
