import { html, LitElement, unsafeHTML } from "lit";
import { customElement, property } from "lit/decorators.js";

import { speedaEn, speedaJa, speedaZh } from "./speeda";
import { uzabase } from "./uzabase";

/**
 * @summary Litで実装されたロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
@customElement("sp-logo-lit")
export class SpLogoLit extends LitElement {
  @property({ type: String, reflect: true })
  brand = "";

  @property({ type: String, reflect: true })
  language = "";

  private get logoContent() {
    if (this.brand === "uzabase") {
      return uzabase;
    } else if (this.brand === "speeda") {
      if (this.language === "en") return speedaEn;
      else if (this.language === "zh") return speedaZh;
      else return speedaJa;
    }
    return "";
  }

  render() {
    const logo = this.logoContent;
    if (logo) {
      return html`${unsafeHTML(logo)}`;
    }
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-logo-lit": SpLogoLit;
  }
}
