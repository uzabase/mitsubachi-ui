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
var _SpTextFieldErrorText_instances, _SpTextFieldErrorText_text_get, _SpTextFieldErrorText_span, _SpTextFieldErrorText_container, _SpTextFieldErrorText_initalized, _SpTextFieldErrorText_updateClass;
import { SpIconErrorFill } from "../../../icon/error-fill";
import { makeStyleSheet } from "../../../styles";
import styles from "./styles.css?inline";
/**
 *
 */
export class SpTextFieldErrorText extends HTMLElement {
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
        _SpTextFieldErrorText_container.set(this, void 0);
        _SpTextFieldErrorText_initalized.set(this, false);
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpTextFieldErrorText_initalized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldSet(this, _SpTextFieldErrorText_container, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f").setAttribute("role", "error");
        __classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f").setAttribute("class", "container");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f"));
        const icon = new SpIconErrorFill();
        icon.classList.add("icon");
        __classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f").appendChild(icon);
        __classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f").className = "text";
        __classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f").appendChild(__classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f"));
        __classPrivateFieldGet(this, _SpTextFieldErrorText_instances, "m", _SpTextFieldErrorText_updateClass).call(this);
        __classPrivateFieldSet(this, _SpTextFieldErrorText_initalized, true, "f");
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "text") {
            this.text = newValue ? newValue : "";
        }
    }
}
_SpTextFieldErrorText_span = new WeakMap(), _SpTextFieldErrorText_container = new WeakMap(), _SpTextFieldErrorText_initalized = new WeakMap(), _SpTextFieldErrorText_instances = new WeakSet(), _SpTextFieldErrorText_text_get = function _SpTextFieldErrorText_text_get() {
    return __classPrivateFieldGet(this, _SpTextFieldErrorText_span, "f").textContent ?? "";
}, _SpTextFieldErrorText_updateClass = function _SpTextFieldErrorText_updateClass() {
    if (__classPrivateFieldGet(this, _SpTextFieldErrorText_instances, "a", _SpTextFieldErrorText_text_get)) {
        __classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f")?.classList.remove("none");
    }
    else {
        __classPrivateFieldGet(this, _SpTextFieldErrorText_container, "f")?.classList.add("none");
    }
};
SpTextFieldErrorText.observedAttributes = ["text"];
const tagName = "sp-text-field-error-text";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldErrorText);
}
