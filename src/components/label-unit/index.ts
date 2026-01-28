import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../styles";
import style from "./styles.css?inline";

/**
 * ラベルです。
 *
 * @summary ラベルです。テキストフィールド上に置き、テキストフィールドを説明するために使います。
 *
 * @attr {string} text - ラベルのテキストです。文字の色は黒です。
 *
 * @attr {string} support-text - ラベルの下に灰色で表示されるテキストです。textを補足します。
 */
export class MiLabelUnit extends LitElement {
  static styles = makeStyles(unsafeCSS(style));

  @property({ type: String, reflect: true })
  text = "";

  @property({ type: String, attribute: "support-text", reflect: true })
  supportText = "";

  /**
   * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
   */
  isEmpty(): boolean {
    return this.text === "" && this.supportText === "";
  }

  #labelClasses() {
    return classMap({
      label: true,
      none: !this.text,
    });
  }

  #supportClasses() {
    return classMap({
      support: true,
      none: !this.supportText,
    });
  }

  render() {
    return html`
      <span class=${this.#labelClasses()}>${this.text}</span>
      <span class=${this.#supportClasses()}>${this.supportText}</span>
    `;
  }
}

/** @deprecated 代わりに MiLabelUnit を使用してください */
export class SpLabelUnit extends MiLabelUnit {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-label-unit": MiLabelUnit;
    "sp-label-unit": SpLabelUnit;
  }
}

if (!customElements.get("mi-label-unit")) {
  customElements.define("mi-label-unit", MiLabelUnit);
}

if (!customElements.get("sp-label-unit")) {
  customElements.define("sp-label-unit", SpLabelUnit);
}
