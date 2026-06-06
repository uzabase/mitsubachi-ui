import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";

import { makeStyles } from "../styles";

/** ヘッダーセルのコンテンツタイプ */
export type TableHeaderCellContentType = "text" | "checkbox" | "icon-button";

/** ソート状態 */
export type TableSortState = "default" | "ascending" | "descending";

/** カラムアクションメニューの項目 */
export interface TableHeaderMenuItem {
  /** メニュー項目のラベル */
  label: string;
  /** クリック時のコールバック */
  onClick: () => void;
  /**
   * 選択状態（チェックアイコンを表示）
   * @default false
   */
  selected?: boolean;
}

/** ソート状態の遷移マップ */
const SORT_NEXT_STATE: Record<TableSortState, TableSortState> = {
  default: "ascending",
  ascending: "descending",
  descending: "default",
};

/**
 * @summary テーブルのヘッダーセル。`<th>` に相当。
 *
 * ソート機能、カラムアクションメニュー、カラムリサイズに対応。
 *
 * @fires sort-change - ソート状態が変更されたとき。`detail.sortState` に新しい状態を含む。
 */
export class MiTableHeaderCell extends LitElement {
  static styles = makeStyles(css`
    /* ==============================
         ヘッダーセルの基本スタイル
         ============================== */

    :host {
      display: table-cell;
      box-sizing: border-box;
      position: relative;
      min-block-size: 40px;
      padding-block: var(--spacing-medium, 8px);
      padding-inline: var(--spacing-large, 12px);
      vertical-align: middle;

      /* タイポグラフィ */
      font-family: var(--typography-font-family, Arial, sans-serif);
      font-weight: var(--typography-font-weight-bold, 700);
      font-size: var(--font-scale-30, 12px);
      line-height: 1.5;
      letter-spacing: 0.02em;
      text-align: start;

      /* table-layout: fixed 対応 */
      min-inline-size: 0;
      overflow: hidden;

      /* ビュー依存（mi-table の CSS 変数経由） */
      background-color: var(
        --_table-header-bg,
        var(--surface-semi-strong-default, #ededed)
      );
      color: var(
        --_table-header-color,
        var(--text-regular-default, rgba(0, 0, 0, 0.84))
      );
      border-block-start: var(
        --_table-header-border-block,
        1px solid rgba(0, 0, 0, 0.2)
      );
      border-block-end: var(
        --_table-header-border-block,
        1px solid rgba(0, 0, 0, 0.2)
      );
      border-inline-start: var(--_table-header-border-inline, none);
    }

    :host(:last-child) {
      border-inline-end: var(--_table-header-border-inline, none);
    }

    /* ==============================
         コンテンツタイプ: checkbox
         ============================== */

    :host([content-type="checkbox"]) {
      padding-inline: var(--spacing-medium, 8px);
      padding-block: var(--spacing-small, 4px);
      text-align: center;
    }

    /* ==============================
         コンテンツタイプ: icon-button
         ============================== */

    :host([content-type="icon-button"]) {
      padding-inline: var(--spacing-large, 12px);
    }

    /* ==============================
         ソート可能
         ============================== */

    :host([sortable]) {
      cursor: pointer;
    }

    :host([sortable]:hover) {
      background-color: var(
        --_table-header-hover-bg,
        var(--surface-semi-strong-hover, #e5e5e5)
      );
    }

    /* ==============================
         ソート済み
         ============================== */

    :host([sort-state="ascending"]),
    :host([sort-state="descending"]) {
      color: var(--text-selected, #315ce8);
    }

    /* ==============================
         セルコンテンツ
         ============================== */

    .cell-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-small, 4px);
    }

    .cell-text {
      flex: 1 1 0;
      min-inline-size: 0;
    }

    /* ==============================
         ソートボタン
         ============================== */

    .sort-button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-small, 4px);
      cursor: pointer;
      color: inherit;
      font: inherit;
      letter-spacing: inherit;
    }

    .sort-button:focus-visible {
      box-shadow:
        0 0 0 2px var(--surface-regular-default, #ffffff),
        0 0 0 4px var(--focus-ring-default, #191919);
    }

    /* ==============================
         ソートアイコン
         ============================== */

    .sort-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      inline-size: var(--icon-size-small, 18px);
      block-size: var(--icon-size-small, 18px);
      color: var(--object-weak-default, rgba(0, 0, 0, 0.54));
    }

    :host([sort-state="ascending"]) .sort-icon,
    :host([sort-state="descending"]) .sort-icon {
      color: inherit;
    }

    .sort-label {
      display: inline-flex;
      align-items: center;
    }

    /* ==============================
         カラムアクションメニュー
         ============================== */

    .menu-wrapper {
      position: relative;
      flex-shrink: 0;
    }

    .menu-button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 24px;
      block-size: 24px;
      border-radius: var(--border-radius-full, 9999px);
      cursor: pointer;
      color: var(--icon-regular-default, rgba(0, 0, 0, 0.84));
    }

    .menu-button:hover:not(:disabled) {
      background-color: var(--surface-overlay-hover, rgba(0, 0, 0, 0.07));
    }

    .menu-button:active:not(:disabled) {
      background-color: var(--surface-overlay-active, rgba(0, 0, 0, 0.1));
    }

    .menu-button:focus-visible {
      box-shadow:
        0 0 0 2px var(--surface-regular-default, #ffffff),
        0 0 0 4px var(--focus-ring-default, #191919);
    }

    /* ==============================
         ドロップダウンメニュー
         ============================== */

    .menu-dropdown {
      position: absolute;
      inset-block-start: 100%;
      inset-inline-end: 0;
      z-index: 10;
      min-inline-size: 160px;
      padding-block: var(--spacing-small, 4px);
      background-color: var(--surface-regular-default, #ffffff);
      border: 1px solid var(--border-regular-default, rgba(0, 0, 0, 0.1));
      border-radius: var(--border-radius-medium, 6px);
      box-shadow:
        0px 1px 2px 0px rgba(0, 0, 0, 0.29),
        0px 5px 9px 2px rgba(0, 0, 0, 0.13);
    }

    .menu-item {
      all: unset;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-medium, 8px);
      inline-size: 100%;
      padding-block: var(--spacing-medium, 8px);
      padding-inline: var(--spacing-large, 12px);
      font-family: var(--typography-font-family, Arial, sans-serif);
      font-weight: var(--typography-font-weight-regular, 400);
      font-size: var(--font-scale-30, 12px);
      line-height: 1.5;
      letter-spacing: 0.02em;
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      cursor: pointer;
    }

    .menu-item:hover:not(:disabled) {
      background-color: var(--surface-overlay-hover, rgba(0, 0, 0, 0.07));
    }

    .menu-item:active:not(:disabled) {
      background-color: var(--surface-overlay-active, rgba(0, 0, 0, 0.1));
    }

    .menu-item:focus-visible {
      box-shadow:
        0 0 0 2px var(--surface-regular-default, #ffffff),
        0 0 0 4px var(--focus-ring-default, #191919);
    }

    .menu-item-label {
      flex: 1 1 0;
      min-inline-size: 0;
    }

    .menu-item-selected {
      background-color: var(--surface-selected-default, #e8edff);
    }

    .menu-item-selected:hover:not(:disabled) {
      background-color: var(--surface-selected-hover, #dbe4ff);
    }

    .menu-item-check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      inline-size: var(--icon-size-small, 18px);
      block-size: var(--icon-size-small, 18px);
      color: var(--icon-selected, #3f69f2);
    }

    /* ==============================
         カラムリサイザー
         ============================== */

    .resizer {
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inline-size: 4px;
      block-size: 100%;
      cursor: col-resize;
      background-color: transparent;
    }

    .resizer:hover {
      background-color: var(--border-selected, #3f69f2);
    }
  `);

