import "../icon";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import styles from "./segment.styles";

export const segmentVariants = ["text", "icon"] as const;
export type SegmentVariant = (typeof segmentVariants)[number];

/**
 * SegmentedControl 内の個別セグメントです。
 * mi-segmented-control の直接の子として配置して使用します。
 *
 * @summary セグメントコントロールの個別セグメント
 *
 * @slot - セグメントに表示するコンテンツ（テキストまたはアイコン）
 *
 * @example
 * ```html
 * <mi-segment value="tab1" variant="text">タブ1</mi-segment>
 * ```
 */
export class MiSegment extends LitElement {
  static styles = makeStyles(styles);

  /** セグメントの値（mi-segmented-control の選択制御に使用） */
  @property({ type: String, reflect: true })
  value = "";

  /** セグメントの表示バリアント */
  @property({ type: String, reflect: true })
  variant: SegmentVariant = "text";

  /** 無効化状態 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** 選択状態（mi-segmented-control から制御される） */
  @property({ type: Boolean, reflect: true })
  selected = false;

  render() {
    const variantClass =
      this.variant === "icon" ? "icon-variant" : "text-variant";

    return html`
      <div
        class="segment ${variantClass}"
        role="radio"
        aria-checked="${this.selected}"
        aria-disabled="${this.disabled}"
        tabindex="${this.disabled ? -1 : this.selected ? 0 : -1}"
        @keydown="${this.#handleKeydown}"
      >
        <span class="check-icon" aria-hidden="true">
          <mi-icon type="check-small"></mi-icon>
        </span>
        <span class="label">
          <slot></slot>
        </span>
      </div>
    `;
  }

  #handleKeydown(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.click();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-segment": MiSegment;
  }
}

if (!customElements.get("mi-segment")) {
  customElements.define("mi-segment", MiSegment);
}
