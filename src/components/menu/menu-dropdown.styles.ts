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
    min-inline-size: 120px;
    max-block-size: calc(100dvh - 32px);
    overflow: auto;
    padding-block: var(--spacing-medium, 8px);
    outline: none;
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
