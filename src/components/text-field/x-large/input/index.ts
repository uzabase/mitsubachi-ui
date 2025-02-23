import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldXLargeInput extends HTMLElement {
  static observedAttributes = ["error", "placeholder", "disabled"];

  static formAssociated = true;

  get error(): boolean {
    return this.#error;
  }

  set error(isError: boolean) {
    this.#error = isError;
    if(this.#input) {
      if(this.error) {
        this.#input.classList.add('error');
      } else {
        this.#input.classList.remove('error');
      }
    }
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
    if (this.#input) this.#input.disabled = this.#disabled;
  }

  readonly #shadow: ShadowRoot;

  #input?: HTMLInputElement;

  #placeholder?: string | null;

  #disabled = false;

  #name?: string;

  #error: boolean = false;

  constructor() {
    super();
    //this.#internals = this.attachInternals();
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
    this.#input.classList.add('input');
    this.placeholder = this.#placeholder;
    this.disabled = this.#disabled;
    this.error = this.#error;

    if (this.#name) this.#input.name = this.#name;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "placeholder") {
      this.placeholder = newValue;
    } else if (name === "disabled") {
      this.disabled = newValue ? true : false;
    } else if (name === "error") {
      this.error = newValue ? true : false;
    }
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
