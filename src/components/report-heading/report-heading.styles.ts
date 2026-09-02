import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  /*
   * 見出しテキストとアクションを横並びにするための行。
   * フレックスコンテナを見出し要素（h1〜h6）の外側に置くことで、
   * 見出し要素の中身をテキストだけに保つ（見出しロールは内容から
   * アクセシブルネームを算出するため、アクションのラベルが混ざるのを防ぐ）。
   * コンポーネント自体は上下の余白を持たない（周囲との余白はレイアウト側の責務）。
   */
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  /* 見出し要素。テキスト（と level 3 の装飾バー）だけを含む */
  .heading {
    display: flex;
    flex: 1 0 0;
    align-items: center;

    /* 長いテキストでもコンテナ幅を超えて広がらないようにする */
    min-inline-size: 0;
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
  }

  /*
   * foundation.css が Shadow DOM 内の全要素（<slot> を含む）に font-weight を
   * 指定しているため、継承を明示しないと slot 越しに配置された見出しテキストが
   * 見出しの太さを引き継がない。
   */
  .heading .text {
    font-weight: inherit;
  }

  /*
   * Figma の action-slot（node I9494:1629;9494:1559）に合わせる。
   * overflow: clip は入れていない。中に入るボタンのフォーカスリングが
   * 要素の外側まで広がるため、切り取られるのを避けている。
   */
  .action {
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;
    gap: 8px;
  }

  /* ==============================
     レベル別のタイポグラフィ
     ============================== */

  .row[data-appearance-level="1"] .heading {
    font-size: 32px;
    font-weight: var(--font-weight-normal);
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .row[data-appearance-level="2"] .heading {
    font-size: 25px;
    font-weight: var(--font-weight-bold);
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .row[data-appearance-level="3"] .heading {
    font-size: 20px;
    font-weight: var(--font-weight-bold);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .row[data-appearance-level="4"] .heading {
    font-size: 18px;
    font-weight: var(--font-weight-bold);
    line-height: 1.5;
    letter-spacing: 0.01em;
  }

  .row[data-appearance-level="5"] .heading {
    font-size: 16px;
    font-weight: var(--font-weight-bold);
    line-height: 1.5;
    letter-spacing: 0.01em;
  }

  .row[data-appearance-level="6"] .heading {
    color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
    font-size: 16px;
    font-weight: var(--font-weight-bold);
    line-height: 1.5;
    letter-spacing: 0.01em;
  }

  /* ==============================
     レベル2の下線
     行全体（アクション領域も含む）に引くため .row 側に指定する
     ============================== */

  .row[data-appearance-level="2"] {
    border-block-end: 1px solid
      var(--border-regular-default, rgba(0, 0, 0, 0.1));
    padding-block-end: 8px;
  }

  /* ==============================
     レベル3の左バー
     ============================== */

  .row[data-appearance-level="3"] .heading {
    gap: 8px;
  }

  .bar {
    flex: none;
    align-self: stretch;
    inline-size: 2px;
    background-color: var(--palette-regular-red, #f72a48);
  }

  /* ==============================
     スマートフォン（720px 以下）
     変わるのは level 1 と 6 だけ
     ============================== */

  @media (max-width: 720px) {
    .row[data-appearance-level="1"] .heading {
      font-size: 25px;
      font-weight: var(--font-weight-bold);
      line-height: 1.3;
      letter-spacing: -0.02em;
    }

    .row[data-appearance-level="6"] .heading {
      font-size: 14px;
      font-weight: var(--font-weight-bold);
      line-height: 1.5;
      letter-spacing: 0.01em;
    }
  }
`;
