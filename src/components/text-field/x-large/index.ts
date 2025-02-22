import "@/components/text-field/error-message";
import "@/components/text-field/x-large/input";
import "@/components/text-field/label";

import { makeStyleSheet } from "@/components/styles";
import { type SpTextFieldErrorMessage } from "@/components/text-field/error-message";
import { type SpTextFieldLabel } from "@/components/text-field/label";
import { type SpTextFieldXLargeInput } from "@/components/text-field/x-large/input";

import styles from "./styles.css?inline";

export class SpTextFieldXLarge extends HTMLElement {
  static observedAttributes = ["error", "label"];

  readonly #shadow: ShadowRoot;

  #labelElm?: SpTextFieldLabel;

  get label(): string | undefined {
    if(this.#labelElm) {
      if(this.#labelElm.text === this.#label)
        throw new Error("out of sync");

      return this.#labelElm.text;
    }
    else
      return this.#label;
  }

  set label(text: string) {
    this.#label = text;

    if(this.#labelElm)
      this.#labelElm.text = text;
  }

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
    if(this.#label)
      this.label = this.#label;

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
      this.label = newValue;
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
