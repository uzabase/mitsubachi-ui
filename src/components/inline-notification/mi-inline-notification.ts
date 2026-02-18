import "../icon-color";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./inline-notification.styles";

type Type = "error" | "information" | "success" | "warning";

export const types: Type[] = [
  "information",
  "success",
  "warning",
  "error",
] as const;

export class MiInlineNotification extends LitElement {
  @property({ type: String, reflect: true })
  type: Type = "information";

  static styles = makeStyles(unsafeCSS(style));

  render() {
    const type = types.includes(this.type) ? this.type : "information";
    return html`
      <div class="base" data-type=${type}>
        <mi-icon-color class="icon" type=${type}></mi-icon-color>
        <div><slot></slot></div>
      </div>
    `;
  }
}

if (!customElements.get("mi-inline-notification")) {
  customElements.define("mi-inline-notification", MiInlineNotification);
}
