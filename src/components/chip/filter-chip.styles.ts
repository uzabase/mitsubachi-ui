import { css } from "lit";

/*
 * 色は design token（CSS 変数）+ フォールバックで指定する。
 * 余白・角丸・フォントサイズ・アイコンサイズは、対応する design token が
 * このリポジトリに存在しないため Figma の値を直書きしている。
 *
 * role / tabindex は host 要素自身に付けるため（グループからロービングフォーカスの
 * tabindex を制御できるようにする）、Shadow DOM 内に <button> を置かず :host を
 * そのままチップの見た目にしている。
 */
export const filterChipStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    max-inline-size: 100%;
    min-inline-size: 0;
    min-block-size: 24px;
    padding-block: 2px;
    padding-inline: 8px;
    border-radius: 9999px;
    background-color: var(--surface-semi-strong-default, #ededed);
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    font-size: 12px;
    line-height: 1.5;
    letter-spacing: 0.01em;
    cursor: pointer;
    --_filter-chip-icon-color: var(
      --object-regular-default,
      rgba(0, 0, 0, 0.84)
    );
  }

  :host(:hover:not([disabled])) {
    background-color: var(--surface-semi-strong-hover, #e5e5e5);
  }

  :host(:active:not([disabled])) {
    background-color: var(--surface-semi-strong-active, #dfdfdf);
  }

  /* selected: チェックアイコンが入る分だけ start 側の余白を詰める */
  :host([selected]) {
    padding-inline-start: 4px;
    padding-inline-end: 8px;
    background-color: var(--surface-selected-default, #e8edff);
  }

  :host([selected]:hover:not([disabled])) {
    background-color: var(--surface-selected-hover, #dbe4ff);
  }

  :host([selected]:active:not([disabled])) {
    background-color: var(--surface-selected-active, #d5dfff);
  }

  /*
   * disabled では背景色を変えない（Figma の全バリアントで背景は default と同値）。
   * 文字色とアイコン色だけを薄くする。
   */
  :host([disabled]) {
    color: var(--text-disabled, rgba(0, 0, 0, 0.35));
    cursor: not-allowed;
    --_filter-chip-icon-color: var(
      --object-regular-disabled,
      rgba(0, 0, 0, 0.35)
    );
  }

  :host(:focus-visible) {
    box-shadow:
      0 0 0 2px var(--surface-regular-default, #fff),
      0 0 0 4px var(--focus-ring-default, #191919);
    outline: none;
  }

  /*
   * グループ幅に収まらないラベルは省略せず折り返す（Figma の仕様テキスト）。
   * mi-input-chip の ellipsis とは異なる。
   */
  .label {
    min-inline-size: 0;
    white-space: normal;
    /* break-word は非推奨の別名。anywhere だけで単語内の折り返しまで賄える */
    overflow-wrap: anywhere;
  }

  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    inline-size: 18px;
    block-size: 18px;
    color: var(--_filter-chip-icon-color);
  }

  /*
   * mi-icon は自身の大きさを 1.28em（継承した font-size 基準）で決めるため、
   * 箱のサイズを指定するだけでは実寸が Figma と合わない。
   * font-size を割り戻して実寸を Figma に合わせる（avatar.styles.ts と同じ対応）。
   */
  .check-icon mi-icon {
    font-size: 14.0625px; /* 18px / 1.28 */
  }

  @media (max-width: 720px) {
    :host {
      min-block-size: 28px;
      padding-inline: 12px;
      font-size: 14px;
    }

    :host([selected]) {
      padding-inline-start: 4px;
      padding-inline-end: 12px;
    }

    .check-icon {
      inline-size: 20px;
      block-size: 20px;
    }

    .check-icon mi-icon {
      font-size: 15.625px; /* 20px / 1.28 */
    }
  }
`;
