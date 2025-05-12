import "./error-text";

import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";

export class SpTextField extends HTMLElement {
  static observedAttributes = [
    "error",
    "placeholder",
    "autocomplete",
    "disabled",
    "name",
    "value",
    "type",
  ];

  static formAssociated = true;

  set type(newType: string) {
    this.#input.type = newType;
    this.#updateAttribute("type", newType);
  }

  set error(text: string) {
    this.#error = text;
    if (this.#disabled) this.#errorText.text = "";
    else this.#errorText.text = this.#error;
    this.#updateStyle();
    this.#updateAttribute("error", text);
  }

  set autocomplete(value: AutoFill) {
    this.#input.autocomplete = value;
    this.#updateAttribute("autocomplete", value);
  }

  get autocomplete(): AutoFill {
    return this.#input.autocomplete;
  }

  set placeholder(value: string) {
    this.#input.placeholder = value;
    this.#updateAttribute("placeholder", value);
  }

  get #disabled(): boolean {
    return this.#input.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) this.#input.setAttribute("disabled", "");
    else this.#input.removeAttribute("disabled");

    if (this.#disabled) this.#errorText.text = "";
    else this.#errorText.text = this.#error;

    this.#updateStyle();

    if (value) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
  }

  set name(value: string) {
    this.#input.name = value;
    if (!value) this.#input.removeAttribute("name");
    this.#updateAttribute("name", value);
  }

  get value(): string {
    return this.#input.value;
  }

  set value(value: string) {
    this.#input.value = value;
    this.#internals.setFormValue(this.value);
    this.#updateAttribute("value", value);
  }

  #input = document.createElement("input");

  #errorText = document.createElement("sp-text-field-error-text");

  #internals: ElementInternals;

  #initialized = false;

  #error: string = "";

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // MDNは、constructorよりもconnectedCallbackを推奨しています。
    // WHATWGは、特にリソースの取得やレンダリングを、できるだけconstructorではなくconnectedCallbackで実装するように推奨しています。
    // 同時に、connectedCallbackは複数呼ばれるため、2回以上呼ばてはいけない処理にはガードを設けることを推奨しています。
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
    // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
    if (!this.shadowRoot || this.#initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];
    // 当web componentの外にイベントハンドラをつけないので、disconnectedCallbackで解除していないです
    // https://open-wc.org/guides/knowledge/events/#on-elements-outside-of-your-element
    this.#input.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.value = target.value;

      // 1パスワードがパスワードを自動入力したときのイベントにcomposedがなかったため、sp-text-field-unitにinputイベントが伝搬されず、
      // 自動入力されたパスワードがformで送信されないことがありました。
      // そのため、composedがfalseのイベントがinputタグで発生したら、代わりに発火します。
      if (!e.composed) {
        this.dispatchEvent(new InputEvent("input", { ...e, composed: true }));
      }
    });

    this.shadowRoot.appendChild(this.#input);
    this.#input.classList.add("input");

    this.shadowRoot.appendChild(this.#errorText);

    this.#initialized = true;
  }

  attributeChangedCallback(
    name:
      | "placeholder"
      | "disabled"
      | "error"
      | "name"
      | "value"
      | "type"
      | "autocomplete",
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "disabled") {
      this.disabled = newValue !== null;
      return;
    }
    if (name === "autocomplete") {
      this.autocomplete = newValue as AutoFill;
      return;
    }
    this[name] = newValue ? newValue : "";
  }

  #updateStyle() {
    if (this.#disabled) {
      this.#input.classList.remove("error");
      this.#input.removeAttribute("aria-invalid");
      return;
    }
    if (this.#error) {
      this.#input.classList.add("error");
      this.#input.setAttribute("aria-invalid", "");
    } else this.#input.classList.remove("error");
  }

  #updateAttribute(name: string, value: string) {
    if (value) this.setAttribute(name, value);
    else this.removeAttribute(name);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field": SpTextField;
  }
}
if (!customElements.get("sp-text-field")) {
  customElements.define("sp-text-field", SpTextField);
}
