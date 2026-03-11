import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { resolveLogo as resolveSpeedaLogo } from "./speeda-logos";
import { resolveLogo as resolveUzabaseLogo } from "./uzabase-logos";

/**
 * @deprecated 代わりに MiSpeedaLogo または MiUzabaseLogo を使用してください
 *
 * @summary ロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=enであれば英語, zhであれば簡体字です。
 */
export class MiLogo extends LitElement {
  static styles = makeStyles(css`
    :host {
      display: flex;
    }
  `);

  @property({ type: String, reflect: true })
  language = "";

  @property({ type: String, reflect: true })
  brand = "";

  #getSvg(): string | undefined {
    if (this.brand === "uzabase") {
      return resolveUzabaseLogo({ inverse: false });
    } else if (this.brand === "speeda") {
      const logoLanguage = this.language === "zh" ? "zh" : "en";
      return resolveSpeedaLogo({
        type: null,
        inverse: false,
        symbol: false,
        logoLanguage,
      });
    }
    return undefined;
  }

  render() {
    const svg = this.#getSvg();
    if (svg) {
      return html`${unsafeHTML(svg)}`;
    }
    return html``;
  }
}

/** @deprecated 代わりに MiSpeedaLogo または MiUzabaseLogo を使用してください */
export class SpLogo extends MiLogo {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-logo": MiLogo;
    "sp-logo": SpLogo;
  }
}

if (!customElements.get("mi-logo")) {
  customElements.define("mi-logo", MiLogo);
}

if (!customElements.get("sp-logo")) {
  customElements.define("sp-logo", SpLogo);
}
