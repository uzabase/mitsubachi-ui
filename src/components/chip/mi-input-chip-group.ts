import "./mi-input-chip";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { inputChipGroupStyles } from "./input-chip-group.styles";

export interface InputChipItem {
  id: string;
  label: string;
}

/**
 * @summary 複数の mi-input-chip をまとめて表示するグループコンポーネントです。
 * ユーザーが入力した内容を要素ごとに整理して表示し、個別に削除できます。
 *
 * @example
 * ```html
 * <mi-input-chip-group
 *   aria-label="選択された項目"
 * ></mi-input-chip-group>
 * ```
 *
 * @fires remove - Chip の削除ボタンがクリックされたときに発火します。detail に削除対象の id を含みます。
 */
export class MiInputChipGroup extends LitElement {
  static override styles = makeStyles(inputChipGroupStyles);

  /** 表示する Chip アイテムの配列。 */
  @property({ type: Array })
  items: InputChipItem[] = [];

  override render() {
    return html`
      <div class="container" role="list">
        ${this.items.map(
          (item) => html`
            <div class="item" role="listitem">
              <mi-input-chip
                label=${item.label}
                @remove=${() => this.handleRemove(item.id)}
              ></mi-input-chip>
            </div>
          `,
        )}
      </div>
    `;
  }

  private handleRemove(id: string) {
    this.dispatchEvent(
      new CustomEvent("remove", {
        bubbles: false,
        composed: false,
        detail: { id },
      }),
    );
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
