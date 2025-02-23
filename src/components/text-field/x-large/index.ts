import "@/components/text-field/error-message";
import "@/components/text-field/x-large/input";
import "@/components/text-field/label";

import { makeStyleSheet } from "@/components/styles";
import { type SpTextFieldErrorMessage } from "@/components/text-field/error-message";
import { type SpTextFieldLabel } from "@/components/text-field/label";
import { type SpTextFieldXLargeInput } from "@/components/text-field/x-large/input";

import styles from "./styles.css?inline";

export class SpTextFieldXLarge extends HTMLElement {
  static observedAttributes = ["error", "label", "placeholder", "disabled"];

  get label(): string {
    return this.#label;
  }

  set label(text: string) {
    this.#label = text;
    if (this.#labelElm) this.#labelElm.text = text;
  }

  get error(): string {
    return this.#error;
  }

  set error(text: string) {
    this.#error = text;
    if (this.#errorMessageElm) {
      if (this.#disabled) this.#errorMessageElm.message = "";
      else this.#errorMessageElm.message = this.error;
    }
    if (this.#inputElm) this.#inputElm.error = this.error ? true : false;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  set disabled(newValue: boolean) {
    this.#disabled = newValue;
    if (this.#inputElm) this.#inputElm.disabled = newValue;
    if (this.#errorMessageElm) {
      if (this.disabled) this.#errorMessageElm.message = "";
      else this.#errorMessageElm.message = this.error;
    }
  }

  set placeholder(newValue: string | undefined | null) {
    if (newValue) {
      this.#placeholder = newValue;
    } else this.#placeholder = "";
    if (this.#inputElm) this.#inputElm.placeholder = this.#placeholder;
  }

  #labelElm?: SpTextFieldLabel;

  #label: string = "";

  #error: string = "";

  #inputElm?: SpTextFieldXLargeInput;

  #errorMessageElm?: SpTextFieldErrorMessage;

  #disabled: boolean = false;

  #placeholder: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#labelElm = document.createElement("sp-text-field-label");
    this.shadowRoot.appendChild(this.#labelElm);

    this.#inputElm = document.createElement("sp-text-field-x-large-input");
    this.shadowRoot.appendChild(this.#inputElm);

    this.#errorMessageElm = document.createElement(
      "sp-text-field-error-message",
    );
    this.shadowRoot.appendChild(this.#errorMessageElm);

    this.label = this.#label;
    this.placeholder = this.#placeholder;
    this.disabled = this.#disabled;
    this.error = this.#error;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "error") {
      this.error = newValue ? newValue : "";
    } else if (name === "label") {
      this.label = newValue ? newValue : "";
    } else if (name === "placeholder") {
      this.placeholder = newValue;
    } else if (name === "disabled") {
      this.disabled = newValue == null ? false : true;
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
