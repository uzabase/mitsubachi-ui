import { cn, en, jp } from "./logo";

/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} language - スピーダのロゴにある社名の言語を定義します。language=jpであれば日本語, language=enであれば英語, cnであれば簡体字です。
 */
export class SpLogo extends HTMLElement {
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
      if (value == "jp") this.shadowRoot.innerHTML = jp;
      else if (value == "en") this.shadowRoot.innerHTML = en;
      else if (value == "cn") this.shadowRoot.innerHTML = cn;
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

if (!customElements.get("sp-logo")) {
  customElements.define("sp-logo", SpLogo);
}
