import { css } from "lit";

/**
 * 複数の `mi-snackbar` を同じ画面上位置に縦積み（ギャップ付き）するための viewport。
 * React 版 snackbar viewport および Storybook `.snackbar-story-viewport` に準拠。
 */
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--snackbar-stack-gap, 16px);
    align-items: flex-end;
    position: fixed;
    z-index: var(--snackbar-z-index, 2147483647);
    box-sizing: border-box;
    pointer-events: none;
    inset-block-start: var(--snackbar-viewport-inset, 16px);
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: var(--snackbar-viewport-inset, 16px);
  }

  /* ギャップ部分はクリックを透過し、各通知だけ操作可能にする */
  :host ::slotted(.snackbar-mount),
  :host ::slotted(mi-snackbar) {
    pointer-events: auto;
  }

  /*
   * Lit 用ラッパー。display:contents だと兄弟削除時のレイアウト再計算が目立ちやすい。
   * 残りのスムーズさは View Transitions（ストーリー側）と mi-snackbar の退出アニメに寄せる。
   */
  :host ::slotted(.snackbar-mount) {
    display: block;
    flex-shrink: 0;
    align-self: flex-end;
    max-inline-size: 100%;
    overflow: visible;
  }

  @media (max-width: 720px) {
    :host {
      align-items: center;
      inset-block-start: auto;
      inset-inline-end: auto;
      inset-block-end: var(--spacing-large, 12px);
      inset-inline-start: 50%;
      transform: translateX(-50%);
    }

    :host ::slotted(.snackbar-mount) {
      align-self: center;
    }
  }
`;
