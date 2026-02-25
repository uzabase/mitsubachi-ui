import "../tooltip/mi-tooltip";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import type { Placement } from "../tooltip/mi-tooltip";
import { ButtonBase } from "./base";
import { iconButtonStyles } from "./icon-button.styles";

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
 * aria-label 属性でラベルを必ず指定してください。
 *
 * @example
 * ```html
 * <!-- ツールチップあり（デフォルト） -->
 * <mi-icon-button icon-type="search" aria-label="検索"></mi-icon-button>
 *
 * <!-- ツールチップなし（title 属性で代替） -->
 * <mi-icon-button icon-type="search" aria-label="検索" tooltip-disabled></mi-icon-button>
 * ```
 */
export class MiIconButton extends ButtonBase<IconButtonSize> {
  static override styles = makeStyles(iconButtonStyles);

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String })
  override variant: IconButtonVariant = "ghost";

  @property({ type: String })
  override size: IconButtonSize = "medium";

  /**
   * ボタンのラベルテキスト。
   * - 常に aria-label に設定されます
   * - tooltip-disabled が false（デフォルト）のとき: ツールチップのテキストとして使用
   * - tooltip-disabled が true のとき: title 属性として設定
   */
  @property({ type: String, attribute: "aria-label", reflect: true })
  label = "";

  /** ツールチップの表示位置。デフォルトは "top"。 */
  @property({ type: String, attribute: "tooltip-placement" })
  tooltipPlacement: Placement = "top";

  /** true のときツールチップを非表示にし、代わりに title 属性を設定します。 */
  @property({ type: Boolean, attribute: "tooltip-disabled" })
  tooltipDisabled = false;

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

  protected override renderSlot(): typeof nothing {
    return nothing;
  }

  /**
   * base.ts の render() とは disabled・aria-label・title・aria-disabled の扱いが異なるため
   * 完全にオーバーライドしている。
   * - disabled: loading 時は aria-disabled で代替し、ネイティブ disabled は付与しない
   * - aria-label / title: label プロパティから設定
   */
  override render() {
    const button = html`
      <button
        class="${this.buttonClasses}"
        ?disabled="${this.disabled}"
        name="${this.name || nothing}"
        value="${this.value || nothing}"
        type="${this.type}"
        aria-label="${this.label || nothing}"
        title="${this.tooltipDisabled && this.label ? this.label : nothing}"
        aria-disabled="${this.loading ? "true" : nothing}"
        aria-pressed="${this.toggle
          ? this.selected
            ? "true"
            : "false"
          : nothing}"
        aria-busy="${this.loading ? "true" : nothing}"
        @click="${this.handleClick}"
      >
        ${this.loading ? this.renderLoading() : nothing}
        ${this.showIcon ? this.renderIcon() : nothing} ${this.renderSlot()}
      </button>
    `;

    if (!this.label || this.tooltipDisabled) return button;

    return html`
      <mi-tooltip text="${this.label}" placement="${this.tooltipPlacement}">
        ${button}
      </mi-tooltip>
    `;
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
