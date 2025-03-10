import "../text-field";
import "../../label-unit";

import { type SpLabelUnit } from "../../label-unit";
import { makeStyleSheet } from "../../styles";
import { type SpTextField } from "../text-field";

export class SpTextFieldUnit extends HTMLElement {
  static observedAttributes = [
    "error",
    "text",
    "placeholder",
    "supporttet",
    "disabled",
    "name",
    "type",
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
    return this.#inputElm.error;
  }

  set error(text: string) {
    this.#inputElm.error = text;
  }

  get disabled(): boolean {
    return this.#inputElm.disabled;
  }

  set disabled(newValue: boolean) {
    this.#inputElm.disabled = newValue;
  }

  set placeholder(newValue: string) {
    this.#inputElm.placeholder = newValue;
  }

  get name(): string {
    return this.#inputElm.name;
  }

  set name(value: string) {
    this.#inputElm.name = value;
  }

  get value(): string {
    return this.#inputElm.value;
  }

  set value(value: string) {
    this.#inputElm.value = value;
    this.#internals.setFormValue(this.value);
  }

  get type(): string {
    return this.#inputElm.type;
  }
  set type(newValue: string) {
    this.#inputElm.type = newValue;
  }

  #labelElm: SpLabelUnit = document.createElement("sp-label-unit");

  #inputElm: SpTextField = document.createElement("sp-text-field");

  #internals: ElementInternals;

  #initialized = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#internals = this.attachInternals();
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(),
    ];
    const fieldSet = document.createElement("fieldset");
    this.shadowRoot.appendChild(fieldSet);
    fieldSet.appendChild(this.#labelElm);
    fieldSet.appendChild(this.#inputElm);

    this.#initialized = true;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "error") {
      this.error = newValue ? newValue : "";
    } else if (name === "text") {
      this.text = newValue ? newValue : "";
    } else if (name === "placeholder") {
      this.placeholder = newValue ? newValue : "";
    } else if (name === "disabled") {
      this.disabled = newValue !== null;
    } else if (name === "name") {
      this.name = newValue ? newValue : "";
    } else if (name === "value") {
      this.value = newValue ? newValue : "";
    } else if (name == "type") {
      this.#inputElm.type = newValue ? newValue : "";
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
