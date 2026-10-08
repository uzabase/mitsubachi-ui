import { html } from "lit";
import { property } from "lit/decorators.js";

import { MitsubachiElement } from "../../mitsubachi-element";
import { makeStyles } from "../styles";
import { suggestionItemStyles } from "./suggestion-item.styles";

/**
 * @summary mi-suggestion-search-box の候補です。直接の子として並べます。
 *
 * 中身のテキストが表示名になります。強調状態（aria-selected）は親の mi-suggestion-search-box が管理します。
 *
 * @attr {string} value - 候補の識別子。選ばれると親の `select` イベントの `detail.value` に入ります。
 * @slot - 表示名
 */
export class MiSuggestionItem extends MitsubachiElement {
  static styles = makeStyles(suggestionItemStyles);

  @property({ type: String, reflect: true })
  value = "";

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("role")) this.setAttribute("role", "option");
    if (!this.hasAttribute("aria-selected")) {
      this.setAttribute("aria-selected", "false");
    }
  }

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
