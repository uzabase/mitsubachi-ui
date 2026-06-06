import { css } from "lit";

export const inputChipStyles = css`
  :host {
    display: inline-block;
    max-width: 100%;
    min-width: 0;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    max-width: 100%;
    padding-inline-start: var(--spacing-large, 12px);
    padding-inline-end: var(--spacing-small, 4px);
    padding-block: 2px;
    min-block-size: 28px;
    border-radius: 9999px;
    background-color: #e8edff;
    box-sizing: border-box;
  }

  .label {
    font-size: 12px;
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: 0.12px;
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  @media (max-width: 720px) {
    .chip {
      min-block-size: 32px;
    }

    .label {
      font-size: var(--font-scale-40, 14px);
      letter-spacing: 0.14px;
    }
  }
`;
