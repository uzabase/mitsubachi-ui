import "./error-text";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../../styles";
import textFieldStyle from "./styles.css?inline";

/**
 * @summary テキストフィールドです。
 */
export class MiTextField extends LitElement {
  static styles = makeStyles(unsafeCSS(textFieldStyle));

  static formAssociated = true;

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

  #inputClasses() {
    return classMap({
      input: true,
      error: this.error && !this.disabled,
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

  render() {
    return html`
      <input
        class="${this.#inputClasses()}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="${this.autocomplete}"
        ?disabled="${this.disabled}"
        name="${this.name}"
        .value="${this.value}"
        aria-invalid="${this.error && !this.disabled ? "true" : "false"}"
        @input="${this.#handleInput}"
      />
      <mi-text-field-error-text
        text="${this.disabled ? "" : this.error}"
      ></mi-text-field-error-text>
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
