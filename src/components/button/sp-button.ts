import "../loading/sp-loading";

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
export class SpButton extends LitElement {
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

  @property({ type: Boolean })
  ai = false;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (this.ai) {
      // aiがtrueの時、variantはprimaryまたはsecondaryのみ許可
      if (this.variant !== "primary" && this.variant !== "secondary") {
        console.warn(
          `ai属性がtrueの時、variantはprimaryまたはsecondaryのみ有効です。現在の値: ${this.variant}`,
        );
      }

      // aiがtrueの時、dangerはtrueにできない
      if (this.danger) {
        console.warn("ai属性がtrueの時、danger属性はtrueにできません。");
      }
    }
  }

  private get buttonModeClass() {
    if (this.ai) {
      return "mode-ai";
    } else if (this.danger) {
      return "mode-danger";
    } else {
      return "mode-normal";
    }
  }

  private get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };

    return [
      "base",
      this.buttonModeClass,
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
    return html`<sp-loading
      size="${this.loadingSize}"
      ?ai="${this.ai && this.variant === "primary"}"
    ></sp-loading>`;
  }

  private get showIcon() {
    return !this.loading && this.iconType && isValidIconType(this.iconType);
  }

  private renderIcon() {
    return html`<sp-icon type="${this.iconType}" class="icon"></sp-icon>`;
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

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}

if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}
