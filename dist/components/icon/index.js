var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SpIcon_initialized, _SpIcon_iconMap;
import { makeStyleSheet } from "../styles";
import { errorFill, informationCircle } from "./icons";
import styles from "./styles.css?inline";
export class SpIcon extends HTMLElement {
    constructor() {
        super();
        _SpIcon_initialized.set(this, false);
        _SpIcon_iconMap.set(this, new Map());
        this.attachShadow({ mode: "open" });
    }
    set type(newValue) {
        if (this.shadowRoot) {
            const icon = __classPrivateFieldGet(this, _SpIcon_iconMap, "f").get(newValue);
            if (icon) {
                this.shadowRoot.innerHTML = icon;
            }
            else
                this.shadowRoot.innerHTML = "";
        }
        if (newValue)
            this.setAttribute("type", newValue);
        else
            this.removeAttribute("type");
    }
    connectedCallback() {
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpIcon_initialized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        this.shadowRoot.innerHTML = errorFill;
        for (const { attr, def } of [
            { attr: "error-fill", def: errorFill },
            { attr: "information-circle", def: informationCircle },
        ]) {
            __classPrivateFieldGet(this, _SpIcon_iconMap, "f").set(attr, def);
        }
        this.type = this.getAttribute("type") ?? "";
        __classPrivateFieldSet(this, _SpIcon_initialized, true, "f");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        newValue = newValue ?? "";
        if (name === "type") {
            this.type = newValue;
        }
    }
}
_SpIcon_initialized = new WeakMap(), _SpIcon_iconMap = new WeakMap();
SpIcon.observedAttributes = ["type"];
const tagName = "sp-icon";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpIcon);
}
