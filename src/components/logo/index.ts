import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import { speedaEn, speedaJa, speedaZh } from "./speeda";
import { uzabase } from "./uzabase";

/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export class MiLogo extends LitElement {
  static styles = makeStyles();

  @property({ type: String, reflect: true })
  language = "";

  @property({ type: String, reflect: true })
  brand = "";

  #getLogoContent() {
    if (this.brand === "uzabase") {
      return uzabase;
    } else if (this.brand === "speeda") {
      if (this.language === "en") return speedaEn;
      else if (this.language === "zh") return speedaZh;
      else return speedaJa;
    }
    return undefined;
  }

  render() {
    const logo = this.#getLogoContent();
    if (logo) {
      return html`${unsafeHTML(logo)}`;
    }
    return html``;
  }
}

/** @deprecated 代わりに MiLogo を使用してください */
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
