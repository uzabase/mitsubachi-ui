import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { resolveLogo } from "./speeda-logos";

/**
 * @summary Speedaのロゴです。
 *
 * @attr {string} type - ロゴの種類。speeda, shibida, ai-agent, sales-insights, customer-analytics, startup-insights, innovation-insights, expert-research
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 * @attr {boolean} no-symbol - シンボルを非表示にする
 */
export class SpSpeedaLogo extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: flex;
    }
  `);

  @property({ type: String, reflect: true })
  type:
    | "speeda"
    | "shibida"
    | "ai-agent"
    | "sales-insights"
    | "customer-analytics"
    | "startup-insights"
    | "innovation-insights"
    | "expert-research" = "speeda";

  @property({ type: Boolean, reflect: true })
  inverse = false;

  @property({ type: Boolean, reflect: true, attribute: "no-symbol" })
  noSymbol = false;

  #getSvg(): string | undefined {
    return resolveLogo({
      type: this.type,
      inverse: this.inverse,
      symbol: !this.noSymbol,
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
    "sp-speeda-logo": SpSpeedaLogo;
  }
}

if (!customElements.get("sp-speeda-logo")) {
  customElements.define("sp-speeda-logo", SpSpeedaLogo);
}
