import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import buttonStyle from "./button.css?inline";

export const buttonType = ["normal", "danger"] as const;
type ButtonType = (typeof buttonType)[number];

export const variants = ["primary", "secondary", "tertiary"] as const;
type variants = (typeof variants)[number];

export const size = ["medium", "large", "xLarge"] as const;
type Size = (typeof size)[number];

function isValidType(value: string): ButtonType {
  if (buttonType.some((type) => type === value)) {
    return value as ButtonType;
  } else {
    console.warn(`${value}は無効なtype属性です。`);
    return buttonType[0];
  }
}

function isValidvariants(value: string): variants {
  if (variants.some((variants) => variants === value)) {
    return value as variants;
  } else {
    console.warn(`${value}は無効なvariants属性です。`);
    return variants[0];
  }
}

function isValidSize(value: string): Size {
  if (size.some((size) => size === value)) {
    return value as Size;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return size[0];
  }
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${buttonStyle}`);

export class SpButton extends HTMLElement {
  #loading: boolean = false;
  #disabled: boolean = false;
  #type: ButtonType = buttonType[0];
  #variants: variants = variants[0];
  #size: Size = size[0];

  #buttonElement = document.createElement("button");
  #slotElement = document.createElement("slot");

  get loading() {
    return this.#loading;
  }
  set loading(value: boolean) {
    const button = this.#buttonElement;
    this.#loading = value;
    if (value) {
      button.classList.add("loading");
    } else {
      button.classList.remove("loading");
    }
    this.#buttonDisabledUpdate();
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.#buttonDisabledUpdate();
  }

  set type(value: string) {
    const button = this.#buttonElement;
    const newValue: ButtonType = isValidType(value);

    button.classList.remove(this.#type);
    button.classList.add(newValue);
    this.#type = newValue;
  }

  get variants() {
    return this.#variants;
  }
  set variants(value: string) {
    const button = this.#buttonElement;
    const newValue: variants = isValidvariants(value);

    button.classList.remove(this.#variants);
    button.classList.add(newValue);
    this.#variants = newValue;
  }

  set size(value: string) {
    const button = this.#buttonElement;
    const newValue: Size = isValidSize(value);
    const typeClassList = {
      medium: "medium",
      large: "large",
      xLarge: "x-large",
    };
    button.classList.remove(typeClassList[this.#size]);
    button.classList.add(typeClassList[newValue]);
    this.#size = newValue;
  }

  static get observedAttributes() {
    return ["loading", "disabled", "type", "variants", "size"];
  }

  constructor() {
    super();

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

    this.#buttonElement.classList.add("base");
    this.#slotElement.classList.add("text");
    this.#buttonElement.appendChild(this.#slotElement);
    this.shadowRoot?.appendChild(this.#buttonElement);

    console.log("connectedCallback done");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
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

  #buttonDisabledUpdate() {
    this.#buttonElement.disabled = this.disabled || this.loading;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}

if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}
