import { property } from "lit/decorators.js";

import {
  ButtonBase,
  type ButtonTheme,
  type Variant,
  isValidVariant,
  variants,
  sizes,
  type Size,
} from "./base";

/**
 * @summary ノーマル（ニュートラル）ボタンです。
 */
export class MiNeutralButton extends ButtonBase {
  /**
   * Danger スタイルで表示するかどうか。
   * @deprecated この属性は非推奨です。Danger ボタンには `mi-danger-button` の利用を推奨します。
   */
  @property({ type: Boolean, reflect: true })
  danger = false;

  /**
   * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
   */
  @property({ type: String })
  variants: Variant | null = null;

  @property({ type: String })
  override variant: Variant = "primary";

  protected override getTheme(): ButtonTheme {
    return this.danger ? "danger" : "normal";
  }

  protected override getEffectiveVariant(): Variant {
    return this.variants
      ? isValidVariant(this.variants)
      : isValidVariant(this.variant);
  }
}

export type { Variant, Size };
export { variants, sizes };

/** @deprecated 代わりに MiNeutralButton を使用してください。後方互換のため別クラスとして登録しています。 */
export class MiButton extends MiNeutralButton {}

/** @deprecated 代わりに MiNeutralButton を使用してください */
export class SpButton extends MiButton {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-neutral-button": MiNeutralButton;
    "mi-button": MiButton;
    "sp-button": SpButton;
  }
}

if (!customElements.get("mi-neutral-button")) {
  customElements.define("mi-neutral-button", MiNeutralButton);
}
// 後方互換: <mi-button> 用に別コンストラクタを登録（同一コンストラクタの二重登録は不可のため）
if (!customElements.get("mi-button")) {
  customElements.define("mi-button", MiButton);
}
if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}
