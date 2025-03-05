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
var _SpTextField_instances, _SpTextField_shadow, _SpTextField_input, _SpTextField_error, _SpTextField_internals, _SpTextField_updateStyle;
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextField extends HTMLElement {
    get error() {
        return __classPrivateFieldGet(this, _SpTextField_error, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").type;
    }
    set type(newType) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").type = newType;
    }
    set error(isError) {
        __classPrivateFieldSet(this, _SpTextField_error, isError, "f");
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
        _SpTextField_shadow.set(this, void 0);
        _SpTextField_input.set(this, document.createElement("input"));
        _SpTextField_error.set(this, false);
        _SpTextField_internals.set(this, void 0);
        __classPrivateFieldSet(this, _SpTextField_internals, this.attachInternals(), "f");
        __classPrivateFieldSet(this, _SpTextField_shadow, this.attachShadow({ mode: "open" }), "f");
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTextField_shadow, "f").adoptedStyleSheets = [
            ...__classPrivateFieldGet(this, _SpTextField_shadow, "f").adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldGet(this, _SpTextField_shadow, "f").appendChild(__classPrivateFieldGet(this, _SpTextField_input, "f"));
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.add("input");
        __classPrivateFieldGet(this, _SpTextField_input, "f").addEventListener("input", (e) => {
            const target = e.target;
            this.value = target.value;
        });
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
        else if (name === "type") {
            this.type = newValue ? newValue : "";
        }
    }
}
_SpTextField_shadow = new WeakMap(), _SpTextField_input = new WeakMap(), _SpTextField_error = new WeakMap(), _SpTextField_internals = new WeakMap(), _SpTextField_instances = new WeakSet(), _SpTextField_updateStyle = function _SpTextField_updateStyle() {
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
