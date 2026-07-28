import { css, html, LitElement } from "lit";

import { makeStyles } from "../styles";

/**
 * @summary テーブルのヘッダー行グループ。
 *
 * `<thead>` に相当する。`mi-table-row` を子として配置する。
 *
 * @slot - mi-table-row
 */
export class MiTableHead extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: table-header-group;
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
    "mi-table-head": MiTableHead;
  }
}

if (!customElements.get("mi-table-head")) {
  customElements.define("mi-table-head", MiTableHead);
}
