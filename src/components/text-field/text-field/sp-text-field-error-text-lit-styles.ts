import { css } from "lit";

export const spTextFieldErrorTextLitStyles = css`
  .container {
    display: flex;
    gap: 2px;
    align-items: center;
    padding-top: 8px;
  }

  .container.none {
    display: none;
  }

  .text {
    font-weight: var(--font-weight-normal, normal);
    font-size: 14px;
    color: #c92812;
  }

  .icon {
    width: 21px;
    height: 21px;
  }
`;
