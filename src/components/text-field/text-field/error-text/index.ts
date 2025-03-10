import { makeStyleSheet } from "../../../styles";
import { SpTextFieldErrorIcon } from "../error-icon";
import styles from "./styles.css?inline";

export class SpTextFieldErrorText extends HTMLElement {
  static observedAttributes = ["text"];

  get text(): string {
    return this.#span.textContent ?? "";
  }

  set text(value: string) {
    if (value === "") {
      this.#span.textContent = null;
    } else {
      this.#span.textContent = value;
    }
    this.#updateClass();
  }

  #span: HTMLSpanElement = document.createElement("span");
  #div?: HTMLDivElement;

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
    this.#div.setAttribute("role", "error");
    this.#div.setAttribute("class", "container");
    this.shadowRoot.appendChild(this.#div);

    this.#div.appendChild(new SpTextFieldErrorIcon());
    this.#span.className = "text";
    this.#div.appendChild(this.#span);
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    console.log('errortext', name, newValue);

    if (name === "text") {
      this.text = newValue ? newValue : "";
    }
  }

  #updateClass() {
    if (this.text) {
      this.#div?.classList.remove("none");
    } else {
      this.#div?.classList.add("none");
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-error-text": SpTextFieldErrorText;
  }
}

const tagName = "sp-text-field-error-text";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldErrorText);
}
