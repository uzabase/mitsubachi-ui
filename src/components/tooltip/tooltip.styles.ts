import { css } from "lit";

export const tooltipStyles = css`
  :host {
    display: inline-block;
  }

  .tooltip {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    max-width: 200px;
    padding: 4px 8px;
    background-color: #282828;
    border-radius: 4px;
    box-shadow:
      0 8px 16px 0 rgb(0 0 0 / 13%),
      0 0 6px 0 rgb(0 0 0 / 10%),
      inset 0 0 1px 0 rgb(255 255 255 / 0%);
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.24px;
    line-height: 1.3;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.2s ease-out;

    @starting-style {
      opacity: 0;
    }
  }
`;
