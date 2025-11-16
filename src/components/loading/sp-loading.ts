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
] as const;
type Size = (typeof size)[number];

/**
 * @summary ローディングスピナーです。
 */
export class SpLoading extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  @property({ type: Boolean, reflect: true })
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
    };

    return [
      "loading",
      this.ai ? "variant-ai" : "variant-normal",
      sizeClassMap[this.size],
    ]
      .filter(Boolean)
      .join(" ");
  }

  private get iconType() {
    return this.ai ? "loading-ai" : "loading-normal";
  }

  render() {
    return html`
      <span class="${this.loadingClasses}" role="status">
        <sp-icon type="${this.iconType}"></sp-icon>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-loading": SpLoading;
  }
}

if (!customElements.get("sp-loading")) {
  customElements.define("sp-loading", SpLoading);
}
