import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class MiSuggestionItem extends LitElement {
  @property({ type: String, reflect: true })
  value = "";

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-suggestion-item": MiSuggestionItem;
  }
}

if (!customElements.get("mi-suggestion-item")) {
  customElements.define("mi-suggestion-item", MiSuggestionItem);
}
