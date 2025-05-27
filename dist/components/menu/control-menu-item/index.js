import "../../icon";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpControlMenuItem extends HTMLElement {
    get text() {
        return this.textElement.textContent;
    }
    get selected() {
        return this.hasAttribute("selected");
    }
    get disabled() {
        return this.hasAttribute("disabled");
    }
    constructor() {
        super();
        this.textElement = document.createElement("span");
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
        this.textElement.classList.add("text");
        this.shadowRoot.appendChild(this.textElement);
        const icon = document.createElement("sp-icon");
        icon.classList.add("icon");
        icon.setAttribute("type", "check-small");
        this.shadowRoot.appendChild(icon);
        this.initialized = true;
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "text") {
            if (newValue)
                this.textElement.textContent = newValue;
            else
                this.textElement.textContent = null;
        }
    }
}
SpControlMenuItem.observedAttributes = ["text"];
if (!customElements.get("sp-control-menu-item")) {
    customElements.define("sp-control-menu-item", SpControlMenuItem);
}
