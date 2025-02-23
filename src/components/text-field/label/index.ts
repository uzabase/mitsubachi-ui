import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldLabel extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["htmlFor", "text"];

  get htmlFor(): string {
    return this.#for;
  }

  set htmlFor(value: string) {
    this.#for = value;
    if (this.#labelElm) {
      this.#labelElm.htmlFor = this.htmlFor;
    }
  }

  get textContent(): string | null {
    return this.#textContent;
  }
  set textContent(text: string | null) {
    this.#textContent = text;

    if (this.#labelElm) {
      this.#labelElm.textContent = this.#textContent;
    }
    this.#updateClass();
  }

  #for: string = "";

  #textContent: string | null = null;

  #labelElm?: HTMLLabelElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#labelElm = document.createElement("label");
    this.#labelElm.classList.add("label");
    this.shadowRoot.appendChild(this.#labelElm);

    this.htmlFor = this.#for;
    this.textContent = this.#textContent;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "htmlFor") {
      this.htmlFor = newValue ? newValue : "";
    } else if (name === "text") {
      this.textContent = newValue;
    }
  }

  #updateClass() {
    if (this.textContent) {
      this.#labelElm?.classList.remove("none");
    } else {
      this.#labelElm?.classList.add("none");
    }
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
