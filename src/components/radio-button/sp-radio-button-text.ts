import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import radioButtonTextStyle from "./radio-button-text.css?inline";

export class SpRadioButtonText extends LitElement {
  static styles = makeStyles(unsafeCSS(radioButtonTextStyle));

  static formAssociated = true;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  constructor() {
    super();
    this.setAttribute("role", "radio");
  }

  render() {
    return html`
      <div class="base">
        <span class="radio">
          <input
            type="radio"
            class="input"
            id="radio-button-text"
            .value=${this.value}
            .name=${this.name}
            .checked=${this.checked}
            .disabled=${this.disabled}
          />
        </span>
        <label for="radio-button-text" class="text">
          <slot></slot>
        </label>
      </div>
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
