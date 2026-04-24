import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { UZABASE_LABEL } from "./constants";
import { resolveLogo } from "./uzabase-logos";

/**
 * @summary Uzabaseのロゴです。
 *
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 */
export class MiUzabaseLogo extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: flex;
    }
  `);

  @property({ type: Boolean, reflect: true })
  inverse = false;

  @property({ type: String })
  label: string = UZABASE_LABEL;

  override updated() {
    this.setAttribute("role", "img");
    this.setAttribute("aria-label", this.label);
  }

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
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-uzabase-logo": MiUzabaseLogo;
  }
}

if (!customElements.get("mi-uzabase-logo")) {
  customElements.define("mi-uzabase-logo", MiUzabaseLogo);
}
