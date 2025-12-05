import "../icon";

import { html, LitElement } from "lit";

import { makeStyles } from "../styles";
import styles from "./floating-button.styles";

export class SpFloatingButton extends LitElement {
  static styles = makeStyles(styles);

  render() {
    return html`<button class="base">
      <sp-icon class="icon" type="magic-fill"></sp-icon>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-floating-button": SpFloatingButton;
  }
}

if (!customElements.get("sp-floating-button")) {
  customElements.define("sp-floating-button", SpFloatingButton);
}
