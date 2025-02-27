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
var _SpTextFieldErrorMessage_instances, _SpTextFieldErrorMessage_span, _SpTextFieldErrorMessage_div, _SpTextFieldErrorMessage_textContent, _SpTextFieldErrorMessage_updateClass;
import { makeStyleSheet } from "../../styles";
import { SpTextFieldErrorIcon } from "../error-icon";
import styles from "./styles.css?inline";
export class SpTextFieldErrorMessage extends HTMLElement {
    get textContent() {
        return __classPrivateFieldGet(this, _SpTextFieldErrorMessage_textContent, "f");
    }
    set textContent(value) {
        __classPrivateFieldSet(this, _SpTextFieldErrorMessage_textContent, value, "f");
        if (__classPrivateFieldGet(this, _SpTextFieldErrorMessage_span, "f")) {
            __classPrivateFieldGet(this, _SpTextFieldErrorMessage_span, "f").textContent = value;
        }
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_instances, "m", _SpTextFieldErrorMessage_updateClass).call(this);
    }
    constructor() {
        super();
        _SpTextFieldErrorMessage_instances.add(this);
        _SpTextFieldErrorMessage_span.set(this, void 0);
        _SpTextFieldErrorMessage_div.set(this, void 0);
        _SpTextFieldErrorMessage_textContent.set(this, null);
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        __classPrivateFieldSet(this, _SpTextFieldErrorMessage_div, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_div, "f").setAttribute("class", "icon");
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_div, "f").appendChild(new SpTextFieldErrorIcon());
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldErrorMessage_div, "f"));
        __classPrivateFieldSet(this, _SpTextFieldErrorMessage_span, document.createElement("span"), "f");
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_span, "f").className = "message";
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTextFieldErrorMessage_span, "f"));
        this.textContent = __classPrivateFieldGet(this, _SpTextFieldErrorMessage_textContent, "f");
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "message") {
            this.textContent = newValue;
        }
    }
}
_SpTextFieldErrorMessage_span = new WeakMap(), _SpTextFieldErrorMessage_div = new WeakMap(), _SpTextFieldErrorMessage_textContent = new WeakMap(), _SpTextFieldErrorMessage_instances = new WeakSet(), _SpTextFieldErrorMessage_updateClass = function _SpTextFieldErrorMessage_updateClass() {
    if (__classPrivateFieldGet(this, _SpTextFieldErrorMessage_textContent, "f")) {
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_div, "f")?.classList.remove("none");
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_span, "f")?.classList.remove("none");
    }
    else {
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_div, "f")?.classList.add("none");
        __classPrivateFieldGet(this, _SpTextFieldErrorMessage_span, "f")?.classList.add("none");
    }
};
SpTextFieldErrorMessage.observedAttributes = ["textContent"];
const tagName = "sp-text-field-error-message";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpTextFieldErrorMessage);
}
