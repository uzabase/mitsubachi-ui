import "@/components/labeled-text-field/label";
import "@/components/error-message";
import "@/components/text-field-input";

import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import type { TextFieldInput } from "@/components/text-field-input";

/**
 * errorがから文字であれば、エラーメッセージを表示せず、エラーメッセージが占めるスペースもとらない。
 */
@customElement("ub-account-labeled-text-field")
export class LabeledTextField extends LitElement {
	@property()
	name = "";

	@property()
	label = "";

	@property()
	error = "";

	@property()
	placeholder = "";

	static formAssociated = true;

	#internals: ElementInternals;
	constructor() {
		super();
		this.#internals = this.attachInternals();
	}

	firstUpdated() {
		const textFieldInput: TextFieldInput | null = this.renderRoot.querySelector(
			"ub-account-text-field-input",
		);
		if (!textFieldInput) return;

		textFieldInput.addEventListener("input", () => {
			this.#internals.setFormValue(textFieldInput.value);
		});
	}
	static styles = css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `;

	protected render() {
		return html`
        <ub-account-labeled-text-field-label
          for=${this.name === "" ? nothing : this.name}
          text=${this.label}
        >
        </ub-account-labeled-text-field-label>
        <ub-account-text-field-input
          placeholder=${this.placeholder}
          name=${this.name === "" ? nothing : this.name}
          error=${this.error !== "" ? true : nothing}
        >
        </ub-account-text-field-input>
        ${
					this.error === ""
						? nothing
						: html`<ub-account-error-message
              message=${this.error}
            ></ub-account-error-message>`
				}
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ub-account-labeled-text-field": LabeledTextField;
	}
}
