import "../button/mi-icon-button";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { inputChipStyles } from "./input-chip.styles";

/**
 * @summary ユーザーが入力した内容を要素ごとに整理して表示するための Chip コンポーネントです。
 * 企業やユーザーアカウントの入力などで利用され、×ボタンで入力内容を削除できます。
 *
 * @example
 * ```html
 * <mi-input-chip label="Apple"></mi-input-chip>
 * ```
 *
 * @fires remove - 削除ボタンがクリックされたときに発火します。
 */
export class MiInputChip extends LitElement {
  static override styles = makeStyles(inputChipStyles);

  /** Chip に表示するテキスト。 */
  @property({ type: String })
  label = "";

  override render() {
    return html`
      <span class="chip">
        <span class="label">${this.label}</span>
        <mi-icon-button
          variant="ghost"
          size="small"
          icon-type="cross-small"
          aria-label="${this.label}を削除"
          tooltip-disabled
          @click="${this.handleRemove}"
        ></mi-icon-button>
      </span>
    `;
  }

  private handleRemove() {
    this.dispatchEvent(
      new CustomEvent("remove", { bubbles: false, composed: false }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-input-chip": MiInputChip;
  }
}

if (!customElements.get("mi-input-chip")) {
  customElements.define("mi-input-chip", MiInputChip);
}
