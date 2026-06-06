import { css } from "lit";

export default css`
  :host {
    display: contents;

    --color-border-semi-strong-default: rgba(0, 0, 0, 0.2);
    --color-surface-regular-default: #ffffff;
    --color-text-regular-default: rgba(0, 0, 0, 0.84);
    --color-surface-overlay-hover: rgba(0, 0, 0, 0.04);
    --color-surface-overlay-active: rgba(0, 0, 0, 0.07);
    --color-surface-selected-default: #e8edff;
    --color-surface-selected-hover: #dce3ff;
    --color-surface-selected-active: #d0d9ff;
    --color-surface-regular-disabled: rgba(0, 0, 0, 0.03);
    --color-text-disabled: rgba(0, 0, 0, 0.35);
    --color-border-disabled: rgba(0, 0, 0, 0.07);
    --color-object-regular-default: rgba(0, 0, 0, 0.84);
    --color-object-regular-disabled: rgba(0, 0, 0, 0.35);
    --color-focus-ring-default: #191919;
    --border-radius-medium: 6px;
    --spacing-small: 4px;
    --spacing-medium: 8px;
    --spacing-large: 12px;
  }

  /* ==============================
     セグメントの基本スタイル
     ============================== */

  .segment {
    all: unset;
    box-sizing: border-box;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-block-size: 32px;
    padding-block: var(--spacing-small);

    border: 1px solid var(--color-border-semi-strong-default);
    margin-inline-start: -1px;

    background-color: var(--color-surface-regular-default);
    color: var(--color-text-regular-default);

    font-family: inherit;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.5;
    letter-spacing: 0.02em;
    text-align: center;

    cursor: pointer;

    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  /* ==============================
     ポジション（角丸）
     ============================== */

  :host(:first-child) .segment {
    border-start-start-radius: var(--border-radius-medium);
    border-end-start-radius: var(--border-radius-medium);
  }

  :host(:last-child) .segment {
    border-start-end-radius: var(--border-radius-medium);
    border-end-end-radius: var(--border-radius-medium);
  }

  /* ==============================
     未選択のインタラクション
     ============================== */

  :host(:not([selected]):not([disabled])) .segment:hover {
    background-color: var(--color-surface-regular-default);
    background-image: linear-gradient(
      var(--color-surface-overlay-hover),
      var(--color-surface-overlay-hover)
    );
    z-index: 1;
  }

  :host(:not([selected]):not([disabled])) .segment:active {
    background-color: var(--color-surface-regular-default);
    background-image: linear-gradient(
      var(--color-surface-overlay-active),
      var(--color-surface-overlay-active)
    );
    z-index: 1;
  }

  /* ==============================
     選択状態
     ============================== */

  :host([selected]) .segment {
    background-color: var(--color-surface-selected-default);
    border-color: var(--color-border-semi-strong-default);
    z-index: 1;
  }

  :host([selected]:not([disabled])) .segment:hover {
    background-color: var(--color-surface-selected-hover);
  }

  :host([selected]:not([disabled])) .segment:active {
    background-color: var(--color-surface-selected-active);
  }

  /* ==============================
     フォーカス
     ============================== */

  .segment:focus-visible {
    z-index: 2;
    box-shadow:
      0 0 0 2px var(--color-surface-regular-default),
      0 0 0 4px var(--color-focus-ring-default);
  }

  /* ==============================
     無効化状態
     ============================== */

  :host([disabled]) .segment {
    background-color: var(--color-surface-regular-disabled);
    color: var(--color-text-disabled);
    border-color: var(--color-border-disabled);
    cursor: not-allowed;
  }

  :host([selected][disabled]) .segment {
    background-color: var(--color-surface-regular-disabled);
    border-color: var(--color-border-disabled);
    color: var(--color-text-disabled);
  }

  /* ==============================
     チェックマークアイコン
     ============================== */

  .check-icon {
    display: none;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    inline-size: 18px;
    block-size: 18px;
    color: var(--color-object-regular-default);
  }

  :host([selected]) .check-icon {
    display: inline-flex;
  }

  :host([disabled]) .check-icon {
    color: var(--color-object-regular-disabled);
  }

  /* ==============================
     バリアント: text
     ============================== */

  .text-variant {
    min-inline-size: 56px;
    padding-inline: var(--spacing-large);
  }

  :host([selected]) .text-variant {
    padding-inline-start: var(--spacing-medium);
  }

  /* ==============================
     バリアント: icon
     ============================== */

  .icon-variant {
    min-inline-size: 48px;
    padding-inline: var(--spacing-medium);
  }

  :host([selected]) .icon-variant {
    padding-inline-start: var(--spacing-small);
  }

  /* ==============================
     ラベル
     ============================== */

  .label {
    display: inline-flex;
    align-items: center;
  }

  .icon-variant .label {
    inline-size: 18px;
    block-size: 18px;
  }

  /* ==============================
     スマホ対応
     ============================== */

  @media (max-width: 720px) {
    .segment {
      min-block-size: 36px;
      font-size: 14px;
    }

    .check-icon {
      inline-size: 20px;
      block-size: 20px;
    }
  }
`;
