import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./link-tag-group.styles";
import { type LinkTagSize, linkTagSizes, type MiLinkTag } from "./mi-link-tag";

function toLinkTagSize(value: unknown): LinkTagSize {
  return typeof value === "string" &&
    (linkTagSizes as readonly string[]).includes(value)
    ? (value as LinkTagSize)
    : "medium";
}

/**
 * 複数の `mi-link-tag` を一定の間隔で並べるコンテナです。
 * 幅に収まらないタグは次の行へ折り返します。
 *
 * 内包する `mi-link-tag` のサイズは、このグループの `size` で一括制御します。
 * 個別の `mi-link-tag` に `size` を指定しても、このグループの値で上書きされます。
 *
 * @summary mi-link-tag を並べるコンテナ
 *
 * @slot - `mi-link-tag` 要素を配置します。
 *
 * @example
 * ```html
 * <mi-link-tag-group size="small">
 *   <mi-link-tag href="/tags/finance">金融</mi-link-tag>
 *   <mi-link-tag href="/tags/retail">小売</mi-link-tag>
 * </mi-link-tag-group>
 * ```
 */
export class MiLinkTagGroup extends LitElement {
  static styles = makeStyles(style);

  /**
   * 内包する `mi-link-tag` のサイズ。想定外の値を渡した場合は `medium` として扱う。
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: LinkTagSize = "medium";

  updated(changed: Map<string, unknown>) {
    if (changed.has("size")) {
      this._applySizeToTags();
    }
  }

  private _onSlotChange() {
    this._applySizeToTags();
  }

  private _tags(): MiLinkTag[] {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return [];

    return slot
      .assignedElements()
      .filter(
        (el): el is MiLinkTag => el.tagName.toLowerCase() === "mi-link-tag",
      );
  }

  /** 子の mi-link-tag へサイズを配る（サイズはグループが一括制御する仕様） */
  private _applySizeToTags() {
    const size = toLinkTagSize(this.size);
    for (const tag of this._tags()) {
      tag.size = size;
    }
  }

  render() {
    return html`
      <div class="container">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-link-tag-group": MiLinkTagGroup;
  }
}

if (!customElements.get("mi-link-tag-group")) {
  customElements.define("mi-link-tag-group", MiLinkTagGroup);
}
