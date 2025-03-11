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
var _SpLabelUnit_instances, _SpLabelUnit_text_get, _SpLabelUnit_supporttext_get, _SpLabelUnit_label, _SpLabelUnit_support, _SpLabelUnit_initialized, _SpLabelUnit_updateClass;
import { makeStyleSheet } from "../styles";
import styles from "./styles.css?inline";
export class SpLabelUnit extends HTMLElement {
    set text(text) {
        __classPrivateFieldGet(this, _SpLabelUnit_label, "f").textContent = text;
        __classPrivateFieldGet(this, _SpLabelUnit_instances, "m", _SpLabelUnit_updateClass).call(this);
    }
    set supporttext(value) {
        __classPrivateFieldGet(this, _SpLabelUnit_support, "f").textContent = value;
        __classPrivateFieldGet(this, _SpLabelUnit_instances, "m", _SpLabelUnit_updateClass).call(this);
    }
    constructor() {
        super();
        _SpLabelUnit_instances.add(this);
        _SpLabelUnit_label.set(this, document.createElement("span"));
        _SpLabelUnit_support.set(this, document.createElement("span"));
        _SpLabelUnit_initialized.set(this, false);
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpLabelUnit_initialized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldGet(this, _SpLabelUnit_label, "f").classList.add("label");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpLabelUnit_label, "f"));
        __classPrivateFieldGet(this, _SpLabelUnit_support, "f").classList.add("support");
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpLabelUnit_support, "f"));
        __classPrivateFieldSet(this, _SpLabelUnit_initialized, true, "f");
    }
    /**
     * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
     */
    isEmpty() {
        return __classPrivateFieldGet(this, _SpLabelUnit_instances, "a", _SpLabelUnit_text_get) === "" && __classPrivateFieldGet(this, _SpLabelUnit_instances, "a", _SpLabelUnit_supporttext_get) === "";
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "text") {
            this.text = newValue ? newValue : "";
        }
        else if (name === "supporttext") {
            this.supporttext = newValue ? newValue : "";
        }
    }
}
_SpLabelUnit_label = new WeakMap(), _SpLabelUnit_support = new WeakMap(), _SpLabelUnit_initialized = new WeakMap(), _SpLabelUnit_instances = new WeakSet(), _SpLabelUnit_text_get = function _SpLabelUnit_text_get() {
    return __classPrivateFieldGet(this, _SpLabelUnit_label, "f").textContent ? __classPrivateFieldGet(this, _SpLabelUnit_label, "f").textContent : "";
}, _SpLabelUnit_supporttext_get = function _SpLabelUnit_supporttext_get() {
    return __classPrivateFieldGet(this, _SpLabelUnit_support, "f").textContent ? __classPrivateFieldGet(this, _SpLabelUnit_support, "f").textContent : "";
}, _SpLabelUnit_updateClass = function _SpLabelUnit_updateClass() {
    if (__classPrivateFieldGet(this, _SpLabelUnit_instances, "a", _SpLabelUnit_text_get)) {
        __classPrivateFieldGet(this, _SpLabelUnit_label, "f").classList.remove("none");
    }
    else {
        __classPrivateFieldGet(this, _SpLabelUnit_label, "f").classList.add("none");
    }
    if (__classPrivateFieldGet(this, _SpLabelUnit_instances, "a", _SpLabelUnit_supporttext_get)) {
        __classPrivateFieldGet(this, _SpLabelUnit_support, "f").classList.remove("none");
    }
    else {
        __classPrivateFieldGet(this, _SpLabelUnit_support, "f").classList.add("none");
    }
};
SpLabelUnit.styles = makeStyleSheet(styles);
SpLabelUnit.observedAttributes = ["text", "supporttext"];
const tagName = "sp-label-unit";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpLabelUnit);
}
