import "../icon";

import { html, nothing } from "lit";
import { query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { MiSearchBox } from "../search-box/mi-search-box";
import type { MiSuggestionItem } from "./mi-suggestion-item";
import { suggestionSearchBoxStyles } from "./suggestion-search-box.styles";

/**
 * @summary 入力に応じて候補を表示する検索ボックスです。
 * mi-search-box の属性・イベントをすべて引き継ぎ、子要素の mi-suggestion-item を候補として表示します。
 *
 * 候補の絞り込みは行いません。利用側が `input` を受けて子要素を入れ替えてください。
 * 日本語入力の変換中は候補に何も影響を与えず、`input` も確定時に1回だけ発火します。
 *
 * @attr {string} variant - 見た目のバリアント（`primary` | `secondary`）。デフォルトは `primary`。
 * @attr {string} value - 入力値の文字列。候補を選んでも変わりません。
 * @attr {string} placeholder - プレースホルダー。
 * @attr {string} name - フォームの name。
 * @attr {string} label - 内部の input と候補リストに設定する aria-label。
 * @attr {boolean} disabled - 無効化するかどうか。
 * @attr {string} autocomplete - autocomplete 属性。
 * @attr {boolean} autofocus - 自動フォーカスするかどうか。
 * @slot - 候補（mi-suggestion-item）
 * @fires input - 入力値が変わったとき。日本語入力の変換中は発火せず、確定時に1回だけ発火します。
 * @fires change - 値の確定（主にフォーカスが外れたとき）。mi-search-box と同じです。
 * @fires select - 候補が選ばれたとき。`detail.value` に候補の value が入ります。bubbles / composed / cancelable はすべて false。
 */
export class MiSuggestionSearchBox extends MiSearchBox {
  static styles = [...MiSearchBox.styles, suggestionSearchBoxStyles];

  @query("input")
  private suggestionInputEl!: HTMLInputElement;

  /** 表示中の候補。変換中は更新せず、確定時にまとめて反映する */
  @state()
  private items: MiSuggestionItem[] = [];

  @state()
  private activeIndex: number | null = null;

  @state()
  private focused = false;

  /** Esc や候補の選択で閉じたか。入力・↓・クリック・再フォーカスで解除する */
  @state()
  private dismissed = false;

  #composing = false;

  get #open() {
    return (
      this.focused && !this.dismissed && !this.disabled && this.items.length > 0
    );
  }

  get #activeItem() {
    return this.activeIndex === null
      ? null
      : (this.items[this.activeIndex] ?? null);
  }

  protected willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (!this.#open) this.activeIndex = null;
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    const active = this.#activeItem;
    for (const item of this.items) {
      item.setAttribute("aria-selected", String(item === active));
    }
    if (this.suggestionInputEl) {
      this.suggestionInputEl.ariaActiveDescendantElement = active;
    }
    active?.scrollIntoView({ block: "nearest" });
  }

  #assignedItems() {
    const slot = this.shadowRoot?.querySelector("slot");
    return (slot?.assignedElements({ flatten: true }) ?? []).filter(
      (el): el is MiSuggestionItem => el.localName === "mi-suggestion-item",
    );
  }

  #syncItems() {
    const next = this.#assignedItems();
    const changed =
      next.length !== this.items.length ||
      next.some((item, i) => item !== this.items[i]);
    if (!changed) return;
    this.items = next;
    this.activeIndex = null;
  }

  #handleSlotChange() {
    if (this.#composing) return;
    this.#syncItems();
  }

  #handleInput(e: Event) {
    if (this.#composing || (e as InputEvent).isComposing) {
      // 変換中の input は外に出さない（確定時に compositionend で発火し直す）
      e.stopPropagation();
      return;
    }
    if (this.suggestionInputEl.value === this.value) {
      // compositionend で発火済みの値（Safari では確定後にも input が届く）
      e.stopPropagation();
      return;
    }
    this.value = this.suggestionInputEl.value;
    this.dismissed = false;

    if (!e.composed) {
      this.dispatchEvent(new InputEvent("input", { ...e, composed: false }));
    }
  }

  #handleCompositionStart() {
    this.#composing = true;
  }

  #handleCompositionEnd(e: CompositionEvent) {
    this.#composing = false;
    this.dismissed = false;
    this.#syncItems();

    const value = this.suggestionInputEl.value;
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(
      new InputEvent("input", {
        bubbles: false,
        composed: false,
        data: e.data,
        inputType: "insertCompositionText",
      }),
    );
  }

  #handleChange(e: Event) {
    if (!e.composed) {
      this.dispatchEvent(
        new Event("change", {
          bubbles: false,
          cancelable: e.cancelable,
          composed: false,
        }),
      );
    }
  }

  #handleKeydown(e: KeyboardEvent) {
    // 変換中のキーは IME に任せる。keyCode 229 は Safari 26 以前で
    // 変換を確定した Enter が compositionend の後に届く場合への対策
    if (e.isComposing || e.keyCode === 229) return;

    const count = this.items.length;
    switch (e.key) {
      case "ArrowDown":
        if (!this.#open) {
          if (count > 0) {
            this.dismissed = false;
            e.preventDefault();
          }
          return;
        }
        e.preventDefault();
        this.activeIndex =
          this.activeIndex === null
            ? 0
            : this.activeIndex === count - 1
              ? null
              : this.activeIndex + 1;
        return;
      case "ArrowUp":
        if (!this.#open) return;
        e.preventDefault();
        this.activeIndex =
          this.activeIndex === null
            ? count - 1
            : this.activeIndex === 0
              ? null
              : this.activeIndex - 1;
        return;
      case "Enter": {
        const active = this.#activeItem;
        if (!this.#open || !active) return;
        e.preventDefault();
        this.#select(active);
        return;
      }
      case "Escape":
        if (!this.#open) return;
        e.preventDefault();
        this.dismissed = true;
        return;
      case "ArrowLeft":
      case "ArrowRight":
      case "Home":
      case "End":
        this.activeIndex = null;
        return;
    }
  }

  #handleFocus() {
    this.focused = true;
    this.dismissed = false;
  }

  #handleBlur() {
    this.focused = false;
  }

  #handleInputClick() {
    this.dismissed = false;
  }

  /** 入力欄の文字の範囲選択で発火するネイティブの select を外に出さない */
  #handleNativeSelect(e: Event) {
    e.stopPropagation();
  }

  /** 候補やクリアボタンを押したときに、入力欄のフォーカスが外れないようにする */
  #keepFocus(e: MouseEvent) {
    e.preventDefault();
  }

  #handleListboxClick(e: MouseEvent) {
    const item = (e.target as Element).closest("mi-suggestion-item");
    if (item && this.items.includes(item)) this.#select(item);
  }

  #select(item: MiSuggestionItem) {
    this.dismissed = true;
    this.dispatchEvent(
      new CustomEvent("select", { detail: { value: item.value } }),
    );
  }

  #handleClear() {
    this.value = "";
    this.suggestionInputEl.value = "";
    this.activeIndex = null;
    this.dispatchEvent(
      new InputEvent("input", {
        bubbles: false,
        composed: false,
        data: null,
        inputType: "deleteContentBackward",
      }),
    );
    this.suggestionInputEl.focus();
  }

  render() {
    const hasValue = this.value.length > 0;
    const showClear = hasValue && !this.disabled;
    const open = this.#open;

    return html`
      <div class="field">
        <search
          class="${classMap({
            container: true,
            [this.variant]: true,
            "has-value": hasValue,
          })}"
        >
          <span class="search-icon" aria-hidden="true">
            <mi-icon type="search"></mi-icon>
          </span>
          <input
            class="input"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="listbox"
            aria-expanded="${open}"
            aria-label="${this.label || nothing}"
            name="${this.name || nothing}"
            placeholder="${this.placeholder || nothing}"
            autocomplete="${this.autocomplete}"
            ?disabled="${this.disabled}"
            ?autofocus="${this.autofocus}"
            .value="${this.value}"
            @input="${this.#handleInput}"
            @change="${this.#handleChange}"
            @keydown="${this.#handleKeydown}"
            @compositionstart="${this.#handleCompositionStart}"
            @compositionend="${this.#handleCompositionEnd}"
            @focus="${this.#handleFocus}"
            @blur="${this.#handleBlur}"
            @click="${this.#handleInputClick}"
            @select="${this.#handleNativeSelect}"
          />
          ${showClear
            ? html`
                <button
                  type="button"
                  class="clear-button"
                  aria-label="クリア"
                  @mousedown="${this.#keepFocus}"
                  @click="${this.#handleClear}"
                >
                  <mi-icon type="cross-small"></mi-icon>
                </button>
              `
            : nothing}
        </search>
        <div
          id="listbox"
          class="listbox"
          role="listbox"
          aria-label="${this.label || nothing}"
          ?hidden="${!open}"
          @mousedown="${this.#keepFocus}"
          @click="${this.#handleListboxClick}"
        >
          <slot @slotchange="${this.#handleSlotChange}"></slot>
        </div>
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">
        ${open ? `${this.items.length}件の候補があります` : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-suggestion-search-box": MiSuggestionSearchBox;
  }
}

if (!customElements.get("mi-suggestion-search-box")) {
  customElements.define("mi-suggestion-search-box", MiSuggestionSearchBox);
}
