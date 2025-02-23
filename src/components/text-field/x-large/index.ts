import "../error-message";
import "./input";
import "../label";

import { makeStyleSheet } from "../../styles";
import { type SpTextFieldErrorMessage } from "../error-message";
import { type SpTextFieldLabel } from "../label";
import { type SpTextFieldXLargeInput } from "./input";
import styles from "./styles.css?inline";

export class SpTextFieldXLarge extends HTMLElement {
  static observedAttributes = [
    "error",
    "label",
    "placeholder",
    "disabled",
    "name",
    "value",
  ];

  static formAssociated = true;

  get label(): string {
    return this.#label;
  }

  set label(text: string) {
    this.#label = text;
    if (this.#labelElm) this.#labelElm.textContent = text;
  }

  get error(): string {
    return this.#error;
  }

  set error(text: string) {
    this.#error = text;
    if (this.#errorMessageElm) {
      if (this.#disabled) this.#errorMessageElm.textContent = null;
      else this.#errorMessageElm.textContent = this.error;
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
      if (this.disabled) this.#errorMessageElm.textContent = "";
      else this.#errorMessageElm.textContent = this.error;
    }
  }

  set placeholder(newValue: string | undefined | null) {
    if (newValue) {
      this.#placeholder = newValue;
    } else this.#placeholder = "";
    if (this.#inputElm) this.#inputElm.placeholder = this.#placeholder;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
    if (this.#inputElm) {
      this.#inputElm.name = this.name;
    }
    if (this.#labelElm) {
      this.#labelElm.htmlFor = this.name;
    }
  }

  get value(): string {
    return this.#value;
  }

  set value(value: string) {
    this.#value = value;
    if (this.#inputElm) {
      this.#inputElm.value = this.value;
    }
    this.#internals.setFormValue(this.value);
  }

  #labelElm?: SpTextFieldLabel;

  #label: string = "";

  #error: string = "";

  #inputElm?: SpTextFieldXLargeInput;

  #errorMessageElm?: SpTextFieldErrorMessage;

  #disabled: boolean = false;

  #placeholder: string = "";

  #name: string = "";

  #value: string = "";

  #internals: ElementInternals;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
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
    this.name = this.#name;
    this.value = this.#value;

    this.#inputElm.addEventListener("input", (e) => {
      this.value = (e.target as SpTextFieldXLargeInput).value;
    });
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
    } else if (name === "name") {
      this.name = newValue ? newValue : "";
    } else if (name === "value") {
      this.value = newValue ? newValue : "";
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
