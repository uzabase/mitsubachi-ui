import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { spTextFieldErrorTextLitStyles } from "./sp-text-field-error-text-lit-styles";

/**
 * @summary Litで実装されたテキストフィールドのエラーテキストコンポーネントです。
 */
@customElement("sp-text-field-error-text-lit")
export class SpTextFieldErrorTextLit extends LitElement {
  static styles = spTextFieldErrorTextLitStyles;

  @property({ type: String, reflect: true })
  text = "";

  private get containerClasses() {
    return this.text ? "container" : "container none";
  }

  render() {
    return html`
      <div class="${this.containerClasses}" role="alert">
        <sp-icon-lit class="icon" type="error-fill"></sp-icon-lit>
        <span class="text">${this.text}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-error-text-lit": SpTextFieldErrorTextLit;
  }
}
