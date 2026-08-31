import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./link-tag-group.styles";
import { type LinkTagSize, linkTagSizes, type MiLinkTag } from "./mi-link-tag";

/** 自身の高さに収まらず隠したタグに付ける印。CSS の ::slotted で display: none にする */
const OVERFLOW_ATTR = "data-mi-overflow";

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
 * `show-more` を指定すると、**この要素の高さに収まらないタグを隠し**、末尾に「もっと見る」
 * ボタン（`...`）を表示します。ボタンを押すと残りのタグが表示されます（畳むことはできません）。
 *
 * **高さを指定しないと機能しません**（何も隠れず、ボタンも表示されません）。
 * 何行分表示するかは高さで決まります。幅・高さとも普通の CSS で指定でき、専用のプロパティはありません。
 *
 * @summary mi-link-tag を並べるコンテナ
 *
 * @slot - `mi-link-tag` 要素を配置します。
 *
 * @cssprop --text-semi-weak-default - もっと見るボタンの文字色
 * @cssprop --focus-ring-default - もっと見るボタンのフォーカスリングの色
 *
 * @example
 * ```html
 * <mi-link-tag-group size="small">
 *   <mi-link-tag href="/tags/finance">金融</mi-link-tag>
 *   <mi-link-tag href="/tags/retail">小売</mi-link-tag>
 * </mi-link-tag-group>
 *
 * <!-- 高さを 1行分に指定すると、収まらないタグが隠れて「もっと見る」が出る -->
 * <mi-link-tag-group show-more style="block-size: 24px; max-inline-size: 360px">
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

  /**
   * 自身の高さに収まらないタグを隠し、末尾に「もっと見る」ボタンを表示する。
   * 高さは CSS で指定する（指定が無ければ何も隠れない）。
   * @default false
   */
  @property({ type: Boolean, attribute: "show-more", reflect: true })
  showMore = false;

  @state()
  private _expanded = false;

  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    // 幅が変わると折り返し位置が変わるため、隠す範囲を計算し直す
    this._resizeObserver = new ResizeObserver(() => this._updateOverflow());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("size")) {
      this._applySizeToTags();
    }
    // CSS の :host([show-more]:not([data-expanded])) を切り替える
    this.toggleAttribute("data-expanded", this._expanded);
    this._updateOverflow();
  }

  private _onSlotChange() {
    this._applySizeToTags();
    this._updateOverflow();
  }

  private _onMoreClick() {
    this._expanded = true;
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

  private _overflows() {
    return this.scrollHeight > this.clientHeight;
  }

  /**
   * 自身の高さに収まらないタグを隠し、もっと見るボタンの要否を決める。
   * 状態（@state）ではなく DOM を直接触るのは、updated() 内での再レンダリングループを避けるため。
   */
  private _updateOverflow() {
    const tags = this._tags();
    for (const tag of tags) {
      tag.removeAttribute(OVERFLOW_ATTR);
    }

    const button = this.shadowRoot?.querySelector<HTMLElement>(".more");
    if (!button) return; // show-more が無効、または展開済み

    // まずボタン抜きで全て収まるか見る。収まるならボタンは出さない
    button.classList.add("is-hidden");
    if (!this._overflows()) return;

    button.classList.remove("is-hidden");
    for (let i = tags.length - 1; i >= 0 && this._overflows(); i--) {
      tags[i].setAttribute(OVERFLOW_ATTR, "");
    }
  }

  render() {
    return html`
      <div class="container">
        <slot @slotchange=${this._onSlotChange}></slot>
        ${this.showMore && !this._expanded
          ? html`<button
              type="button"
              class="more is-hidden"
              aria-label="もっと見る"
              @click=${this._onMoreClick}
            >
              ...
            </button>`
          : nothing}
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
