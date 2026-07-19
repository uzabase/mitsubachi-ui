import "../icon-color";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./inline-notification.styles";

type Type = (typeof types)[number];
type Variant = (typeof variants)[number];

export const types = ["information", "success", "warning", "error"] as const;

export const variants = ["primary", "secondary"] as const;

/**
 * @slot - 通知メッセージのコンテンツ
 */
export class MiInlineNotification extends LitElement {
  @property({ type: String, reflect: true })
  type: Type = "information";

  @property({ type: String, reflect: true })
  variant: Variant = "primary";

  static styles = makeStyles(style);

  render() {
    const type = types.includes(this.type) ? this.type : "information";
    const variant = variants.includes(this.variant) ? this.variant : "primary";
    return html`
      <div class="base" data-type=${type} data-variant=${variant}>
        <mi-icon-color class="icon" type=${type}></mi-icon-color>
        <div><slot></slot></div>
      </div>
    `;
  }
}

if (!customElements.get("mi-inline-notification")) {
  customElements.define("mi-inline-notification", MiInlineNotification);
}
