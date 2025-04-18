import { en, ja, zh } from "./logo";

export class SpLogo extends HTMLElement {
  static observedAttributes = ["language"];

  #initialized = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot || this.#initialized) return;
    this.shadowRoot.innerHTML = ja;
    this.#initialized = true;
  }

  set language(value: string) {
    if (this.shadowRoot) {
      if (value == "ja") this.shadowRoot.innerHTML = ja;
      else if (value == "en") this.shadowRoot.innerHTML = en;
      else if (value == "zh") this.shadowRoot.innerHTML = zh;
      else this.shadowRoot.innerHTML = "";
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
    "sp-logo": SpLogo;
  }
}

const tagName = "sp-logo";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpLogo);
}
