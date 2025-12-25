import "../icon";
import "../loading/sp-loading";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import styles from "./floating-button.styles";

export class SpFloatingButton extends LitElement {
  static styles = makeStyles(styles);

  @property({ type: Boolean })
  loading = false;

  render() {
    return html`<button class="base">
      ${this.loading
        ? html`<sp-loading class="loading" ai size="2xLarge"></sp-loading>`
        : html`<sp-icon class="icon" type="magic-fill"></sp-icon>`}
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
