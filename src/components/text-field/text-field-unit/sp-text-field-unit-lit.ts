import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { spTextFieldUnitLitStyles } from "./sp-text-field-unit-lit-styles";

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
 * @summary Litで実装されたinputタグに相当するテキストフィールドです。テキストフィールドを説明するラベルがあります。
 *
 * @attr {string} text - テキストフィールドを説明するテキストです。テキストフィールドの上に表示されます。
 *
 * @attr {string} support-text - テキストフィールドを補足するテキストです。textで指定したテキストの下、テキストフィールドの上に表示されます。
 */
@customElement("sp-text-field-unit-lit")
export class SpTextFieldUnitLit extends LitElement {
  static styles = spTextFieldUnitLitStyles;
  static formAssociated = true;

  @property({ type: String, reflect: true })
  text = "";

  @property({ type: String, reflect: true })
  error = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, attribute: "support-text", reflect: true })
  supportText = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  type = "text";

  @property({ type: String, reflect: true })
  autocomplete: AutoFill = "off";

  @query("sp-label-unit-lit")
  private labelElement!: HTMLElement & { isEmpty(): boolean };

  @query("sp-text-field-lit")
  private inputElement!: HTMLElement & { value: string };

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // update form value when value changes
    if (changedProperties.has("value")) {
      this.internals.setFormValue(this.value);
    }
  }

  private get labelClasses() {
    const isEmpty = !this.text && !this.supportText;
    return isEmpty ? "label none" : "label";
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLElement & { value: string };
    this.value = target.value;

    // forward the input event
    this.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        composed: true,
        data: (event as InputEvent).data,
      }),
    );
  }

  render() {
    return html`
      <fieldset>
        <sp-label-unit-lit
          class="${this.labelClasses}"
          text="${this.text}"
          support-text="${this.supportText}"
        ></sp-label-unit-lit>
        <sp-text-field-lit
          error="${this.error}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          name="${this.name}"
          .value="${this.value}"
          type="${this.type}"
          autocomplete="${this.autocomplete}"
          @input="${this.handleInput}"
        ></sp-text-field-lit>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-unit-lit": SpTextFieldUnitLit;
  }
}
