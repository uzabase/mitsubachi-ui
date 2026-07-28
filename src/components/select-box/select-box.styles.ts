import { css } from "lit";

export const selectBoxStyles = css`
  :host {
    display: inline-block;
  }

  :host([variant="primary"]) {
    display: block;
    width: 100%;
  }

  .select-box {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: rgb(0 0 0 / 84%);
    font: inherit;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0.01em;
    cursor: pointer;
    padding-block: 4px;
  }

  /* --- variant: primary --- */
  .select-box.primary {
    border: 1px solid rgb(0 0 0 / 20%);
    background: #fff;
    padding-inline: 8px;

    &:hover:not(:disabled) {
      border-color: rgb(0 0 0 / 56%);
    }

    &:active:not(:disabled) {
      border-color: rgb(0 0 0 / 84%);
    }

    &:disabled {
      background: rgb(0 0 0 / 5%);
      border-color: rgb(0 0 0 / 10%);
      color: rgb(0 0 0 / 35%);
      cursor: not-allowed;
    }
  }

  /* --- variant: secondary --- */
  .select-box.secondary {
    padding-inline-start: 8px;
    padding-inline-end: 4px;

    &:hover:not(:disabled) {
      background: rgb(0 0 0 / 4%);
    }

    &:active:not(:disabled) {
      background: rgb(0 0 0 / 7%);
    }

    &:disabled {
      color: rgb(0 0 0 / 35%);
      cursor: not-allowed;
    }
  }

  /* --- size --- */
  .select-box.medium {
    min-height: 40px;
  }

  .select-box.small {
    min-height: 32px;
  }

  /* --- focus --- */
  .select-box:focus-visible {
    box-shadow:
      0 0 0 2px #fff,
      0 0 0 4px #282828;
    outline: none;
  }

  /* --- error --- */
  .select-box.primary.error:not(:disabled) {
    border-color: #db351f;
  }

  .select-box.secondary.error:not(:disabled) {
    border: 1px solid #db351f;
  }

  /* --- text --- */
  .text {
    flex: 1;
    min-width: 0;
    text-align: start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .text.placeholder {
    color: rgb(0 0 0 / 54%);
  }

  :host([disabled]) .text.placeholder {
    color: rgb(0 0 0 / 35%);
  }

  /* --- chevron icon --- */
  .chevron {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: currentColor;
  }

  /* --- error text --- */
  .error-text {
    display: flex;
    align-items: center;
    gap: 2px;
    padding-block-start: 4px;
    color: #c92812;
    font-size: 14px;
    line-height: 1.5;
  }

  .error-text.hidden {
    display: none;
  }

  .error-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .error-message {
    font-weight: var(--font-weight-normal);
  }

  /* --- responsive: phone --- */
  @media (max-width: 720px) {
    .select-box {
      font-size: 16px;
      letter-spacing: 0.01em;
    }

    .select-box.small {
      min-height: 40px;
    }

    .chevron {
      width: 22px;
      height: 22px;
    }
  }
`;
