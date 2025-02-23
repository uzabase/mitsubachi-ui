import "@/components/text-field/error-message";
import "@/components/text-field/x-large/input";
import "@/components/text-field/label";

import { makeStyleSheet } from "@/components/styles";
import { type SpTextFieldErrorMessage } from "@/components/text-field/error-message";
import { type SpTextFieldLabel } from "@/components/text-field/label";
import { type SpTextFieldXLargeInput } from "@/components/text-field/x-large/input";

import styles from "./styles.css?inline";

export class SpTextFieldXLarge extends HTMLElement {
  static observedAttributes = ["error", "label", "placeholder"];

  get label(): string {
      return this.#label;
  }

  set label(text: string) {
    this.#label = text;

    if(this.#labelElm)
      this.#labelElm.text = text;
  }

  get error(): string {
    return this.#error;
  }

  set error(text: string) {
    this.#error = text;
    console.log('error###', text); 
    if(this.#errorMessageElm)
        this.#errorMessageElm.message = this.error;
    if(this.#inputElm)
        this.#inputElm.error = this.error ? true : false;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  set disabled(newValue: boolean) {
    this.#disabled = newValue;
    if(this.#inputElm)
      this.#inputElm.disabled = newValue;
  }

  set placeholder(newValue: string | undefined | null) {
    if(newValue) {
      this.#placeholder = newValue;
      }  else
      this.#placeholder = '';
    if(this.#inputElm)
      this.#inputElm.placeholder = this.#placeholder;
  }

  readonly #shadow: ShadowRoot;

  #labelElm?: SpTextFieldLabel;

  #label: string = '';

  #error: string = '';

  #inputElm?: SpTextFieldXLargeInput;

  #errorMessageElm?: SpTextFieldErrorMessage;

  #disabled: boolean = false;

  #placeholder: string = '';

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
    this.label = this.#label;

    this.#inputElm = document.createElement("sp-text-field-x-large-input");
    this.#shadow.appendChild(this.#inputElm);
    this.placeholder = this.#placeholder;
    this.disabled = this.#disabled;
    this.error = this.#error;

    this.#errorMessageElm = document.createElement(
      "sp-text-field-error-message",
    );
    this.#shadow.appendChild(this.#errorMessageElm);
    this.#errorMessageElm.message = this.error;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "error") {
      this.error = newValue;
    } else if(name === "label") {
      this.label = newValue;
    } else if(name === 'placeholder') {
      this.placeholder = newValue;
    }
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
