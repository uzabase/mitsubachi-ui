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
var _SpTextFieldXLargeInput_instances, _SpTextFieldXLargeInput_shadow, _SpTextFieldXLargeInput_input, _SpTextFieldXLargeInput_placeholder, _SpTextFieldXLargeInput_disabled, _SpTextFieldXLargeInput_name, _SpTextFieldXLargeInput_error, _SpTextFieldXLargeInput_value, _SpTextFieldXLargeInput_internals, _SpTextFieldXLargeInput_updateStyle;
import { makeStyleSheet } from "@/components/styles";
import styles from "./styles.css?inline";
export class SpTextFieldXLargeInput extends HTMLElement {
    get error() {
        return __classPrivateFieldGet(this, _SpTextFieldXLargeInput_error, "f");
    }
    set error(isError) {
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_error, isError, "f");
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_instances, "m", _SpTextFieldXLargeInput_updateStyle).call(this);
    }
    get placeholder() {
        return __classPrivateFieldGet(this, _SpTextFieldXLargeInput_placeholder, "f");
    }
    set placeholder(value) {
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_placeholder, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f"))
            __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").placeholder = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_placeholder, "f");
    }
    set disabled(value) {
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_disabled, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").disabled = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_disabled, "f");
        }
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_instances, "m", _SpTextFieldXLargeInput_updateStyle).call(this);
    }
    get name() {
        return __classPrivateFieldGet(this, _SpTextFieldXLargeInput_name, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_name, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").name = this.name;
        }
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextFieldXLargeInput_value, "f");
    }
    set value(value) {
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_value, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f"))
            __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").value = this.value;
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_internals, "f").setFormValue(this.value);
    }
    constructor() {
        super();
        _SpTextFieldXLargeInput_instances.add(this);
        _SpTextFieldXLargeInput_shadow.set(this, void 0);
        _SpTextFieldXLargeInput_input.set(this, void 0);
        _SpTextFieldXLargeInput_placeholder.set(this, "");
        _SpTextFieldXLargeInput_disabled.set(this, false);
        _SpTextFieldXLargeInput_name.set(this, "");
        _SpTextFieldXLargeInput_error.set(this, false);
        _SpTextFieldXLargeInput_value.set(this, "");
        _SpTextFieldXLargeInput_internals.set(this, void 0);
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_internals, this.attachInternals(), "f");
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_shadow, this.attachShadow({ mode: "open" }), "f");
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_shadow, "f").adoptedStyleSheets = [
            ...__classPrivateFieldGet(this, _SpTextFieldXLargeInput_shadow, "f").adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldSet(this, _SpTextFieldXLargeInput_input, document.createElement("input"), "f");
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_shadow, "f").appendChild(__classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f"));
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").type = "text";
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").classList.add("input");
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").addEventListener("input", (e) => {
            const target = e.target;
            this.value = target.value;
        });
        this.placeholder = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_placeholder, "f");
        this.disabled = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_disabled, "f");
        this.error = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_error, "f");
        this.name = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_name, "f");
        this.value = __classPrivateFieldGet(this, _SpTextFieldXLargeInput_value, "f");
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "placeholder") {
            this.placeholder = newValue ? newValue : "";
        }
        else if (name === "disabled") {
            this.disabled = newValue ? true : false;
        }
        else if (name === "error") {
            this.error = newValue ? true : false;
        }
        else if (name === "name") {
            this.name = newValue ? newValue : "";
        }
        else if (name === "value") {
            this.value = newValue ? newValue : "";
        }
    }
}
_SpTextFieldXLargeInput_shadow = new WeakMap(), _SpTextFieldXLargeInput_input = new WeakMap(), _SpTextFieldXLargeInput_placeholder = new WeakMap(), _SpTextFieldXLargeInput_disabled = new WeakMap(), _SpTextFieldXLargeInput_name = new WeakMap(), _SpTextFieldXLargeInput_error = new WeakMap(), _SpTextFieldXLargeInput_value = new WeakMap(), _SpTextFieldXLargeInput_internals = new WeakMap(), _SpTextFieldXLargeInput_instances = new WeakSet(), _SpTextFieldXLargeInput_updateStyle = function _SpTextFieldXLargeInput_updateStyle() {
    if (!__classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f")) {
        return;
    }
    if (__classPrivateFieldGet(this, _SpTextFieldXLargeInput_disabled, "f")) {
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").classList.remove("error");
        return;
    }
    if (this.error) {
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").classList.add("error");
    }
    else
        __classPrivateFieldGet(this, _SpTextFieldXLargeInput_input, "f").classList.remove("error");
};
SpTextFieldXLargeInput.observedAttributes = [
    "error",
    "placeholder",
    "disabled",
    "name",
    "value",
];
SpTextFieldXLargeInput.formAssociated = true;
const tagName = "sp-text-field-x-large-input";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldXLargeInput);
}
