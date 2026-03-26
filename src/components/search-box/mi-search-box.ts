import "../icon";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../styles";
import searchBoxStyle from "./search-box.css?inline";

export type SearchBoxVariant = "primary" | "secondary";

/**
 * @summary ユーザーが必要な情報を素早く見つけるための入力コンポーネントです。
 * キーワードの入力に応じて、候補表示や検索実行を行い、コンテンツ探索の効率を高めます。
 *
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 *
 * @attr {string} variant - 見た目のバリアント（`primary` | `secondary`）。デフォルトは `primary`。
 * @attr {string} value - 入力値の文字列。
 * @attr {string} placeholder - プレースホルダー。
 * @attr {string} name - フォームの name。
 * @attr {boolean} disabled - 無効化するかどうか。
 * @attr {string} autocomplete - autocomplete 属性。
 * @attr {boolean} autofocus - 自動フォーカスするかどうか。
 * @fires input - 内部の `input` と同様。シャドウ内で `composed` が付かない場合、ホストで `composed: true` として再発火します。
 * @fires change - 内部の `change`（値の確定、主にフォーカスが外れたとき）と同様。シャドウを越えて受け取れるよう必要時に再発火します。
 * @fires clear - クリアボタンが押されたときに発火します。
 */
export class MiSearchBox extends LitElement {
  static styles = makeStyles(unsafeCSS(searchBoxStyle));

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  @property({ type: String, reflect: true })
  variant: SearchBoxVariant = "primary";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, reflect: true })
  name = "";

  /** 内部の `input` に付与する id（`<label for>` と紐づける場合に指定）。 */
  @property({ type: String, attribute: "input-id", reflect: true })
  inputId = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  autocomplete: AutoFill = "off";

  @property({ type: Boolean, reflect: true })
  autofocus = false;

  @query("input")
  private inputEl!: HTMLInputElement;

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

  #containerClasses() {
    const hasValue = this.value.length > 0;
    return classMap({
      container: true,
      [this.variant]: true,
      "has-value": hasValue,
    });
  }

  #handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    if (!e.composed) {
      this.dispatchEvent(
        new InputEvent("input", {
          ...e,
          composed: true,
        }),
      );
    }
  }

  /**
   * React の SearchBox が渡す `onChange` はテキスト入力ではキー入力のたびに呼ばれる（ネイティブの `input` に近い）一方、
   * ネイティブ DOM の `change` は主にフォーカス喪失時など値が確定したときに発火する。
   * シャドウ内の `change` は `composed` が付かないことが多いため、ホストまで届くよう再発火する。
   */
  #handleChange(e: Event) {
    if (!e.composed) {
      this.dispatchEvent(
        new Event("change", {
          bubbles: e.bubbles,
          cancelable: e.cancelable,
          composed: true,
        }),
      );
    }
  }

  #handleClear() {
    this.value = "";
    if (this.inputEl) {
      this.inputEl.value = "";
    }
    this.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        composed: true,
        data: null,
        inputType: "deleteContentBackward",
      }),
    );
    this.dispatchEvent(
      new CustomEvent("clear", { bubbles: true, composed: true }),
    );
    this.inputEl?.focus();
  }

  render() {
    const hasValue = this.value.length > 0;
    const showClear = hasValue && !this.disabled;

    return html`
      <search class="${this.#containerClasses()}">
        <span class="search-icon" aria-hidden="true">
          <mi-icon type="search"></mi-icon>
        </span>
        <input
          class="input"
          type="search"
          id="${this.inputId || nothing}"
          name="${this.name || nothing}"
          placeholder="${this.placeholder || nothing}"
          autocomplete="${this.autocomplete}"
          ?disabled="${this.disabled}"
          ?autofocus="${this.autofocus}"
          .value="${this.value}"
          @input="${this.#handleInput}"
          @change="${this.#handleChange}"
        />
        ${showClear
          ? html`
              <button
                type="button"
                class="clear-button"
                aria-label="クリア"
                @click="${this.#handleClear}"
              >
                <mi-icon type="cross-small"></mi-icon>
              </button>
            `
          : nothing}
      </search>
    `;
  }
}

/** @deprecated 代わりに MiSearchBox を使用してください */
export class SpSearchBox extends MiSearchBox {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-search-box": MiSearchBox;
    "sp-search-box": SpSearchBox;
  }
}

if (!customElements.get("mi-search-box")) {
  customElements.define("mi-search-box", MiSearchBox);
}

if (!customElements.get("sp-search-box")) {
  customElements.define("sp-search-box", SpSearchBox);
}
