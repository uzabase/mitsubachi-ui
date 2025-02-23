import { makeStyleSheet } from "@/components/styles";
import { SpTextFieldErrorIcon } from "@/components/text-field/error-icon";
import styles from "@/components/text-field/error-message/styles.css?inline";

export class SpTextFieldErrorMessage extends HTMLElement {
  static observedAttributes = ["textContent"];

  get textContent(): string | null {
    return this.#textContent;
  }

  set textContent(value: string | null) {
    this.#textContent = value;
    if (this.#span) {
      this.#span.textContent = value;
    }
    this.#updateClass();
  }

  #span?: HTMLSpanElement;
  #div?: HTMLDivElement;

  #textContent: string | null = null;

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

    this.#div = document.createElement("div");
    this.#div.setAttribute("class", "icon");
    this.#div.appendChild(new SpTextFieldErrorIcon());
    this.shadowRoot.appendChild(this.#div);
    this.#span = document.createElement("span");
    this.#span.className = "message";
    this.shadowRoot.appendChild(this.#span);

    this.textContent = this.#textContent;
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "message") {
      this.textContent = newValue;
    }
  }

  #updateClass() {
    if (this.#textContent) {
      this.#div?.classList.remove("none");
      this.#span?.classList.remove("none");
    } else {
      this.#div?.classList.add("none");
      this.#span?.classList.add("none");
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
