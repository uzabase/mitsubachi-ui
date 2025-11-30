import { css } from "lit";

export default css`
  :host {
    display: inline-block;

    --color-semantic-text-regular: #000000d6;
    --color-semantic-surface-regular-default: #ffffff;
    --color-semantic-border-semi-strong-default: #0000004a;
    --color-semantic-border-checked-default: #3f69f2;
    --color-semantic-highlight-focus-ring-default: #191919;
    --color-semantic-border-disabled: #00000012;
    --color-semantic-text-disabled: #00000059;
    --color-semantic-surface-disabled: #0000000d;
    --color-semantic-surface-button-secondary-hover: #0000000a;
    --color-semantic-border-checked-hover: #315ce8;
    --color-semantic-surface-checked-hover: #315ce8;
    --color-semantic-surface-button-secondary-active: #00000012;
    --color-semantic-border-checked-active: #214dde;
    --color-semantic-surface-checked-active: #214dde;
  }

  .base {
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
  }

  .input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  .radio {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    display: inline-flex;
    padding-block: 4px;
    padding-inline: 4px;
    cursor: pointer;
  }

  .radio::before {
    content: "";
    width: 16px;
    height: 16px;
    background-color: var(--color-semantic-surface-regular-default);
    border: 1px solid #cbcbcb;
    border-radius: 50%;
  }

  .text {
    color: var(--color-semantic-text-regular);
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.02em;
    padding-block: 3px;
    padding-inline: 4px;
    cursor: pointer;
  }

  .input:checked + .radio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: var(--color-semantic-border-checked-default);
    border-radius: 50%;
  }

  .input:checked + .radio::before {
    background-color: var(--color-semantic-surface-regular-default);
    border-color: var(--color-semantic-border-checked-default);
    border-width: 1.5px;
  }

  :host([disabled]) .text {
    color: var(--color-semantic-text-disabled);
  }

  :host([disabled]) .radio::before {
    border: 1px solid var(--color-semantic-border-disabled);
  }

  :host([disabled]) :is(.input, .radio, .text) {
    cursor: not-allowed;
  }

  :host([disabled]) .input:checked + .radio::after {
    background-color: var(--color-semantic-surface-disabled);
  }

  :host(:not([disabled])) .input:focus-visible + .radio::before {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-semantic-surface-regular-default),
      0 0 0 4px var(--color-semantic-highlight-focus-ring-default);
  }

  :host(:not([disabled])) .base:hover .radio::before {
    outline: 3px solid var(--color-semantic-surface-button-secondary-hover);
  }

  :host(:not([disabled])) .base:hover .input:checked + .radio::before {
    border-color: var(--color-semantic-border-checked-hover);
  }

  :host(:not([disabled])) .base:hover .input:checked + .radio::after {
    background-color: var(--color-semantic-surface-checked-hover);
  }

  :host(:not([disabled])) .base:active .radio::before {
    outline: 3px solid var(--color-semantic-surface-button-secondary-active);
  }

  :host(:not([disabled])) .base:active .input:checked + .radio::before {
    border-color: var(--color-semantic-border-checked-active);
  }

  :host(:not([disabled])) .base:active .input:checked + .radio::after {
    background-color: var(--color-semantic-surface-checked-active);
  }
`;
