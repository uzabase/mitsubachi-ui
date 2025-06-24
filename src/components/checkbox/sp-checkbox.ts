import { makeStyleSheet } from "../styles";
import checkboxStyle from "./checkbox.css?inline";
import checkmarkStyle from "./checkmark.css?inline";
import { UbCheckbox } from "./ub-checkbox";

export class SpCheckbox extends UbCheckbox {
  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        makeStyleSheet(checkmarkStyle, checkboxStyle),
      ];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox": SpCheckbox;
  }
}

if (!customElements.get("sp-checkbox")) {
  customElements.define("sp-checkbox", SpCheckbox);
}
