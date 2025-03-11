import { makeStyleSheet } from "../styles";
import styles from "./styles.css?inline";

export class SpLabelUnit extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["text", "supporttext"];

  get text(): string {
    return this.#label.textContent ? this.#label.textContent : "";
  }
  set text(text: string) {
    this.#label.textContent = text;
    this.#updateClass();
  }

  get supporttext(): string {
    return this.#support.textContent ? this.#support.textContent : "";
  }

  set supporttext(value: string) {
    this.#support.textContent = value;
    this.#updateClass();
  }

  #label = document.createElement("span");
  #support = document.createElement("span");

  #initialized = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#label.classList.add("label");
    this.shadowRoot.appendChild(this.#label);
    this.#support.classList.add("support");
    this.shadowRoot.appendChild(this.#support);

    this.#initialized = true;
  }

  /**
   * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
   */
  isEmpty(): boolean {
    return this.text === "" && this.supporttext === "";
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "text") {
      this.text = newValue ? newValue : "";
    } else if (name === "supporttext") {
      this.supporttext = newValue ? newValue : "";
    }
  }

  #updateClass() {
    if (this.text) {
      this.#label.classList.remove("none");
    } else {
      this.#label.classList.add("none");
    }
    if (this.supporttext) {
      this.#support.classList.remove("none");
    } else {
      this.#support.classList.add("none");
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-label-unit": SpLabelUnit;
  }
}
const tagName = "sp-label-unit";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpLabelUnit);
}
