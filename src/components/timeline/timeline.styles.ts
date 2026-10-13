import { css } from "lit";

export default css`
  /* ラッパー要素を描かないため、ホスト自身がアイテムを並べるコンテナになる */
  :host {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    /* 余白を子へ配る内部用プロパティ（--_ 始まりは公開 API ではない目印） */
    --_timeline-item-spacing: var(--spacing-x-large, 16px);
  }

  /* :host の display は [hidden] の既定スタイルより強いため、明示的に打ち消す */
  :host([hidden]) {
    display: none;
  }

  :host([item-spacing="loose"]) {
    --_timeline-item-spacing: var(--spacing-3x-large, 32px);
  }
`;
