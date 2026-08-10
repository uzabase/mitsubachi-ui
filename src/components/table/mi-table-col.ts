import { css, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/**
 * @summary テーブルのカラム幅指定。
 *
 * `<col>` に相当する。`mi-table` の直接の子として配置し、カラム幅を指定する。
 * 実際のネイティブ `<col>` は親の `mi-table` が Shadow DOM 内に生成する。
 *
 * @example
 * ```html
 * <mi-table view="grid" label="一覧">
 *   <mi-table-col width="40px"></mi-table-col>
 *   <mi-table-col width="30%"></mi-table-col>
 * </mi-table>
 * ```
 */
export class MiTableCol extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: none;
    }
  `);

  /** カラム幅（CSS値: "40px", "20%" など） */
  @property({ type: String, reflect: true })
  width = "";
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-col": MiTableCol;
  }
}

if (!customElements.get("mi-table-col")) {
  customElements.define("mi-table-col", MiTableCol);
}
