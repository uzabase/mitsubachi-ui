import { MitsubachiElement } from "../../mitsubachi-element";

export class MiSuggestionSearchBoxUnit extends MitsubachiElement {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-suggestion-search-box-unit": MiSuggestionSearchBoxUnit;
  }
}

if (!customElements.get("mi-suggestion-search-box-unit")) {
  customElements.define(
    "mi-suggestion-search-box-unit",
    MiSuggestionSearchBoxUnit,
  );
}
