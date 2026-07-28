import { css } from "lit";

export const tableHeaderCellStyles = css`
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
    font-size: var(--font-scale-30, 12px);
    line-height: 1.5;
    letter-spacing: 0.02em;
    text-align: start;

    &,
    & * {
      font-weight: var(--font-weight-bold);
    }

    /* ビュー依存（CSS変数で mi-table から受け取る） */
    background-color: var(--_table-header-bg);
    color: var(--_table-header-color);
    border-block-start: var(--_table-header-border-block);
    border-block-end: var(--_table-header-border-block);
    border-inline-start: var(--_table-header-border-inline);

    /* table-layout: fixed 対応 */
    min-inline-size: 0;
    overflow: hidden;
  }

  :host(:last-child) {
    border-inline-end: var(--_table-header-border-inline);
  }

  :host([content-type="checkbox"]) {
    padding-inline: var(--spacing-medium, 8px);
    padding-block: var(--spacing-small, 4px);
    text-align: center;
  }

  :host([content-type="icon-button"]) {
    padding-inline: var(--spacing-large, 12px);
  }

  :host([sort-state]:hover) {
    background-color: var(--_table-header-hover-bg);
  }

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

    &,
    & * {
      font-weight: var(--font-weight-bold);
    }
  }

  .sort-button:focus-visible {
    box-shadow:
      0 0 0 2px var(--surface-regular-default, #ffffff),
      0 0 0 4px var(--focus-ring-default, #191919);
    outline: none;
  }

  .sort-label {
    display: inline-flex;
    align-items: center;
  }

  :host([sort-state="ascending"]),
  :host([sort-state="descending"]) {
    color: var(--text-selected, #315ce8);
  }

  .cell-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-small, 4px);
  }

  .sort-icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    inline-size: 18px;
    block-size: 18px;
    color: var(--object-weak-default, rgba(0, 0, 0, 0.54));
  }

  :host([sort-state="ascending"]) .sort-icon,
  :host([sort-state="descending"]) .sort-icon {
    color: inherit;
  }

  .cell-text {
    flex: 1 1 0;
    min-inline-size: 0;
  }
`;
