import "../label-unit";
import "./mi-suggestion-search-box";

import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { MitsubachiElement } from "../../mitsubachi-element";
import type { SearchBoxVariant } from "../search-box/mi-search-box";
import { makeStyles } from "../styles";
import type { MiSuggestionSearchBox } from "./mi-suggestion-search-box";
import { suggestionSearchBoxUnitStyles } from "./suggestion-search-box-unit.styles";

/**
 * サジェスト付き検索ボックスとラベルを組み合わせたコンポーネントです。
 *
 * 候補は `mi-suggestion-search-box` と同じく `mi-suggestion-item` を直接の子として並べます。
 * ラベルをクリックすると入力欄にフォーカスします。
 *
 * ```html
 * <mi-suggestion-search-box-unit text="企業検索" placeholder="企業名で検索">
 *   <mi-suggestion-item value="7203">トヨタ自動車</mi-suggestion-item>
 * </mi-suggestion-search-box-unit>
 * ```
 *
 * @summary ラベル付きのサジェスト付き検索ボックスです。
 *
 * @attr {string} text - 検索ボックスを説明するテキストです。検索ボックスの上に表示され、入力欄と候補リストの読み上げ名にもなります。
 *
 * @slot - 候補（mi-suggestion-item）
 *
 * @fires input - mi-suggestion-search-box と同じ。日本語入力の変換中は発火せず、確定時に1回だけ発火します。
 * @fires change - mi-suggestion-search-box と同じ。値の確定（主にフォーカスが外れたとき）。
 * @fires select - mi-suggestion-search-box と同じ。`detail.value` に候補の value が入ります。bubbles / composed / cancelable はすべて false。
 */
export class MiSuggestionSearchBoxUnit extends MitsubachiElement {
  static styles = makeStyles(suggestionSearchBoxUnitStyles);

  static formAssociated = true;

  /**
   * delegatesFocus により、ラベルなど内側のフォーカスできない場所をクリックすると、
   * 最初のフォーカス可能な要素（入力欄）にフォーカスが移る。ネイティブの label と同じ操作性になる。
   * mi-label-unit は <label> ではなく入力欄も別の Shadow DOM 内にあるため、for 属性では関連付けられない。
   */
  static shadowRootOptions = {
    ...MitsubachiElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** ラベルテキスト。入力欄と候補リストの読み上げ名にもなる */
  @property({ type: String, reflect: true })
  text = "";

  @property({ type: String, reflect: true })
  variant: SearchBoxVariant = "primary";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  autocomplete: AutoFill = "off";

  @property({ type: Boolean, reflect: true })
  autofocus = false;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.internals.setFormValue(this.value);
    }
  }

  /**
   * 内側の値を自身に同期する。
   *
   * 文字入力による `input` は `composed: true` で Shadow DOM を越えるためそのまま届く。
   * 日本語変換の確定時やクリア時の `input` は内側が `composed: false` で発火し直したものなので、
   * この境界を越えられない。それだけを止めてから自身の `input` として発火し直す。
   */
  #handleInput(e: Event) {
    this.value = (e.target as MiSuggestionSearchBox).value;
    if (e.composed) return;

    e.stopPropagation();
    const { data, inputType } = e as InputEvent;
    this.dispatchEvent(
      new InputEvent("input", {
        bubbles: false,
        composed: false,
        data,
        inputType,
      }),
    );
  }

  /** 内側の change を止め、自身の change として発火し直す（bubbles などは内側と同じ） */
  #handleChange(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new Event("change", {
        bubbles: false,
        cancelable: e.cancelable,
        composed: false,
      }),
    );
  }

  /** 内側の select を止め、自身の select として発火し直す（bubbles などは内側と同じ） */
  #handleSelect(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("select", { detail: (e as CustomEvent).detail }),
    );
  }

  #labelClasses() {
    return classMap({
      label: true,
      none: !this.text,
    });
  }

  render() {
    return html`
      <fieldset>
        <mi-label-unit
          class="${this.#labelClasses()}"
          text="${this.text}"
        ></mi-label-unit>
        <!--
          name は内側に渡さない。フォーム値はこのコンポーネントが ElementInternals で管理しており、
          内側の mi-suggestion-search-box は Shadow DOM 内にあるため外側の <form> には参加できない。
        -->
        <mi-suggestion-search-box
          label="${this.text}"
          variant="${this.variant}"
          placeholder="${this.placeholder}"
          autocomplete="${this.autocomplete}"
          ?disabled="${this.disabled}"
          ?autofocus="${this.autofocus}"
          .value="${this.value}"
          @input="${this.#handleInput}"
          @change="${this.#handleChange}"
          @select="${this.#handleSelect}"
        >
          <slot></slot>
        </mi-suggestion-search-box>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-suggestion-search-box-unit": MiSuggestionSearchBoxUnit;
  }
}

if (!customElements.get("mi-suggestion-search-box-unit")) {
  customElements.define(
    "mi-suggestion-search-box-unit",
    MiSuggestionSearchBoxUnit,
  );
}
