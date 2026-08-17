import { css } from "lit";

export default css`
  .base {
    display: flex;
    align-items: flex-start;
    gap: 2px;
    line-height: 1.5;
    font-weight: var(--font-weight-normal);
    color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
  }

  .base[data-status="error"] {
    color: var(--text-negative, #c92812);
  }

  .base[data-size="small"] {
    font-size: 12px;
    letter-spacing: 0.24px;
  }

  .base[data-size="medium"] {
    font-size: 14px;
    letter-spacing: 0.28px;
  }

  .base[data-size="large"] {
    font-size: 16px;
    letter-spacing: 0.32px;
  }

  ::slotted(a) {
    text-decoration: none;
    color: var(--text-link, #315ce8);
  }

  ::slotted(a:hover) {
    text-decoration: underline;
  }

  .icon[data-size="small"] {
    display: inline-block;
    min-inline-size: 18px;
    inline-size: 18px;
    block-size: 18px;
  }

  .icon[data-size="medium"] {
    display: inline-block;
    min-inline-size: 20px;
    inline-size: 20px;
    block-size: 20px;
  }

  .icon[data-size="large"] {
    display: inline-block;
    min-inline-size: 24px;
    inline-size: 24px;
    block-size: 24px;
  }
`;
