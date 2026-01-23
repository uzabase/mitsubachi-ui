import "../icon";
import "../loading/mi-loading";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import styles from "./floating-button.styles";

export class MiFloatingButton extends LitElement {
  static styles = makeStyles(styles);

  @property({ type: Boolean })
  loading = false;

  render() {
    return html`<button class="base">
      ${this.loading
        ? html`<mi-loading class="loading" ai size="3xLarge"></mi-loading>`
        : html`<mi-icon class="icon" type="magic-fill"></mi-icon>`}
    </button>`;
  }
}

/** @deprecated 代わりに MiFloatingButton を使用してください */
export class SpFloatingButton extends MiFloatingButton {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-floating-button": MiFloatingButton;
    "sp-floating-button": SpFloatingButton;
  }
}

if (!customElements.get("mi-floating-button")) {
  customElements.define("mi-floating-button", MiFloatingButton);
}

if (!customElements.get("sp-floating-button")) {
  customElements.define("sp-floating-button", SpFloatingButton);
}
