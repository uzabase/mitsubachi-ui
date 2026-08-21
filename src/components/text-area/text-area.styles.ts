import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 4px;

    /*
     * field-sizing: content は幅の intrinsic size も内容ベースにするため、
     * flex アイテムのように「内容に合わせて縮む」文脈では極端に細くなってしまう。
     * 既定でコンテナ幅に追従させる（利用側の幅指定はこれより優先される）。
     */
    inline-size: 100%;
  }

  .textarea {
    inline-size: 100%;
    box-sizing: border-box;

    /*
     * 入力量に応じて高さが伸びる。下限・上限は min/max-block-size で挟む。
     * 高さは「2行分の高さ（Figma 由来）＋ 超過分の行数 × 1行の高さ」で求める。
     *
     * field-sizing 未対応のブラウザではこの宣言が無視され、rows 属性による
     * 固定高さ（= 最小行数）になる。自動伸縮が効かないだけで表示は壊れない。
     */
    field-sizing: content;
    min-block-size: calc(
      var(--text-area-rows-2-block-size) + (var(--text-area-min-rows, 2) - 2) *
        var(--text-area-row-block-size)
    );
    background-color: var(--surface-regular-default, #fff);
    border: 1px solid var(--border-semi-strong-default, rgb(0 0 0 / 20%));
    border-radius: var(--radius-medium, 6px);
    color: var(--text-regular-default, rgb(0 0 0 / 84%));
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
    resize: vertical;

    &::placeholder {
      color: var(--text-weak-default, rgb(0 0 0 / 54%));
    }

    &:hover:not(:disabled, :focus-visible) {
      border-color: var(--border-semi-strong-hover, rgb(0 0 0 / 35%));
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--surface-regular-default, #fff),
        0 0 0 4px var(--focus-ring-default, #191919);
    }

    /* max-rows を指定したときだけ上限をかける（未指定なら伸び続ける） */
    &[data-has-max-rows] {
      max-block-size: calc(
        var(--text-area-rows-2-block-size) + (var(--text-area-max-rows) - 2) *
          var(--text-area-row-block-size)
      );
    }

    &.error {
      border-color: var(--border-error-default, #db351f);

      &:hover:not(:disabled, :focus-visible) {
        border-color: var(--border-error-hover, #b02412);
      }
    }

    &:disabled {
      background-color: var(--surface-regular-disabled, rgb(0 0 0 / 3%));
      border-color: var(--border-disabled, rgb(0 0 0 / 7%));
      color: var(--text-disabled, rgb(0 0 0 / 35%));
      resize: none;

      &::placeholder {
        color: var(--text-disabled, rgb(0 0 0 / 35%));
      }
    }
  }

  .textarea[data-size="medium"] {
    /* 58px = Figma の2行分。21px = font-size 14px × line-height 1.5 */
    --text-area-rows-2-block-size: 58px;
    --text-area-row-block-size: 21px;

    padding-block: 8px;
    padding-inline: 8px;
    font-size: 14px;
    letter-spacing: 0.28px;

    &::placeholder {
      letter-spacing: 0.14px;
    }
  }

  .textarea[data-size="large"] {
    /* 64px = Figma の2行分。24px = font-size 16px × line-height 1.5 */
    --text-area-rows-2-block-size: 64px;
    --text-area-row-block-size: 24px;

    padding-block: 8px;
    padding-inline: 12px;
    font-size: 16px;
    letter-spacing: 0.32px;

    &::placeholder {
      letter-spacing: 0.16px;
    }
  }

  .count {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2px;
    color: var(--text-regular-default, rgb(0 0 0 / 84%));
    font-size: 12px;
    letter-spacing: 0.12px;
    line-height: 1.5;
    white-space: nowrap;
  }

  .count.disabled {
    color: var(--text-disabled, rgb(0 0 0 / 35%));
  }

  .count-current.over {
    color: var(--text-negative, #c92812);
    font-weight: var(--font-weight-bold);
  }

  /* 視覚的には隠すが、スクリーンリーダーには読み上げさせる */
  .visually-hidden {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* スマートフォン幅ではフォントを 16px にし（iOS の自動ズーム回避）、リサイズハンドルを出さない */
  @media (width <= 720px) {
    .textarea {
      resize: none;
    }

    .textarea[data-size="medium"] {
      --text-area-rows-2-block-size: 64px;
      --text-area-row-block-size: 24px;

      font-size: 16px;
      letter-spacing: 0.32px;

      &::placeholder {
        letter-spacing: 0.16px;
      }
    }
  }
`;
