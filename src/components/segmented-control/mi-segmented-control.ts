import "./mi-segment";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import type { MiSegment } from "./mi-segment";
import styles from "./segmented-control.styles";

/**
 * 排他的な単一選択のセグメントグループです。
 * mi-segment コンポーネントを子として配置して使用します。
 *
 * @summary セグメントコントロール
 *
 * @slot - mi-segment コンポーネント群
 *
 * @fires change - セグメントの選択が変更されたとき。detail: { value: string }
 *
 * @example
 * ```html
 * <mi-segmented-control value="tab1" aria-label="表示切り替え">
 *   <mi-segment value="tab1" variant="text">タブ1</mi-segment>
 *   <mi-segment value="tab2" variant="text">タブ2</mi-segment>
 *   <mi-segment value="tab3" variant="text">タブ3</mi-segment>
 * </mi-segmented-control>
 * ```
 */
export class MiSegmentedControl extends LitElement {
  static styles = makeStyles(styles);

  /** 現在選択されているセグメントの値 */
  @property({ type: String, reflect: true })
  value = "";

  /** 無効化状態（全セグメントを無効化） */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeydown);
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("disabled")) {
      this.#syncSegments();
    }
  }

  protected firstUpdated() {
    this.#syncSegments();
  }

  render() {
    return html`
      <div
        role="radiogroup"
        aria-label="${this.getAttribute("aria-label") ?? nothing}"
      >
        <slot @slotchange="${this.#handleSlotChange}"></slot>
      </div>
    `;
  }

  #originalDisabledMap = new WeakMap<MiSegment, boolean>();

  #getSegments(): MiSegment[] {
    return Array.from(this.querySelectorAll("mi-segment"));
  }

  #syncSegments() {
    for (const segment of this.#getSegments()) {
      segment.selected = segment.value === this.value;

      if (!this.#originalDisabledMap.has(segment)) {
        this.#originalDisabledMap.set(segment, segment.disabled);
      }

      segment.disabled =
        this.disabled || this.#originalDisabledMap.get(segment)!;
    }
  }

  #handleSlotChange = () => {
    this.#syncSegments();
  };

  #handleClick = (e: Event) => {
    const segment = (e.target as Element).closest(
      "mi-segment",
    ) as MiSegment | null;
    if (!segment || segment.disabled || segment.selected) return;
    this.value = segment.value;
    this.#syncSegments();
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: segment.value },
      }),
    );
  };

  #handleKeydown = (e: KeyboardEvent) => {
    const segments = this.#getSegments().filter((s) => !s.disabled);
    if (segments.length === 0) return;

    const current = (e.target as Element).closest("mi-segment") as MiSegment;
    const currentIndex = segments.indexOf(current);
    if (currentIndex === -1) return;

    let nextIndex: number | undefined;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (currentIndex + 1) % segments.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex = (currentIndex - 1 + segments.length) % segments.length;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = segments.length - 1;
        break;
    }

    if (nextIndex !== undefined) {
      const nextSegment = segments[nextIndex];
      nextSegment.shadowRoot?.querySelector<HTMLElement>(".segment")?.focus();
      nextSegment.click();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-segmented-control": MiSegmentedControl;
  }
}

if (!customElements.get("mi-segmented-control")) {
  customElements.define("mi-segmented-control", MiSegmentedControl);
}
