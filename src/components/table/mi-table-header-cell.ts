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
  sort: TableSortState,
): "ascending" | "descending" | undefined {
  if (sort === "ascending") return "ascending";
  if (sort === "descending") return "descending";
  return undefined;
}

/**
 * @summary テーブルのヘッダーセル。
 *
 * ソート機能、チェックボックス、アイコンボタンなどのコンテンツタイプに対応。
 * `sort` を設定するとソートボタンを表示し、クリックで `sort-change` イベントを発火する。
 *
 * @slot - セルのコンテンツ
 *
 * @fires sort-change - ソートボタンクリック時。detail: { sort: TableSortState }。
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
   *
   * ソートボタンクリック時に自動更新はされない。
   * `sort-change` イベントをリスンし、`detail.sort` で次の状態を受け取って更新すること。
   *
   * @example
   * ```js
   * cell.addEventListener("sort-change", (e) => {
   *   cell.sort = e.detail.sort;
   * });
   * ```
   */
  @property({ type: String, reflect: true })
  sort?: TableSortState;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "columnheader");
    this.#updateAriaSort();
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("sort")) {
      this.#updateAriaSort();
    }
  }

  #updateAriaSort() {
    if (this.sort !== undefined) {
      const ariaSort = toAriaSortValue(this.sort);
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
    if (this.sort === undefined) return;
    const nextState = SORT_NEXT_STATE[this.sort];
    this.dispatchEvent(
      new CustomEvent("sort-change", {
        detail: { sort: nextState },
        bubbles: false,
        composed: false,
      }),
    );
  }

  render() {
    const sortable = this.sort !== undefined;

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
    switch (this.sort) {
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
