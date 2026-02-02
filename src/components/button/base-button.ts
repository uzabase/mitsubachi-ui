import "../loading/sp-loading";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import style from "./button.css?inline";

export const sizes = ["medium", "large", "xLarge"] as const;
export type Size = (typeof sizes)[number];

export function isValidSize(value: string): Size {
  // 空文字列や未定義の場合はデフォルト値を返す
  if (!value) {
    return sizes[0];
  }
  
  if (sizes.some((s) => s === value)) {
    return value as Size;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return sizes[0];
  }
}

function isValidIconType(value: string): boolean {
  // 空文字列の場合はアイコンなしとして扱う（警告不要）
  if (!value) {
    return false;
  }
  
  if (isIconType(value)) {
    return true;
  } else {
    console.warn(`${value}は無効なicon-type属性です。`);
    return false;
  }
}

/**
 * ボタンコンポーネントの基底クラス
 * @internal
 */
export abstract class BaseButton extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  static formAssociated = true;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

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

  protected internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  /**
   * ボタンのモードクラス（normal, danger, ai）を返す
   * 各サブクラスで実装する
   */
  protected abstract get buttonModeClass(): string;

  /**
   * バリアントクラスを返す
   * 各サブクラスで実装する
   */
  protected abstract get variantClass(): string;

  protected get buttonClasses() {
    const sizeClassMap = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };

    return [
      "base",
      this.buttonModeClass,
      this.variantClass,
      sizeClassMap[isValidSize(this.size)],
      this.loading ? "loading" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  protected get loadingSize() {
    const sizeAttributeMap = {
      medium: "large",
      large: "xLarge",
      xLarge: "2xLarge",
    };
    return sizeAttributeMap[isValidSize(this.size)];
  }

  protected get isDisabled() {
    return this.disabled || this.loading;
  }

  protected renderLoading() {
    return html`<sp-loading size="${this.loadingSize}"></sp-loading>`;
  }

  protected get showIcon() {
    return !this.loading && this.iconType && isValidIconType(this.iconType);
  }

  protected renderIcon() {
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
        @click="${this.handleClick}"
      >
        ${this.loading ? this.renderLoading() : nothing}
        ${this.showIcon ? this.renderIcon() : nothing}
        <slot class="text"></slot>
      </button>
    `;
  }

  protected handleClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const allowed = this.dispatchEvent(new MouseEvent("click", event));
    if (allowed && this.internals.form) {
      this.internals.form.requestSubmit();
    }
  }
}
