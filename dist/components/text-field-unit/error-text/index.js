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
var _SpTextFieldErrorText_instances, _SpTextFieldErrorText_span, _SpTextFieldErrorText_div, _SpTextFieldErrorText_updateClass;
import { makeStyleSheet } from "../../styles";
import { SpTextFieldErrorIcon } from "../error-icon";
import styles from "./styles.css?inline";
export class SpTextFieldErrorText extends HTMLElement {
    get text() {
        return __classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f").textContent ?? "";
    }
    set text(value) {
        if (value === "") {
            __classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f").textContent = null;
        }
        else {
            __classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f").textContent = value;
        }
        __classPrivateFieldGet(this, _SpTextFieldErrorText_instances, "m", _SpTextFieldErrorText_updateClass).call(this);
    }
    constructor() {
        super();
        _SpTextFieldErrorText_instances.add(this);
        _SpTextFieldErrorText_span.set(this, document.createElement("span"));
        _SpTextFieldErrorText_div.set(this, void 0);
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldSet(this, _SpTextFieldErrorText_div, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f").setAttribute("role", "error");
        __classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f").setAttribute("class", "container");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f"));
        __classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f").appendChild(new SpTextFieldErrorIcon());
        __classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f").className = "text";
        __classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f").appendChild(__classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f"));
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "text") {
            this.text = newValue ? newValue : "";
        }
    }
}
_SpTextFieldErrorText_span = new WeakMap(), _SpTextFieldErrorText_div = new WeakMap(), _SpTextFieldErrorText_instances = new WeakSet(), _SpTextFieldErrorText_updateClass = function _SpTextFieldErrorText_updateClass() {
    if (this.text) {
        __classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f")?.classList.remove("none");
    }
    else {
        __classPrivateFieldGet(this, _SpTextFieldErrorText_div, "f")?.classList.add("none");
    }
};
SpTextFieldErrorText.observedAttributes = ["text"];
const tagName = "sp-text-field-error-text";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldErrorText);
}
