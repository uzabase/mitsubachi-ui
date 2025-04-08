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
var _SpTextField_instances, _SpTextField_disabled_get, _SpTextField_input, _SpTextField_errorText, _SpTextField_internals, _SpTextField_initialized, _SpTextField_error, _SpTextField_updateStyle, _SpTextField_updateAttribute;
import "./error-text";
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpTextField extends HTMLElement {
    set type(newType) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").type = newType;
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateAttribute).call(this, "type", newType);
    }
    set error(text) {
        __classPrivateFieldSet(this, _SpTextField_error, text, "f");
        if (__classPrivateFieldGet(this, _SpTextField_instances, "a", _SpTextField_disabled_get))
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = "";
        else
            __classPrivateFieldGet(this, _SpTextField_errorText, "f").text = __classPrivateFieldGet(this, _SpTextField_error, "f");
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateStyle).call(this);
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateAttribute).call(this, "error", text);
    }
    set autocomplete(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").autocomplete = value;
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateAttribute).call(this, "autocomplete", value);
    }
    get autocomplete() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").autocomplete;
    }
    set placeholder(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").placeholder = value;
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateAttribute).call(this, "placeholder", value);
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
        if (value)
            this.setAttribute("disabled", "");
        else
            this.removeAttribute("disabled");
    }
    set name(value) {
        __classPrivateFieldGet(this, _SpTextField_input, "f").name = value;
        if (!value)
            __classPrivateFieldGet(this, _SpTextField_input, "f").removeAttribute("name");
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateAttribute).call(this, "name", value);
    }
    get value() {
        return __classPrivateFieldGet(this, _SpTextField_input, "f").value;
    }
    set value(value) {
        //const oldValue = this.value;
        console.log('prev', __classPrivateFieldGet(this, _SpTextField_input, "f").name, __classPrivateFieldGet(this, _SpTextField_input, "f").value, this.value, value);
        __classPrivateFieldGet(this, _SpTextField_input, "f").value = value;
        console.log('called', __classPrivateFieldGet(this, _SpTextField_input, "f").name, __classPrivateFieldGet(this, _SpTextField_input, "f").value, this.value, value);
        __classPrivateFieldGet(this, _SpTextField_internals, "f").setFormValue(this.value);
        __classPrivateFieldGet(this, _SpTextField_instances, "m", _SpTextField_updateAttribute).call(this, "value", value);
        this.dispatchEvent(new Event("input", {
            bubbles: true,
            composed: true,
        }));
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
            console.log('sp-textfield: event', e);
        });
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextField_input, "f"));
        __classPrivateFieldGet(this, _SpTextField_input, "f").classList.add("input");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextField_errorText, "f"));
        __classPrivateFieldSet(this, _SpTextField_initialized, true, "f");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        if (name === "disabled") {
            this.disabled = newValue !== null;
            return;
        }
        if (name === "autocomplete") {
            this.autocomplete = newValue;
            return;
        }
        this[name] = newValue ? newValue : "";
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
}, _SpTextField_updateAttribute = function _SpTextField_updateAttribute(name, value) {
    if (value)
        this.setAttribute(name, value);
    else
        this.removeAttribute(name);
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