  /**
   * セルのコンテンツタイプ
   * @default 'text'
   */
  @property({ type: String, reflect: true, attribute: "content-type" })
  contentType: TableHeaderCellContentType = "text";

  /**
   * ソート状態。設定すると自動でソートボタンが表示される。
   * @default undefined（ソート不可）
   */
  @property({ type: String, reflect: true, attribute: "sort-state" })
  sortState?: TableSortState;

  /** カラムアクションメニューの項目（JS プロパティで設定） */
  @property({ type: Array, attribute: false })
  menuItems: TableHeaderMenuItem[] = [];

  /**
   * カラム幅のリサイズを許可
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  resizable = false;

  @state()
  private _menuOpen = false;

  @query(".menu-dropdown")
  private _menuDropdown?: HTMLElement;

  @query(".menu-button")
  private _menuButton?: HTMLButtonElement;

  private _boundHandleOutsideClick = this._handleOutsideClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "columnheader");
    }
    if (this.sortState !== undefined) {
      this.setAttribute("sortable", "");
    }
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);

    if (changed.has("sortState")) {
      if (this.sortState !== undefined) {
        this.setAttribute("sortable", "");
        const ariaSortValue = this._toAriaSortValue();
        if (ariaSortValue) {
          this.setAttribute("aria-sort", ariaSortValue);
        } else {
          this.removeAttribute("aria-sort");
        }
      } else {
        this.removeAttribute("sortable");
        this.removeAttribute("aria-sort");
      }
    }

    if (changed.has("_menuOpen")) {
      if (this._menuOpen) {
        document.addEventListener("mousedown", this._boundHandleOutsideClick);
        this.updateComplete.then(() => {
          const firstItem = this._menuDropdown?.querySelector(
            ".menu-item",
          ) as HTMLElement | null;
          firstItem?.focus();
        });
      } else {
        document.removeEventListener(
          "mousedown",
          this._boundHandleOutsideClick,
        );
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("mousedown", this._boundHandleOutsideClick);
  }

  private _toAriaSortValue(): "ascending" | "descending" | undefined {
    if (this.sortState === "ascending") return "ascending";
    if (this.sortState === "descending") return "descending";
    return undefined;
  }

  private _handleSortClick() {
    if (this.sortState === undefined) return;
    const nextState = SORT_NEXT_STATE[this.sortState];
    this.dispatchEvent(
      new CustomEvent("sort-change", {
        bubbles: true,
        composed: true,
        detail: { sortState: nextState },
      }),
    );
  }

  private _handleOutsideClick(e: MouseEvent) {
    const path = e.composedPath();
    if (
      this._menuDropdown &&
      !path.includes(this._menuDropdown) &&
      this._menuButton &&
      !path.includes(this._menuButton)
    ) {
      this._menuOpen = false;
    }
  }

  private _handleMenuKeyDown(e: KeyboardEvent) {
    const items = Array.from(
      this._menuDropdown?.querySelectorAll(".menu-item") ?? [],
    ) as HTMLElement[];
    const currentIndex = items.indexOf(e.target as HTMLElement);

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
        items[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev =
          currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
        items[prev]?.focus();
        break;
      }
      case "Home":
        e.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Escape":
        e.preventDefault();
        this._menuOpen = false;
        this._menuButton?.focus();
        break;
    }
  }

  private _handleMenuItemClick(item: TableHeaderMenuItem) {
    item.onClick();
    this._menuOpen = false;
  }

  private _handleResizeMouseDown(e: MouseEvent) {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = this.offsetWidth;
    const DEFAULT_MIN_WIDTH = 40;

    const colIndex = this._getCellIndex();
    const table = this.closest("mi-table");
    const col = table?.querySelector(
      `mi-table-col:nth-child(${colIndex + 1})`,
    ) as HTMLElement | null;

    const minWidth = col
      ? Number(col.dataset.minWidth) || DEFAULT_MIN_WIDTH
      : DEFAULT_MIN_WIDTH;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(minWidth, startWidth + delta);
      const widthPx = `${newWidth}px`;
      if (col) {
        col.style.width = widthPx;
      } else {
        this.style.width = widthPx;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  private _getCellIndex(): number {
    const row = this.closest("mi-table-row");
    if (!row) return 0;
    const cells = Array.from(row.querySelectorAll("mi-table-header-cell"));
    return cells.indexOf(this);
  }

  private _renderSortIcon(): TemplateResult {
    const state = this.sortState ?? "default";
    return html`
      <span class="sort-icon" aria-hidden="true">
        ${state === "default"
          ? sortDefaultSvg
          : state === "ascending"
            ? sortAscendingSvg
            : sortDescendingSvg}
      </span>
    `;
  }

  private _renderMenu(): TemplateResult | typeof nothing {
    if (this.menuItems.length === 0) return nothing;

    return html`
      <span class="menu-wrapper">
        <button
          type="button"
          class="menu-button"
          @click=${() => {
            this._menuOpen = !this._menuOpen;
          }}
          aria-label="カラムメニュー"
          aria-expanded=${this._menuOpen}
          aria-haspopup="menu"
        >
          ${kebabMenuSvg}
        </button>
        ${this._menuOpen
          ? html`
              <div
                class="menu-dropdown"
                role="menu"
                tabindex="-1"
                @keydown=${this._handleMenuKeyDown}
              >
                ${this.menuItems.map(
                  (item) => html`
                    <button
                      type="button"
                      class="menu-item ${item.selected
                        ? "menu-item-selected"
                        : ""}"
                      role=${item.selected !== undefined
                        ? "menuitemradio"
                        : "menuitem"}
                      aria-checked=${item.selected !== undefined
                        ? String(item.selected)
                        : nothing}
                      tabindex="-1"
                      @click=${() => this._handleMenuItemClick(item)}
                    >
                      <span class="menu-item-label">${item.label}</span>
                      ${item.selected
                        ? html`
                            <span class="menu-item-check" aria-hidden="true">
                              ${checkSvg}
                            </span>
                          `
                        : nothing}
                    </button>
                  `,
                )}
              </div>
            `
          : nothing}
      </span>
    `;
  }

  render() {
    const sortable = this.sortState !== undefined;
    const menu = this._renderMenu();
    const resizer = this.resizable
      ? html`<span
          class="resizer"
          @mousedown=${this._handleResizeMouseDown}
        ></span>`
      : nothing;

    if (this.contentType === "text" && sortable) {
      return html`
        <span class="cell-content">
          <button
            type="button"
            class="sort-button"
            @click=${this._handleSortClick}
          >
            <span class="sort-label"><slot></slot></span>
            ${this._renderSortIcon()}
          </button>
          ${menu}
        </span>
        ${resizer}
      `;
    }

    return html`
      <span class="cell-content">
        <span class="cell-text"><slot></slot></span>
        ${menu}
      </span>
      ${resizer}
    `;
  }
}

/* ==============================
   インラインSVGアイコン
   ============================== */

const sortDefaultSvg = html`<svg
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8.22736 10.425L9.02236 11.22L5.25736 14.985L1.48486 11.22L2.27986 10.425L4.68736 12.8325V3.75751H5.81236V12.8325L8.21986 10.425H8.22736Z"
    fill="currentColor"
  />
  <path
    d="M16.5149 6.77251L12.7499 3.00751L8.98486 6.77251L9.77986 7.56751L12.1874 5.16001V14.25H13.3124V5.16001L15.7199 7.56751L16.5149 6.77251Z"
    fill="currentColor"
  />
</svg>`;

const sortAscendingSvg = html`<svg
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11.685 9.2775L9.57 11.3925V4.5H8.445V11.3925L6.3225 9.27L5.5275 10.065L9.0075 13.545L12.48 10.0725L11.685 9.2775Z"
    fill="currentColor"
  />
</svg>`;

const sortDescendingSvg = html`<svg
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.48 7.98L9 4.5L5.5275 7.9725L6.3225 8.7675L8.4375 6.6525V13.545H9.5625V6.6525L11.685 8.775L12.48 7.98Z"
    fill="currentColor"
  />
</svg>`;

const kebabMenuSvg = html`<svg
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.2824 4.28257C10.2824 4.98757 9.71242 5.55757 9.00742 5.55757C8.30242 5.55757 7.73242 4.98007 7.73242 4.28257C7.73242 3.58507 8.30242 3.00757 9.00742 3.00757C9.71242 3.00757 10.2824 3.58507 10.2824 4.28257ZM10.2824 9.00007C10.2824 8.29507 9.71242 7.72507 9.00742 7.72507C8.30242 7.72507 7.73242 8.29507 7.73242 9.00007C7.73242 9.70507 8.30242 10.2751 9.00742 10.2751C9.71242 10.2751 10.2824 9.70507 10.2824 9.00007ZM10.2824 13.7326C10.2824 13.0351 9.71242 12.4576 9.00742 12.4576C8.30242 12.4576 7.73242 13.0276 7.73242 13.7326C7.73242 14.4376 8.30242 15.0076 9.00742 15.0076C9.71242 15.0076 10.2824 14.4376 10.2824 13.7326Z"
    fill="currentColor"
  />
</svg>`;

const checkSvg = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  height="100%"
  viewBox="0 0 12 8"
  fill="none"
>
  <path
    d="M4.2625 7.71833L0 3.47417L0.971667 2.5025L4.2625 5.775L10.0467 0L11.0183 0.971667L4.2625 7.71833Z"
    fill="currentColor"
  />
</svg>`;

declare global {
  interface HTMLElementTagNameMap {
    "mi-table-header-cell": MiTableHeaderCell;
  }
}

if (!customElements.get("mi-table-header-cell")) {
  customElements.define("mi-table-header-cell", MiTableHeaderCell);
}
