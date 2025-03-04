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
var _UbButton_instances, _UbButton_loading, _UbButton_disabled, _UbButton_type, _UbButton_variants, _UbButton_size, _UbButton_buttonElement, _UbButton_slotElement, _UbButton_buttonDisabledUpdate;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
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
styles.replaceSync(`${resetStyle} ${foundationStyle}`);
export class UbButton extends HTMLElement {
    get loading() {
        return __classPrivateFieldGet(this, _UbButton_loading, "f");
    }
    set loading(value) {
        const button = __classPrivateFieldGet(this, _UbButton_buttonElement, "f");
        __classPrivateFieldSet(this, _UbButton_loading, value, "f");
        if (value) {
            button.classList.add("loading");
        }
        else {
            button.classList.remove("loading");
        }
        __classPrivateFieldGet(this, _UbButton_instances, "m", _UbButton_buttonDisabledUpdate).call(this);
    }
    get disabled() {
        return __classPrivateFieldGet(this, _UbButton_disabled, "f");
    }
    set disabled(value) {
        __classPrivateFieldSet(this, _UbButton_disabled, value, "f");
        __classPrivateFieldGet(this, _UbButton_instances, "m", _UbButton_buttonDisabledUpdate).call(this);
    }
    set type(value) {
        const button = __classPrivateFieldGet(this, _UbButton_buttonElement, "f");
        const newValue = isValidType(value);
        button.classList.remove(__classPrivateFieldGet(this, _UbButton_type, "f"));
        button.classList.add(newValue);
        __classPrivateFieldSet(this, _UbButton_type, newValue, "f");
    }
    get variants() {
        return __classPrivateFieldGet(this, _UbButton_variants, "f");
    }
    set variants(value) {
        const button = __classPrivateFieldGet(this, _UbButton_buttonElement, "f");
        const newValue = isValidvariants(value);
        button.classList.remove(__classPrivateFieldGet(this, _UbButton_variants, "f"));
        button.classList.add(newValue);
        __classPrivateFieldSet(this, _UbButton_variants, newValue, "f");
    }
    set size(value) {
        const button = __classPrivateFieldGet(this, _UbButton_buttonElement, "f");
        const newValue = isValidSize(value);
        const typeClassList = {
            medium: "medium",
            large: "large",
            xLarge: "x-large",
        };
        button.classList.remove(typeClassList[__classPrivateFieldGet(this, _UbButton_size, "f")]);
        button.classList.add(typeClassList[newValue]);
        __classPrivateFieldSet(this, _UbButton_size, newValue, "f");
    }
    static get observedAttributes() {
        return ["loading", "disabled", "type", "variants", "size"];
    }
    constructor() {
        super();
        _UbButton_instances.add(this);
        _UbButton_loading.set(this, false);
        _UbButton_disabled.set(this, false);
        _UbButton_type.set(this, buttonType[0]);
        _UbButton_variants.set(this, variants[0]);
        _UbButton_size.set(this, size[0]);
        _UbButton_buttonElement.set(this, document.createElement("button"));
        _UbButton_slotElement.set(this, document.createElement("slot"));
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.loading = false;
        this.disabled = false;
        this.type = buttonType[0];
        this.variants = variants[0];
        this.size = size[0];
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _UbButton_slotElement, "f").classList.add("text");
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").appendChild(__classPrivateFieldGet(this, _UbButton_slotElement, "f"));
        this.shadowRoot?.appendChild(__classPrivateFieldGet(this, _UbButton_buttonElement, "f"));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
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
_UbButton_loading = new WeakMap(), _UbButton_disabled = new WeakMap(), _UbButton_type = new WeakMap(), _UbButton_variants = new WeakMap(), _UbButton_size = new WeakMap(), _UbButton_buttonElement = new WeakMap(), _UbButton_slotElement = new WeakMap(), _UbButton_instances = new WeakSet(), _UbButton_buttonDisabledUpdate = function _UbButton_buttonDisabledUpdate() {
    __classPrivateFieldGet(this, _UbButton_buttonElement, "f").disabled = this.disabled || this.loading;
};
if (!customElements.get("ub-button")) {
    customElements.define("ub-button", UbButton);
}
