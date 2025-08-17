import { css } from "lit";

export const spButtonLitStyles = css`
  :host {
    display: inline-block;
  }

  .base {
    display: inline-block;
    width: 100%;
    flex-basis: 100%;
    padding-block: 2px;
    border: 1px solid transparent;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
    text-align: center;
  }

  .base:disabled {
    cursor: not-allowed;
  }

  .base:focus-visible {
    box-shadow:
      0 0 0 2px #fff,
      0 0 0 4px #191919;
  }

  .text {
    line-height: 1.5;
    letter-spacing: 0.02em;
  }

  .medium {
    --loading-size: 16px;
    min-height: 32px;
    padding-inline: 12px;
  }

  .medium .text {
    font-size: 12px;
  }

  .large {
    --loading-size: 19px;
    min-height: 40px;
    padding-inline: 16px;
  }

  .large .text {
    font-size: 14px;
  }

  .x-large {
    --loading-size: 22px;
    min-height: 48px;
    padding-inline: 16px;
  }

  .x-large .text {
    font-size: 16px;
  }

  .loading::before {
    content: "";
    display: block;
    border: 2px solid #282828;
    border-bottom-color: #ededed;
    border-radius: 50%;
    animation: 1s linear infinite loading;
    transform-origin: center center;
    width: var(--loading-size);
    height: var(--loading-size);
    z-index: 2;
    position: absolute;
    left: calc(50% - var(--loading-size) / 2);
    top: calc(50% - var(--loading-size) / 2);
  }

  .loading .text {
    visibility: hidden;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .normal.primary {
    background-color: rgb(0 0 0 / 84%);
  }

  .normal.primary .text {
    color: #fff;
  }

  .normal.primary:hover {
    background-color: rgb(0 0 0 / 90%);
  }

  .normal.primary:active {
    background-color: #000;
  }

  .normal.secondary {
    border-color: rgb(0 0 0 / 84%);
  }

  .normal.secondary .text {
    color: rgb(0 0 0 / 84%);
  }

  .normal.secondary:hover {
    background-color: rgb(0 0 0 / 4%);
  }

  .normal.secondary:active {
    background-color: rgb(0 0 0 / 7%);
  }

  .normal.tertiary {
    border-color: rgb(0 0 0 / 29%);
  }

  .normal.tertiary .text {
    color: rgb(0 0 0 / 84%);
  }

  .normal.tertiary:hover {
    background-color: rgb(0 0 0 / 4%);
  }

  .normal.tertiary:active {
    background-color: rgb(0 0 0 / 7%);
  }

  .danger.primary {
    background-color: #db351f;
  }

  .danger.primary .text {
    color: #fff;
  }

  .danger.primary:hover {
    background-color: #c92812;
  }

  .danger.primary:active {
    background-color: #b02412;
  }

  .danger.secondary {
    border-color: #db351f;
  }

  .danger.secondary .text {
    color: #c92812;
  }

  .danger.secondary:hover {
    background-color: #fff4f2;
  }

  .danger.secondary:active {
    background-color: #ffedeb;
  }

  .danger.tertiary {
    border-color: #db351f;
  }

  .danger.tertiary .text {
    color: #c92812;
  }

  .danger.tertiary:hover {
    background-color: #fff4f2;
  }

  .danger.tertiary:active {
    background-color: #ffedeb;
  }

  .normal.secondary .text,
  .danger.secondary .text {
    font-weight: var(--font-weight-bold, bold);
  }

  .normal.primary .text,
  .danger.primary .text {
    font-weight: var(--font-weight-bold, bold);
  }

  .normal.primary:disabled,
  .danger.primary:disabled {
    background-color: rgb(0 0 0 / 5%);
    border-color: transparent;
  }

  .normal.primary:disabled .text,
  .danger.primary:disabled .text {
    color: rgb(0 0 0 / 35%);
  }

  .normal.primary:disabled:hover,
  .danger.primary:disabled:hover {
    background-color: rgb(0 0 0 / 5%);
    border-color: transparent;
  }

  .normal.secondary:disabled,
  .normal.tertiary:disabled,
  .danger.secondary:disabled,
  .danger.tertiary:disabled {
    background-color: transparent;
    border-color: rgb(0 0 0 / 10%);
  }

  .normal.secondary:disabled .text,
  .normal.tertiary:disabled .text,
  .danger.secondary:disabled .text,
  .danger.tertiary:disabled .text {
    color: rgb(0 0 0 / 35%);
  }

  .normal.secondary:disabled:hover,
  .normal.tertiary:disabled:hover,
  .danger.secondary:disabled:hover,
  .danger.tertiary:disabled:hover {
    background-color: transparent;
    border-color: rgb(0 0 0 / 10%);
  }
`;
