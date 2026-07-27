import "../icon-color";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./helper-text.styles";

type Status = (typeof statuses)[number];
type Size = (typeof sizes)[number];

export const statuses = ["error", "information", "success", "warning"] as const;

export const sizes = ["small", "medium", "large"] as const;

/**
 * @summary ユーザーの理解や判断をサポートする最小単位のメッセージコンポーネント
 *
 * @slot - ヘルパーテキストのコンテンツ
 */
export class MiHelperText extends LitElement {
  @property({ type: String, reflect: true })
  status: Status = "error";

  @property({ type: String, reflect: true })
  size: Size = "small";

  static styles = makeStyles(style);

  render() {
    const status = statuses.includes(this.status) ? this.status : "error";
    const size = sizes.includes(this.size) ? this.size : "small";

    return html`
      <div class="base" data-status=${status} data-size=${size}>
        <mi-icon-color
          class="icon"
          data-size=${size}
          type=${status}
        ></mi-icon-color>
        <div><slot></slot></div>
      </div>
    `;
  }
}

if (!customElements.get("mi-helper-text")) {
  customElements.define("mi-helper-text", MiHelperText);
}
