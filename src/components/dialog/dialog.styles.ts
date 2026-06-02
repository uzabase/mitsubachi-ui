import { css, unsafeCSS } from "lit";

import backdropStyle from "./dialog-backdrop.css?inline";

/**
 * Dialog 共通スタイル
 *
 * Figma デザイントークン（Base Component Speeda）を参照。
 * ブレイクポイント: 720px
 * React版（dialog.module.css）に準拠。
 */

export const dialogStyles = [
  unsafeCSS(backdropStyle),
  css`
    /* ========== Dialog ルート ========== */
    .dialog-root {
      border: none;
      padding: 0;
      margin: 0;
      background: transparent;
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    /* ========== Viewport ========== */
    /* React: position: fixed; inset: 0; padding: 24px; z-index: 2147483647 */
    .viewport {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-2x-large, 24px);
      z-index: 2147483647;
      box-sizing: border-box;
    }

    /* ========== Popup (共通) ========== */
    .popup {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      background: var(--zabuton-regular, #ffffff);
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
      border: 1px solid var(--border-regular-default, rgba(0, 0, 0, 0.1));
      border-radius: var(--border-radius-x-large, 12px);
      box-shadow:
        0px 1px 2px 0px var(--neutral-neutral-50-alpha, rgba(0, 0, 0, 0.29)),
        0px 8px 12px 3px var(--neutral-neutral-30-alpha, rgba(0, 0, 0, 0.13));
      max-block-size: calc(100dvh - 48px);
      overflow: hidden;
    }

    /* ========== Size: small (560px) ========== */
    .popup.size-small {
      inline-size: 100%;
      max-inline-size: var(--dialog-size-small, 560px);
    }

    /* ========== Size: medium (800px) ========== */
    .popup.size-medium {
      inline-size: 100%;
      max-inline-size: var(--dialog-size-medium, 800px);
    }

    /* ========== Size: large (1280px, Form Dialog) ========== */
    .popup.size-large {
      inline-size: 100%;
      max-inline-size: var(--dialog-size-large, 1280px);
    }

    /* ========== Form Dialog: Desktop padding (Figma: 32px horizontal, header pt 24px, footer pb 24px) ========== */
    .popup[data-variant="form"] .header {
      padding-inline: var(--dialog-form-padding-inline, 32px);
      padding-block-start: var(--spacing-2x-large, 24px);
    }

    .popup[data-variant="form"] .body {
      padding-inline: var(--dialog-form-padding-inline, 32px);
    }

    .popup[data-variant="form"] .footer {
      padding-inline: var(--dialog-form-padding-inline, 32px);
      padding-block-end: var(--spacing-2x-large, 24px);
    }

    /* ========== Header ========== */
    .header {
      flex-shrink: 0;
      padding-block-start: var(--spacing-x-large, 16px);
      padding-block-end: var(--spacing-medium, 8px);
      padding-inline: var(--spacing-2x-large, 24px);
      border-block-end: 1px solid transparent;
      transition: border-block-end-color 0s ease;
    }

    .header:has(+ .body[data-scrolled-from-top="true"]) {
      border-block-end-color: var(--border-regular-default, rgba(0, 0, 0, 0.1));
    }

    .title {
      margin: 0;
      font-family: var(--typography-font-family, Arial, sans-serif);
      font-weight: var(--typography-font-weight-regular, 400);
      font-size: var(--typography-font-size-font-scale-60, 18px);
      line-height: 1.5;
      letter-spacing: 0.02em;
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    }

    /* ========== Body ========== */
    .body {
      flex: 1 1 auto;
      min-block-size: 0;
      overflow: auto;
      padding-block: var(--spacing-x-large, 16px);
      padding-inline: var(--spacing-2x-large, 24px);
      font-family: var(--typography-font-family, Arial, sans-serif);
      font-size: var(--typography-font-size-font-scale-40, 14px);
      line-height: 1.5;
      letter-spacing: 0.02em;
      color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    }

    .body[data-scrolled-from-bottom="true"] + .footer {
      border-block-start-color: var(
        --border-regular-default,
        rgba(0, 0, 0, 0.1)
      );
    }

    /* ========== Footer ========== */
    .footer {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-medium, 8px);
      padding-block-start: var(--spacing-x-large, 16px);
      padding-block-end: var(--spacing-x-large, 16px);
      padding-inline-start: var(--spacing-x-large, 16px);
      padding-inline-end: var(--spacing-2x-large, 24px);
      border-block-start: 1px solid transparent;
      transition: border-block-start-color 0s ease;
    }

    /* ========== Phone (max-width: 720px) ========== */
    @media (max-width: 720px) {
      /* Action Dialog */
      .viewport[data-variant="action"] {
        padding-inline: var(--spacing-x-large, 16px);
      }

      .popup[data-variant="action"] {
        max-block-size: min(80dvh, 560px);
      }

      /* Form Dialog (fullscreen) */
      .viewport[data-variant="form"] {
        padding: 0;
        align-items: stretch;
      }

      .popup[data-variant="form"] {
        max-inline-size: none;
        max-block-size: none;
        inline-size: 100%;
        block-size: 100%;
        border-radius: 0;
        border-width: 0;
      }

      .popup[data-variant="form"] .header {
        align-items: center;
        padding-inline: var(--spacing-x-large, 16px);
      }

      .popup[data-variant="form"] .body {
        padding: var(--spacing-x-large, 16px);
      }

      .popup[data-variant="form"] .footer {
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        gap: var(--spacing-medium, 8px);
        padding: var(--spacing-x-large, 16px);
        border-block-start: 1px solid
          var(--border-regular-default, rgba(0, 0, 0, 0.1));
      }

      .popup[data-variant="form"] .footer .footer-action {
        inline-size: 100%;
      }

      /* Information Dialog medium (fullscreen) */
      .viewport[data-variant="information"][data-size="medium"] {
        padding: 0;
        align-items: stretch;
      }

      .popup[data-variant="information"].size-medium {
        max-inline-size: none;
        max-block-size: none;
        inline-size: 100%;
        block-size: 100%;
        border-radius: 0;
        border-width: 0;
      }

      /* Information Dialog small (modal style) */
      .viewport[data-variant="information"][data-size="small"] {
        padding-inline: var(--spacing-x-large, 16px);
      }

      .popup[data-variant="information"].size-small {
        max-inline-size: var(--dialog-size-small, 560px);
      }

      .popup[data-variant="information"].size-small .header {
        align-items: center;
      }

      .popup[data-variant="information"].size-small .body {
        font-size: var(--typography-font-size-font-scale-50, 16px);
      }

      .popup[data-variant="information"].size-small .footer {
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: var(--spacing-x-large, 16px);
      }
    }
  `,
];
