import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { SPEEDA_LABEL } from "./constants";
import { resolveLogo } from "./speeda-logos";

/**
 * @summary Speedaのロゴです。
 *
 * @attr {string} sub-brand - ロゴの種類。ai-agent, expert-research（未指定で標準のSpeedaロゴ）
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 * @attr {boolean} no-symbol - シンボルを非表示にする
 * @attr {string} logo-language - ロゴの言語。en, zh
 */
export class MiSpeedaLogo extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: flex;
    }
  `);

  @property({ type: String, reflect: true, attribute: "sub-brand" })
  subBrand: "ai-agent" | "expert-research" | null = null;

  @property({ type: Boolean, reflect: true })
  inverse = false;

  @property({ type: Boolean, reflect: true, attribute: "no-symbol" })
  noSymbol = false;

  @property({ type: String, reflect: true, attribute: "logo-language" })
  logoLanguage: "en" | "zh" = "en";

  @property({ type: String })
  label: string = SPEEDA_LABEL;

  override updated() {
    this.setAttribute("role", "img");
    this.setAttribute("aria-label", this.label);
  }

  #getSvg(): string | undefined {
    return resolveLogo({
      subBrand: this.subBrand,
      inverse: this.inverse,
      symbol: !this.noSymbol,
      logoLanguage: this.logoLanguage,
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
    "mi-speeda-logo": MiSpeedaLogo;
  }
}

if (!customElements.get("mi-speeda-logo")) {
  customElements.define("mi-speeda-logo", MiSpeedaLogo);
}
