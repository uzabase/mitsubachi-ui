import { css } from "lit";

/**
 * Dialog 共通スタイル
 *
 * Figma デザイントークン準拠。ブレイクポイント: 720px。
 */
export const dialogBaseStyles = css`
  :host {
    display: contents;
  }

  dialog {
    position: fixed;
    inset: 0;
    margin: 0;
    padding: 24px;
    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    outline: none;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.29);
  }

  .popup {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #fff;
    color: rgba(0, 0, 0, 0.84);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    box-shadow:
      0px 0px 10px 0px rgba(0, 0, 0, 0.1),
      0px 16px 32px 0px rgba(0, 0, 0, 0.13);
    max-block-size: calc(100dvh - 48px);
    overflow: hidden;
    inline-size: 100%;
  }

  .size-small {
    max-inline-size: 560px;
  }

  .size-medium {
    max-inline-size: 800px;
  }

  .size-large {
    max-inline-size: 1280px;
  }

  .header {
    flex-shrink: 0;
    padding-block-start: 24px;
    padding-block-end: 8px;
    padding-inline: 32px;
    border-block-end: 1px solid transparent;
  }

  .header.bordered {
    border-block-end-color: rgba(0, 0, 0, 0.1);
  }

  .title {
    margin: 0;
    font-size: 18px;
    font-weight: var(--font-weight-normal);
    line-height: 1.5;
    letter-spacing: 0.02em;
    color: rgba(0, 0, 0, 0.84);
  }

  .body {
    flex: 1 1 auto;
    min-block-size: 0;
    overflow: auto;
    padding-block: 16px;
    padding-inline: 32px;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0.02em;
    color: rgba(0, 0, 0, 0.84);
  }

  .footer {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding-block-start: 16px;
    padding-block-end: 24px;
    padding-inline: 32px;
    border-block-start: 1px solid transparent;
  }

  .footer.bordered {
    border-block-start-color: rgba(0, 0, 0, 0.1);
  }
`;

/**
 * Action Dialog: Phone では横余白あり、高さは広がらない
 */
export const actionDialogPhoneStyles = css`
  @media (max-width: 720px) {
    dialog {
      padding-inline: 16px;
    }

    .popup {
      max-block-size: min(80dvh, 560px);
    }
  }
`;

/**
 * Phone フルスクリーン（Form Dialog / Information Dialog medium・large）
 */
export const fullscreenPhoneStyles = css`
  @media (max-width: 720px) {
    dialog {
      padding: 0;
      align-items: stretch;
    }

    .popup {
      max-inline-size: none;
      max-block-size: none;
      inline-size: 100%;
      block-size: 100%;
      border-radius: 0;
      border-width: 0;
    }

    .header {
      padding-block-start: 16px;
      padding-inline: 16px;
    }

    .body {
      padding: 16px;
    }

    .footer {
      padding: 16px;
      border-block-start-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

/**
 * Information Dialog: Phone で size=small は boxed、medium/large は fullscreen
 */
export const informationDialogPhoneStyles = css`
  @media (max-width: 720px) {
    :host([size="small"]) dialog {
      padding-inline: 16px;
    }

    :host([size="small"]) .popup {
      max-block-size: min(80dvh, 560px);
    }

    :host(:not([size="small"])) dialog {
      padding: 0;
      align-items: stretch;
    }

    :host(:not([size="small"])) .popup {
      max-inline-size: none;
      max-block-size: none;
      inline-size: 100%;
      block-size: 100%;
      border-radius: 0;
      border-width: 0;
    }

    :host(:not([size="small"])) .header {
      padding-block-start: 16px;
      padding-inline: 16px;
    }

    :host(:not([size="small"])) .body {
      padding: 16px;
    }

    :host(:not([size="small"])) .footer {
      padding: 16px;
      border-block-start-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
