import "@/components/text-field/error-message";
import "@/components/text-field/x-large/input";
import "@/components/text-field/label";

import { makeStyleSheet } from "@/components/styles";
import { type SpTextFieldErrorMessage } from "@/components/text-field/error-message";
import { type SpTextFieldXLargeInput } from "@/components/text-field/x-large/input";
import { type SpTextFieldLabel } from "@/components/text-field/label";

import styles from "./styles.css?inline";

export class SpTextFieldXLarge extends HTMLElement {
  static observedAttributes = ["error", "label"];

  readonly #shadow: ShadowRoot;

  #labelElm?: SpTextFieldLabel;

  #label?: string;

  #error?: string;

  #inputElm?: SpTextFieldXLargeInput;

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

    this.#labelElm = document.createElement("sp-text-field-label");
    this.#shadow.appendChild(this.#labelElm);
    if (this.#label) this.#labelElm.setAttribute("text", this.#label);
    if(this.#label)
        this.#labelElm.setText(this.#label);

    this.#inputElm = document.createElement("sp-text-field-x-large-input");
    this.#shadow.appendChild(this.#inputElm);

    this.#errorMessageElm = document.createElement(
      "sp-text-field-error-message",
    );
    this.#shadow.appendChild(this.#errorMessageElm);
    if (this.#error) this.#errorMessageElm.setAttribute("message", this.#error);
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "error") {
      this.#setError(newValue);
    } else if(name === "label") {
      this.#setLabel(newValue)
    }
  }

  #setLabel(label: string) {
      this.#label = label;
      this.#labelElm?.setText(label);
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
