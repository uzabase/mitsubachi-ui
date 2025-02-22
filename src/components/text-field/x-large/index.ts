import resetStyle from "@acab/reset.css?inline";

import { SpTextFieldErrorIcon } from "../error-icon";
import foundationStyle from "../foundation.css?inline";
import styles from "./styles.css?inline";


const cssStyleSheet = new CSSStyleSheet();
cssStyleSheet.replaceSync(`${styles} ${resetStyle} ${foundationStyle}`);


export class SpTextFieldXLarge extends HTMLElement {

    readonly #shadow: ShadowRoot;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  } 

    connectedCallback() {

        this.#shadow.adoptedStyleSheets = 
        [...this.#shadow.adoptedStyleSheets];

        this.#shadow.appendChild(new SpTextFieldErrorIcon());

    }
} 

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-x-large": SpTextFieldXLarge;
  }
}
const tagName = "sp-text-field-x-large";
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldXLarge);
}

