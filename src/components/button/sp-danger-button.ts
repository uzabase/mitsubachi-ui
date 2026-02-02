import { property } from "lit/decorators.js";

import { BaseButton } from "./base-button";

export const dangerVariants = ["primary", "secondary", "ghost"] as const;
export type DangerVariant = (typeof dangerVariants)[number];

function isValidDangerVariant(value: string): DangerVariant {
  // 空文字列や未定義の場合はデフォルト値を返す
  if (!value) {
    return dangerVariants[0];
  }
  
  if (dangerVariants.some((variant) => variant === value)) {
    return value as DangerVariant;
  } else {
    console.warn(
      `${value}は無効なvariant属性です。danger ボタンでは primary, secondary, ghost のみ使用可能です。`,
    );
    return dangerVariants[0];
  }
}

/**
 * @summary Dangerボタンです。削除や破壊的なアクションに使用します。
 *
 * @example
 * ```html
 * <sp-danger-button variant="primary">削除</sp-danger-button>
 * <sp-danger-button variant="secondary">キャンセル</sp-danger-button>
 * ```
 */
export class SpDangerButton extends BaseButton {
  @property({ type: String })
  variant: DangerVariant = "primary";

  protected get buttonModeClass() {
    return "danger";
  }

  protected get variantClass() {
    return isValidDangerVariant(this.variant);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-danger-button": SpDangerButton;
  }
}

if (!customElements.get("sp-danger-button")) {
  customElements.define("sp-danger-button", SpDangerButton);
}
