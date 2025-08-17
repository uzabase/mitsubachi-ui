import { css } from "lit";

export const spLabelUnitLitStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-weight: var(--font-weight-bold, bold);
    font-size: 14px;
    color: #000000d6;
  }

  .label.none {
    display: none;
  }

  .support {
    font-weight: var(--font-weight-normal, normal);
    font-size: 12px;
    color: #0000008a;
  }

  .support.none {
    display: none;
  }
`;
