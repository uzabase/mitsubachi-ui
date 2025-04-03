import { jp } from "./logo";

export class Logo extends HTMLElement {
  static observedAttributes = ["language"];

  #initialized = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initialized) return;
    this.shadowRoot.innerHTML = jp;
    this.#initialized = true;
  }

  set language(value: string) {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = jp;
    }
    if (value) this.setAttribute("language", value);
    else this.removeAttribute("language");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "language") {
      this.language = newValue ?? "";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

const tagName = "sp-icon";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpIcon);
}
