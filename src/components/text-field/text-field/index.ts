import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";

export class SpTextField extends HTMLElement {
  static observedAttributes = [
    "error",
    "placeholder",
    "disabled",
    "name",
    "value",
    "type",
  ];

  static formAssociated = true;

  get type(): string {
    return this.#input.type;
  }

  set type(newType: string) {
    this.#input.type = newType;
  }

  get error(): string {
    return this.#errorText.text;
  }

  set error(text: string) {
    this.#errorText.text = text;
    this.#updateStyle();
  }

  get placeholder(): string {
    return this.#input.placeholder;
  }

  set placeholder(value: string) {
    this.#input.placeholder = value;
  }

  get disabled(): boolean {
    return this.#input.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) this.#input.setAttribute("disabled", "");
    else this.#input.removeAttribute("disabled");
    this.#updateStyle();
  }

  get name(): string {
    return this.#input.name;
  }

  set name(value: string) {
    this.#input.name = value;
  }

  get value(): string {
    return this.#input.value;
  }

  set value(value: string) {
    this.#input.value = value;
    this.#internals.setFormValue(this.value);
  }

  readonly #shadow: ShadowRoot;

  #input = document.createElement("input");

  #errorText = document.createElement("sp-text-field-error-text");

  #internals: ElementInternals;

  #initialized = false;

  #inputHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#input.addEventListener("input", this.#inputHandler);

    if (this.#initialized) return;

    this.#shadow.adoptedStyleSheets = [
      ...this.#shadow.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];

    this.#shadow.appendChild(this.#input);
    this.#input.classList.add("input");

    this.#shadow.appendChild(this.#errorText);

    this.#initialized = true;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "placeholder") {
      this.placeholder = newValue ? newValue : "";
    } else if (name === "disabled") {
      this.disabled = newValue ? true : false;
    } else if (name === "error") {
      this.error = newValue ? newValue : "";
    } else if (name === "name") {
      this.name = newValue ? newValue : "";
    } else if (name === "value") {
      this.value = newValue ? newValue : "";
    } else if (name === "type") {
      this.type = newValue ? newValue : "";
    }
  }
  disconnectedCallback() {
    this.#input.removeEventListener("input", this.#inputHandler);
  }

  #updateStyle() {
    if (this.disabled) {
      this.#input.classList.remove("error");
      this.#input.removeAttribute("aria-invalid");
      return;
    }
    if (this.error) {
      this.#input.classList.add("error");
      this.#input.setAttribute("aria-invalid", "");
    } else this.#input.classList.remove("error");
  }
}

const tagName = "sp-text-field";
declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field": SpTextField;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextField);
}
