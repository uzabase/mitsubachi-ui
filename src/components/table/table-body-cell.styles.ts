import { css } from "lit";

export const tableBodyCellStyles = css`
  :host {
    display: table-cell;
    box-sizing: border-box;
    padding-block: var(--_table-cell-padding-block);
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
    background-color: var(--_cell-bg, var(--surface-regular-default, #ffffff));

    /* ビュー依存ボーダー */
    border-block-end: var(--_table-cell-border-block-end);
    border-inline-start: var(--_table-cell-border-inline);

    vertical-align: middle;

    /* table-layout: fixed 対応 */
    min-inline-size: 0;
    word-break: break-word;
  }

  :host(:last-child) {
    border-inline-end: var(--_table-cell-border-inline);
  }

  :host([content-type="title"]) {
    &,
    & * {
      font-weight: var(--font-weight-bold);
    }
  }

  :host([content-type="number"]) {
    text-align: end;
    font-variant-numeric: tabular-nums;
  }

  :host([content-type="date"]) {
    font-variant-numeric: tabular-nums;
  }

  :host([content-type="checkbox"]) {
    padding-inline: var(--spacing-medium, 8px);
    padding-block: var(--spacing-small, 4px);
  }

  :host([content-type="icon-button"]) {
    padding-inline: var(--spacing-large, 12px);
  }

  .cell-content {
    display: flex;
    align-items: center;
  }

  .cell-content.with-icon {
    gap: var(--spacing-small, 4px);
    align-items: var(--_table-cell-icon-align, center);
  }

  :host([content-type="number"]) .cell-content {
    justify-content: flex-end;
  }

  :host([content-type="checkbox"]) .cell-content {
    justify-content: center;
  }

  .icon-wrapper {
    display: none;
    flex-shrink: 0;
    align-items: center;
    inline-size: var(--icon-size-medium, 20px);
    block-size: var(--icon-size-medium, 20px);
  }

  .icon-wrapper.visible {
    display: flex;
  }

  .label {
    min-inline-size: 0;
  }

  .null-value {
    text-align: center;
    inline-size: 100%;
  }
`;
