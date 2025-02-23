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
var _SpTextFieldXLarge_labelElm, _SpTextFieldXLarge_label, _SpTextFieldXLarge_error, _SpTextFieldXLarge_inputElm, _SpTextFieldXLarge_errorMessageElm, _SpTextFieldXLarge_disabled, _SpTextFieldXLarge_placeholder, _SpTextFieldXLarge_name, _SpTextFieldXLarge_value, _SpTextFieldXLarge_internals;
import "../error-message";
import "./input";
import "../label";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextFieldXLarge extends HTMLElement {
    get label() {
        return __classPrivateFieldGet(this, _SpTextFieldXLarge_label, "f");
    }
    set label(text) {
        __classPrivateFieldSet(this, _SpTextFieldXLarge_label, text, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_labelElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldXLarge_labelElm, "f").textContent = text;
    }
    get error() {
        return __classPrivateFieldGet(this, _SpTextFieldXLarge_error, "f");
    }
    set error(text) {
        __classPrivateFieldSet(this, _SpTextFieldXLarge_error, text, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f")) {
            if (__classPrivateFieldGet(this, _SpTextFieldXLarge_disabled, "f"))
                __classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f").textContent = null;
            else
                __classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f").textContent = this.error;
        }
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f").error = this.error ? true : false;
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpTextFieldXLarge_disabled, "f");
    }
    set disabled(newValue) {
        __classPrivateFieldSet(this, _SpTextFieldXLarge_disabled, newValue, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f").disabled = newValue;
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f")) {
            if (this.disabled)
                __classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f").textContent = "";
            else
                __classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f").textContent = this.error;
        }
    }
    set placeholder(newValue) {
        if (newValue) {
            __classPrivateFieldSet(this, _SpTextFieldXLarge_placeholder, newValue, "f");
        }
        else
            __classPrivateFieldSet(this, _SpTextFieldXLarge_placeholder, "", "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f").placeholder = __classPrivateFieldGet(this, _SpTextFieldXLarge_placeholder, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _SpTextFieldXLarge_name, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _SpTextFieldXLarge_name, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f").name = this.name;
        }
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_labelElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldXLarge_labelElm, "f").htmlFor = this.name;
        }
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextFieldXLarge_value, "f");
    }
    set value(value) {
        __classPrivateFieldSet(this, _SpTextFieldXLarge_value, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f").value = this.value;
        }
        __classPrivateFieldGet(this, _SpTextFieldXLarge_internals, "f").setFormValue(this.value);
    }
    constructor() {
        super();
        _SpTextFieldXLarge_labelElm.set(this, void 0);
        _SpTextFieldXLarge_label.set(this, "");
        _SpTextFieldXLarge_error.set(this, "");
        _SpTextFieldXLarge_inputElm.set(this, void 0);
        _SpTextFieldXLarge_errorMessageElm.set(this, void 0);
        _SpTextFieldXLarge_disabled.set(this, false);
        _SpTextFieldXLarge_placeholder.set(this, "");
        _SpTextFieldXLarge_name.set(this, "");
        _SpTextFieldXLarge_value.set(this, "");
        _SpTextFieldXLarge_internals.set(this, void 0);
        this.attachShadow({ mode: "open" });
        __classPrivateFieldSet(this, _SpTextFieldXLarge_internals, this.attachInternals(), "f");
    }
    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldSet(this, _SpTextFieldXLarge_labelElm, document.createElement("sp-text-field-label"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldXLarge_labelElm, "f"));
        __classPrivateFieldSet(this, _SpTextFieldXLarge_inputElm, document.createElement("sp-text-field-x-large-input"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f"));
        __classPrivateFieldSet(this, _SpTextFieldXLarge_errorMessageElm, document.createElement("sp-text-field-error-message"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldXLarge_errorMessageElm, "f"));
        this.label = __classPrivateFieldGet(this, _SpTextFieldXLarge_label, "f");
        this.placeholder = __classPrivateFieldGet(this, _SpTextFieldXLarge_placeholder, "f");
        this.disabled = __classPrivateFieldGet(this, _SpTextFieldXLarge_disabled, "f");
        this.error = __classPrivateFieldGet(this, _SpTextFieldXLarge_error, "f");
        this.name = __classPrivateFieldGet(this, _SpTextFieldXLarge_name, "f");
        this.value = __classPrivateFieldGet(this, _SpTextFieldXLarge_value, "f");
        __classPrivateFieldGet(this, _SpTextFieldXLarge_inputElm, "f").addEventListener("input", (e) => {
            this.value = e.target.value;
        });
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "error") {
            this.error = newValue ? newValue : "";
        }
        else if (name === "label") {
            this.label = newValue ? newValue : "";
        }
        else if (name === "placeholder") {
            this.placeholder = newValue;
        }
        else if (name === "disabled") {
            this.disabled = newValue == null ? false : true;
        }
        else if (name === "name") {
            this.name = newValue ? newValue : "";
        }
        else if (name === "value") {
            this.value = newValue ? newValue : "";
        }
    }
}
_SpTextFieldXLarge_labelElm = new WeakMap(), _SpTextFieldXLarge_label = new WeakMap(), _SpTextFieldXLarge_error = new WeakMap(), _SpTextFieldXLarge_inputElm = new WeakMap(), _SpTextFieldXLarge_errorMessageElm = new WeakMap(), _SpTextFieldXLarge_disabled = new WeakMap(), _SpTextFieldXLarge_placeholder = new WeakMap(), _SpTextFieldXLarge_name = new WeakMap(), _SpTextFieldXLarge_value = new WeakMap(), _SpTextFieldXLarge_internals = new WeakMap();
SpTextFieldXLarge.observedAttributes = [
    "error",
    "label",
    "placeholder",
    "disabled",
    "name",
    "value",
];
SpTextFieldXLarge.formAssociated = true;
const tagName = "sp-text-field-x-large";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldXLarge);
}
