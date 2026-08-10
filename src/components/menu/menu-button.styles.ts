import { css } from "lit";

export const menuButtonStyles = css`
  :host {
    display: inline-block;
  }

  .primary {
    --border-color: transparent;
    --background-color: rgb(0 0 0 / 84%);
    --background-color-hover: rgb(0 0 0 / 90%);
    --background-color-active: #000;
    --color: #fff;
    --border-color-disabled: transparent;
    --background-color-disabled: rgb(0 0 0 / 5%);
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .secondary {
    --border-color: rgb(0 0 0 / 84%);
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 4%);
    --background-color-active: rgb(0 0 0 / 7%);
    --color: rgb(0 0 0 / 84%);
    --border-color-disabled: rgb(0 0 0 / 10%);
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .ghost {
    --border-color: transparent;
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 4%);
    --background-color-active: rgb(0 0 0 / 7%);
    --color: rgb(0 0 0 / 84%);
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .base {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: 100%;
    flex-basis: 100%;
    padding-block: 2px;
    border: 1px solid var(--border-color);
    border-radius: 9999px;
    background-color: var(--background-color);
    color: var(--color);
    cursor: pointer;
    box-sizing: border-box;
    font: inherit;

    &:focus-visible {
      box-shadow:
        0 0 0 2px #fff,
        0 0 0 4px #191919;
      outline: none;
    }

    &:hover {
      background-color: var(--background-color-hover);
    }

    &:active {
      background-color: var(--background-color-active);
    }

    &:disabled {
      border-color: var(--border-color-disabled);
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      cursor: not-allowed;

      &:hover {
        border-color: var(--border-color-disabled);
        background-color: var(--background-color-disabled);
      }

      &.loading {
        color: rgb(0 0 0 / 84%);
      }
    }
  }

  .medium {
    min-height: 32px;
    padding-inline-start: 12px;
    padding-inline-end: 8px;
    font-size: 12px;

    & .icon,
    & .chevron {
      width: 18px;
      height: 18px;
    }
  }

  .large {
    min-height: 40px;
    padding-inline-start: 16px;
    padding-inline-end: 12px;
    font-size: 14px;

    & .icon,
    & .chevron {
      width: 20px;
      height: 20px;
    }
  }

  .x-large {
    min-height: 48px;
    padding-inline-start: 16px;
    padding-inline-end: 12px;
    font-size: 16px;

    & .icon,
    & .chevron {
      width: 22px;
      height: 22px;
    }
  }

  .icon {
    fill: currentColor;
  }

  .chevron {
    fill: currentColor;
  }

  .text {
    line-height: 1.5;
    letter-spacing: 0.02em;

    &:is(.primary *, .secondary *) {
      font-weight: var(--font-weight-bold);
    }
  }
`;
