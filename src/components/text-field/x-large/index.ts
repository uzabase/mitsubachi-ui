import { makeStyleSheet } from "../../../components/styles";
import { SpTextFieldErrorIcon, } from "../error-icon";
import styles from "./styles.css?inline";

const cssStyleSheet = makeStyleSheet(styles); 
//cssStyleSheet.replaceSync(`${styles} ${resetStyle} ${foundationStyle}`);
console.log(cssStyleSheet);

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

const tagName = "sp-text-field-x-large";
declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-x-large": SpTextFieldXLarge;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldXLarge);
}

