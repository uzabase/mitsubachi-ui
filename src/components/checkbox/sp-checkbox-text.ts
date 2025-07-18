import { makeStyleSheet } from "../styles";
import checkboxTextStyle from "./checkbox-text.css?inline";
import checkmarkStyle from "./checkmark.css?inline";
import { UbCheckboxText } from "./ub-checkbox-text";

export class SpCheckboxText extends UbCheckboxText {
  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        makeStyleSheet(checkmarkStyle, checkboxTextStyle),
      ];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox-text": SpCheckboxText;
  }
}
if (!customElements.get("sp-checkbox-text")) {
  customElements.define("sp-checkbox-text", SpCheckboxText);
}
