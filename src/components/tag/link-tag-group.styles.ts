import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    /* タグ同士の間隔。Figma の実測値でサイズによらず一定 */
    gap: 4px;
    align-items: flex-start;
    align-content: flex-start;
  }
`;
