import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { resolveLogo } from "./logos";

/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export class SpLogo extends LitElement {
  static styles = makeStyles();

  @property({ type: String, reflect: true })
  language = "";

  @property({ type: String, reflect: true })
  brand = "";

  @property({ attribute: "sub-brand", type: String, reflect: true })
  subBrand = "";

  @property({ type: Boolean, reflect: true })
  inverse = false;

  @property({ type: Boolean, reflect: true })
  symbol = false;

  #getSvg(): string | undefined {
    return resolveLogo({
      brand: this.brand,
      subBrand: this.subBrand,
      inverse: this.inverse,
      symbol: this.symbol,
      language: this.language,
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
    "sp-logo": SpLogo;
  }
}

if (!customElements.get("sp-logo")) {
  customElements.define("sp-logo", SpLogo);
}
