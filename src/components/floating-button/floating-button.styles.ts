import { css } from "lit";

export default css`
  :host {
    --color-primary-red-90: #f72a48;
  }

  .base {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
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
    transition: transform 0.6s ease-in-out;
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
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .icon {
    position: relative;
    z-index: 2;
    display: flex;
    font-size: 25px;
    fill: var(--color-primary-red-90);
  }
`;
