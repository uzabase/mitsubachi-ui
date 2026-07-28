import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/** テーブルのビューモード */
export type TableView = "grid" | "list";

/**
 * @summary テーブルのルートコンポーネント。
 *
 * `view` に応じた CSS 変数を定義し、子コンポーネントに配信する。
 * `mi-table-col`, `mi-table-head`, `mi-table-body` を子として配置する。
 *
 * @slot - mi-table-col, mi-table-head, mi-table-body
 *
 * @example
 * ```html
 * <mi-table view="grid" label="ユーザー一覧">
 *   <mi-table-head>
 *     <mi-table-row>
 *       <mi-table-header-cell>名前</mi-table-header-cell>
 *     </mi-table-row>
 *   </mi-table-head>
 *   <mi-table-body>
 *     <mi-table-row>
 *       <mi-table-body-cell>田中太郎</mi-table-body-cell>
 *     </mi-table-row>
 *   </mi-table-body>
 * </mi-table>
 * ```
 */
export class MiTable extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: block;
      overflow: auto;
    }

    :host([view="grid"]) {
      --_table-header-bg: var(--surface-semi-strong-default, #ededed);
      --_table-header-color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      --_table-header-hover-bg: var(--surface-semi-strong-hover, #e5e5e5);
      --_table-header-border-block: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-header-border-inline: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-border-block-end: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-border-inline: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-padding-block: var(--spacing-medium, 8px);
      --_table-cell-icon-align: flex-start;
    }

    :host([view="list"]) {
      --_table-header-bg: var(--surface-regular-default, white);
      --_table-header-color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
      --_table-header-hover-bg: var(--surface-regular-hover, #f5f5f5);
      --_table-header-border-block: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-header-border-inline: none;
      --_table-cell-border-block-end: 1px solid
        var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
      --_table-cell-border-inline: none;
      --_table-cell-padding-block: var(--spacing-large, 12px);
      --_table-cell-icon-align: center;
    }

    .table {
      table-layout: fixed;
      border-collapse: collapse;
      inline-size: 100%;
      font-family: var(--typography-font-family, Arial, sans-serif);
      word-break: normal;
      overflow-wrap: break-word;
    }
  `);

  /** ビューモード */
  @property({ type: String, reflect: true })
  view: TableView = "grid";

  /** テーブルの aria-label */
  @property({ type: String })
  label = "";

  render() {
    return html`
      <table class="table" role="table" aria-label="${this.label || nothing}">
        <colgroup>
          <slot name="col"></slot>
        </colgroup>
        <slot></slot>
      </table>
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
