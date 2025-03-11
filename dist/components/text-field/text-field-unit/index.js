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
var _SpTextFieldUnit_instances, _SpTextFieldUnit_label, _SpTextFieldUnit_input, _SpTextFieldUnit_internals, _SpTextFieldUnit_initialized, _SpTextFieldUnit_inputHandler, _SpTextFieldUnit_updateStyle;
import "../text-field";
import "../../label-unit";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextFieldUnit extends HTMLElement {
    set text(text) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").text = text;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateStyle).call(this);
    }
    set error(text) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").error = text;
    }
    set disabled(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").disabled = newValue;
    }
    set placeholder(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").placeholder = newValue;
    }
    set name(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").name = value;
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").value;
    }
    set value(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").value = value;
        __classPrivateFieldGet(this, _SpTextFieldUnit_internals, "f").setFormValue(this.value);
    }
    set type(newValue) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").type = newValue;
    }
    set supporttext(value) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").supporttext = value;
        __classPrivateFieldGet(this, _SpTextFieldUnit_instances, "m", _SpTextFieldUnit_updateStyle).call(this);
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
    attributeChangedCallback(name, _, newValue) {
        if (name === "error") {
            this.error = newValue ? newValue : "";
        }
        else if (name === "text") {
            this.text = newValue ? newValue : "";
        }
        else if (name === "placeholder") {
            this.placeholder = newValue ? newValue : "";
        }
        else if (name === "disabled") {
            this.disabled = newValue !== null;
        }
        else if (name === "name") {
            this.name = newValue ? newValue : "";
        }
        else if (name === "value") {
            this.value = newValue ? newValue : "";
        }
        else if (name == "type") {
            __classPrivateFieldGet(this, _SpTextFieldUnit_input, "f").type = newValue ? newValue : "";
        }
        else if (name == "supporttext")
            this.supporttext = newValue ? newValue : "";
    }
}
_SpTextFieldUnit_label = new WeakMap(), _SpTextFieldUnit_input = new WeakMap(), _SpTextFieldUnit_internals = new WeakMap(), _SpTextFieldUnit_initialized = new WeakMap(), _SpTextFieldUnit_inputHandler = new WeakMap(), _SpTextFieldUnit_instances = new WeakSet(), _SpTextFieldUnit_updateStyle = function _SpTextFieldUnit_updateStyle() {
    if (__classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").isEmpty()) {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").classList.add("none");
    }
    else {
        __classPrivateFieldGet(this, _SpTextFieldUnit_label, "f").classList.remove("none");
    }
};
SpTextFieldUnit.observedAttributes = [
    "error",
    "text",
    "placeholder",
    "supporttext",
    "disabled",
    "name",
    "type",
    "value",
];
SpTextFieldUnit.formAssociated = true;
const tagName = "sp-text-field-unit";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldUnit);
}
