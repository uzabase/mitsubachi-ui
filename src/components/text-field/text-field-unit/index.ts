import "../../label-unit";
import "../text-field";

import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../../styles";
import type { SpTextField } from "../text-field";
import textFieldUnitStyle from "./styles.css?inline";

/**
 * @summary inputタグに相当するテキストフィールドです。テキストフィールドを説明するラベルがあります。
 *
 * @attr {string} text - テキストフィールドを説明するテキストです。テキストフィールドの上に表示されます。
 *
 * @attr {string} support-text - テキストフィールドを補足するテキストです。textで指定したテキストの下、テキストフィールドの上に表示されます。
 */
@customElement("sp-text-field-unit")
export class SpTextFieldUnit extends LitElement {
  static styles = makeStyles(css`
    ${unsafeCSS(textFieldUnitStyle)}
  `);

  static formAssociated = true;

  @property({ type: String, reflect: true })
  text = "";

  @property({ type: String, reflect: true })
  error = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, attribute: "support-text", reflect: true })
  supportText = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  type = "text";

  @property({ type: String, reflect: true })
  autocomplete: AutoFill = "off";

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.internals.setFormValue(this.value);
    }
  }

  #labelClasses() {
    return classMap({
      label: true,
      none: !this.text && !this.supportText,
    });
  }

  #handleInput(e: Event) {
    const target = e.target as SpTextField;
    this.value = target.value;
  }

  render() {
    return html`
      <fieldset>
        <sp-label-unit
          class="${this.#labelClasses()}"
          text="${this.text}"
          support-text="${this.supportText}"
        ></sp-label-unit>
        <sp-text-field
          error="${this.error}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          name="${this.name}"
          .value="${this.value}"
          type="${this.type}"
          autocomplete="${this.autocomplete}"
          @input="${this.#handleInput}"
        ></sp-text-field>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field-unit": SpTextFieldUnit;
  }
}
