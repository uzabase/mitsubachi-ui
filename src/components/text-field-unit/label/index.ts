import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";

export class SpTextFieldLabel extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["text"];

  get text(): string {
    return this.#labelElm.textContent ? this.#labelElm.textContent : "";
  }
  set text(text: string) {
    this.#labelElm.textContent = text;
    this.#updateClass();
  }

  #labelElm = document.createElement("span");

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
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "text") {
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
