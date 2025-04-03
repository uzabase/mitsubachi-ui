import { makeStyleSheet } from "../styles";
import { errorFill, informationCircle } from "./icons";
import styles from "./styles.css?inline";

export class SpIcon extends HTMLElement {
  static observedAttributes = ["type"];

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
    if (newValue) this.setAttribute("type", newValue);
    else this.removeAttribute("type");
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.shadowRoot.innerHTML = errorFill;
    for (const { attr, def } of [
      { attr: "error-fill", def: errorFill },
      { attr: "information-circle", def: informationCircle },
    ]) {
      this.#iconMap.set(attr, def);
    }
    this.type = this.getAttribute("type") ?? "";
    this.#initialized = true;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;
    newValue = newValue ?? "";
    if (name === "type") {
      this.type = newValue;
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
