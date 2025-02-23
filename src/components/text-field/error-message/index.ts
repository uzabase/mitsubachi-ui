import { makeStyleSheet } from "@/components/styles";
import { SpTextFieldErrorIcon } from "@/components/text-field/error-icon";
import styles from "@/components/text-field/error-message/styles.css?inline";

export class SpTextFieldErrorMessage extends HTMLElement {

  static observedAttributes = ["message"];

  get message(): string {
    return this.#message;
  }

  set message(message: string) {
    this.#message = message;
    if(this.#span) {
      this.#span.textContent = message;
    }
    this.#updateClass();
  }

  #span?: HTMLSpanElement;
  #div?: HTMLDivElement;

  #message: string = '';

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

    this.#div = document.createElement("div");
    this.#div.setAttribute("class", "icon");
    this.#div.appendChild(new SpTextFieldErrorIcon());
    this.shadowRoot.appendChild(this.#div);
    this.#span = document.createElement('span');
    this.#span.className = "message";
    this.shadowRoot.appendChild(this.#span);
    if(this.#message)
        this.#span.textContent = this.#message;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "message") {
      this.message = newValue;
    }
  }


  #updateClass() {
    if(this.#message) {
      this.#div?.classList.remove('none');
      this.#span?.classList.remove('none');
    } else {
      this.#div?.classList.add('none');
      this.#span?.classList.add('none');
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
