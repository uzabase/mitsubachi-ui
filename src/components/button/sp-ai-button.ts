import { property } from "lit/decorators.js";

import { BaseButton } from "./base-button";

export const aiVariants = ["primary", "secondary"] as const;
export type AiVariant = (typeof aiVariants)[number];

function isValidAiVariant(value: string): AiVariant {
  // 空文字列や未定義の場合はデフォルト値を返す
  if (!value) {
    return aiVariants[0];
  }
  
  if (aiVariants.some((variant) => variant === value)) {
    return value as AiVariant;
  } else {
    console.warn(
      `${value}は無効なvariant属性です。AI ボタンでは primary, secondary のみ使用可能です。`,
    );
    return aiVariants[0];
  }
}

/**
 * @summary AIボタンです。AI機能に関連するアクションに使用します。
 *
 * @example
 * ```html
 * <sp-ai-button variant="primary">AIで生成</sp-ai-button>
 * <sp-ai-button variant="secondary">AIアシスト</sp-ai-button>
 * ```
 */
export class SpAiButton extends BaseButton {
  @property({ type: String })
  variant: AiVariant = "primary";

  protected get buttonModeClass() {
    return "mode-ai";
  }

  protected get variantClass() {
    return isValidAiVariant(this.variant);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-ai-button": SpAiButton;
  }
}

if (!customElements.get("sp-ai-button")) {
  customElements.define("sp-ai-button", SpAiButton);
}
