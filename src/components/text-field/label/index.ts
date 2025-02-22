import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldLabel extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["id", "for", "text"];

  readonly #shadow: ShadowRoot;

  #id?: string;

  #for?: string;

  #textContent?: string;

  #label?: HTMLLabelElement;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#shadow.adoptedStyleSheets = [
      ...this.#shadow.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#label = document.createElement("label");
    this.#label.classList.add('label');

    this.#shadow.appendChild(this.#label);
    this.text = this.#textContent;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "id") {
      this.#setId(newValue);
    } else if (name === "for") {
      this.#setFor(newValue);
    } else if (name === "text") {
      this.text = newValue;
    }
  }

  get text(): string | undefined {
    return this.#textContent;
  }
  set text(text: string | undefined) {
    if(text) {
      this.#textContent = text;
    }
    if (this.#label) {
      if(this.#textContent)
        this.#label.textContent = this.#textContent;
      else {
        this.#label.textContent = '';
      }
    }
  }

  #setId(id: string) {
    this.#id = id;
    this.#label?.setAttribute("id", this.#id);
  }
  #setFor(forVal: string) {
    this.#for = forVal;
    this.#label?.setAttribute("for", this.#for);
  }

}

const tagName = "sp-text-field-label";
declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-label": SpTextFieldLabel;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldLabel);
}
