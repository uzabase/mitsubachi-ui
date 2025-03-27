import "../text-field";
import "../../label-unit";

import { type SpLabelUnit } from "../../label-unit";
import { makeStyleSheet } from "../../styles";
import { type SpTextField } from "../text-field";
import styles from "./styles.css?inline";

export class SpTextFieldUnit extends HTMLElement {
  static observedAttributes = [
    "error",
    "text",
    "placeholder",
    "support-text",
    "disabled",
    "name",
    "type",
    "value",
    'autocomplete'
  ];

  static formAssociated = true;

  

  set text(text: string) {
    this.#label.text = text;
    this.#updateStyle();
  }

  set error(text: string) {
    this.#input.error = text;
  }

  set disabled(newValue: boolean) {
    this.#input.disabled = newValue;
  }

  set placeholder(newValue: string) {
    this.#input.placeholder = newValue;
  }

  set name(value: string) {
    this.#input.name = value;
  }

  get value(): string {
    return this.#input.value;
  }

  set value(value: string) {
    this.#input.value = value;
    this.#internals.setFormValue(this.value);
  }

  set type(newValue: string) {
    this.#input.type = newValue;
  }

  set supportText(value: string) {
    this.#label.supportText = value;
    this.#updateStyle();
  }

  #label: SpLabelUnit = document.createElement("sp-label-unit");

  #input: SpTextField = document.createElement("sp-text-field");

  #internals: ElementInternals;

  #initialized = false;

  #inputHandler = (e: Event) => {
    const target = e.target as SpTextField;
    this.value = target.value;
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  connectedCallback() {
    this.#input.addEventListener("input", this.#inputHandler);

    if (!this.shadowRoot || this.#initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];
    const fieldSet = document.createElement("fieldset");
    this.shadowRoot.appendChild(fieldSet);
    fieldSet.appendChild(this.#label);
    this.#label.classList.add("label");
    fieldSet.appendChild(this.#input);

    this.#initialized = true;
  }

  disconnectedCallback() {
    this.#input.removeEventListener("input", this.#inputHandler);
  }

  attributeChangedCallback(name: 'error' | 'text' |'placeholder' | 
    'disabled' | 'name' | 'value' | 'type' | 'support-text' | 
    'autocomplete', _: string, newValue: string | null) {
    if(newValue === null && this.getAttribute(name) !== null) {
      this.removeAttribute(name);
      return;
    } 
    newValue = newValue ? newValue : "";
    if(this.getAttribute(name) !== newValue) {
      this.setAttribute(name, newValue);
      return;
    }
    if(name === 'disabled') {
      this.disabled = newValue ? true : false;
      return;
    } else if(name === 'support-text') {
      this.supportText = newValue;
      return;
    } else if(name === 'autocomplete') {
      this.#input.autocomplete = newValue as AutoFill;
      return;
    }
    this[name] = newValue;
  }

  #updateStyle() {
    if (this.#label.isEmpty()) {
      this.#label.classList.add("none");
    } else {
      this.#label.classList.remove("none");
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
