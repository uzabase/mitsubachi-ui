import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldXLargeInput extends HTMLElement {
  static formAssociated = true;

  readonly #shadow: ShadowRoot;

  #input?: HTMLInputElement;

  #placeholder?: string;

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
    if (this.#placeholder) this.#input.placeholder = this.#placeholder;
    if (this.#disabled) this.#input.disabled = this.#disabled;
    this.#input.className = this.#getClass();
    if (this.#name) this.#input.name = this.#name;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "placeholder") {
      this.#setPlaceholder(newValue);
    } else if (name === "disabled") {
      this.#setDisabled(newValue === "true");
    } else if (name === "error") {
      this.#setError(newValue === "true");
    }
  }

  #setError(error: boolean) {
    this.#error = error;
    this.#input?.setAttribute("class", this.#getClass());
  }

  #setPlaceholder(placeholder: string) {
    this.#placeholder = placeholder;
    this.#input?.setAttribute("placeholder", this.#placeholder);
  }
  #setDisabled(disabled: boolean) {
    if (disabled) {
      this.#input?.setAttribute("disabled", "true");
    } else {
      this.#input?.removeAttribute("disabled");
    }
  }

  #getClass() {
    const className = "ub-account-text-field-input";
    if (this.#error) {
      return `${className} error`;
    }
    return className;
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
