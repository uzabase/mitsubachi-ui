import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  /*
   * show-more 有効時は自身の高さに収まる分だけを見せる。
   * 高さの指定が無ければ block-size: 100% は auto に解決されるため、
   * 何も隠れずタグは全て表示される（= もっと見るボタンも出ない）。
   */
  :host([show-more]:not([data-expanded])) {
    block-size: 100%;
    overflow: hidden;
  }

  /*
   * 展開後は全てのタグが入るまで伸びる。
   * 利用側が指定した高さはインラインスタイルであることが多く、通常の指定では勝てないため
   * !important を使う（Shadow DOM 内の !important は外側の通常指定より強い）。
   */
  :host([show-more][data-expanded]) {
    block-size: auto !important;
    max-block-size: none !important;
    overflow: visible;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    /* タグ同士の間隔。Figma の実測値でサイズによらず一定 */
    gap: 4px;
    align-items: flex-start;
    align-content: flex-start;
  }

  /* 自身の高さに収まらず隠したタグ。外側のツリーからの指定なので mi-link-tag の :host より強い */
  ::slotted([data-mi-overflow]) {
    display: none;
  }

  /* Figma の More（node 5615:556）の値 */
  .more {
    flex-shrink: 0;
    padding-inline: 6px;
    padding-block: 1px;
    border: none;
    border-radius: 3px;
    background: none;
    color: var(--text-semi-weak-default, rgba(0, 0, 0, 0.68));
    font-size: 12px;
    line-height: 1.3;
    cursor: pointer;
  }

  .more:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--surface-regular-default, #fff),
      0 0 0 4px var(--focus-ring-default, #191919);
  }

  /* 全てのタグが収まっていて、もっと見るが不要なとき */
  .more.is-hidden {
    display: none;
  }
`;
