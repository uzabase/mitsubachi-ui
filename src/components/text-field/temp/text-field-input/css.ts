import { css } from "lit";

export const styles = css`
  .ub-account-text-field-input {
    width: 100%;
    box-sizing: border-box;
    min-height: 48px;
    background: var(--ui-semantic-surface-regular-1);
    border: 1px solid var(--ui-semantic-border-semi-strong);
    border-radius: var(--radius-medium);
    padding: var(--spacing-10) var(--spacing-30);

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    &::placeholder {
      color: var(--ui-semantic-text-placeholder);
    }

    &[disabled] {
      color: var(--ui-semantic-text-semi-weak);
      background-color: var(--ui-semantic-surface-disabled);
      border-color: var(--border-disabled);

      &::placeholder {
        color: var(--ui-semantic-text-disabled);
      }

      &:hover {
        border-color: var(--border-disabled);
      }
    }

    &:hover {
      border-color: var(--ui-semantic-border-semi-strong-hover);

      &.error {
        border-color: var(--ui-semantic-border-error);
      }
    }

    &:focus-visible {
      outline: canvastext solid 3px;
      box-shadow: 0px 0px 0px 2px #ffffff, 0px 0px 0px 4px #282828;
      outline-offset: 1px;

      &.error {
        border-color: var(--ui-semantic-border-error);
      }
    }

    &.error {
      border-color: var(--ui-semantic-border-error);
    }
  }
`;
