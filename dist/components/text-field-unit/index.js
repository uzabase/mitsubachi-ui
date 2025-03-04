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
var _SpTextFieldUnit_labelElm, _SpTextFieldUnit_text, _SpTextFieldUnit_error, _SpTextFieldUnit_inputElm, _SpTextFieldUnit_errorMessageElm, _SpTextFieldUnit_disabled, _SpTextFieldUnit_placeholder, _SpTextFieldUnit_name, _SpTextFieldUnit_value, _SpTextFieldUnit_internals;
import "./error-message";
import "./input";
import "./label";
import { makeStyleSheet } from "../styles";
import styles from "./styles.css?inline";
export class SpTextFieldUnit extends HTMLElement {
    get text() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_text, "f");
    }
    set text(text) {
        __classPrivateFieldSet(this, _SpTextFieldUnit_text, text, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f").textContent = text;
    }
    get error() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_error, "f");
    }
    set error(text) {
        __classPrivateFieldSet(this, _SpTextFieldUnit_error, text, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f")) {
            if (__classPrivateFieldGet(this, _SpTextFieldUnit_disabled, "f"))
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f").textContent = null;
            else
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f").textContent = this.error;
        }
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").error = this.error ? true : false;
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_disabled, "f");
    }
    set disabled(newValue) {
        __classPrivateFieldSet(this, _SpTextFieldUnit_disabled, newValue, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").disabled = newValue;
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f")) {
            if (this.disabled)
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f").textContent = "";
            else
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f").textContent = this.error;
        }
    }
    set placeholder(newValue) {
        if (newValue) {
            __classPrivateFieldSet(this, _SpTextFieldUnit_placeholder, newValue, "f");
        }
        else
            __classPrivateFieldSet(this, _SpTextFieldUnit_placeholder, "", "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").placeholder = __classPrivateFieldGet(this, _SpTextFieldUnit_placeholder, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_name, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _SpTextFieldUnit_name, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").name = this.name;
        }
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f").htmlFor = this.name;
        }
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_value, "f");
    }
    set value(value) {
        __classPrivateFieldSet(this, _SpTextFieldUnit_value, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").value = this.value;
        }
        __classPrivateFieldGet(this, _SpTextFieldUnit_internals, "f").setFormValue(this.value);
    }
    constructor() {
        super();
        _SpTextFieldUnit_labelElm.set(this, void 0);
        _SpTextFieldUnit_text.set(this, "");
        _SpTextFieldUnit_error.set(this, "");
        _SpTextFieldUnit_inputElm.set(this, void 0);
        _SpTextFieldUnit_errorMessageElm.set(this, void 0);
        _SpTextFieldUnit_disabled.set(this, false);
        _SpTextFieldUnit_placeholder.set(this, "");
        _SpTextFieldUnit_name.set(this, "");
        _SpTextFieldUnit_value.set(this, "");
        _SpTextFieldUnit_internals.set(this, void 0);
        this.attachShadow({ mode: "open" });
        __classPrivateFieldSet(this, _SpTextFieldUnit_internals, this.attachInternals(), "f");
    }
    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldSet(this, _SpTextFieldUnit_labelElm, document.createElement("sp-text-field-label"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f"));
        __classPrivateFieldSet(this, _SpTextFieldUnit_inputElm, document.createElement("sp-text-field-x-large-input"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f"));
        __classPrivateFieldSet(this, _SpTextFieldUnit_errorMessageElm, document.createElement("sp-text-field-error-message"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_errorMessageElm, "f"));
        this.text = __classPrivateFieldGet(this, _SpTextFieldUnit_text, "f");
        this.placeholder = __classPrivateFieldGet(this, _SpTextFieldUnit_placeholder, "f");
        this.disabled = __classPrivateFieldGet(this, _SpTextFieldUnit_disabled, "f");
        this.error = __classPrivateFieldGet(this, _SpTextFieldUnit_error, "f");
        this.name = __classPrivateFieldGet(this, _SpTextFieldUnit_name, "f");
        this.value = __classPrivateFieldGet(this, _SpTextFieldUnit_value, "f");
        __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").addEventListener("input", (e) => {
            this.value = e.target.value;
        });
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "error") {
            this.error = newValue ? newValue : "";
        }
        else if (name === "text") {
            this.text = newValue ? newValue : "";
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
_SpTextFieldUnit_labelElm = new WeakMap(), _SpTextFieldUnit_text = new WeakMap(), _SpTextFieldUnit_error = new WeakMap(), _SpTextFieldUnit_inputElm = new WeakMap(), _SpTextFieldUnit_errorMessageElm = new WeakMap(), _SpTextFieldUnit_disabled = new WeakMap(), _SpTextFieldUnit_placeholder = new WeakMap(), _SpTextFieldUnit_name = new WeakMap(), _SpTextFieldUnit_value = new WeakMap(), _SpTextFieldUnit_internals = new WeakMap();
SpTextFieldUnit.observedAttributes = [
    "error",
    "text",
    "placeholder",
    "disabled",
    "name",
    "value",
];
SpTextFieldUnit.formAssociated = true;
const tagName = "sp-text-field-unit";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldUnit);
}
