import "./mi-radio-button-text";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import type { MiRadioButtonText } from "./mi-radio-button-text";

export class MiRadioButtonTextGroup extends LitElement {
  static formAssociated = true;

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: String, reflect: true })
  value = "";

  #initialValue = "";

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", this.#handleChange, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", this.#handleChange, true);
  }

  protected firstUpdated() {
    this.#initialValue = this.value;
    this.#syncRadioButtonTexts();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("name")) {
      this.#syncRadioButtonTexts();
    }
  }

  formResetCallback() {
    this.value = this.#initialValue;
    this.#syncRadioButtonTexts();
  }

  render() {
    return html`<slot @slotchange="${this.#handleSlotChange}"></slot>`;
  }

  #getRadioButtonTexts(): MiRadioButtonText[] {
    return Array.from(this.querySelectorAll("mi-radio-button-text"));
  }

  #syncRadioButtonTexts() {
    for (const radioButtonText of this.#getRadioButtonTexts()) {
      radioButtonText.name = this.name;
      radioButtonText.checked = radioButtonText.value === this.value;
    }
  }

  #handleSlotChange = () => {
    this.#syncRadioButtonTexts();
  };

  #handleChange = (e: Event) => {
    const radioButtonText = (e.target as Element).closest(
      "mi-radio-button-text",
    ) as MiRadioButtonText | null;
    if (!radioButtonText || e.target !== radioButtonText) return;

    e.stopPropagation();

    if (radioButtonText.disabled || !radioButtonText.checked) return;
    if (radioButtonText.value === this.value) return;

    this.value = radioButtonText.value;
    this.#syncRadioButtonTexts();
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: radioButtonText.value },
        bubbles: true,
        composed: true,
      }),
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-radio-button-text-group": MiRadioButtonTextGroup;
  }
}

if (!customElements.get("mi-radio-button-text-group")) {
  customElements.define("mi-radio-button-text-group", MiRadioButtonTextGroup);
}
