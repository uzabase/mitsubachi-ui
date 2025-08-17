import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { spTextFieldLitStyles } from "./sp-text-field-lit-styles";

type AutoFill =
  | "off"
  | "on"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"
  | "email"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organization-title"
  | "organization"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "tel"
  | "tel-country-code"
  | "tel-national"
  | "tel-area-code"
  | "tel-local"
  | "tel-extension"
  | "impp"
  | "url"
  | "photo"
  | "webauthn";

/**
 * @summary Litで実装されたテキストフィールドです。
 */
@customElement("sp-text-field-lit")
export class SpTextFieldLit extends LitElement {
  static styles = spTextFieldLitStyles;
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

  @query(".input")
  private inputElement!: HTMLInputElement;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (this.inputElement) {
      // sync properties with input element
      this.inputElement.type = this.type;
      this.inputElement.placeholder = this.placeholder;
      this.inputElement.autocomplete = this.autocomplete;
      this.inputElement.disabled = this.disabled;
      this.inputElement.name = this.name;
      this.inputElement.value = this.value;

      // update form value
      this.internals.setFormValue(this.value);
    }
  }

  private get inputClasses() {
    const classes = ["input"];
    if (this.error && !this.disabled) {
      classes.push("error");
    }
    return classes.join(" ");
  }

  private get errorText() {
    return this.disabled ? "" : this.error;
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;

    // dispatch custom input event with composed: true for password managers
    if (!event.composed) {
      this.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          composed: true,
          data: (event as InputEvent).data,
        }),
      );
    }
  }

  render() {
    return html`
      <input
        class="${this.inputClasses}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="${this.autocomplete}"
        ?disabled="${this.disabled}"
        name="${this.name}"
        .value="${this.value}"
        aria-invalid="${this.error && !this.disabled ? "true" : "false"}"
        @input="${this.handleInput}"
      />
      <sp-text-field-error-text-lit
        text="${this.errorText}"
      ></sp-text-field-error-text-lit>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-lit": SpTextFieldLit;
  }
}
