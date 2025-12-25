import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { resolveLogo } from "./uzabase-logos";

/**
 * @summary Uzabaseのロゴです。
 *
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 */
export class SpUzabaseLogo extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: flex;
    }
  `);

  @property({ type: Boolean, reflect: true })
  inverse = false;

  #getSvg(): string | undefined {
    return resolveLogo({
      inverse: this.inverse,
    });
  }

  render() {
    const svg = this.#getSvg();
    if (svg) {
      return html`${unsafeHTML(svg)}`;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-uzabase-logo": SpUzabaseLogo;
  }
}

if (!customElements.get("sp-uzabase-logo")) {
  customElements.define("sp-uzabase-logo", SpUzabaseLogo);
}
