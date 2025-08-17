import { css } from "lit";

export const spTextFieldLitStyles = css`
  :host {
    display: block;
  }

  .input {
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    background: #fff;
    border: 1px solid #b6b6b6;
    border-radius: 6px;
    padding: 4px 12px;
    font-weight: var(--font-weight-normal, normal);
    font-size: 16px;
    line-height: 24px;
    outline: none;
  }

  .input::placeholder {
    color: #0000008a;
  }

  .input[disabled] {
    color: #000000ad;
    background-color: #0000000d;
    border-color: #e5e5e5;
  }

  .input[disabled]::placeholder {
    color: #00000059;
  }

  .input[disabled]:hover {
    border-color: #e5e5e5;
  }

  .input:hover {
    border-color: #0000008f;
  }

  .input:focus-visible {
    outline: canvastext solid 3px;
    box-shadow:
      0 0 0 2px #fff,
      0 0 0 4px #282828;
    outline-offset: 1px;
  }

  .input.error {
    border-color: #db351f;
  }
`;
