import { css } from "lit";

export default css`
  :host {
    display: inline-block;
    max-inline-size: 100%;
    min-inline-size: 0;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    max-inline-size: 100%;
    box-sizing: border-box;
    border-radius: 9999px;
    background-color: var(--surface-semi-strong-default, #ededed);
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    font-weight: var(--font-weight-normal);
    line-height: 1.3;
    /* Figma のタイポグラフィ定義は letter-spacing 1%。em なら3サイズ共通で書ける */
    letter-spacing: 0.01em;
    text-decoration: none;

    /* href が無いときはリンクとして機能しないので、反応させない */
    &[href]:hover {
      background-color: var(--surface-semi-strong-hover, #e5e5e5);
    }

    &[href]:active {
      background-color: var(--surface-semi-strong-active, #dfdfdf);
    }

    /* 背景色は default のまま。フォーカスリングだけを重ねる */
    &:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--surface-regular-default, #fff),
        0 0 0 4px var(--focus-ring-default, #191919);
    }
  }

  .label {
    min-inline-size: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* サイズ別の値はすべて Figma の実測値 */
  .tag.x-small {
    min-block-size: 18px;
    padding-inline: 6px;
    padding-block: 1px;
    font-size: 10px;
  }

  .tag.small {
    min-block-size: 22px;
    padding-inline: 12px;
    padding-block: 2px;
    font-size: 11px;
  }

  .tag.medium {
    min-block-size: 24px;
    padding-inline: 12px;
    padding-block: 2px;
    font-size: 12px;
  }
`;
