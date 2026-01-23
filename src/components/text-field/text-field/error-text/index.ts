import "../../../icon";

import { html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../../../styles";
import textFieldErrorTextStyle from "./styles.css?inline";

/**
 * @summary テキストフィールドのエラーテキストコンポーネントです。
 */
export class MiTextFieldErrorText extends LitElement {
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
        <mi-icon class="icon" type="error-fill"></mi-icon>
        <span class="text">${this.text}</span>
      </div>
    `;
  }
}

/** @deprecated 代わりに MiTextFieldErrorText を使用してください */
export class SpTextFieldErrorText extends MiTextFieldErrorText {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-text-field-error-text": MiTextFieldErrorText;
    "sp-text-field-error-text": SpTextFieldErrorText;
  }
}

if (!customElements.get("mi-text-field-error-text")) {
  customElements.define("mi-text-field-error-text", MiTextFieldErrorText);
}

if (!customElements.get("sp-text-field-error-text")) {
  customElements.define("sp-text-field-error-text", SpTextFieldErrorText);
}
