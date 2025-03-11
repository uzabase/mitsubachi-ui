import { makeStyleSheet } from "../styles";
import { errorFill } from "./icons";
import styles from "./styles.css?inline";

export class SpIcon extends HTMLElement {
  #initialized = false;

  #iconMap: Map<string, string> = new Map();

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  set type(newValue: string) {
    if (this.shadowRoot) {
      const icon = this.#iconMap.get(newValue);
      if (icon) {
        this.shadowRoot.innerHTML = icon;
      } else this.shadowRoot.innerHTML = "";
    }
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.shadowRoot.innerHTML = errorFill;
    this.#iconMap.set("error-fill", errorFill);

    this.#initialized = true;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "type") {
      this.type = newValue ? newValue : "";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

const tagName = "sp-icon";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpIcon);
}
