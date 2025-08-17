import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { spCheckboxLitStyles } from "./sp-checkbox-lit-styles";

/**
 * @summary Litで実装されたチェックボックスです。
 */
@customElement("sp-checkbox-lit")
export class SpCheckboxLit extends LitElement {
  static styles = spCheckboxLitStyles;
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

  @query(".input")
  private inputElement!: HTMLInputElement;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (this.inputElement) {
      // sync properties with input element
      this.inputElement.value = this.value;
      this.inputElement.name = this.name;
      this.inputElement.checked = this.checked;
      this.inputElement.indeterminate = this.indeterminate;
      this.inputElement.disabled = this.disabled;

      // update form value
      this.internals.setFormValue(this.checked ? this.value : null);
    }
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;

    // dispatch custom change event
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          checked: this.checked,
          value: this.value,
          indeterminate: this.indeterminate,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;

    // dispatch custom input event
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: {
          checked: this.checked,
          value: this.value,
        },
        bubbles: true,
        composed: true,
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
            @input=${this.handleInput}
          />
        </span>
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox-lit": SpCheckboxLit;
  }
}
