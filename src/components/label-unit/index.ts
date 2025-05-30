import { makeStyleSheet } from "../styles";
import styles from "./styles.css?inline";

/**
 * ラベルです。
 *
 * @summary ラベルです。テキストフィールド上に置き、テキストフィールドを説明するために使います。
 *
 * @attr {string} text - ラベルのテキストです。文字の色は黒です。
 *
 * @attr {string} support-text - ラベルの下に灰色で表示されるテキストです。textを補足します。
 *
 */
export class SpLabelUnit extends HTMLElement {
  static styles = makeStyleSheet(styles);

  static observedAttributes = ["text", "support-text"];

  get #text(): string {
    return this.#label.textContent ? this.#label.textContent : "";
  }

  set text(text: string) {
    this.#label.textContent = text;
    this.#updateClass();
  }

  get #supportText(): string {
    return this.#support.textContent ? this.#support.textContent : "";
  }

  set supportText(value: string) {
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
    return this.#text === "" && this.#supportText === "";
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "text") {
      this.text = newValue ? newValue : "";
    } else if (name === "support-text") {
      this.supportText = newValue ? newValue : "";
    }
  }

  #updateClass() {
    if (this.#text) {
      this.#label.classList.remove("none");
    } else {
      this.#label.classList.add("none");
    }
    if (this.#supportText) {
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
if (!customElements.get("sp-label-unit")) {
  customElements.define("sp-label-unit", SpLabelUnit);
}
