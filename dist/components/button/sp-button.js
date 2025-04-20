import foundationStyle from "../foundation.css?inline";
import buttonStyle from "./button.css?inline";
import { UbButton } from "./ub-button";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);
/**
 * @summary ボタンです。
 */
export class SpButton extends UbButton {
    constructor() {
        super();
        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
                ...this.shadowRoot.adoptedStyleSheets,
                styles,
            ];
        }
    }
}
if (!customElements.get("sp-button")) {
    customElements.define("sp-button", SpButton);
}
