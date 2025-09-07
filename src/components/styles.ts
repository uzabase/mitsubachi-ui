import resetStyle from "@sp-design/recet.css/src/reset.css?inline";
import { css, type CSSResult, unsafeCSS } from "lit";

import foundationStyle from "./foundation.css?inline";

export function makeStyles(...styles: CSSResult[]): CSSResult[] {
  const resetLitStyles = css`
    ${unsafeCSS(resetStyle)}
  `;

  const foundationLitStyles = css`
    ${unsafeCSS(foundationStyle)}
  `;

  return [resetLitStyles, foundationLitStyles, ...styles];
}
