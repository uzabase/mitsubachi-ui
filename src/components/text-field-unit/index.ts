import "./error-text";
import "./input";
import "./label";

import { makeStyleSheet } from "../styles";
import { type SpTextFieldErrorText } from "./error-text";
import { type SpTextFieldXLargeInput } from "./input";
import { type SpTextFieldLabel } from "./label";
import styles from "./styles.css?inline";

export class SpTextFieldUnit extends HTMLElement {
  static observedAttributes = [
    "error",
    "text",
    "placeholder",
    "disabled",
    "name",
    "value",
  ];

  static formAssociated = true;

  get text(): string {
    return this.#labelElm.text;
  }

  set text(text: string) {
    this.#labelElm.text = text;
  }

  get error(): string {
    return this.#error;
  }

  set error(text: string) {
    this.#error = text;
    if (this.#errorTextElm) {
      if (this.disabled) this.#errorTextElm.text = "";
      else this.#errorTextElm.text = this.error;
    }
    if (this.#inputElm) this.#inputElm.error = this.error ? true : false;
  }

  get disabled(): boolean {
    return this.#inputElm.disabled;
  }

  set disabled(newValue: boolean) {
    this.#inputElm.disabled = newValue;
    if (this.#errorTextElm) {
      if (this.disabled) this.#errorTextElm.text = "";
      else this.#errorTextElm.text = this.error;
    }
  }

  set placeholder(newValue: string | undefined | null) {
    if (newValue) {
      this.#inputElm.placeholder = newValue;
    } else this.#inputElm.placeholder = "";
  }

  get name(): string {
    return this.#inputElm.name;
  }

  set name(value: string) {
    this.#inputElm.name = value;
    if (this.#labelElm) {
      this.#labelElm.htmlFor = this.name;
    }
  }

  get value(): string {
    return this.#inputElm.value;
  }

  set value(value: string) {
    this.#inputElm.value = value;
    this.#internals.setFormValue(this.value);
  }

  #labelElm: SpTextFieldLabel = document.createElement("sp-text-field-label");

  #error: string = "";

  #inputElm: SpTextFieldXLargeInput = document.createElement(
    "sp-text-field-x-large-input",
  );

  #errorTextElm?: SpTextFieldErrorText;

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

    this.shadowRoot.appendChild(this.#labelElm);

    this.shadowRoot.appendChild(this.#inputElm);

    this.#errorTextElm = document.createElement("sp-text-field-error-text");
    this.shadowRoot.appendChild(this.#errorTextElm);

    this.error = this.#error;

    this.#inputElm.addEventListener("input", (e) => {
      this.value = (e.target as SpTextFieldXLargeInput).value;
    });
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "error") {
      this.error = newValue ? newValue : "";
    } else if (name === "text") {
      this.text = newValue ? newValue : "";
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

const tagName = "sp-text-field-unit";
declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-unit": SpTextFieldUnit;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldUnit);
}
