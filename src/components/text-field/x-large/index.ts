import "@/components/text-field/error-message";

import { makeStyleSheet } from "@/components/styles";
import { type SpTextFieldErrorMessage } from "@/components/text-field/error-message";
import styles from "@/components/text-field/error-message/styles.css?inline";

export class SpTextFieldXLarge extends HTMLElement {

  static observedAttributes = ["error"];

  readonly #shadow: ShadowRoot;

  #error?: string;

  #errorMessageElm?: SpTextFieldErrorMessage;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#shadow.adoptedStyleSheets = [
      ...this.#shadow.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];
    this.#errorMessageElm = document.createElement("sp-text-field-error-message");
    this.#shadow.appendChild(this.#errorMessageElm);
    if(this.#error)
      this.#errorMessageElm.setAttribute("message", this.#error);

  }
  attributeChangedCallback(name: string, _: string, newValue: string) {
    console.log('attribute');
    if (name === "error") {
      this.#setError(newValue);
    }
  }

  #setError(error: string) {
    this.#error = error;
    this.#errorMessageElm?.setAttribute("message", this.#error);
  }

}

const tagName = "sp-text-field-x-large";
declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-x-large": SpTextFieldXLarge;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldXLarge);
}
