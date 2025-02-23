import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldXLargeInput extends HTMLElement {
  static observedAttributes = ["error", "placeholder", "disabled", "name", 'value'];

  static formAssociated = true;

  get error(): boolean {
    return this.#error;
  }

  set error(isError: boolean) {
    this.#error = isError;
    this.#updateStyle();
  }

  get placeholder(): string | undefined {
    if (this.#placeholder == null) return undefined;
    return this.#placeholder;
  }

  set placeholder(value: string | undefined | null) {
    if (value == null) {
      this.#placeholder = undefined;
      return;
    }
    this.#placeholder = value;

    if (this.#placeholder)
      this.#input?.setAttribute("placeholder", this.#placeholder);
    else this.#input?.removeAttribute("placeholder");
  }

  set disabled(value: boolean) {
    this.#disabled = value;
    if (this.#input) {
      this.#input.disabled = this.#disabled;
    }
    this.#updateStyle();
  }

  get name(): string | undefined {
    return this.#name;
  }

  set name(value: string | null | undefined) {
    if (value) this.#name = value;
    else this.#name = undefined;

    if (this.#input) {
      if (this.name) {
        this.#input.name = this.name;
      } else {
        this.#input.removeAttribute("name");
      }
    }
  }

  get value(): string | undefined {
    return this.#value ;
  }

  set value(value: string | null | undefined) {
    if(this.#input === value)
      return;
    if (value) this.#value = value;
    else this.#value = undefined;

    if (this.#input) {
       this.#input.value = this.value ? this.value : '';
    }
    this.#internals.setFormValue(this.value ? this.value : '');
  }

  readonly #shadow: ShadowRoot;

  #input?: HTMLInputElement;

  #placeholder?: string | null;

  #disabled = false;

  #name?: string;

  #error: boolean = false;

  #value?: string;

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
      this.placeholder = newValue;
    } else if (name === "disabled") {
      this.disabled = newValue ? true : false;
    } else if (name === "error") {
      this.error = newValue ? true : false;
    } else if (name === "name") {
      this.name = newValue;
    } else if (name === "value") {
      this.value = newValue;
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
