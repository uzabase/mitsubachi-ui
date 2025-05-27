import "../../icon";

import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";

export class SpControlMenuItem extends HTMLElement {
  static observedAttributes = ["selected", "text"];

  get text(): null | string {
    return this.textElement.textContent;
  }

  set text(value: string) {
    if (value) {
      this.textElement.textContent = value;
    } else {
        this.textElement.textContent = null;
    }
  }

  private isDisabled = false;

  set disabled(value: boolean) {
    this.isDisabled = value; 
  }

  private textElement = document.createElement("span");

  private isSelected = false;

  set selected(value: boolean) {
    this.isSelected = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private initialized = false;

  connectedCallback() {
    if (!this.shadowRoot || this.initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    //const item = document.createElement('div');
    //item.classList.add("item");
    //this.shadowRoot.appendChild(item);

    this.textElement.classList.add("text");
    this.shadowRoot.appendChild(this.textElement);

    const icon = document.createElement("sp-icon");
    icon.classList.add("icon");
    icon.setAttribute("type", "check-small");
    this.shadowRoot.appendChild(icon);
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "text") {
      this.text = newValue ?? '';
      return;
    } else if (name === "selected") {
        this.isSelected = newValue ? true : false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu-item": SpControlMenuItem;
  }
}
if (!customElements.get("sp-control-menu-item")) {
  customElements.define("sp-control-menu-item", SpControlMenuItem);
}
