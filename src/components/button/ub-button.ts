import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";

export const variants = ["primary", "secondary", "tertiary"] as const;
type variants = (typeof variants)[number];

export const size = ["medium", "large", "xLarge"] as const;
type Size = (typeof size)[number];

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
styles.replaceSync(`${resetStyle} ${foundationStyle}`);

export class UbButton extends HTMLElement {
  #loading: boolean = false;
  #disabled: boolean = false;
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
  // button.typeの型に合わせるために型エイリアスを使っていません
  get type(): "submit" | "reset" | "button" {
    return this.#buttonElement.type;
  }

  set type(value: "submit" | "reset" | "button") {
    this.#buttonElement.type = value;
  }

  get name(): string {
    return this.#buttonElement.name;
  }
  set name(value: string) {
    this.#buttonElement.name = value;
  }

  get value(): string {
    return this.#buttonElement.value;
  }
  set value(newValue: string) {
    this.#buttonElement.value = newValue;
  }
  get danger(): boolean {
    return this.#danger;
  }

  set danger(value: boolean) {
    this.#danger = value;
    this.#updateDanger();
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
    if (this.danger) this.danger = true;
    this.#size = newValue;
  }

  static get observedAttributes() {
    return [
      "loading",
      "disabled",
      "variants",
      "size",
      "danger",
      "value",
      "name",
      "type",
    ];
  }

  #danger: boolean = false;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.loading = false;
    this.disabled = false;
    this.variants = variants[0];
    this.size = size[0];
  }

  connectedCallback() {
    this.#buttonElement.classList.add("base");
    this.#slotElement.classList.add("text");
    this.#buttonElement.appendChild(this.#slotElement);
    this.shadowRoot?.appendChild(this.#buttonElement);
    this.#updateDanger();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    //storybookで、argTypesで{type: "string" }を使い、空文字を入力するとnewValueの実引数がnullになりました
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;
    switch (name) {
      case "loading":
        this.loading = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "danger":
        // 真偽値の判定を、<input>のdisabled属性のような非カスタムタグの真偽値属性に合わせます。
        this.danger = newValue !== null;
        break;
      case "type":
        if (this.#isValudButtonType(newValue)) this.type = newValue;
        else this.#buttonElement.removeAttribute("type");
        break;
      case "name":
        if (newValue === null) this.#buttonElement.removeAttribute("name");
        else this.name = newValue;
        break;
      case "value":
        if (newValue === null) this.#buttonElement.removeAttribute("value");
        else this.value = newValue;
        break;
      case "variants":
        this.variants = newValue === null ? "" : newValue;
        break;
      case "size":
        this.size = newValue === null ? "" : newValue;
        break;
    }
  }

  #buttonDisabledUpdate() {
    this.#buttonElement.disabled = this.disabled || this.loading;
  }

  #isValudButtonType(value: string | null): value is buttonType {
    return ["reset", "submit", "button"].some((type) => type === value);
  }

  #updateDanger() {
    if (this.danger) {
      this.#buttonElement.classList.remove("normal");
      this.#buttonElement.classList.add("danger");
    } else {
      this.#buttonElement.classList.remove("danger");
      this.#buttonElement.classList.add("normal");
    }
  }
}
type buttonType = "reset" | "submit" | "button";

declare global {
  interface HTMLElementTagNameMap {
    "ub-button": UbButton;
  }
}

if (!customElements.get("ub-button")) {
  customElements.define("ub-button", UbButton);
}
