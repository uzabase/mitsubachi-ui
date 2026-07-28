import { css, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/**
 * @summary テーブルのカラム幅指定。
 *
 * `<col>` に相当する。`mi-table` の直接の子として配置し、カラム幅を指定する。
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
      display: table-column;
    }
  `);

  /** カラム幅（CSS値: "40px", "20%" など） */
  @property({ type: String })
  width = "";

  /** リサイズ時の最小幅（px）。初回スコープ外 */
  @property({ type: Number, attribute: "min-width" })
  minWidth?: number;

  connectedCallback() {
    super.connectedCallback();
    // mi-table の colgroup スロットに自動配置
    if (!this.hasAttribute("slot")) {
      this.setAttribute("slot", "col");
    }
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("width")) {
      if (this.width) {
        this.style.inlineSize = this.width;
      } else {
        this.style.removeProperty("inline-size");
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-col": MiTableCol;
  }
}

if (!customElements.get("mi-table-col")) {
  customElements.define("mi-table-col", MiTableCol);
}
