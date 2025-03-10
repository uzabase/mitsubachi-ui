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
var _SpIconErrorFill_initialized;
import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";
export class SpIconErrorFill extends HTMLElement {
    constructor() {
        super();
        _SpIconErrorFill_initialized.set(this, false);
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        if (!this.shadowRoot || __classPrivateFieldGet(this, _SpIconErrorFill_initialized, "f"))
            return;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            makeStyleSheet(styles),
        ];
        this.shadowRoot.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.99 7.55L16.45 3.01C16.12 2.68 15.68 2.5 15.21 2.5H8.79C8.32 2.5 7.88 2.68 7.55 3.01L3.01 7.55C2.68 7.88 2.5 8.33 2.5 8.79V15.21C2.5 15.67 2.69 16.12 3.01 16.45L7.55 20.99C7.88 21.32 8.32 21.5 8.79 21.5H15.21C15.68 21.5 16.12 21.32 16.45 20.99L20.99 16.45C21.32 16.12 21.5 15.67 21.5 15.21V8.79C21.5 8.33 21.31 7.88 20.99 7.55Z" fill="#DB351F"/><path d="M13.06 11.99L16.28 8.77002C16.57 8.48002 16.57 8.00002 16.28 7.71002C15.99 7.42002 15.51 7.42002 15.22 7.71002L12 10.93L8.78 7.71002C8.49 7.42002 8.01 7.42002 7.72 7.71002C7.43 8.00002 7.43 8.48002 7.72 8.77002L10.94 11.99L7.72 15.21C7.43 15.5 7.43 15.98 7.72 16.27C7.87 16.42 8.06 16.49 8.25 16.49C8.44 16.49 8.63 16.42 8.78 16.27L12 13.05L15.22 16.27C15.37 16.42 15.56 16.49 15.75 16.49C15.94 16.49 16.13 16.42 16.28 16.27C16.57 15.98 16.57 15.5 16.28 15.21L13.06 11.99Z" fill="white"/></svg>`;
        __classPrivateFieldSet(this, _SpIconErrorFill_initialized, true, "f");
    }
}
_SpIconErrorFill_initialized = new WeakMap();
const tagName = "sp-icon-error-fill";
if (!customElements.get(tagName)) {
    customElements.define(tagName, SpIconErrorFill);
}
