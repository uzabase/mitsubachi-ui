/**
 * ボタン共通ベースクラス（内部用）
 * @internal Storybookからは見えない
 */
import "../loading/mi-loading";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import style from "./button.css?inline";

export const variants = ["primary", "secondary", "tertiary", "ghost", "plane"] as const;
export type Variant = (typeof variants)[number];

export const sizes = ["medium", "large", "xLarge"] as const;
export type Size = (typeof sizes)[number];

export type ButtonTheme = "normal" | "danger" | "ai";

export function isValidVariant(value: string): Variant {
  if (variants.some((variant) => variant === value)) {
    return value as Variant;
  } else {
    console.warn(`${value}は無効なvariant属性です。`);
    return variants[0];
  }
}

export function isValidSize(value: string): Size {
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
 * ボタン共通ベースクラス。mi-button / mi-danger-button / mi-ai-button が継承する。
 * @internal
 */
export class ButtonBase extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  static formAssociated = true;

  /** 継承クラスでオーバーライド可能。テーマ（normal / danger / ai） */
  protected getTheme(): ButtonTheme {
    return "normal";
  }

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  variant: Variant = "primary";

  @property({ type: String })
  size: string = "medium";

  @property({ type: String })
  name = "";

  @property({ type: String })
  value = "";

  @property({ type: String })
  type: "button" | "submit" | "reset" = "button";

  @property({ type: String, attribute: "icon-type" })
  iconType = "";

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
  protected getEffectiveVariant(): Variant {
    return isValidVariant(this.variant);
  }

  protected get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };

    return [
      "base",
      this.getTheme(),
      this.getEffectiveVariant(),
      sizeClassMap[isValidSize(this.size)],
      this.loading ? "loading" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  protected get isDisabled() {
    return this.disabled || this.loading;
  }

  protected get loadingSize() {
    const sizeAttributeMap = {
      medium: "large",
      large: "xLarge",
      xLarge: "2xLarge",
    };
    return sizeAttributeMap[isValidSize(this.size)];
  }

  protected renderLoading() {
    return html`<mi-loading size="${this.loadingSize}"></mi-loading>`;
  }

  protected get showIcon() {
    return !this.loading && this.iconType && isValidIconType(this.iconType);
  }

  protected renderIcon() {
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
    const allowed = this.dispatchEvent(new MouseEvent("click", event));
    if (!allowed || !this.#internals.form) return;

    if (this.type === "submit") {
      event.preventDefault();
      event.stopPropagation();
      if (this.name) {
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = this.name;
        hidden.value = this.value;
        this.#internals.form.appendChild(hidden);
        this.#internals.form.requestSubmit();
        hidden.remove();
      } else {
        this.#internals.form.requestSubmit();
      }
    } else if (this.type === "reset") {
      this.#internals.form.reset();
    }
  }
}
