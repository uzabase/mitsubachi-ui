import "../radio-button-text";

import { html, LitElement, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";

import { makeStyles } from "../../styles";
import type { MiRadioButtonText } from "../radio-button-text";
import radioButtonTextGroupStyle from "./styles.css?inline";

export class MiRadioButtonTextGroup extends LitElement {
  static styles = makeStyles(unsafeCSS(radioButtonTextGroupStyle));

  static formAssociated = true;

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: String, reflect: true })
  value = "";

  #initialValue = "";

  @query("slot")
  private slotEl!: HTMLSlotElement;

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
    const assigned = this.slotEl?.assignedElements({ flatten: true }) ?? [];
    return assigned.filter(
      (el) => el.tagName.toLowerCase() === "mi-radio-button-text",
    ) as MiRadioButtonText[];
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
