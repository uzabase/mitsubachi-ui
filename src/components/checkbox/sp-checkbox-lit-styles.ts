import { css } from "lit";

export const spCheckboxLitStyles = css`
  :host {
    display: inline-block;
  }

  .base {
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
  }

  .checkmark {
    flex-grow: 0;
    flex-shrink: 0;
    display: inline-flex;
    padding-block: 4px;
    padding-inline: 4px;
    cursor: pointer;
    position: relative;
  }

  .checkmark::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #fff 50% 50% no-repeat;
    border: 1px solid rgb(0 0 0 / 29%);
    border-radius: 2px;
  }

  .input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    margin: 0;
    padding: 0;
  }

  /* Checked and Indeterminate states */
  .checkmark:has(.input:checked)::before,
  .checkmark:has(.input:indeterminate)::before {
    background-color: #2f73d4;
    border-color: #2f73d4;
  }

  .checkmark:has(.input:checked)::before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTAuNDk0IDMuMjU2YS44NzUuODc1IDAgMCAxIDAgMS4yMzhMNS44MjcgOS4xNmEuODc1Ljg3NSAwIDAgMS0xLjIzNyAwTDIuMjU2IDYuODI3QS44NzUuODc1IDAgMSAxIDMuNDk0IDUuNTlsMS43MTQgMS43MTQgNC4wNDgtNC4wNDhhLjg3NS44NzUgMCAwIDEgMS4yMzggMCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+");
  }

  .checkmark:has(.input:indeterminate)::before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIyIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMiIgZmlsbD0iI2ZmZiIgcng9IjEiLz48L3N2Zz4=");
  }

  /* Focus states */
  .checkmark:has(.input:focus-visible)::before {
    box-shadow:
      0 0 0 2px #fff,
      0 0 0 4px #191919;
  }

  /* Hover states */
  .base:hover .checkmark:has(:not(.input:disabled))::before {
    border-color: rgb(0 0 0 / 54%);
    outline: 4px solid rgb(0 0 0 / 4%);
  }

  .base:active .checkmark:has(:not(.input:disabled))::before,
  .base:hover:active .checkmark:has(:not(.input:disabled))::before {
    outline: 4px solid rgb(0 0 0 / 7%);
  }

  .base:hover .checkmark:has(.input:checked):has(:not(.input:disabled))::before,
  .base:hover
    .checkmark:has(.input:indeterminate):has(:not(.input:disabled))::before {
    background-color: #2666bf;
    border-color: #2666bf;
  }

  /* Disabled states */
  .checkmark:has(.input:disabled) {
    cursor: not-allowed;
  }

  .checkmark:has(.input:disabled)::before {
    background-color: #e5e5e5;
    border-color: rgb(0 0 0 / 5%);
  }

  .base:has(.input:disabled) {
    cursor: not-allowed;
  }
`;
