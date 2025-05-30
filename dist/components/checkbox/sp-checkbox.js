import foundationStyle from "../foundation.css?inline";
import checkboxStyle from "./checkbox.css?inline";
import checkmarkStyle from "./checkmark.css?inline";
import { UbCheckbox } from "./ub-checkbox";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxStyle}`);
export class SpCheckbox extends UbCheckbox {
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
if (!customElements.get("sp-checkbox")) {
    customElements.define("sp-checkbox", SpCheckbox);
}
