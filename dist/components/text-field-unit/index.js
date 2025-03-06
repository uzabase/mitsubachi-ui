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
var _SpTextFieldUnit_labelElm, _SpTextFieldUnit_error, _SpTextFieldUnit_inputElm, _SpTextFieldUnit_errorTextElm, _SpTextFieldUnit_internals;
import "./error-text";
import "./input";
import "./label";
import { makeStyleSheet } from "../styles";
import styles from "./styles.css?inline";
export class SpTextFieldUnit extends HTMLElement {
    get text() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f").text;
    }
    set text(text) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f").text = text;
    }
    get error() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_error, "f");
    }
    set error(text) {
        __classPrivateFieldSet(this, _SpTextFieldUnit_error, text, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f")) {
            if (this.disabled)
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f").text = "";
            else
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f").text = this.error;
        }
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f"))
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").error = this.error ? true : false;
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").disabled;
    }
    set disabled(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").disabled = newValue;
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f")) {
            if (this.disabled)
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f").text = "";
            else
                __classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f").text = this.error;
        }
    }
    set placeholder(newValue) {
        if (newValue) {
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").placeholder = newValue;
        }
        else
            __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").placeholder = "";
    }
    get name() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").name;
    }
    set name(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").name = value;
        if (__classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f").htmlFor = this.name;
        }
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").value;
    }
    set value(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f").value = value;
        __classPrivateFieldGet(this, _SpTextFieldUnit_internals, "f").setFormValue(this.value);
    }
    constructor() {
        super();
        _SpTextFieldUnit_labelElm.set(this, document.createElement("sp-text-field-label"));
        _SpTextFieldUnit_error.set(this, "");
        _SpTextFieldUnit_inputElm.set(this, document.createElement("sp-text-field-x-large-input"));
        _SpTextFieldUnit_errorTextElm.set(this, void 0);
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
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_labelElm, "f"));
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_inputElm, "f"));
        __classPrivateFieldSet(this, _SpTextFieldUnit_errorTextElm, document.createElement("sp-text-field-error-text"), "f");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_errorTextElm, "f"));
        this.error = __classPrivateFieldGet(this, _SpTextFieldUnit_error, "f");
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
_SpTextFieldUnit_labelElm = new WeakMap(), _SpTextFieldUnit_error = new WeakMap(), _SpTextFieldUnit_inputElm = new WeakMap(), _SpTextFieldUnit_errorTextElm = new WeakMap(), _SpTextFieldUnit_internals = new WeakMap();
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
