import "../icon";
import "../loading/mi-loading";

import { html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
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
export class MiIconButton extends ButtonBase {
  static override styles = makeStyles(unsafeCSS(style));

  @property({ type: String })
  override variant: IconButtonVariant = "ghost";

  @property({ type: String })
  override size: IconButtonSize = "medium";

  @property({ type: Boolean, reflect: true })
  selected = false;

  protected override get loadingSize() {
    const sizeMap: Record<IconButtonSize, string> = {
      small: "medium",
      medium: "large",
      large: "xLarge",
    };
    return sizeMap[this.size];
  }

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

  override render() {
    const showIcon =
      !this.loading && !!this.iconType && isIconType(this.iconType);
    return html`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.isDisabled}"
        name="${this.name}"
        value="${this.value}"
        type="${this.type}"
        aria-pressed="${this.selected ? "true" : nothing}"
        @click="${this.#handleIconButtonClick}"
      >
        ${this.loading ? this.renderLoading() : nothing}
        ${showIcon
          ? html`<mi-icon type="${this.iconType}" class="icon"></mi-icon>`
          : nothing}
      </button>
    `;
  }

  #handleIconButtonClick(event: Event) {
    if (this.disabled || this.loading) return;
    this.dispatchEvent(new MouseEvent("click", event));
  }
}

export type { IconButtonVariant as Variant, IconButtonSize as Size };

declare global {
  interface HTMLElementTagNameMap {
    "mi-icon-button": MiIconButton;
  }
}

if (!customElements.get("mi-icon-button")) {
  customElements.define("mi-icon-button", MiIconButton);
}
