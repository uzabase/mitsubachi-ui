/**
 * メニューアイテム共通スタイル
 *
 * 全 menu-item 種別で共通するルートレイアウト・状態・
 * icon + text area のレイアウトを定義。
 */
import { css } from "lit";

/** ルート要素の共通スタイル */
export const menuItemRootStyles = css`
  /* ==============================
     ルート（共通ベース）
     ============================== */

  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    min-block-size: 32px;
    cursor: pointer;
    outline: none;
  }

  @media (max-width: 720px) {
    :host {
      min-block-size: 40px;
    }
  }

  /* hover */
  :host(:hover:not([disabled])) {
    background-color: var(--surface-overlay-hover, rgba(0, 0, 0, 0.07));
  }

  /* active */
  :host(:active:not([disabled])) {
    background-color: var(--surface-overlay-active, rgba(0, 0, 0, 0.1));
  }

  /* focus-visible */
  :host(:focus-visible) {
    outline: 2px solid var(--focus-ring-default, #191919);
    outline-offset: -2px;
  }
`;

/** icon + text area の共通レイアウトスタイル */
export const menuItemLayoutStyles = css`
  /* ==============================
     コンテナ
     ============================== */

  .item-layout {
    display: flex;
    align-items: center;
    gap: var(--spacing-medium, 8px);
  }

  /* ==============================
     アイコン
     ============================== */

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    inline-size: var(--icon-size-medium, 20px);
    block-size: var(--icon-size-medium, 20px);
    color: var(--_menu-item-icon-color);
  }

  @media (max-width: 720px) {
    .icon-wrapper {
      inline-size: var(--icon-size-large, 22px);
      block-size: var(--icon-size-large, 22px);
    }
  }

  /* ==============================
     テキストエリア
     ============================== */

  .text-area {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    min-inline-size: 0;
    word-break: break-word;
  }

  .label {
    font-family: var(--typography-font-family, Arial, sans-serif);
    font-weight: var(--typography-font-weight-regular, 400);
    font-size: var(--font-scale-40, 14px);
    line-height: 1.5;
    letter-spacing: 0.02em;
  }

  @media (max-width: 720px) {
    .label {
      font-size: var(--font-scale-50, 16px);
    }
  }

  .support-text {
    font-family: var(--typography-font-family, Arial, sans-serif);
    font-weight: var(--typography-font-weight-regular, 400);
    font-size: var(--font-scale-30, 12px);
    line-height: 1.3;
    letter-spacing: 0.02em;
    color: var(--_menu-item-support-text-color);
  }

  @media (max-width: 720px) {
    .support-text {
      font-size: var(--font-scale-40, 14px);
    }
  }
`;
