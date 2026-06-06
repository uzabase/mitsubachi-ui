import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";

/**
 * @summary テーブルカラム幅指定。`<col>` に相当。
 *
 * `mi-table` の直接の子として配置して使用する。
 */
export class MiTableCol extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: table-column;
    }
  `);

  /** カラム幅（CSS値: "40px", "20%" など）。省略時はブラウザに委ねる */
  @property({ type: String })
  width = "";

  /** リサイズ時の最小幅（px）。省略時は 40 */
  @property({ type: Number, attribute: "min-width" })
  minWidth?: number;

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("width")) {
      if (this.width) {
        this.style.width = this.width;
      } else {
        this.style.removeProperty("width");
      }
    }
    if (changed.has("minWidth")) {
      if (this.minWidth !== undefined) {
        this.dataset.minWidth = String(this.minWidth);
      } else {
        delete this.dataset.minWidth;
      }
    }
  }

  render() {
    return html``;
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
