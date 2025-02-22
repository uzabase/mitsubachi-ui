import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { styles } from "@/components/text-field-input/css";

@customElement("ub-account-text-field-input")
export class TextFieldInput extends LitElement {
	// static shadowRootOptions = {
	//   ...LitElement.shadowRootOptions,
	//   delegatesFocus: true,
	// };

	static formAssociated = true;

	static styles = styles;

	@property()
	placeholder = "";

	@property({ type: Boolean })
	disabled = false;

	@property()
	name = "";

	@property({ type: Boolean, reflect: true })
	error = false;

	#value = "";

	#internals: ElementInternals;

	constructor() {
		super();
		this.#internals = this.attachInternals();
	}

	get value() {
		return this.#value;
	}

	firstUpdated() {
		const input = this.renderRoot.querySelector("input");
		if (input) {
			input.addEventListener("input", (e) => {
				this.#value = (e.target as HTMLInputElement).value;
				this.#internals.setFormValue(this.#value);
			});
		}
	}

	protected render() {
		return html`
      <input
        type="text"
        placeholder=${this.placeholder === "" ? nothing : this.placeholder}
        ?disabled=${this.disabled}
        class=${this.#getClass()}
        name=${this.name === "" ? nothing : this.name}
      />
    `;
	}

	#getClass() {
		const className = "ub-account-text-field-input";
		if (this.error) {
			return `${className} error`;
		}
		return className;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ub-account-text-field-input": TextFieldInput;
	}
}
