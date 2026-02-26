import "../icon";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./loading.css?inline";

export const size = [
  "medium",
  "large",
  "xLarge",
  "2xLarge",
  "3xLarge",
  "4xLarge",
] as const;
type Size = (typeof size)[number];

/**
 * @summary ローディングスピナーです。
 */
export class MiLoading extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  @property({ type: Boolean })
  ai = false;

  @property({ type: String })
  size: Size = "medium";

  private get loadingClasses() {
    const sizeClassMap = {
      medium: "size-medium",
      large: "size-large",
      xLarge: "size-x-large",
      "2xLarge": "size-2x-large",
      "3xLarge": "size-3x-large",
      "4xLarge": "size-4x-large",
    };

    return [
      "loading",
      this.ai ? "variant-ai" : "variant-normal",
      sizeClassMap[this.size],
    ]
      .filter(Boolean)
      .join(" ");
  }

  render() {
    return html`
      <span class="base">
        <span class="${this.loadingClasses}" role="status"></span>
      </span>
    `;
  }
}

/** @deprecated 代わりに MiLoading を使用してください */
export class SpLoading extends MiLoading {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-loading": MiLoading;
    "sp-loading": SpLoading;
  }
}

if (!customElements.get("mi-loading")) {
  customElements.define("mi-loading", MiLoading);
}

if (!customElements.get("sp-loading")) {
  customElements.define("sp-loading", SpLoading);
}
