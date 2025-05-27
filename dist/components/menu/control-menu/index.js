import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpControlMenu extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot || this.initialized)
            return;
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
SpControlMenu.observedAttributes = [];
if (!customElements.get("sp-control-menu")) {
    customElements.define("sp-control-menu", SpControlMenu);
}
