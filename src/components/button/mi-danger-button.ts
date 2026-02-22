import { property } from "lit/decorators.js";

import { ButtonBase, type ButtonTheme, type Size, sizes } from "./base";

export const dangerVariants = ["primary", "secondary", "ghost"] as const;
export type DangerVariant = (typeof dangerVariants)[number];

/**
 * @summary Dangerボタンです。削除・破壊的操作などに使用します。
 */
export class MiDangerButton extends ButtonBase {
  @property({ type: String })
  override variant: DangerVariant = "primary";

  protected override getTheme(): ButtonTheme {
    return "danger";
  }
}

export type { Size };
export { sizes };

declare global {
  interface HTMLElementTagNameMap {
    "mi-danger-button": MiDangerButton;
  }
}

if (!customElements.get("mi-danger-button")) {
  customElements.define("mi-danger-button", MiDangerButton);
}
