/**
 * SuggestionSearchBox コンポーネントスタイル
 *
 * mi-search-box のスタイルに、候補リスト（listbox）のスタイルを追加する。
 */
import { css } from "lit";

export const suggestionSearchBoxStyles = css`
  /*
   * 候補リストの位置の基準。ホストではなく入力欄の枠を基準にすることで、
   * ホストが flex / grid で縦に引き伸ばされても入力欄の直下に表示される
   */
  .field {
    position: relative;
  }

  /* ==============================
     候補リスト
     ============================== */

  .listbox {
    box-sizing: border-box;
    position: absolute;
    inset-block-start: calc(100% + var(--spacing-x-small, 4px));
    inset-inline: 0;
    z-index: 1;
    max-block-size: 320px;
    overflow: auto;
    padding-block: var(--spacing-medium, 8px);
    background-color: var(--zabuton-regular, #ffffff);
    border-radius: var(--border-radius-medium, 6px);
    box-shadow:
      0px 8px 16px 0px var(--elevation-regular, rgba(0, 0, 0, 0.13)),
      0px 0px 6px 0px var(--elevation-semi-weak, rgba(0, 0, 0, 0.1));
  }

  .listbox[hidden] {
    display: none;
  }

  /* 視覚的には隠すが、スクリーンリーダーには読み上げさせる */
  .visually-hidden {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
