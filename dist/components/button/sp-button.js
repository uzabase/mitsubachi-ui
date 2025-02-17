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
var _SpButton_instances, _SpButton_loading, _SpButton_disabled, _SpButton_type, _SpButton_variants, _SpButton_size, _SpButton_buttonElement, _SpButton_slotElement, _SpButton_buttonDisabledUpdate;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import buttonStyle from "./button.css?inline";
export const buttonType = ["normal", "danger"];
export const variants = ["primary", "secondary", "tertiary"];
export const size = ["medium", "large", "xLarge"];
function isValidType(value) {
    if (buttonType.some((type) => type === value)) {
        return value;
    }
    else {
        console.warn(`${value}は無効なtype属性です。`);
        return buttonType[0];
    }
}
function isValidvariants(value) {
    if (variants.some((variants) => variants === value)) {
        return value;
    }
    else {
        console.warn(`${value}は無効なvariants属性です。`);
        return variants[0];
    }
}
function isValidSize(value) {
    if (size.some((size) => size === value)) {
        return value;
    }
    else {
        console.warn(`${value}は無効なsize属性です。`);
        return size[0];
    }
}
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${buttonStyle}`);
export class SpButton extends HTMLElement {
    get loading() {
        return __classPrivateFieldGet(this, _SpButton_loading, "f");
    }
    set loading(value) {
        const button = __classPrivateFieldGet(this, _SpButton_buttonElement, "f");
        __classPrivateFieldSet(this, _SpButton_loading, value, "f");
        value
            ? button.classList.add("loading")
            : button.classList.remove("loading");
        __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton_buttonDisabledUpdate).call(this);
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpButton_disabled, "f");
    }
    set disabled(value) {
        __classPrivateFieldSet(this, _SpButton_disabled, value, "f");
        __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton_buttonDisabledUpdate).call(this);
    }
    set type(value) {
        const button = __classPrivateFieldGet(this, _SpButton_buttonElement, "f");
        const newValue = isValidType(value);
        button.classList.remove(__classPrivateFieldGet(this, _SpButton_type, "f"));
        button.classList.add(newValue);
        __classPrivateFieldSet(this, _SpButton_type, newValue, "f");
    }
    get variants() {
        return __classPrivateFieldGet(this, _SpButton_variants, "f");
    }
    set variants(value) {
        const button = __classPrivateFieldGet(this, _SpButton_buttonElement, "f");
        const newValue = isValidvariants(value);
        button.classList.remove(__classPrivateFieldGet(this, _SpButton_variants, "f"));
        button.classList.add(newValue);
        __classPrivateFieldSet(this, _SpButton_variants, newValue, "f");
    }
    set size(value) {
        const button = __classPrivateFieldGet(this, _SpButton_buttonElement, "f");
        const newValue = isValidSize(value);
        const typeClassList = {
            medium: "medium",
            large: "large",
            xLarge: "x-large",
        };
        button.classList.remove(typeClassList[__classPrivateFieldGet(this, _SpButton_size, "f")]);
        button.classList.add(typeClassList[newValue]);
        __classPrivateFieldSet(this, _SpButton_size, newValue, "f");
    }
    static get observedAttributes() {
        return ["loading", "disabled", "type", "variants", "size"];
    }
    constructor() {
        super();
        _SpButton_instances.add(this);
        _SpButton_loading.set(this, false);
        _SpButton_disabled.set(this, false);
        _SpButton_type.set(this, buttonType[0]);
        _SpButton_variants.set(this, variants[0]);
        _SpButton_size.set(this, size[0]);
        _SpButton_buttonElement.set(this, document.createElement("button"));
        _SpButton_slotElement.set(this, document.createElement("slot"));
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.loading = false;
        this.disabled = false;
        this.type = buttonType[0];
        this.variants = variants[0];
        this.size = size[0];
        console.log("constructor done: this.variants: " + this.variants);
    }
    connectedCallback() {
        console.log("connectedCallback start");
        __classPrivateFieldGet(this, _SpButton_buttonElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _SpButton_slotElement, "f").classList.add("text");
        __classPrivateFieldGet(this, _SpButton_buttonElement, "f").appendChild(__classPrivateFieldGet(this, _SpButton_slotElement, "f"));
        this.shadowRoot?.appendChild(__classPrivateFieldGet(this, _SpButton_buttonElement, "f"));
        console.log("connectedCallback done");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        console.log("attributeChangedCallback start: name: " + name);
        switch (name) {
            case "loading":
                this.loading = newValue === "true" || newValue === "";
                break;
            case "disabled":
                this.disabled = newValue === "true" || newValue === "";
                break;
            case "type":
                this.type = newValue;
                break;
            case "variants":
                this.variants = newValue;
                break;
            case "size":
                this.size = newValue;
                break;
        }
    }
}
_SpButton_loading = new WeakMap(), _SpButton_disabled = new WeakMap(), _SpButton_type = new WeakMap(), _SpButton_variants = new WeakMap(), _SpButton_size = new WeakMap(), _SpButton_buttonElement = new WeakMap(), _SpButton_slotElement = new WeakMap(), _SpButton_instances = new WeakSet(), _SpButton_buttonDisabledUpdate = function _SpButton_buttonDisabledUpdate() {
    __classPrivateFieldGet(this, _SpButton_buttonElement, "f").disabled = this.disabled || this.loading;
};
customElements.get("sp-button") || customElements.define("sp-button", SpButton);
