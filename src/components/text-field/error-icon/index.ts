import { makeStyleSheet } from "@/components/styles";

import styles from "./styles.css?inline";

export class SpTextFieldErrorIcon extends HTMLElement {
  readonly #shadow: ShadowRoot;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  } 

    connectedCallback() {

        this.#shadow.adoptedStyleSheets = 
        [...this.#shadow.adoptedStyleSheets, makeStyleSheet(styles)];

        this.#shadow.innerHTML = `<svg
        width="21"
        height="21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3663 6.60625L14.3938 2.63375C14.105 2.345 13.72 2.1875 13.3087 2.1875H7.69125C7.28 2.1875 6.895 2.345 6.60625 2.63375L2.63375 6.60625C2.345 6.895 2.1875 7.28875 2.1875 7.69125V13.3087C2.1875 13.7112 2.35375 14.105 2.63375 14.3938L6.60625 18.3662C6.895 18.655 7.28 18.8125 7.69125 18.8125H13.3087C13.72 18.8125 14.105 18.655 14.3938 18.3662L18.3663 14.3938C18.655 14.105 18.8125 13.7112 18.8125 13.3087V7.69125C18.8125 7.28875 18.6463 6.895 18.3663 6.60625Z"
          fill="#DB351F"
        />
        <path
          d="M11.4273 10.4912L14.2448 7.67372C14.4985 7.41997 14.4985 6.99997 14.2448 6.74622C13.991 6.49247 13.571 6.49247 13.3173 6.74622L10.4998 9.56372L7.68226 6.74622C7.42851 6.49247 7.00852 6.49247 6.75477 6.74622C6.50102 6.99997 6.50102 7.41997 6.75477 7.67372L9.57226 10.4912L6.75477 13.3087C6.50102 13.5625 6.50102 13.9825 6.75477 14.2362C6.88602 14.3675 7.05226 14.4287 7.21851 14.4287C7.38476 14.4287 7.55101 14.3675 7.68226 14.2362L10.4998 11.4187L13.3173 14.2362C13.4485 14.3675 13.6148 14.4287 13.781 14.4287C13.9473 14.4287 14.1135 14.3675 14.2448 14.2362C14.4985 13.9825 14.4985 13.5625 14.2448 13.3087L11.4273 10.4912Z"
          fill="white"
        />
      </svg>`

    }

}

const tagName = "sp-text-field-error-icon";
declare global {
  interface HTMLElementTagNameMap {
    tagName: SpTextFieldErrorIcon;
  }
}
if (!customElements.get(tagName)) {
  customElements.define(tagName, SpTextFieldErrorIcon);
}

