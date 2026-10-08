import { MiSearchBox } from "../search-box/mi-search-box";

export class MiSuggestionSearchBox extends MiSearchBox {}

declare global {
  interface HTMLElementTagNameMap {
    "mi-suggestion-search-box": MiSuggestionSearchBox;
  }
}

if (!customElements.get("mi-suggestion-search-box")) {
  customElements.define("mi-suggestion-search-box", MiSuggestionSearchBox);
}
