import "../../icon";

import { makeStyleSheet } from "../../styles";
import styles from "./styles.css?inline";

/**
 * @summary メニューの項目を表すコンポーネントです。
 *
 * @attr {text} text - 項目のテキスト
 *
 * @attr {boolean} selected - 項目が選択されていることを示します。属性があるときはチェックマークが表示されます。
 *
 * @attr {boolean} disabled - 項目が無効であることを示します。属性があれば、灰色で項目が表示されます。
 */
export class SpControlMenuItem extends HTMLElement {
  static observedAttributes = ["text"];

  get text(): null | string {
    return this.textElement.textContent;
  }

  get selected(): boolean {
    return this.hasAttribute("selected");
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  private textElement = document.createElement("span");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  private initialized = false;

  connectedCallback() {
    if (!this.shadowRoot || this.initialized) return;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      makeStyleSheet(styles),
    ];
    this.textElement.classList.add("text");
    this.shadowRoot.appendChild(this.textElement);

    const icon = document.createElement("sp-icon");
    icon.classList.add("icon");
    icon.setAttribute("type", "check-small");
    this.shadowRoot.appendChild(icon);
    this.initialized = true;
  }

  attributeChangedCallback(
    name: string,
    _: string | null,
    newValue: string | null,
  ) {
    if (name === "text") {
      if (newValue) this.textElement.textContent = newValue;
      else this.textElement.textContent = null;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-control-menu-item": SpControlMenuItem;
  }
}
if (!customElements.get("sp-control-menu-item")) {
  customElements.define("sp-control-menu-item", SpControlMenuItem);
}
