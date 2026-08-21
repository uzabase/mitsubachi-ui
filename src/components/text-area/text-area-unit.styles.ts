import { css } from "lit";

export default css`
  :host {
    display: block;

    /* 内側の mi-text-area と同じ理由でコンテナ幅に追従させる */
    inline-size: 100%;

    .label {
      /* Figma: label-unit とテキストエリアの間隔は 8px */
      margin-block-end: 8px;
      text-align: start;

      &.none {
        display: none;
      }
    }
  }
`;
