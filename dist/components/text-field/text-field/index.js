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
var _SpTextField_instances, _SpTextField_disabled_get, _SpTextField_input, _SpTextField_errorText, _SpTextField_internals, _SpTextField_initialized, _SpTextField_error, _SpTextField_updateStyle;
import "./error-text";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextField extends HTMLElement {
    set type(newType) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").type = newType;
    }
    set error(text) {
        __classPrivateFieldSet(this, _SpTextField_error, text, "f");
        if (__classPrivateFieldGet(this, _SpTextField_instances, "a", _SpTextField_disabled_get))
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = "";
        else
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = __classPrivateFieldGet(this, _SpTextField_error, "f");
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateStyle).call(this);
    }
    set autocomplete(value) {
        if (value) {
            __classPrivateFieldGet(this, _SpTextField_input, "f").autocomplete = value;
        }
        else {
            __classPrivateFieldGet(this, _SpTextField_input, "f").removeAttribute("autocomplete");
            this.removeAttribute("autocomplete");
        }
    }
    get autocomplete() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").autocomplete;
    }
    set placeholder(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").placeholder = value;
    }
    set disabled(value) {
        if (value)
            __classPrivateFieldGet(this, _SpTextField_input, "f").setAttribute("disabled", "");
        else
            __classPrivateFieldGet(this, _SpTextField_input, "f").removeAttribute("disabled");
        if (__classPrivateFieldGet(this, _SpTextField_instances, "a", _SpTextField_disabled_get))
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = "";
        else
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = __classPrivateFieldGet(this, _SpTextField_error, "f");
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateStyle).call(this);
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
        __classPrivateFieldSet(this, _SpTextField_internals, this.attachInternals(), "f");
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        // MDNは、constructorよりもconnectedCallbackを推奨しています。
        // WHATWGは、特にリソースの取得やレンダリングを、できるだけconstructorではなくconnectedCallbackで実装するように推奨しています。
        // 同時に、connectedCallbackは複数呼ばれるため、2回以上呼ばてはいけない処理にはガードを設けることを推奨しています。
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
        // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpTextField_initialized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        // 当web componentの外にイベントハンドラをつけないので、disconnectedCallbackで解除していないです
        // https://open-wc.org/guides/knowledge/events/#on-elements-outside-of-your-element
        __classPrivateFieldGet(this, _SpTextField_input, "f").addEventListener("input", (e) => {
            const target = e.target;
            this.value = target.value;
        });
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
        else if (name === "autocomplete") {
            this.autocomplete = newValue;
        }
    }
}
_SpTextField_input = new WeakMap(), _SpTextField_errorText = new WeakMap(), _SpTextField_internals = new WeakMap(), _SpTextField_initialized = new WeakMap(), _SpTextField_error = new WeakMap(), _SpTextField_instances = new WeakSet(), _SpTextField_disabled_get = function _SpTextField_disabled_get() {
    return __classPrivateFieldGet(this, _SpTextField_input, "f").hasAttribute("disabled");
}, _SpTextField_updateStyle = function _SpTextField_updateStyle() {
    if (__classPrivateFieldGet(this, _SpTextField_instances, "a", _SpTextField_disabled_get)) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.remove("error");
        __classPrivateFieldGet(this, _SpTextField_input, "f").removeAttribute("aria-invalid");
        return;
    }
    if (__classPrivateFieldGet(this, _SpTextField_error, "f")) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.add("error");
        __classPrivateFieldGet(this, _SpTextField_input, "f").setAttribute("aria-invalid", "");
    }
    else
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.remove("error");
};
SpTextField.observedAttributes = [
    "error",
    "placeholder",
    "autocomplete",
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
