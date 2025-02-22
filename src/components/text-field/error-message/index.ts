import { makeStyleSheet } from "@/components/styles";
import "@/components/text-field/error-icon";
import { SpTextFieldErrorIcon } from "@/components/text-field/error-icon";
import styles from "@/components/text-field/error-message/styles.css?inline";

export class SpTextFieldErrorMessage extends HTMLElement {

  static observedAttributes = ["message"];

  readonly #shadow: ShadowRoot;
  #span?: HTMLSpanElement;

  #message?: string;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#shadow.adoptedStyleSheets = [
      ...this.#shadow.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    const div = document.createElement("div");
    div.setAttribute("class", "icon");
    div.appendChild(new SpTextFieldErrorIcon());
    this.#shadow.appendChild(div);
    this.#span = document.createElement('span');
    this.#span.className = "message";
    this.#shadow.appendChild(this.#span);
    if(this.#message)
        this.#span.textContent = this.#message;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "message") {
      this.#setMessage(newValue);
    }
  }

  #setMessage(message: string) {
    this.#message = message;
    if(this.#span) {
      this.#span.textContent = message;
    }
  }  

}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-error-message": SpTextFieldErrorMessage;
  }
}

const tagName = "sp-text-field-error-message";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldErrorMessage);
}
