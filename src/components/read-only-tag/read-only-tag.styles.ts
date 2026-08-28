import { css } from "lit";

/*
 * 色は design token（CSS 変数）+ フォールバックで指定する。
 * 余白・角丸・フォントサイズ・アイコンサイズは、対応する design token が
 * このリポジトリに存在しないため Figma の値を直書きしている。
 */
export default css`
  :host {
    display: inline-block;
    max-inline-size: 100%;
    min-inline-size: 0;
  }

  .base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    max-inline-size: 100%;
    min-inline-size: 0;
    padding-inline: 4px;
    padding-block: 2px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.3;
    letter-spacing: 0.01em;
    /* Figma のコンテナが overflow-clip のため角丸からはみ出させない */
    overflow: hidden;
  }

  /*
   * アイコンとラベルの間隔は空けない（Figma のコンテナに gap の指定が無い）。
   * Figma では4バリアントとも icon が hidden のため、アイコン表示時のレイアウトは
   * デザインされていない。値を作らず Figma の指定どおり 0 にしている。
   */

  .base[data-type="neutral"] {
    background-color: var(--surface-semi-strong-default, #ededed);
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
  }

  .base[data-type="information"] {
    background-color: var(--surface-information, #edf1ff);
    color: var(--text-information, #315ce8);
  }

  .base[data-type="positive"] {
    background-color: var(--surface-positive, #dff5ea);
    color: var(--text-positive, #00783c);
  }

  .base[data-type="negative"] {
    background-color: var(--surface-negative, #ffedeb);
    color: var(--text-negative, #c92812);
  }

  /* アイコンの色は文字色に追従させる（slot 内の mi-icon が currentColor を拾う） */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    inline-size: 18px;
    block-size: 18px;
    color: inherit;
  }

  .label {
    min-inline-size: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
