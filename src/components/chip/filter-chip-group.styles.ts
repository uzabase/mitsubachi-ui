import { css } from "lit";

/*
 * mi-filter-chip-group-single / mi-filter-chip-group-multiple の共通レイアウト。
 * role は host 要素自身に付けるため、レイアウトも :host に直接持たせている。
 * gap は Figma の実測値（design token 未定義）。
 */
export const filterChipGroupStyles = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    align-content: center;
  }
`;
