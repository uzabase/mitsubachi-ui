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
var _SpTextFieldLabel_instances, _SpTextFieldLabel_for, _SpTextFieldLabel_labelElm, _SpTextFieldLabel_updateClass;
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextFieldLabel extends HTMLElement {
    get htmlFor() {
        return __classPrivateFieldGet(this, _SpTextFieldLabel_for, "f");
    }
    set htmlFor(value) {
        __classPrivateFieldSet(this, _SpTextFieldLabel_for, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").htmlFor = this.htmlFor;
        }
    }
    get text() {
        return __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").textContent ? __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").textContent : "";
    }
    set text(text) {
        __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").textContent = text;
        __classPrivateFieldGet(this, _SpTextFieldLabel_instances, "m", _SpTextFieldLabel_updateClass).call(this);
    }
    constructor() {
        super();
        _SpTextFieldLabel_instances.add(this);
        _SpTextFieldLabel_for.set(this, "");
        _SpTextFieldLabel_labelElm.set(this, document.createElement("label"));
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").classList.add("label");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f"));
        this.htmlFor = __classPrivateFieldGet(this, _SpTextFieldLabel_for, "f");
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "htmlFor") {
            this.htmlFor = newValue ? newValue : "";
        }
        else if (name === "text") {
            this.text = newValue ? newValue : "";
        }
    }
}
_SpTextFieldLabel_for = new WeakMap(), _SpTextFieldLabel_labelElm = new WeakMap(), _SpTextFieldLabel_instances = new WeakSet(), _SpTextFieldLabel_updateClass = function _SpTextFieldLabel_updateClass() {
    if (this.text) {
        __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").classList.remove("none");
    }
    else {
        __classPrivateFieldGet(this, _SpTextFieldLabel_labelElm, "f").classList.add("none");
    }
};
SpTextFieldLabel.styles = makeStyleSheet(styles);
SpTextFieldLabel.observedAttributes = ["htmlFor", "text"];
const tagName = "sp-text-field-label";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldLabel);
}
