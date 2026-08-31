import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./read-only-tag.styles";

export const readOnlyTagTypes = [
  "neutral",
  "information",
  "positive",
  "negative",
] as const;

export type ReadOnlyTagType = (typeof readOnlyTagTypes)[number];

/**
 * @summary 情報の分類・属性・状態を示す表示専用のタグです。
 *
 * ユーザー操作はできません（リンクでもボタンでもありません）。
 * ラベルとして情報を補足・整理する目的で使用してください。
 * ナビゲーションとしても機能させたい場合は `mi-link-tag` を使用してください。
 *
 * `type` の違いは色でしか表現されないため、色が判別できないユーザーにも意味が伝わるよう、
 * ラベル文言だけで意味が分かるようにしてください（例: 「終了」「エラー」）。
 *
 * @slot - タグのラベルテキスト
 * @slot icon - ラベルの先頭に表示するアイコン（任意）
 *
 * @cssprop --surface-semi-strong-default - neutral の背景色
 * @cssprop --text-regular-default - neutral の文字色
 * @cssprop --surface-information - information の背景色
 * @cssprop --text-information - information の文字色
 * @cssprop --surface-positive - positive の背景色
 * @cssprop --text-positive - positive の文字色
 * @cssprop --surface-negative - negative の背景色
 * @cssprop --text-negative - negative の文字色
 *
 * @example
 * ```html
 * <mi-read-only-tag>下書き</mi-read-only-tag>
 * <mi-read-only-tag type="positive">承認済み</mi-read-only-tag>
 *
 * <mi-read-only-tag type="negative">
 *   <mi-icon slot="icon" type="check"></mi-icon>
 *   差し戻し
 * </mi-read-only-tag>
 * ```
 */
export class MiReadOnlyTag extends LitElement {
  static styles = makeStyles(style);

  /**
   * タグの意味（色）。一覧にない値を指定した場合は `"neutral"` として扱います。
   * @default "neutral"
   */
  @property({ type: String, reflect: true })
  type: ReadOnlyTagType = "neutral";

  @state()
  private _hasIcon = false;

  private _onIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedElements().length > 0;
  }

  render() {
    const type = readOnlyTagTypes.includes(this.type) ? this.type : "neutral";

    return html`
      <span class="base" data-type=${type}>
        ${this._hasIcon
          ? html`<span class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
            </span>`
          : html`<slot
              name="icon"
              @slotchange=${this._onIconSlotChange}
              hidden
            ></slot>`}
        <span class="label"><slot></slot></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-read-only-tag": MiReadOnlyTag;
  }
}

if (!customElements.get("mi-read-only-tag")) {
  customElements.define("mi-read-only-tag", MiReadOnlyTag);
}
