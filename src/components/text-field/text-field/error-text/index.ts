import { SpIcon } from "../../../icon/sp-icon";
import { makeStyleSheet } from "../../../styles";
import styles from "./styles.css?inline";

/**
 *
 */
export class SpTextFieldErrorText extends HTMLElement {
  static observedAttributes = ["text"];

  get #text(): string {
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
  #container?: HTMLDivElement;

  #initalized = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initalized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];
    this.#container = document.createElement("div");
    this.#container.setAttribute("role", "error");
    this.#container.setAttribute("class", "container");
    this.shadowRoot.appendChild(this.#container);

    const icon = new SpIcon();
    icon.type = "error-fill";
    icon.classList.add("icon");
    this.#container.appendChild(icon);

    this.#span.className = "text";
    this.#container.appendChild(this.#span);

    this.#updateClass();
    this.#initalized = true;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "text") {
      this.text = newValue ? newValue : "";
    }
  }

  #updateClass() {
    if (this.#text) {
      this.#container?.classList.remove("none");
    } else {
      this.#container?.classList.add("none");
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-error-text": SpTextFieldErrorText;
  }
}

if (!customElements.get("sp-text-field-error-text")) {
  customElements.define("sp-text-field-error-text", SpTextFieldErrorText);
}
