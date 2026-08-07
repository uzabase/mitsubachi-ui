import "../loading/mi-loading";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import { menuButtonStyles } from "./menu-button.styles";

export const variants = ["primary", "secondary", "ghost"] as const;
export type Variant = (typeof variants)[number];

export const sizes = ["medium", "large", "xLarge"] as const;
export type Size = (typeof sizes)[number];

function isValidVariant(value: string): value is Variant {
  return variants.some((v) => v === value);
}

function isValidSize(value: string): value is Size {
  return sizes.some((s) => s === value);
}

/**
 * @summary メニューを開くためのトリガーボタン。mi-menu の trigger スロットに配置して使用する。
 *
 * @slot - ボタンのラベルテキスト
 */
export class MiMenuButton extends LitElement {
  static styles = makeStyles(menuButtonStyles);

  /** ボタンのバリアント */
  @property({ type: String, reflect: true })
  variant: Variant = "primary";

  /** ボタンのサイズ */
  @property({ type: String, reflect: true })
  size: Size = "medium";

  /** 無効状態 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** ローディング状態（disabled と同時に動作） */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** 先頭アイコンの種類（mi-icon の type 値） */
  @property({ type: String, attribute: "icon-type" })
  iconType = "";

  private get _effectiveVariant(): Variant {
    if (isValidVariant(this.variant)) {
      return this.variant;
    }
    console.warn(`${this.variant}は無効なvariant属性です。`);
    return variants[0];
  }

  private get _buttonClasses(): string {
    const sizeClassMap: Record<Size, string> = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };
    const validSize = isValidSize(this.size);
    if (!validSize) {
      console.warn(`${this.size}は無効なsize属性です。`);
    }
    const size: Size = validSize ? this.size : sizes[0];

    return [
      "base",
      this._effectiveVariant,
      sizeClassMap[size],
      this.loading ? "loading" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  private get _isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  private get _loadingSize(): string {
    const sizeMap: Record<Size, string> = {
      medium: "large",
      large: "xLarge",
      xLarge: "2xLarge",
    };
    const validSize = isValidSize(this.size);
    const size: Size = validSize ? this.size : sizes[0];
    return sizeMap[size];
  }

  private get _showIcon(): boolean {
    if (this.loading || !this.iconType) return false;
    if (isIconType(this.iconType)) return true;
    console.warn(`${this.iconType}は無効なicon-type属性です。`);
    return false;
  }

  render() {
    return html`
      <button
        class="${this._buttonClasses}"
        ?disabled="${this._isDisabled}"
        aria-busy="${this.loading ? "true" : nothing}"
        type="button"
      >
        ${this.loading
          ? html`<mi-loading size="${this._loadingSize}"></mi-loading>`
          : nothing}
        ${this._showIcon
          ? html`<mi-icon type="${this.iconType}" class="icon"></mi-icon>`
          : nothing}
        <slot class="text"></slot>
        <mi-icon type="chevron-down-small" class="chevron"></mi-icon>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-menu-button": MiMenuButton;
  }
}

if (!customElements.get("mi-menu-button")) {
  customElements.define("mi-menu-button", MiMenuButton);
}
