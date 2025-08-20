import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import checkboxTextStyle from "./checkbox-text.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

/**
 * @summary テキスト付きチェックボックスです。
 */
@customElement("sp-checkbox-text-lit")
export class SpCheckboxTextLit extends LitElement {
  static styles = makeStyles(
    css`
      ${unsafeCSS(checkmarkStyle)}
    `,
    css`
      ${unsafeCSS(checkboxTextStyle)}
    `,
  );

  static formAssociated = true;

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  text = "";

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("checked")) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;

    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate,
        },
      }),
    );
  }

  render() {
    return html`
      <label class="base">
        <span class="checkmark">
          <input
            class="input"
            type="checkbox"
            .value=${this.value}
            .name=${this.name}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .disabled=${this.disabled}
            @change=${this.handleChange}
          />
        </span>
        <span class="text">${this.text}</span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox-text-lit": SpCheckboxTextLit;
  }
}
