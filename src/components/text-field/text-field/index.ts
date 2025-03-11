import "./error-text";

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

  set type(newType: string) {
    this.#input.type = newType;
  }

  set error(text: string) {
    this.#error = text;
    if (this.#disabled) this.#errorText.text = "";
    else this.#errorText.text = this.#error;

    this.#updateStyle();
  }

  set placeholder(value: string) {
    this.#input.placeholder = value;
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
    });

    this.shadowRoot.appendChild(this.#input);
    this.#input.classList.add("input");

    this.shadowRoot.appendChild(this.#errorText);

    this.#initialized = true;
  }

  attributeChangedCallback(name: string, _: string, newValue: string | null) {
    if (name === "placeholder") {
      this.placeholder = newValue ? newValue : "";
    } else if (name === "disabled") {
      this.disabled = newValue !== null;
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
