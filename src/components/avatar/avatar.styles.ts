import { css } from "lit";

export const avatarStyles = css`
  :host {
    display: inline-block;
    --palette-plum: #910091;
    --palette-violet: #3e31d5;
    --palette-blue: #214dde;
    --palette-viridian: #0d8282;
    --palette-green: #008744;
    --palette-brown: #ae6022;
    --palette-red: #d30030;
  }

  .base {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgb(0 0 0 / 5%);
    color: rgb(0 0 0 / 84%);
    font-weight: var(--font-weight-bold);
    position: relative;
  }

  .inactive {
    filter: grayscale(100%);
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: rgb(0 0 0 / 84%);
  }

  sp-icon {
    fill: currentcolor;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .size-small {
    width: 24px;
    height: 24px;

    .initials {
      font-size: 10px;
    }

    sp-icon {
      font-size: 15.625px; /* 20px / 1.28 */
    }
  }

  .size-medium {
    width: 32px;
    height: 32px;

    .initials {
      font-size: 12px;
    }

    sp-icon {
      font-size: 18.75px; /* 24px / 1.28 */
    }
  }

  .size-large {
    width: 40px;
    height: 40px;

    .initials {
      font-size: 14px;
    }

    sp-icon {
      font-size: 25px; /* 32px / 1.28 */
    }
  }

  .size-x-large {
    width: 80px;
    height: 80px;

    .initials {
      font-size: 32px;
    }

    sp-icon {
      font-size: 50px; /* 64px / 1.28 */
    }
  }

  .size-2x-large {
    width: 96px;
    height: 96px;

    .initials {
      font-size: 40px;
    }

    sp-icon {
      font-size: 62.5px; /* 80px / 1.28 */
    }
  }

  /* カラーバリエーション */
  .color-plum {
    background-color: var(--palette-plum);
    color: #fff;
  }

  .color-violet {
    background-color: var(--palette-violet);
    color: #fff;
  }

  .color-blue {
    background-color: var(--palette-blue);
    color: #fff;
  }

  .color-viridian {
    background-color: var(--palette-viridian);
    color: #fff;
  }

  .color-green {
    background-color: var(--palette-green);
    color: #fff;
  }

  .color-brown {
    background-color: var(--palette-brown);
    color: #fff;
  }

  .color-red {
    background-color: var(--palette-red);
    color: #fff;
  }

  [class*="color-"] {
    &.inactive {
      background-color: #ededed;
      color: rgb(0 0 0 / 35%);
    }
  }
`;
