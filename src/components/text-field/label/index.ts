import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldLabel extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["id", "for", "text"];

  readonly #shadow: ShadowRoot;

  #id?: string;

  #for?: string;

  #textContent: string = '';

  #labelElm?: HTMLLabelElement;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#shadow.adoptedStyleSheets = [
      ...this.#shadow.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#labelElm = document.createElement("label");
    this.#labelElm.classList.add('label');

    this.#shadow.appendChild(this.#labelElm);
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

  get text(): string {
    return this.#textContent;
  }
  set text(text: string) {
    this.#textContent = text  ? text : '';

    if (this.#labelElm) {
      this.#labelElm.textContent = this.#textContent;
    }
    this.#updateClass();
  }

  #updateClass() {
    if(this.text) {
      this.#labelElm?.classList.remove('none');
    } else {
      this.#labelElm?.classList.add('none');
    }
  }

  #setId(id: string) {
    this.#id = id;
    this.#labelElm?.setAttribute("id", this.#id);
  }
  #setFor(forVal: string) {
    this.#for = forVal;
    this.#labelElm?.setAttribute("for", this.#for);
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
