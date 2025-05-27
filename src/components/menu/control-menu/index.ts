import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";

export class SpControlMenu extends HTMLElement {
  static observedAttributes = [];

  private initialized = false;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot || this.initialized) return;
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.shadowRoot.innerHTML = `
      <slot></slot>
    `;

    this.initialized = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu": SpControlMenu;
  }
}
if (!customElements.get("sp-control-menu")) {
  customElements.define("sp-control-menu", SpControlMenu);
}
