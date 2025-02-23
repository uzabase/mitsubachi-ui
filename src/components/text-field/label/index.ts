import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldLabel extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["for", "text"];

  get for(): string | undefined {
    return this.#for;
  }

  set for(value: string | undefined) {
    this.#for = value;
    if(this.#labelElm) {
      if(this.for)
        this.#labelElm.setAttribute("for", this.for);
      else
        this.#labelElm.removeAttribute("for");
    }
  }

  #for?: string;

  get text(): string {
    return this.#textContent;
  }
  set text(text: string | null) {
    this.#textContent = text ? text : "";

    if (this.#labelElm) {
      this.#labelElm.textContent = this.#textContent;
    }
    this.#updateClass();
  }

  #textContent: string = "";

  #labelElm?: HTMLLabelElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if(!this.shadowRoot)
      return;
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#labelElm = document.createElement("label");
    this.#labelElm.classList.add("label");
    this.shadowRoot.appendChild(this.#labelElm);

    this.for = this.#for;
    this.text = this.#textContent;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "for") {
      this.for = newValue ? newValue : undefined;
    } else if (name === "text") {
      this.text = newValue;
    }
  }

  #updateClass() {
    if (this.text) {
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
