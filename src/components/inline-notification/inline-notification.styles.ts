import { css } from "lit";

export default css`
  .base {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border-radius: 6px;
  }

  .base[data-type="error"] {
    background-color: #FFEDEB;
  }

  .base[data-type="information"] {
    background-color: #EDF1FF;
  }

  .base[data-type="success"] {
    background-color: #DFF5EA;
  }

  .base[data-type="warning"] {
    background-color: #FCF6D4;
  }

  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
`;
