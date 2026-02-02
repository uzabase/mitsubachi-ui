import { property } from "lit/decorators.js";

import { BaseButton } from "./base-button";

export { sizes, type Size } from "./base-button";

export const variants = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "plane",
] as const;
export type Variant = (typeof variants)[number];

function isValidVariant(value: string): Variant {
  // 空文字列や未定義の場合はデフォルト値を返す
  if (!value) {
    return variants[0];
  }
  
  if (variants.some((variant) => variant === value)) {
    return value as Variant;
  } else {
    console.warn(`${value}は無効なvariant属性です。`);
    return variants[0];
  }
}

/**
 * @summary ボタンです。
 *
 * @deprecated danger タイプは `sp-danger-button` の使用を推奨します。
 * AI 機能には `sp-ai-button` の使用を推奨します。
 */
export class SpButton extends BaseButton {
  /**
   * @deprecated このプロパティは非推奨です。代わりに `sp-danger-button` コンポーネントを使用してください。
   */
  @property({ type: Boolean, reflect: true })
  danger = false;

  /**
   * @deprecated このプロパティは非推奨です。代わりに `sp-danger-button` コンポーネントを使用してください。
   * このプロパティは後方互換性のために残されていますが、設定しても無視されます。
   */
  @property({ type: String, attribute: "button-type" })
  buttonType: string = "normal";

  /**
   * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
   */
  @property({ type: String })
  variants: Variant | null = null;

  @property({ type: String })
  variant: Variant = "primary";

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // 後方互換性: danger または buttonType="danger" が設定されている場合は警告
    if (this.danger) {
      console.warn(
        "⚠️ sp-button で danger プロパティを使用しています。代わりに sp-danger-button コンポーネントの使用を推奨します。",
      );
    }
    if (this.buttonType === "danger") {
      console.warn(
        "⚠️ sp-button で button-type=\"danger\" を使用しています。代わりに sp-danger-button コンポーネントの使用を推奨します。",
      );
    }
  }

  protected get buttonModeClass() {
    // sp-button は常に normal モード
    // danger プロパティや buttonType は後方互換性のために残されているが、実際には無視される
    return "normal";
  }

  protected get variantClass() {
    return this.variants
      ? isValidVariant(this.variants)
      : isValidVariant(this.variant);
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
