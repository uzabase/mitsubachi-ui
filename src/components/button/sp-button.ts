import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./button.css?inline";

export const variants = ["primary", "secondary", "tertiary"] as const;
type Variant = (typeof variants)[number];

export const size = ["medium", "large", "xLarge"] as const;
type Size = (typeof size)[number];

function isValidVariant(value: string): Variant {
  if (variants.some((variant) => variant === value)) {
    return value as Variant;
  } else {
    console.warn(`${value}は無効なvariant属性です。`);
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
 * @summary ボタンです。
 */
export class SpButton extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  danger = false;

  @property({ type: String })
  variant: Variant = "primary";

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
      isValidVariant(this.variant),
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
        <slot class="text"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}

if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}
