import "../../icon";
import "../../icon-color";

import { html, LitElement, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../../styles";
import searchBoxStyle from "./styles.css?inline";

/**
 * @summary 検索ボックスです。
 *
 * @attr {string} variant - 見た目のバリアントです。"primary" または "secondary" を指定します。
 *
 * @attr {string} error - エラーテキストです。secondary バリアントのみ有効です。
 */
export class MiSearchBox extends LitElement {
  static styles = makeStyles(unsafeCSS(searchBoxStyle));

  static formAssociated = true;

  @property({ type: String, reflect: true })
  variant: "primary" | "secondary" = "primary";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  error = "";

  @property({ type: String, reflect: true })
  name = "";

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

  #containerClasses() {
    return classMap({
      container: true,
      [this.variant]: true,
      disabled: this.disabled,
      error: this.#hasError(),
      "has-value": !!this.value,
    });
  }

  #hasError() {
    return this.variant === "secondary" && !!this.error && !this.disabled;
  }

  #errorTextClasses() {
    return classMap({
      "error-text-container": true,
      none: !this.#hasError(),
    });
  }

  #handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    if (!e.composed) {
      this.dispatchEvent(
        new InputEvent("input", {
          ...e,
          composed: true,
        }),
      );
    }
  }

  #handleClear() {
    this.value = "";
    this.dispatchEvent(
      new InputEvent("input", { bubbles: true, composed: true }),
    );

    const input = this.shadowRoot?.querySelector("input");
    input?.focus();
  }

  render() {
    const errorId = "error-text";

    return html`
      <search class="${this.#containerClasses()}">
        <mi-icon class="search-icon" type="search" aria-hidden="true"></mi-icon>
        <input
          class="input"
          type="search"
          placeholder="${this.placeholder}"
          autocomplete="${this.autocomplete}"
          ?disabled="${this.disabled}"
          name="${this.name}"
          .value="${this.value}"
          aria-invalid="${this.#hasError() ? "true" : "false"}"
          aria-describedby="${this.#hasError() ? errorId : ""}"
          @input="${this.#handleInput}"
        />
        ${this.value && !this.disabled
          ? html`
              <button
                class="clear-button"
                type="button"
                aria-label="クリア"
                @click="${this.#handleClear}"
                tabindex="-1"
              >
                <mi-icon
                  class="clear-icon"
                  type="cross-small"
                  aria-hidden="true"
                ></mi-icon>
              </button>
            `
          : nothing}
      </search>
      <div class="${this.#errorTextClasses()}" id="${errorId}">
        <mi-icon-color class="error-icon" type="error"></mi-icon-color>
        <span class="error-text">${this.error}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-search-box": MiSearchBox;
  }
}

if (!customElements.get("mi-search-box")) {
  customElements.define("mi-search-box", MiSearchBox);
}
