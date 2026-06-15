import { html, LitElement } from "lit";

import { makeStyles } from "../styles";
import { inputChipGroupStyles } from "./input-chip-group.styles";

/**
 * @summary 複数の mi-input-chip をまとめて表示するグループコンポーネントです。
 * ユーザーが入力した内容を要素ごとに整理して表示し、個別に削除できます。
 *
 * @example
 * ```html
 * <mi-input-chip-group aria-label="選択された項目">
 *   <mi-input-chip label="Apple"></mi-input-chip>
 *   <mi-input-chip label="Banana"></mi-input-chip>
 * </mi-input-chip-group>
 * ```
 *
 * @slot - mi-input-chip 要素を配置します。
 */
export class MiInputChipGroup extends LitElement {
  static override styles = makeStyles(inputChipGroupStyles);

  override render() {
    return html`
      <div class="container" role="list">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-input-chip-group": MiInputChipGroup;
  }
}

if (!customElements.get("mi-input-chip-group")) {
  customElements.define("mi-input-chip-group", MiInputChipGroup);
}
