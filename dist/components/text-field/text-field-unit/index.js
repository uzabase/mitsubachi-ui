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
var _SpTextFieldUnit_instances, _SpTextFieldUnit_label, _SpTextFieldUnit_input, _SpTextFieldUnit_internals, _SpTextFieldUnit_initialized, _SpTextFieldUnit_inputHandler, _SpTextFieldUnit_updateStyle, _SpTextFieldUnit_updateAttribute;
import "../text-field";
import "../../label-unit";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
/**
 * @summary inputタグに相当するテキストフィールドです。テキストフィールドを説明するラベルがあります。
 *
 * @attr {string} text - テキストフィールドを説明するテキストです。テキストフィールドの上に表示されます。
 *
 * @attr {string} support-text - テキストフィールドを補足するテキストです。textで指定したテキストの下、テキストフィールドの上に表示されます。
 */
export class SpTextFieldUnit extends HTMLElement {
    set text(text) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").text = text;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateStyle).call(this);
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "text", text);
    }
    set error(text) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").error = text;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "error", text);
    }
    set disabled(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").disabled = newValue;
        if (newValue)
            this.setAttribute("disabled", "");
        else
            this.removeAttribute("disabled");
    }
    set placeholder(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").placeholder = newValue;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "placeholder", newValue);
    }
    set name(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").name = value;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "name", value);
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").value;
    }
    set value(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").value = value;
        __classPrivateFieldGet(this, _SpTextFieldUnit_internals, "f").setFormValue(this.value);
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "value", value);
    }
    set type(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").type = newValue;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "type", newValue);
    }
    set supportText(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").supportText = value;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateStyle).call(this);
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateAttribute).call(this, "support-text", value);
    }
    get autocomplete() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").autocomplete;
    }
    constructor() {
        super();
        _SpTextFieldUnit_instances.add(this);
        _SpTextFieldUnit_label.set(this, document.createElement("sp-label-unit"));
        _SpTextFieldUnit_input.set(this, document.createElement("sp-text-field"));
        _SpTextFieldUnit_internals.set(this, void 0);
        _SpTextFieldUnit_initialized.set(this, false);
        _SpTextFieldUnit_inputHandler.set(this, (e) => {
            const target = e.target;
            this.value = target.value;
        });
        this.attachShadow({ mode: "open" });
        __classPrivateFieldSet(this, _SpTextFieldUnit_internals, this.attachInternals(), "f");
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").addEventListener("input", __classPrivateFieldGet(this, _SpTextFieldUnit_inputHandler, "f"));
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpTextFieldUnit_initialized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        const fieldSet = document.createElement("fieldset");
        this.shadowRoot.appendChild(fieldSet);
        fieldSet.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_label, "f"));
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").classList.add("label");
        fieldSet.appendChild(__classPrivateFieldGet(this, _SpTextFieldUnit_input, "f"));
        __classPrivateFieldSet(this, _SpTextFieldUnit_initialized, true, "f");
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").removeEventListener("input", __classPrivateFieldGet(this, _SpTextFieldUnit_inputHandler, "f"));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        newValue = newValue ?? "";
        if (name === "disabled") {
            this.disabled = newValue ? true : false;
            return;
        }
        else if (name === "support-text") {
            this.supportText = newValue;
            return;
        }
        else if (name === "autocomplete") {
            __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").autocomplete = newValue;
            return;
        }
        this[name] = newValue;
    }
}
_SpTextFieldUnit_label = new WeakMap(), _SpTextFieldUnit_input = new WeakMap(), _SpTextFieldUnit_internals = new WeakMap(), _SpTextFieldUnit_initialized = new WeakMap(), _SpTextFieldUnit_inputHandler = new WeakMap(), _SpTextFieldUnit_instances = new WeakSet(), _SpTextFieldUnit_updateStyle = function _SpTextFieldUnit_updateStyle() {
    if (__classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").isEmpty()) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").classList.add("none");
    }
    else {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").classList.remove("none");
    }
}, _SpTextFieldUnit_updateAttribute = function _SpTextFieldUnit_updateAttribute(name, value) {
    if (value)
        this.setAttribute(name, value);
    else
        this.removeAttribute(name);
};
SpTextFieldUnit.observedAttributes = [
    "error",
    "text",
    "placeholder",
    "support-text",
    "disabled",
    "name",
    "type",
    "value",
    "autocomplete",
];
SpTextFieldUnit.formAssociated = true;
if (!customElements.get('sp-text-field-unit')) {
    customElements.define('sp-text-field-unit', SpTextFieldUnit);
}
