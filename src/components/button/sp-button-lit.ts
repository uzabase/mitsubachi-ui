import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { spButtonLitStyles } from "./sp-button-lit-styles";

export const variants = ["primary", "secondary", "tertiary"] as const;
type Variants = (typeof variants)[number];

export const size = ["medium", "large", "xLarge"] as const;
type Size = (typeof size)[number];

function isValidVariants(value: string): Variants {
  if (variants.some((variant) => variant === value)) {
    return value as Variants;
  } else {
    console.warn(`${value}は無効なvariants属性です。`);
    return variants[0];
  }
}

function isValidSize(value: string): Size {
  if (size.some((s) => s === value)) {
    return value as Size;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return size[0];
  }
}

/**
 * @summary Litで実装されたボタンです。
 */
@customElement("sp-button-lit")
export class SpButtonLit extends LitElement {
  static styles = spButtonLitStyles;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  danger = false;

  @property({ type: String })
  variants: Variants = "primary";

  @property({ type: String })
  size: Size = "medium";

  @property({ type: String })
  name = "";

  @property({ type: String })
  value = "";

  @property({ type: String })
  type = "button";

  private get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };

    return [
      "base",
      this.danger ? "danger" : "normal",
      isValidVariants(this.variants),
      sizeClassMap[isValidSize(this.size)],
      this.loading ? "loading" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  private get isDisabled() {
    return this.disabled || this.loading;
  }

  render() {
    return html`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name}"
        value="${this.value}"
        type="${this.type}"
      >
        <span class="text">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button-lit": SpButtonLit;
  }
}
