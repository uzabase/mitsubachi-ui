import "./error-text";
import "../../helper-text/mi-helper-text";

import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../../styles";
import style from "./text-field.styles";

/**
 * @summary テキストフィールドです。
 */
export class MiTextField extends LitElement {
  static styles = makeStyles(style);

  static formAssociated = true;

  /** @deprecated 代わりに `slot="error"` を使用してください */
  @property({ type: String, reflect: true })
  error = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, reflect: true })
  autocomplete: AutoFill = "off";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  type = "text";

  @property({ type: Boolean, reflect: true })
  autofocus = false;

  @property({ type: Boolean, attribute: "submit-on-enter", reflect: true })
  submitOnEnter = false;

  @state()
  private _slottedErrorHtml: string[] = [];

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

  get #hasError() {
    return !this.disabled && (!!this.error || this._slottedErrorHtml.length > 0);
  }

  #handleErrorSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._slottedErrorHtml = slot
      .assignedElements()
      .map((el) => el.innerHTML)
      .filter((h) => h.trim() !== "");
  }

  #errorIdPrefix = "error";

  get #errorCount(): number {
    if (this.disabled) return 0;
    let count = this._slottedErrorHtml.length;
    if (this.error) count++;
    return count;
  }

  get #errorIds(): string[] {
    return Array.from(
      { length: this.#errorCount },
      (_, i) => `${this.#errorIdPrefix}-${i}`,
    );
  }

  #inputClasses() {
    return classMap({
      input: true,
      error: this.#hasError,
    });
  }

  #handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    // 1パスワードがパスワードを自動入力したときのイベントにcomposedがなかったため、mi-text-field-unitにinputイベントが伝搬されず、
    // 自動入力されたパスワードがformで送信されないことがありました。
    // そのため、composedがfalseのイベントがinputタグで発生したら、代わりに発火します。
    if (!e.composed) {
      this.dispatchEvent(
        new InputEvent("input", {
          ...e,
          composed: true,
        }),
      );
    }
  }

  #handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (e.isComposing) return; // IMEでEnterが押されたときは無視する

      // submitOnEnterが指定されている場合、Enterキーでフォームを送信する
      if (this.submitOnEnter) {
        const form = this.internals.form;
        form?.requestSubmit();
      }
    }
  }

  render() {
    return html`
      <input
        class="${this.#inputClasses()}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="${this.autocomplete}"
        ?autofocus="${this.autofocus}"
        ?disabled="${this.disabled}"
        name="${this.name}"
        .value="${this.value}"
        aria-invalid="${this.#hasError ? "true" : "false"}"
        aria-describedby="${this.#hasError ? this.#errorIds.join(" ") : ""}"
        @input="${this.#handleInput}"
        @keydown="${this.#handleKeyDown}"
      />
      <slot
        name="error"
        @slotchange=${this.#handleErrorSlotChange}
        hidden
      ></slot>
      ${!this.disabled && this.error
        ? html`<mi-helper-text
            id="${this.#errorIdPrefix}-0"
            status="error"
            size="medium"
            >${this.error}</mi-helper-text
          >`
        : nothing}
      ${!this.disabled
        ? this._slottedErrorHtml.map((content, i) => {
            const idx = this.error ? i + 1 : i;
            return html`<mi-helper-text
              id="${this.#errorIdPrefix}-${idx}"
              status="error"
              size="medium"
              >${unsafeHTML(content)}</mi-helper-text
            >`;
          })
        : nothing}
    `;
  }
}

/** @deprecated 代わりに MiTextField を使用してください */
export class SpTextField extends MiTextField {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-text-field": MiTextField;
    "sp-text-field": SpTextField;
  }
}

if (!customElements.get("mi-text-field")) {
  customElements.define("mi-text-field", MiTextField);
}

if (!customElements.get("sp-text-field")) {
  customElements.define("sp-text-field", SpTextField);
}
