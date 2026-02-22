import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { ButtonBase } from "./base";
import style from "./icon-button.css?inline";

export const iconButtonVariants = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
] as const;
export type IconButtonVariant = (typeof iconButtonVariants)[number];

export const iconButtonSizes = ["small", "medium", "large"] as const;
export type IconButtonSize = (typeof iconButtonSizes)[number];

/**
 * @summary アイコンのみのコンパクトなボタンです。
 * テキストを持たず、アイコンのみで操作を表現します。
 * 必ずツールチップで意味を補完してください。
 */
export class MiIconButton extends ButtonBase<IconButtonSize> {
  static override styles = makeStyles(unsafeCSS(style));

  @property({ type: String })
  override variant: IconButtonVariant = "ghost";

  @property({ type: String })
  override size: IconButtonSize = "medium";

  protected override get loadingSize() {
    const sizeMap: Record<IconButtonSize, string> = {
      small: "medium",
      medium: "large",
      large: "xLarge",
    };
    return sizeMap[this.size];
  }

  /**
   * icon-button.css は theme クラス（normal/danger/ai）を持たず、
   * size も独自体系（small/medium/large）のため、base のクラス組み立てロジックとは
   * 互換性がない。そのため super.buttonClasses を呼ばず完全オーバーライドしている。
   */
  protected override get buttonClasses() {
    return [
      "base",
      this.variant,
      this.size,
      this.selected ? "selected" : "",
      this.loading ? "loading" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  protected override renderSlot() {
    return html``;
  }
}

export type { IconButtonSize as Size, IconButtonVariant as Variant };

declare global {
  interface HTMLElementTagNameMap {
    "mi-icon-button": MiIconButton;
  }
}

if (!customElements.get("mi-icon-button")) {
  customElements.define("mi-icon-button", MiIconButton);
}
