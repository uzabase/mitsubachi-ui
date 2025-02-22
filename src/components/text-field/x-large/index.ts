import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import styles from "./styles.css?inline";


const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(`${styles} ${resetStyle} ${foundationStyle}`);


export class SpTextField extends HTMLElement {

    readonly #shadow: ShadowRoot;

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });
  } 

    connectedCallback() {

        this.#shadow.adoptedStyleSheets = 
        [...this.#shadow.adoptedStyleSheets, cssStyleSheet];


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

