import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";

/** ボディセルのコンテンツタイプ */
export type TableBodyCellContentType =
  | "text"
  | "number"
  | "date"
  | "checkbox"
  | "icon-button"
  | "slot";

/** null 表示用のダッシュ */
const NULL_DISPLAY = "\u2013";

/**
 * @summary テーブルのボディセル。`<td>` に相当。
 *
 * コンテンツが空（テキストなし・要素なし）の場合、セル中央にダッシュ（–）を自動表示する。
 * `0` は有効な値として通常表示される。
 */
export class MiTableBodyCell extends LitElement {
  static styles = makeStyles(css`
    /* ==============================
         ボディセルの基本スタイル
         ============================== */

    :host {
      display: table-cell;
      box-sizing: border-box;
      padding-block: var(
        --_table-cell-padding-block,
        var(--spacing-medium, 8px)
      );
      padding-inline: var(--spacing-large, 12px);

      /* タイポグラフィ */
      font-family: var(--typography-font-family, Arial, sans-serif);
      font-weight: var(--typography-font-weight-regular, 400);
      font-size: var(--font-scale-40, 14px);
      line-height: 1.5;
      letter-spacing: 0.02em;
      text-align: start;

      /* 色 */
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));

      /* table-layout: fixed 対応 */
      min-inline-size: 0;
      word-break: break-word;

      /* ビュー依存（mi-table の CSS 変数経由） */
      background-color: var(--cell-bg, var(--surface-regular-default, #ffffff));
      border-block-end: var(
        --_table-cell-border-block-end,
        1px solid rgba(0, 0, 0, 0.2)
      );
      border-inline-start: var(--_table-cell-border-inline, none);
    }

    :host(:last-child) {
      border-inline-end: var(--_table-cell-border-inline, none);
    }

    /* ==============================
         コンテンツタイプ: number
         ============================== */

    :host([content-type="number"]) {
      text-align: end;
      font-variant-numeric: tabular-nums;
    }

    /* ==============================
         コンテンツタイプ: date
         ============================== */

    :host([content-type="date"]) {
      font-variant-numeric: tabular-nums;
    }

    /* ==============================
         コンテンツタイプ: checkbox
         ============================== */

    :host([content-type="checkbox"]) {
      padding-inline: var(--spacing-medium, 8px);
      padding-block: var(--spacing-small, 4px);
    }

    :host([content-type="checkbox"]) .cell-content {
      justify-content: center;
    }

    /* ==============================
         コンテンツタイプ: icon-button
         ============================== */

    :host([content-type="icon-button"]) {
      padding-inline: var(--spacing-large, 12px);
    }

    /* ==============================
         セルコンテンツ
         ============================== */

    .cell-content {
      display: flex;
      align-items: center;
    }

    /* ==============================
         アイコン付きセル
         ============================== */

    .with-icon {
      gap: var(--spacing-small, 4px);
      align-items: var(--_table-cell-icon-align, center);
    }

    .icon {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      inline-size: var(--icon-size-medium, 20px);
      block-size: var(--icon-size-medium, 20px);
    }

    .label {
      min-inline-size: 0;
    }

    /* ==============================
         null 値の表示
         ============================== */

    :host([data-empty]) {
      text-align: center;
    }
  `);

  /**
   * セルのコンテンツタイプ
   * @default 'text'
   */
  @property({ type: String, reflect: true, attribute: "content-type" })
  contentType: TableBodyCellContentType = "text";

  @state()
  private _isEmpty = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "cell");
    }
  }

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    const hasContent = nodes.some((n) => {
      if (n.nodeType === Node.TEXT_NODE) return n.textContent?.trim() !== "";
      return n.nodeType === Node.ELEMENT_NODE;
    });
    this._isEmpty = !hasContent;

    if (this._isEmpty) {
      this.setAttribute("data-empty", "");
    } else {
      this.removeAttribute("data-empty");
    }
  }

  render() {
    const hasIconSlot = this.querySelector('[slot="icon"]') !== null;

    if (hasIconSlot) {
      return html`
        <span class="cell-content with-icon">
          <span class="icon"><slot name="icon"></slot></span>
          <span class="label">
            <slot @slotchange=${this._onSlotChange}></slot>
            ${this._isEmpty ? html`${NULL_DISPLAY}` : nothing}
          </span>
        </span>
      `;
    }

    return html`
      <span class="cell-content">
        <slot @slotchange=${this._onSlotChange}></slot>
        ${this._isEmpty ? html`${NULL_DISPLAY}` : nothing}
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
