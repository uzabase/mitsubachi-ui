import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 *
 */
@customElement("ub-account-labeled-text-field-label")
export class Label extends LitElement {
	/**
	 *
	 */
	@property({ attribute: "id" })
	identity?: string;

	@property()
	for?: string;

	@property()
	text = "";

	static styles = css`
    :host {
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
    }
  `;
	protected render() {
		return html`<label
      id=${this.identity || nothing}
      for=${this.for || nothing}
    >
      ${this.text}
    </label>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ub-account-labeled-text-field-label": Label;
	}
}
