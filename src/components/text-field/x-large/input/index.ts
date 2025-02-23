import { makeStyleSheet } from "../../../styles";

import styles from "./styles.css?inline";

export class SpTextFieldXLargeInput extends HTMLElement {
  static observedAttributes = [
    "error",
    "placeholder",
    "disabled",
    "name",
    "value",
  ];

  static formAssociated = true;

  get error(): boolean {
    return this.#error;
  }

  set error(isError: boolean) {
    this.#error = isError;
    this.#updateStyle();
  }

  get placeholder(): string {
    return this.#placeholder;
  }

  set placeholder(value: string) {
    this.#placeholder = value;

    if (this.#input) this.#input.placeholder = this.#placeholder;
  }

  set disabled(value: boolean) {
    this.#disabled = value;
    if (this.#input) {
      this.#input.disabled = this.#disabled;
    }
    this.#updateStyle();
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
    if (this.#input) {
      this.#input.name = this.name;
    }
  }

  get value(): string {
    return this.#value;
  }

  set value(value: string) {
    this.#value = value;
    if (this.#input) this.#input.value = this.value;

    this.#internals.setFormValue(this.value);
  }

  readonly #shadow: ShadowRoot;

  #input?: HTMLInputElement;

  #placeholder: string = "";

  #disabled = false;

  #name: string = "";

  #error: boolean = false;

  #value: string = "";

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#shadow.adoptedStyleSheets = [
      ...this.#shadow.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#input = document.createElement("input");
    this.#shadow.appendChild(this.#input);
    this.#input.type = "text";
    this.#input.classList.add("input");

    this.#input.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      this.value = target.value;
    });

    this.placeholder = this.#placeholder;
    this.disabled = this.#disabled;
    this.error = this.#error;
    this.name = this.#name;
    this.value = this.#value;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "placeholder") {
      this.placeholder = newValue ? newValue : "";
    } else if (name === "disabled") {
      this.disabled = newValue ? true : false;
    } else if (name === "error") {
      this.error = newValue ? true : false;
    } else if (name === "name") {
      this.name = newValue ? newValue : "";
    } else if (name === "value") {
      this.value = newValue ? newValue : "";
    }
  }

  #updateStyle() {
    if (!this.#input) {
      return;
    }
    if (this.#disabled) {
      this.#input.classList.remove("error");
      return;
    }
    if (this.error) {
      this.#input.classList.add("error");
    } else this.#input.classList.remove("error");
  }
}

const tagName = "sp-text-field-x-large-input";
declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-x-large-input": SpTextFieldXLargeInput;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldXLargeInput);
}
