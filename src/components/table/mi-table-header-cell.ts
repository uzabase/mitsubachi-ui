import "../icon";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { tableHeaderCellStyles } from "./table-header-cell.styles";

/** ヘッダーセルのコンテンツタイプ */
export type TableHeaderCellContentType = "text" | "checkbox" | "icon-button";

/** ソート状態 */
export type TableSortState = "default" | "ascending" | "descending";

/** ソート状態の遷移マップ */
const SORT_NEXT_STATE: Record<TableSortState, TableSortState> = {
  default: "ascending",
  ascending: "descending",
  descending: "default",
};

/** aria-sort に変換 */
function toAriaSortValue(
  sortState: TableSortState,
): "ascending" | "descending" | undefined {
  if (sortState === "ascending") return "ascending";
  if (sortState === "descending") return "descending";
  return undefined;
}

/**
 * @summary テーブルのヘッダーセル。
 *
 * ソート機能、チェックボックス、アイコンボタンなどのコンテンツタイプに対応。
 * `sort-state` を設定するとソートボタンを表示し、クリックで `sort-change` イベントを発火する。
 *
 * @slot - セルのコンテンツ
 *
 * @fires sort-change - ソートボタンクリック時。detail: { sortState: TableSortState }。
 * ソート状態変更を通知するネイティブイベントは存在しないため、カスタムイベントとして定義。
 * bubbles: false, composed: false で最小スコープ（event-architecture.md 準拠）。
 */
export class MiTableHeaderCell extends LitElement {
  static styles = makeStyles(tableHeaderCellStyles);

  /** コンテンツタイプ */
  @property({ type: String, reflect: true, attribute: "content-type" })
  contentType: TableHeaderCellContentType = "text";

  /**
   * ソート状態。設定するとソートボタンを表示する。
   * undefined の場合はソート不可。
   */
  @property({ type: String, reflect: true, attribute: "sort-state" })
  sortState?: TableSortState;

  /**
   * リサイズ可能。初回スコープ外。
   */
  @property({ type: Boolean, reflect: true })
  resizable = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "columnheader");
    this.#updateAriaSort();
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("sortState")) {
      this.#updateAriaSort();
    }
  }

  #updateAriaSort() {
    if (this.sortState !== undefined) {
      const ariaSort = toAriaSortValue(this.sortState);
      if (ariaSort) {
        this.setAttribute("aria-sort", ariaSort);
      } else {
        this.removeAttribute("aria-sort");
      }
    } else {
      this.removeAttribute("aria-sort");
    }
  }

  #handleSortClick() {
    if (this.sortState === undefined) return;
    const nextState = SORT_NEXT_STATE[this.sortState];
    this.dispatchEvent(
      new CustomEvent("sort-change", {
        detail: { sortState: nextState },
        bubbles: false,
        composed: false,
      }),
    );
  }

  render() {
    const sortable = this.sortState !== undefined;

    if (this.contentType === "text" && sortable) {
      return html`
        <span class="cell-content">
          <button
            type="button"
            class="sort-button"
            @click="${this.#handleSortClick}"
          >
            <span class="sort-label"><slot></slot></span>
            <mi-icon
              class="sort-icon"
              type="${this.#sortIconType}"
              aria-hidden="true"
            ></mi-icon>
          </button>
          <slot name="action"></slot>
        </span>
      `;
    }

    return html`
      <span class="cell-content">
        <span class="cell-text"><slot></slot></span>
        <slot name="action"></slot>
      </span>
    `;
  }

  /** ソート状態に対応するアイコンタイプ */
  get #sortIconType(): string {
    switch (this.sortState) {
      case "ascending":
        return "arrow-up";
      case "descending":
        return "arrow-down";
      default:
        return "arrow-up-down";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-header-cell": MiTableHeaderCell;
  }
}

if (!customElements.get("mi-table-header-cell")) {
  customElements.define("mi-table-header-cell", MiTableHeaderCell);
}
