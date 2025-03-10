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
var _SpTextField_instances, _SpTextField_input, _SpTextField_errorText, _SpTextField_internals, _SpTextField_initialized, _SpTextField_error, _SpTextField_inputHandler, _SpTextField_updateStyle;
import "./error-text";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextField extends HTMLElement {
    get type() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").type;
    }
    set type(newType) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").type = newType;
    }
    get error() {
        return __classPrivateFieldGet(this, _SpTextField_error, "f");
    }
    set error(text) {
        __classPrivateFieldSet(this, _SpTextField_error, text, "f");
        if (this.disabled)
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = "";
        else
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = this.error;
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateStyle).call(this);
    }
    get placeholder() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").placeholder;
    }
    set placeholder(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").placeholder = value;
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").hasAttribute("disabled");
    }
    set disabled(value) {
        if (value)
            __classPrivateFieldGet(this, _SpTextField_input, "f").setAttribute("disabled", "");
        else
            __classPrivateFieldGet(this, _SpTextField_input, "f").removeAttribute("disabled");
        if (this.disabled)
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = "";
        else
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = this.error;
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateStyle).call(this);
    }
    get name() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").name;
    }
    set name(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").name = value;
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").value;
    }
    set value(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").value = value;
        __classPrivateFieldGet(this, _SpTextField_internals, "f").setFormValue(this.value);
    }
    constructor() {
        super();
        _SpTextField_instances.add(this);
        _SpTextField_input.set(this, document.createElement("input"));
        _SpTextField_errorText.set(this, document.createElement("sp-text-field-error-text"));
        _SpTextField_internals.set(this, void 0);
        _SpTextField_initialized.set(this, false);
        _SpTextField_error.set(this, "");
        _SpTextField_inputHandler.set(this, (e) => {
            const target = e.target;
            this.value = target.value;
        });
        __classPrivateFieldSet(this, _SpTextField_internals, this.attachInternals(), "f");
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTextField_input, "f").addEventListener("input", __classPrivateFieldGet(this, _SpTextField_inputHandler, "f"));
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpTextField_initialized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextField_input, "f"));
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.add("input");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextField_errorText, "f"));
        __classPrivateFieldSet(this, _SpTextField_initialized, true, "f");
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "placeholder") {
            this.placeholder = newValue ? newValue : "";
        }
        else if (name === "disabled") {
            this.disabled = newValue !== null;
        }
        else if (name === "error") {
            this.error = newValue ? newValue : "";
        }
        else if (name === "name") {
            this.name = newValue ? newValue : "";
        }
        else if (name === "value") {
            this.value = newValue ? newValue : "";
        }
        else if (name === "type") {
            this.type = newValue ? newValue : "";
        }
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _SpTextField_input, "f").removeEventListener("input", __classPrivateFieldGet(this, _SpTextField_inputHandler, "f"));
    }
}
_SpTextField_input = new WeakMap(), _SpTextField_errorText = new WeakMap(), _SpTextField_internals = new WeakMap(), _SpTextField_initialized = new WeakMap(), _SpTextField_error = new WeakMap(), _SpTextField_inputHandler = new WeakMap(), _SpTextField_instances = new WeakSet(), _SpTextField_updateStyle = function _SpTextField_updateStyle() {
    if (this.disabled) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.remove("error");
        __classPrivateFieldGet(this, _SpTextField_input, "f").removeAttribute("aria-invalid");
        return;
    }
    if (this.error) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.add("error");
        __classPrivateFieldGet(this, _SpTextField_input, "f").setAttribute("aria-invalid", "");
    }
    else
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.remove("error");
};
SpTextField.observedAttributes = [
    "error",
    "placeholder",
    "disabled",
    "name",
    "value",
    "type",
];
SpTextField.formAssociated = true;
const tagName = "sp-text-field";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextField);
}
