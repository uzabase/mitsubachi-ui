import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import styles from "./radio-button-text.styles";

export class SpRadioButtonText extends LitElement {
  static styles = makeStyles(styles);

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  #uniqueId = `radio-${Math.random().toString(36).slice(2)}`;

  static formAssociated = true;
  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("checked")) {
      this.#internals.setFormValue(this.checked ? this.value : null);
    }
  }

  formResetCallback() {
    this.checked = this.hasAttribute("checked");
  }

  render() {
    return html`
      <label class="base">
        <input
          type="radio"
          class="input"
          aria-labelledby="${this.#uniqueId}"
          .value=${this.value}
          .name=${this.name}
          .checked=${this.checked}
          .disabled=${this.disabled}
        />
        <span class="radio" aria-hidden="true"></span>
        <span class="text" id="${this.#uniqueId}" aria-hidden="true">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-radio-button-text": SpRadioButtonText;
  }
}

if (!customElements.get("sp-radio-button-text")) {
  customElements.define("sp-radio-button-text", SpRadioButtonText);
}
