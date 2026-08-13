import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { tableBodyCellStyles } from "./table-body-cell.styles";

/** ボディセルのコンテンツタイプ */
export type TableBodyCellContentType =
  | "text"
  | "title"
  | "number"
  | "date"
  | "checkbox"
  | "icon-button"
  | "slot";

/** null 表示用のダッシュ（en dash） */
const NULL_DISPLAY = "\u2013";

/**
 * @summary テーブルのボディセル。
 *
 * コンテンツが空の場合はダッシュ（–）をセル中央に自動表示する。
 *
 * @slot - セルのコンテンツ
 * @slot icon - 先頭アイコン用
 */
export class MiTableBodyCell extends LitElement {
  static styles = makeStyles(tableBodyCellStyles);

  /** コンテンツタイプ */
  @property({ type: String, reflect: true, attribute: "content-type" })
  contentType: TableBodyCellContentType = "text";

  /** コンテンツが空かどうか（内部状態） */
  @state()
  private _isEmpty = true;

  /** icon スロットにコンテンツがあるか */
  @state()
  private _hasIcon = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "cell");
    // 初回レンダリング前にアイコンの有無を判定し、レイアウトのフリッカーを防ぐ。
    // slotchange でも更新されるが、初回は connectedCallback の方が早い。
    this._hasIcon = this.querySelector('[slot="icon"]') !== null;
  }

  #handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    const hasContent = nodes.some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim() !== "";
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
    this._isEmpty = !hasContent;
  }

  #handleIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    return html`
      <span class="cell-content ${this._hasIcon ? "with-icon" : ""}">
        <span class="icon-wrapper ${this._hasIcon ? "visible" : ""}">
          <slot name="icon" @slotchange="${this.#handleIconSlotChange}"></slot>
        </span>
        ${this._isEmpty
          ? html`<span class="null-value">${NULL_DISPLAY}</span>`
          : nothing}
        <span class="label" ?hidden="${this._isEmpty}">
          <slot @slotchange="${this.#handleSlotChange}"></slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-body-cell": MiTableBodyCell;
  }
}

if (!customElements.get("mi-table-body-cell")) {
  customElements.define("mi-table-body-cell", MiTableBodyCell);
}
