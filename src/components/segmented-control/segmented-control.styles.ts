import { css } from "lit";

export default css`
  :host {
    display: inline-flex;
    max-inline-size: 100%;
  }

  [role="radiogroup"] {
    display: inline-grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-inline-size: 100%;
    /* mi-segment の margin-inline-start: -1px による最初のセグメントのずれを補正 */
    padding-inline-start: 1px;
  }
`;
