import { css } from "lit";

export const iconButtonStyles = css`
  :host {
    display: inline-block;
  }

  .base {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid var(--border-color, transparent);
    background-color: var(--background-color, transparent);
    color: var(--color, inherit);
    cursor: pointer;
    position: relative;

    &:focus-visible {
      box-shadow:
        0 0 0 2px #fff,
        0 0 0 4px #191919;
      outline: none;
    }

    &:hover {
      background-color: var(--background-color-hover, transparent);
    }

    &:active {
      background-color: var(--background-color-active, transparent);
    }

    &:disabled,
    &.loading {
      cursor: not-allowed;
      background-color: var(--background-color-disabled, transparent);
      border-color: var(--border-color-disabled, transparent);
      color: var(--color-disabled, rgb(0 0 0 / 35%));

      &:hover {
        background-color: var(--background-color-disabled, transparent);
      }
    }
  }

  .icon {
    fill: currentcolor;
    display: block;
  }

  /* サイズ */
  .small {
    width: 24px;
    height: 24px;
    padding: 2px;

    .icon {
      width: 18px;
      height: 18px;
    }
  }

  .medium {
    width: 32px;
    height: 32px;
    padding: 4px;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .large {
    width: 40px;
    height: 40px;
    padding: 4px;

    .icon {
      width: 22px;
      height: 22px;
    }
  }

  /* バリアント */
  .primary {
    --border-color: transparent;
    --background-color: #282828;
    --background-color-hover: #191919;
    --background-color-active: #000;
    --border-color-disabled: transparent;
    --background-color-disabled: rgb(0 0 0 / 7%);
    --color: #fff;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .secondary {
    --border-color: rgb(0 0 0 / 84%);
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 7%);
    --background-color-active: rgb(0 0 0 / 10%);
    --border-color-disabled: rgb(0 0 0 / 7%);
    --background-color-disabled: transparent;
    --color: rgb(0 0 0 / 84%);
    --color-disabled: rgb(0 0 0 / 35%);

    &.selected {
      --border-color: #3f69f2;
      --background-color: #e8edff;
      --background-color-hover: #dbe4ff;
      --background-color-active: #d5dfff;
      --background-color-disabled: rgb(0 0 0 / 7%);
      --border-color-disabled: rgb(0 0 0 / 7%);
    }
  }

  .tertiary {
    --border-color: rgb(0 0 0 / 20%);
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 7%);
    --background-color-active: rgb(0 0 0 / 10%);
    --border-color-disabled: rgb(0 0 0 / 7%);
    --background-color-disabled: transparent;
    --color: rgb(0 0 0 / 84%);
    --color-disabled: rgb(0 0 0 / 35%);

    &.selected {
      --border-color: rgb(0 0 0 / 10%);
      --background-color: #e8edff;
      --background-color-hover: #dbe4ff;
      --background-color-active: #d5dfff;
      --background-color-disabled: rgb(0 0 0 / 7%);
      --border-color-disabled: rgb(0 0 0 / 7%);
    }
  }

  .ghost {
    --border-color: transparent;
    --background-color: transparent;
    --background-color-hover: rgb(0 0 0 / 7%);
    --background-color-active: rgb(0 0 0 / 10%);
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color: rgb(0 0 0 / 84%);
    --color-disabled: rgb(0 0 0 / 35%);

    &.selected {
      --background-color: #e8edff;
      --background-color-hover: #dbe4ff;
      --background-color-active: #d5dfff;
    }
  }
`;
