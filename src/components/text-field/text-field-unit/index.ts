import "../text-field";
import "../../label-unit";

import { type SpLabelUnit } from "../../label-unit";
import { makeStyleSheet } from "../../styles";
import { type SpTextField } from "../text-field";
import styles from "./styles.css?inline";

/**
 * @summary inputタグに相当するテキストフィールドです。テキストフィールドを説明するラベルがあります。
 *
 * @attr {string} text - テキストフィールドを説明するテキストです。テキストフィールドの上に表示されます。
 * 
 * @attr {string} support-text - テキストフィールドを補足するテキストです。textで指定したテキストの下、テキストフィールドの上に表示されます。
 */
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
    "autocomplete",
  ];

  static formAssociated = true;

  set text(text: string) {
    this.#label.text = text;
    this.#updateStyle();
    this.#updateAttribute("text", text);
  }

  set error(text: string) {
    this.#input.error = text;
    this.#updateAttribute("error", text);
  }

  set disabled(newValue: boolean) {
    this.#input.disabled = newValue;
    if (newValue) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
  }

  set placeholder(newValue: string) {
    this.#input.placeholder = newValue;
    this.#updateAttribute("placeholder", newValue);
  }

  set name(value: string) {
    this.#input.name = value;
    this.#updateAttribute("name", value);
  }

  get value(): string {
    return this.#input.value;
  }

  set value(value: string) {
    this.#input.value = value;
    this.#internals.setFormValue(this.value);
    this.#updateAttribute("value", value);
  }

  set type(newValue: string) {
    this.#input.type = newValue;
    this.#updateAttribute("type", newValue);
  }

  set supportText(value: string) {
    this.#label.supportText = value;
    this.#updateStyle();
    this.#updateAttribute("support-text", value);
  }

  get autocomplete(): AutoFill {
    return this.#input.autocomplete;
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

  attributeChangedCallback(
    name:
      | "error"
      | "text"
      | "placeholder"
      | "disabled"
      | "name"
      | "value"
      | "type"
      | "support-text"
      | "autocomplete",
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    newValue = newValue ?? "";

    if (name === "disabled") {
      this.disabled = newValue ? true : false;
      return;
    } else if (name === "support-text") {
      this.supportText = newValue;
      return;
    } else if (name === "autocomplete") {
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
  #updateAttribute(name: string, value: string) {
    if (value) this.setAttribute(name, value);
    else this.removeAttribute(name);
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
