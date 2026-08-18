/**
 * MenuDropdown コンポーネントスタイル
 *
 * ドロップダウンメニューの popup スタイルを定義。
 * React 版（menu.module.css）に準拠。
 */
import { css } from "lit";

export const menuDropdownStyles = css`
  :host {
    display: contents;
  }

  /* ==============================
     Popup
     ============================== */

  .popup {
    box-sizing: border-box;
    position: fixed;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    background-color: var(--zabuton-regular, #ffffff);
    border-radius: var(--border-radius-medium, 6px);
    box-shadow:
      0px 8px 16px 0px var(--elevation-regular, rgba(0, 0, 0, 0.13)),
      0px 0px 6px 0px var(--elevation-semi-weak, rgba(0, 0, 0, 0.1));
    /*
     * --menu-dropdown-min-inline-size を渡すと、その幅以上に広がる。
     * mi-select-box がトリガーの実測幅を渡し、ドロップダウンが
     * トリガーより狭くならないようにするために使う（ネイティブの select と同じ考え方）。
     */
    min-inline-size: max(120px, var(--menu-dropdown-min-inline-size, 0px));
    max-block-size: calc(100dvh - 32px);
    overflow: auto;
    padding-block: var(--spacing-medium, 8px);
    outline: none;
  }

  /*
   * 幅を中身に合わせる場合（width=0）のみ上限を設ける。
   * 選択肢が長いと横に広がりすぎるため。
   * 明示的に幅を指定した場合は、その値を尊重して上限をかけない。
   */
  .popup[data-fit-content] {
    max-inline-size: min(
      var(--menu-dropdown-max-inline-size, 320px),
      calc(100dvw - 32px)
    );
  }

  /* ==============================
     静的配置（Storybook 等）
     ============================== */

  :host([position-static]) .popup {
    position: static;
    z-index: auto;
  }

  /* ==============================
     Group 使用時
     ============================== */

  /* Group 使用時は popup の padding を無効化（各 group が padding を持つ） */
  .popup:has(> slot > mi-menu-group) {
    padding-block: 0;
  }

  /* ==============================
     Focus
     ============================== */

  .popup:focus-visible {
    outline: 2px solid var(--focus-ring-default, #191919);
    outline-offset: -2px;
  }
`;
