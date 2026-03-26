import { css } from "lit";

/**
 * Snackbar（成功フィードバック用オーバーレイ通知）のスタイル。
 * React 版 snackbar.module.css および Figma（Base Component）に準拠。
 */
export default css`
  :host {
    display: block;
    box-sizing: border-box;
    /* オーバーレイとして他 UI の下に隠れないよう、React 版 viewport と同じ最大付近の値 */
    position: relative;
    z-index: var(--snackbar-z-index, 2147483647);
  }

  .root {
    display: flex;
    align-items: center;
    gap: var(--spacing-small, 4px);
    max-inline-size: 400px;
    box-sizing: border-box;
    overflow: clip;

    background-color: var(--surface-success, #dff5ea);
    border-radius: var(--border-radius-medium, 6px);

    box-shadow:
      0px 8px 16px 0px var(--elevation-regular, rgba(0, 0, 0, 0.13)),
      0px 0px 6px 0px var(--elevation-semi-weak, rgba(0, 0, 0, 0.1));

    font-family: var(--typography-font-family, Arial, sans-serif);
    font-weight: 400;

    transition:
      opacity var(--snackbar-transition-duration, 200ms)
        cubic-bezier(0.4, 0, 0.2, 1),
      transform var(--snackbar-transition-duration, 200ms)
        cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* デスクトップ: 右からスライドイン／アウト（React 版 data-starting-style / data-ending-style に相当） */
  .root[data-starting-style] {
    opacity: 0;
    transform: translateX(100%);
  }

  .root[data-ending-style] {
    opacity: 0;
    transform: translateX(100%);
  }

  /* スマホ: 下からスライドイン／アウト */
  @media (max-width: 720px) {
    .root[data-starting-style] {
      opacity: 0;
      transform: translateY(100%);
    }

    .root[data-ending-style] {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .root {
      transition: none;
    }
  }

  .root.small {
    padding: var(--spacing-medium, 8px);
    /* 3行分: 14px × 1.5 × 3 + padding 16px（medium と同じ行ボックス・クランプ方針） */
    max-block-size: 79px;
  }

  .root.small .text {
    font-size: var(--font-scale-40, 14px);
    line-height: 150%;
    letter-spacing: 0.02em;
  }

  .root.medium {
    min-block-size: 56px;
    max-block-size: 87px;
    padding-block: var(--spacing-large, 12px);
    padding-inline-start: var(--spacing-large, 12px);
    padding-inline-end: var(--spacing-medium, 8px);
  }

  .root.medium .text {
    font-size: var(--font-scale-40, 14px);
    line-height: 150%;
    letter-spacing: 0.02em;
  }

  .text-area {
    display: flex;
    align-items: center;
    gap: var(--spacing-medium, 8px);
    flex: 1 0 0;
    min-inline-size: 0;
  }

  .root.small .text-area,
  .root.medium .text-area {
    align-self: stretch;
  }

  .icon {
    flex-shrink: 0;
    inline-size: 20px;
    block-size: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    flex: 1 0 0;
    min-inline-size: 0;
    margin: 0;
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
  }

  .root.small .text,
  .root.medium .text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
