import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

export type TableView = "grid" | "list";

/**
 * @summary テーブルのルートコンポーネント。view をCSS変数経由で子コンポーネントに配信する。
 */
export class MiTable extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: block;
      overflow: auto;
    }

    /* ==============================
         Grid ビュー CSS カスタムプロパティ
         ============================== */

    :host([view="grid"]) {
      /* Header */
      --_table-header-bg: var(--surface-semi-strong-default, #ededed);
      --_table-header-color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      --_table-header-hover-bg: var(--surface-semi-strong-hover, #e5e5e5);
      --_table-header-border-block: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-header-border-inline: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      /* Body cell */
      --_table-cell-border-block-end: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-border-inline: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-padding-block: var(--spacing-medium, 8px);
      --_table-cell-icon-align: flex-start;
    }

    /* ==============================
         List ビュー CSS カスタムプロパティ
         ============================== */

    :host([view="list"]) {
      /* Header */
      --_table-header-bg: var(--surface-regular-default, #ffffff);
      --_table-header-color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
      --_table-header-hover-bg: var(--surface-regular-hover, #f5f5f5);
      --_table-header-border-block: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-header-border-inline: none;
      /* Body cell */
      --_table-cell-border-block-end: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-border-inline: none;
      --_table-cell-padding-block: var(--spacing-large, 12px);
      --_table-cell-icon-align: center;
    }

    .table {
      display: table;
      table-layout: fixed;
      border-collapse: collapse;
      inline-size: 100%;
      font-family: var(--typography-font-family, Arial, sans-serif);
      word-break: normal;
      overflow-wrap: break-word;
    }
  `);

  /** テーブルのビューモード */
  @property({ type: String, reflect: true })
  view: TableView = "grid";

  /** テーブルのアクセシブルラベル */
  @property({ type: String })
  label = "";

  render() {
    return html`
      <div class="table" role="table" aria-label=${this.label || nothing}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table": MiTable;
  }
}

if (!customElements.get("mi-table")) {
  customElements.define("mi-table", MiTable);
}
