import { css } from "lit";

export default css`
  :host {
    display: flex;
    gap: var(--spacing-small, 4px);
    align-items: stretch;
  }

  /* :host の display は [hidden] の既定スタイルより強いため、明示的に打ち消す */
  :host([hidden]) {
    display: none;
  }

  /* ドットと接続線を縦に並べる列。幅は Figma の 24px 固定 */
  .flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    inline-size: 24px;
    flex-shrink: 0;

    /* 上線が無いとき、ドットをコンテンツの 1 行目に合わせる */
    padding-block-start: 7px;
  }

  .top-line {
    inline-size: 1px;
    block-size: 7px;
    flex-shrink: 0;
    background-color: var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));

    /* 接続線は既定では出さない。親が位置を伝えてきたときだけ出す */
    display: none;
  }

  .dot {
    inline-size: 10px;
    block-size: 10px;
    border-radius: 9999px;
    flex-shrink: 0;
    background-color: var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));
  }

  :host([emphasized]) .dot {
    background-color: var(--object-emphasized, #315ce8);
  }

  .bottom-line {
    inline-size: 1px;
    flex-grow: 1;
    min-block-size: 1px;
    background-color: var(--border-semi-strong-default, rgba(0, 0, 0, 0.2));

    /* 接続線は既定では出さない。親が位置を伝えてきたときだけ出す */
    display: none;
  }

  .contents {
    flex: 1 0 0;
    min-inline-size: 0;
  }

  /*
   * 位置は親の mi-timeline が data-timeline-position で伝える（内部用の属性）。
   * 表示中のアイテムが 1 件だけのときは属性が付かず、接続線も余白も出ない。
   */
  :host([data-timeline-position="middle"]) .top-line,
  :host([data-timeline-position="last"]) .top-line {
    display: block;
  }

  :host([data-timeline-position="first"]) .bottom-line,
  :host([data-timeline-position="middle"]) .bottom-line {
    display: block;
  }

  /* 上線があるアイテムは、その 7px ぶんでドットの位置がそろう */
  :host([data-timeline-position="middle"]) .flow,
  :host([data-timeline-position="last"]) .flow {
    padding-block-start: 0;
  }

  /* 後ろに続くアイテムがあるときだけ、間隔ぶんの余白を空ける */
  :host([data-timeline-position="first"]) .contents,
  :host([data-timeline-position="middle"]) .contents {
    padding-block-end: var(
      --_timeline-item-spacing,
      var(--spacing-x-large, 16px)
    );
  }
`;
