import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { spLabelUnitLitStyles } from "./sp-label-unit-lit-styles";

/**
 * ラベルです。
 *
 * @summary Litで実装されたラベルです。テキストフィールド上に置き、テキストフィールドを説明するために使います。
 *
 * @attr {string} text - ラベルのテキストです。文字の色は黒です。
 *
 * @attr {string} support-text - ラベルの下に灰色で表示されるテキストです。textを補足します。
 */
@customElement("sp-label-unit-lit")
export class SpLabelUnitLit extends LitElement {
  static styles = spLabelUnitLitStyles;

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

  private get labelClasses() {
    return this.text ? "label" : "label none";
  }

  private get supportClasses() {
    return this.supportText ? "support" : "support none";
  }

  render() {
    return html`
      <span class="${this.labelClasses}">${this.text}</span>
      <span class="${this.supportClasses}">${this.supportText}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-label-unit-lit": SpLabelUnitLit;
  }
}
