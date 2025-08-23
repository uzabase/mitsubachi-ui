import "../../../icon";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../../../styles";
import textFieldErrorTextStyle from "./styles.css?inline";

/**
 * @summary テキストフィールドのエラーテキストコンポーネントです。
 */
export class SpTextFieldErrorText extends LitElement {
  static styles = makeStyles(unsafeCSS(textFieldErrorTextStyle));

  @property({ type: String, reflect: true })
  text = "";

  #containerClasses() {
    return classMap({
      container: true,
      none: !this.text,
    });
  }

  render() {
    return html`
      <div class="${this.#containerClasses()}" role="error">
        <sp-icon class="icon" type="error-fill"></sp-icon>
        <span class="text">${this.text}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-error-text": SpTextFieldErrorText;
  }
}

if (!customElements.get("sp-text-field-error-text")) {
  customElements.define("sp-text-field-error-text", SpTextFieldErrorText);
}
