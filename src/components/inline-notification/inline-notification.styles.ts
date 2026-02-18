import { css } from "lit";

export default css`
  .base {
    display: flex;
    align-items: flex-start;
    line-height: 1.5;
    gap: 8px;
    padding: 16px;
    border-radius: 6px;
    font-size: 14px;
  }

  .base[data-type="error"] {
    background-color: #ffedeb;
  }

  .base[data-type="information"] {
    background-color: #edf1ff;
  }

  .base[data-type="success"] {
    background-color: #dff5ea;
  }

  .base[data-type="warning"] {
    background-color: #fcf6d4;
  }

  .icon {
    display: inline-block;
    min-width: 20px;
    width: 20px;
    height: 20px;
  }
`;
