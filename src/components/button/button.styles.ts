import { css } from "lit";

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  .normal {
    &.primary {
      --border-color: transparent;
      --background-color: rgb(0 0 0 / 84%);
      --background-color-hover: rgb(0 0 0 / 90%);
      --background-color-active: #000;
      --color: #fff;
    }

    &.secondary {
      --border-color: rgb(0 0 0 / 84%);
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);

      &.selected {
        --border-color: #3f69f2;
        --background-color: #e8edff;
        --background-color-hover: #dbe4ff;
        --background-color-active: #d5dfff;
        --color: #315ce8;
      }
    }

    &.tertiary {
      --border-color: rgb(0 0 0 / 29%);
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);

      &.selected {
        --border-color: rgb(0 0 0 / 20%);
        --background-color: #e8edff;
        --background-color-hover: #dbe4ff;
        --background-color-active: #d5dfff;
      }
    }

    &.ghost {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);

      &.selected {
        --background-color: #e8edff;
        --background-color-hover: #dbe4ff;
        --background-color-active: #d5dfff;
      }
    }

    &.plane {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: rgb(49 92 232 / 8%);
      --background-color-active: rgb(49 92 232 / 12%);
      --color: #315ce8;

      &:focus-visible {
        box-shadow:
          0 0 0 2px #fff,
          0 0 0 4px #191919;
        outline: none;
      }

      &.medium {
        padding-inline: 4px;
        padding-block: 0;
        min-height: auto;
      }

      &.large {
        padding-inline: 4px;
        min-height: auto;
      }

      &.x-large {
        padding-inline: 4px;
        min-height: auto;
      }
    }
  }

  .danger {
    &.primary {
      --border-color: transparent;
      --background-color: #db351f;
      --background-color-hover: #c92812;
      --background-color-active: #b02412;
      --color: #fff;
    }

    &.secondary {
      --border-color: #db351f;
      --background-color: transparent;
      --background-color-hover: #fff4f2;
      --background-color-active: #ffedeb;
      --color: #c92812;
    }

    &.tertiary {
      --border-color: #db351f;
      --background-color: transparent;
      --background-color-hover: #fff4f2;
      --background-color-active: #ffedeb;
      --color: #c92812;
    }

    &.ghost {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: #fff4f2;
      --background-color-active: #ffedeb;
      --color: #c92812;
    }

    /* .selected は danger テーマでは非サポート */
  }

  .ai {
    &.primary {
      --angle: 0deg;

      border: 1px solid transparent;
      background:
        linear-gradient(white, white) padding-box padding-box,
        conic-gradient(
            from var(--angle) at 50% 50%,
            #2a2af7 5%,
            #2a2af7 22%,
            #47d4ff 30%,
            #ff2ed5 73%,
            #f72a48 80%,
            #f72a48 84%,
            #2a2af7 100%
          )
          border-box border-box white;
      transition: --angle 0.5s;

      &:hover {
        --angle: 360deg;
      }

      &:disabled {
        border: 1px solid rgb(0 0 0 / 7%);
        background: transparent;
        color: rgb(0 0 0 / 35%);
        cursor: not-allowed;

        &:hover {
          border: 1px solid rgb(0 0 0 / 7%);
          background: transparent;
        }

        &.loading {
          border: 1px solid transparent;
          background:
            linear-gradient(white, white) padding-box padding-box,
            conic-gradient(
                from var(--angle) at 50% 50%,
                #2a2af7 5%,
                #2a2af7 22%,
                #47d4ff 30%,
                #ff2ed5 73%,
                #f72a48 80%,
                #f72a48 84%,
                #2a2af7 100%
              )
              border-box border-box white;
        }
      }
    }

    &.secondary {
      --border-color: rgb(0 0 0 / 84%);
      --background-color: transparent;
      --background-color-hover: rgb(0 0 0 / 4%);
      --background-color-active: rgb(0 0 0 / 7%);
      --color: rgb(0 0 0 / 84%);
    }

    &.tertiary {
      --border-color: #7c3aed;
      --background-color: transparent;
      --background-color-hover: #ede9fe;
      --background-color-active: #ddd6fe;
      --color: #6d28d9;
    }

    &.ghost {
      --border-color: transparent;
      --background-color: transparent;
      --background-color-hover: #ede9fe;
      --background-color-active: #ddd6fe;
      --color: #6d28d9;
    }

    /* .selected は ai テーマでは非サポート */
  }

  .primary {
    --border-color-disabled: transparent;
    --background-color-disabled: rgb(0 0 0 / 5%);
    --color-disabled: rgb(0 0 0 / 35%);
  }

  :is(.secondary, .tertiary) {
    --border-color-disabled: rgb(0 0 0 / 10%);
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .ghost {
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .plane {
    --border-color-disabled: transparent;
    --background-color-disabled: transparent;
    --color-disabled: rgb(0 0 0 / 35%);
  }

  .base {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 100%;
    flex-basis: 100%;
    padding-block: 2px;
    border: 1px solid var(--border-color);
    border-radius: 9999px;
    background-color: var(--background-color);
    color: var(--color);
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    text-decoration: none;
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

    &:disabled,
    &[aria-disabled="true"] {
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
    padding-inline: 12px;
    font-size: 12px;
  }

  .large {
    min-height: 40px;
    padding-inline: 16px;
    font-size: 14px;
  }

  .x-large {
    min-height: 48px;
    padding-inline: 16px;
    font-size: 16px;
  }

  .icon {
    fill: currentcolor;
  }

  .text {
    line-height: 1.5;
    letter-spacing: 0.02em;

    &:is(.primary *, .secondary *) {
      font-weight: var(--font-weight-bold);
    }
  }
`;
