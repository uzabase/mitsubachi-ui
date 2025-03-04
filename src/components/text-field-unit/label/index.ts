import { makeStyleSheet } from "../../styles";
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

  get text(): string {
    return this.#labelElm.textContent ? this.#labelElm.textContent : '';
  }
  set text(text: string) {
    console.log(text);
    this.#labelElm.textContent = text;
    this.#updateClass();
  }

  #for: string = "";

  #labelElm: HTMLLabelElement = document.createElement("label");

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

    this.#labelElm.classList.add("label");
    this.shadowRoot.appendChild(this.#labelElm);

    this.htmlFor = this.#for;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "htmlFor") {
      this.htmlFor = newValue ? newValue : "";
    } else if (name === "text") {
      this.text = newValue ? newValue : "";
    }
  }

  #updateClass() {
    if (this.text) {
      this.#labelElm.classList.remove("none");
    } else {
      this.#labelElm.classList.add("none");
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
