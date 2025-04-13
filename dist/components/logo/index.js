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
var _SpLogo_initialized;
import { cn, en, jp } from "./logo";
/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} language - スピーダのロゴにある社名の言語を定義します。language=jpであれば日本語, language=enであれば英語, cnであれば簡体字です。
 */
export class SpLogo extends HTMLElement {
    constructor() {
        super();
        _SpLogo_initialized.set(this, false);
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpLogo_initialized, "f"))
            return;
        this.shadowRoot.innerHTML = jp;
        __classPrivateFieldSet(this, _SpLogo_initialized, true, "f");
    }
    set language(value) {
        if (this.shadowRoot) {
            if (value == "jp")
                this.shadowRoot.innerHTML = jp;
            else if (value == "en")
                this.shadowRoot.innerHTML = en;
            else if (value == "cn")
                this.shadowRoot.innerHTML = cn;
            else
                this.shadowRoot.innerHTML = "";
        }
        if (value)
            this.setAttribute("language", value);
        else
            this.removeAttribute("language");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        if (name === "language") {
            this.language = newValue ?? "";
        }
    }
}
_SpLogo_initialized = new WeakMap();
SpLogo.observedAttributes = ["language"];
if (!customElements.get("sp-logo")) {
    customElements.define("sp-logo", SpLogo);
}
