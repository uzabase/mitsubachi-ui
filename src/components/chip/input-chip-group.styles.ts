import { css } from "lit";

export const inputChipGroupStyles = css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: flex-start;
    align-content: flex-start;
  }

  .item {
    flex: 0 1 auto;
    max-width: 100%;
    min-width: 0;
  }
`;
