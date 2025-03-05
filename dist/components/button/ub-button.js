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
var _UbButton_instances, _UbButton_loading, _UbButton_disabled, _UbButton_variants, _UbButton_size, _UbButton_buttonElement, _UbButton_slotElement, _UbButton_buttonDisabledUpdate, _UbButton_isValudButtonType;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
export const variants = ["primary", "secondary", "tertiary"];
export const size = ["medium", "large", "xLarge"];
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
    get type() {
        return __classPrivateFieldGet(this, _UbButton_buttonElement, "f").type;
    }
    set type(value) {
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").type = value;
    }
    get name() {
        return __classPrivateFieldGet(this, _UbButton_buttonElement, "f").name;
    }
    set name(value) {
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").name = value;
    }
    get value() {
        return __classPrivateFieldGet(this, _UbButton_buttonElement, "f").value;
    }
    set value(newValue) {
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").value = newValue;
    }
    get danger() {
        return __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.contains('danger');
    }
    set danger(value) {
        if (value) {
            __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.remove('normal');
            __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.add('danger');
        }
        else {
            __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.remove('danger');
            __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.add('normal');
        }
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
        if (this.danger)
            this.danger = true;
        __classPrivateFieldSet(this, _UbButton_size, newValue, "f");
    }
    static get observedAttributes() {
        return ["loading", "disabled", "variants", "size", "danger", 'value', 'name', 'type'];
    }
    constructor() {
        super();
        _UbButton_instances.add(this);
        _UbButton_loading.set(this, false);
        _UbButton_disabled.set(this, false);
        _UbButton_variants.set(this, variants[0]);
        _UbButton_size.set(this, size[0]);
        _UbButton_buttonElement.set(this, document.createElement("button"));
        _UbButton_slotElement.set(this, document.createElement("slot"));
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.loading = false;
        this.disabled = false;
        this.variants = variants[0];
        this.size = size[0];
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _UbButton_slotElement, "f").classList.add("text");
        __classPrivateFieldGet(this, _UbButton_buttonElement, "f").appendChild(__classPrivateFieldGet(this, _UbButton_slotElement, "f"));
        this.shadowRoot?.appendChild(__classPrivateFieldGet(this, _UbButton_buttonElement, "f"));
        if (this.danger)
            this.danger = true;
        else
            this.danger = false;
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
            case "danger":
                this.danger = newValue !== null;
                break;
            case "type":
                if (__classPrivateFieldGet(this, _UbButton_instances, "m", _UbButton_isValudButtonType).call(this, newValue))
                    this.type = newValue;
                else
                    __classPrivateFieldGet(this, _UbButton_buttonElement, "f").removeAttribute('type');
                break;
            case "name":
                if (newValue === null)
                    __classPrivateFieldGet(this, _UbButton_buttonElement, "f").removeAttribute('name');
                else
                    this.name = newValue;
                break;
            case "value":
                if (newValue === null)
                    __classPrivateFieldGet(this, _UbButton_buttonElement, "f").removeAttribute('value');
                else
                    this.value = newValue;
                break;
            case "variants":
                this.variants = newValue === null ? '' : newValue;
                break;
            case "size":
                this.size = newValue === null ? "" : newValue;
                break;
        }
    }
}
_UbButton_loading = new WeakMap(), _UbButton_disabled = new WeakMap(), _UbButton_variants = new WeakMap(), _UbButton_size = new WeakMap(), _UbButton_buttonElement = new WeakMap(), _UbButton_slotElement = new WeakMap(), _UbButton_instances = new WeakSet(), _UbButton_buttonDisabledUpdate = function _UbButton_buttonDisabledUpdate() {
    __classPrivateFieldGet(this, _UbButton_buttonElement, "f").disabled = this.disabled || this.loading;
}, _UbButton_isValudButtonType = function _UbButton_isValudButtonType(value) {
    return ["reset", "submit", "button"].some((type) => type === value);
};
if (!customElements.get("ub-button")) {
    customElements.define("ub-button", UbButton);
}
