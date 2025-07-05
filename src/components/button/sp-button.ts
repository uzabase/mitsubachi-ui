import { makeStyleSheet } from "../styles";
import buttonStyle from "./button.css?inline";
import { UbButton } from "./ub-button";

/**
 * @summary ボタンです。
 */
export class SpButton extends UbButton {
  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        makeStyleSheet(buttonStyle),
      ];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}

if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}
