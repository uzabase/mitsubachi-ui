import { css } from "lit";

export default css`
  :host {
    display: inline-block;
    --color-primary-red-90: #f72a48;
    --color-semantic-surface-regular-default: #ffffff;
    --color-semantic-highlight-focus-ring-default: #191919;
  }

  .base {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 0 6px 2px #f72a481a;
  }

  .base::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 15deg,
      rgb(42, 42, 247) 5%,
      rgb(42, 42, 247) 20%,
      rgb(71, 212, 255) 40%,
      rgb(255, 46, 213) 60%,
      rgb(247, 42, 72) 80%,
      rgb(247, 42, 72) 95%,
      rgb(42, 42, 247) 100%
    );
    z-index: 0;
    transition: transform 0s;
  }

  .base::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 50%;
    background: white;
    z-index: 1;
  }

  .base:hover::before {
    transform: rotate(1turn);
    transition: transform 0.6s ease-in-out;
  }

  .base:active::after {
    inset: 2px;
  }

  .base:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-semantic-surface-regular-default),
      0 0 0 4px var(--color-semantic-highlight-focus-ring-default);
  }

  .icon {
    position: relative;
    z-index: 2;
    display: flex;
    font-size: 25px;
    fill: var(--color-primary-red-90);
  }

  .loading {
    position: relative;
    z-index: 2;
    display: flex;
    font-size: 25px;
    fill: var(--color-primary-red-90);
  }
`;
