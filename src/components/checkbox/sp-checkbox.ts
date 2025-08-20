import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import checkboxStyle from "./checkbox.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

/**
 * @summary チェックボックスです。
 */
@customElement("sp-checkbox")
export class SpCheckbox extends LitElement {
  static styles = makeStyles(
    css`
      ${unsafeCSS(checkmarkStyle)}
    `,
    css`
      ${unsafeCSS(checkboxStyle)}
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
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox": SpCheckbox;
  }
}
