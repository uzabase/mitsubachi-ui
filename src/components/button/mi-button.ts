import "../loading/mi-loading";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import style from "./button.css?inline";

export const variants = ["primary", "secondary", "tertiary", "ghost"] as const;
type Variant = (typeof variants)[number];

export const sizes = ["medium", "large", "xLarge"] as const;
type Size = (typeof sizes)[number];

function isValidVariant(value: string): Variant {
  if (variants.some((variant) => variant === value)) {
    return value as Variant;
  } else {
    console.warn(`${value}は無効なvariant属性です。`);
    return variants[0];
  }
}

function isValidSize(value: string): Size {
  if (sizes.some((s) => s === value)) {
    return value as Size;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return sizes[0];
  }
}

function isValidIconType(value: string): boolean {
  if (isIconType(value)) {
    return true;
  } else {
    console.warn(`${value}は無効なicon-type属性です。`);
    return false;
  }
}

/**
 * @summary ボタンです。
 */
export class MiButton extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  static formAssociated = true;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  danger = false;

  /**
   * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
   */
  @property({ type: String })
  variants: Variant | null = null;

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

  @property({ type: String, attribute: "icon-type" })
  iconType = "";

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  private get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };

    return [
      "base",
      this.danger ? "danger" : "normal",
      this.variants
        ? isValidVariant(this.variants)
        : isValidVariant(this.variant),
      sizeClassMap[isValidSize(this.size)],
      this.loading ? "loading" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  private get loadingSize() {
    const sizeAttributeMap = {
      medium: "large",
      large: "xLarge",
      xLarge: "2xLarge",
    };
    return sizeAttributeMap[isValidSize(this.size)];
  }

  private get isDisabled() {
    return this.disabled || this.loading;
  }

  private renderLoading() {
    return html`<mi-loading size="${this.loadingSize}"></mi-loading>`;
  }

  private get showIcon() {
    return !this.loading && this.iconType && isValidIconType(this.iconType);
  }

  private renderIcon() {
    return html`<mi-icon type="${this.iconType}" class="icon"></mi-icon>`;
  }

  render() {
    return html`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name}"
        value="${this.value}"
        type="${this.type}"
        @click="${this.#handleClick}"
      >
        ${this.loading ? this.renderLoading() : nothing}
        ${this.showIcon ? this.renderIcon() : nothing}
        <slot class="text"></slot>
      </button>
    `;
  }

  #handleClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const allowed = this.dispatchEvent(new MouseEvent("click", event));
    if (allowed && this.#internals.form) {
      this.#internals.form.requestSubmit();
    }
  }
}

/** @deprecated 代わりに MiButton を使用してください */
export class SpButton extends MiButton {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-button": MiButton;
    "sp-button": SpButton;
  }
}

if (!customElements.get("mi-button")) {
  customElements.define("mi-button", MiButton);
}

if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}
