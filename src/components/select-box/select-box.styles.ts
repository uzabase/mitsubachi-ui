import { css } from "lit";

export const selectBoxStyles = css`
  :host {
    display: inline-block;
  }

  /* primary はコンテナいっぱいに広がる（Figma の指定） */
  :host([variant="primary"]) {
    display: block;
  }

  /*
   * mi-menu の既定は inline-block（中身に合わせて縮む）。
   * ここでホストの display を引き継がせることで、利用側が
   * mi-select-box に display: block を指定するだけで全幅にできる。
   */
  .menu {
    display: inherit;
  }

  .select-box {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    inline-size: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: var(--radius-medium, 6px);
    background: transparent;
    color: var(--text-regular-default, rgb(0 0 0 / 84%));
    font: inherit;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0.01em;
    cursor: pointer;
    padding-block: 4px;
  }

  /* --- variant: primary --- */
  .select-box.primary {
    border: 1px solid var(--border-semi-strong-default, rgb(0 0 0 / 20%));
    background: var(--surface-regular-default, #fff);
    padding-inline: 8px;

    &:hover:not(:disabled) {
      border-color: var(--border-semi-strong-hover, rgb(0 0 0 / 35%));
    }

    &:active:not(:disabled) {
      border-color: var(--border-semi-strong-active, rgb(0 0 0 / 54%));
    }

    &:disabled {
      background: var(--surface-regular-disabled, rgb(0 0 0 / 3%));
      border-color: var(--border-disabled, rgb(0 0 0 / 7%));
      color: var(--text-disabled, rgb(0 0 0 / 35%));
      cursor: not-allowed;
    }
  }

  /* --- variant: secondary --- */
  .select-box.secondary {
    padding-inline-start: 8px;
    padding-inline-end: 4px;

    &:hover:not(:disabled) {
      background: var(--surface-overlay-hover, rgb(0 0 0 / 7%));
    }

    &:active:not(:disabled) {
      background: var(--surface-overlay-active, rgb(0 0 0 / 10%));
    }

    &:disabled {
      color: var(--text-disabled, rgb(0 0 0 / 35%));
      cursor: not-allowed;
    }
  }

  /* --- size --- */
  .select-box.medium {
    min-block-size: 40px;
  }

  .select-box.small {
    min-block-size: 32px;
  }

  /* --- focus --- */
  .select-box:focus-visible {
    box-shadow:
      0 0 0 2px var(--surface-regular-default, #fff),
      0 0 0 4px var(--focus-ring-default, #191919);
    outline: none;
  }

  /* --- error --- */
  .select-box.primary.error:not(:disabled) {
    border-color: var(--border-error-default, #db351f);
  }

  .select-box.secondary.error:not(:disabled) {
    border: 1px solid var(--border-error-default, #db351f);
  }

  /*
   * エラー中の hover / active。背景は variant ごとの通常ルールがそのまま効く。
   * focus はエラー中も通常のフォーカスリングのままなので、追加のルールは不要（Figma 準拠）。
   */
  .select-box.error:hover:not(:disabled) {
    border-color: var(--border-error-hover, #b02412);
  }

  .select-box.error:active:not(:disabled) {
    border-color: var(--border-error-active, #6e160b);
  }

  /* --- text --- */
  .text {
    flex: 1;
    min-inline-size: 0;
    text-align: start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .text.placeholder {
    color: var(--text-weak-default, rgb(0 0 0 / 54%));
  }

  :host([disabled]) .text.placeholder {
    color: var(--text-disabled, rgb(0 0 0 / 35%));
  }

  /* --- chevron icon --- */
  .chevron {
    flex-shrink: 0;
    inline-size: 20px;
    block-size: 20px;
    color: currentColor;
  }

  /* --- error text --- */
  .error-text {
    padding-block-start: 4px;
  }

  /* --- responsive: phone --- */
  @media (max-width: 720px) {
    .select-box {
      font-size: 16px;
      letter-spacing: 0.01em;
    }

    .select-box.small {
      min-block-size: 40px;
    }

    .chevron {
      inline-size: 22px;
      block-size: 22px;
    }
  }
`;
