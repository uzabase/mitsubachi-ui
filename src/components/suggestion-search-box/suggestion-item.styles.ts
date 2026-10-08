/**
 * SuggestionItem コンポーネントスタイル
 */
import { css } from "lit";

export const suggestionItemStyles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-block-size: 32px;
    padding-inline: var(--spacing-medium, 12px);
    cursor: pointer;

    font-family: var(--typography-font-family, Arial, sans-serif);
    font-size: var(--font-scale-40, 14px);
    line-height: 1.5;
    color: var(--text-regular-default, rgb(0 0 0 / 84%));
  }

  @media (width <= 720px) {
    :host {
      min-block-size: 40px;
    }
  }

  :host(:hover) {
    background-color: var(--surface-overlay-hover, rgb(0 0 0 / 7%));
  }

  /* キーボードで強調中の候補 */
  :host([aria-selected="true"]) {
    outline: 2px solid var(--focus-ring-default, #191919);
    outline-offset: -2px;
  }
`;
