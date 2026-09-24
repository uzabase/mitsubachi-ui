import { css } from "lit";

export default css`
  :host {
    display: block;

    /*
     * 子の mi-timeline-item へアイテム間の余白を配るための内部用カスタムプロパティ。
     * 公開 API ではないため利用側から直接指定しないこと（--_ 始まりは内部用の目印）。
     */
    --_timeline-item-spacing: var(--spacing-x-large, 16px);
  }

  /* :host の display は [hidden] の既定スタイルより強いため、明示的に打ち消す */
  :host([hidden]) {
    display: none;
  }

  :host([item-spacing="loose"]) {
    --_timeline-item-spacing: var(--spacing-3x-large, 32px);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
