import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { isIconType } from "../icon";
import { makeStyles } from "../styles";
import style from "./read-only-tag.styles";

export const readOnlyTagTypes = [
  "neutral",
  "information",
  "positive",
  "negative",
] as const;

export type ReadOnlyTagType = (typeof readOnlyTagTypes)[number];

function isValidIconType(value: string): boolean {
  if (isIconType(value)) {
    return true;
  }
  console.warn(`${value}は無効なicon-type属性です。`);
  return false;
}

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
 * スクリーンリーダー向けに `role="mark"` を付与します（参照のために目立たせたインラインのラベル）。
 *
 * @slot - タグのラベルテキスト
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
 * <mi-read-only-tag type="negative" icon-type="arrow-down-small">減収</mi-read-only-tag>
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

  /**
   * ラベルの先頭に表示するアイコンの種類（`mi-icon` の `type`）。
   * 未指定または無効な値のときはアイコンを表示しません。
   * アイコンは装飾として扱うため、意味はラベル文言で伝えてください。
   * @default ""
   */
  @property({ type: String, attribute: "icon-type" })
  iconType = "";

  connectedCallback() {
    super.connectedCallback();
    // 参照のために目立たせたインラインのラベル、という役割を伝える。
    // ボタンやリンクのロールは付けない（操作できると誤解させるため）。
    this.setAttribute("role", "mark");
  }

  private get _showIcon() {
    return !!this.iconType && isValidIconType(this.iconType);
  }

  render() {
    const type = readOnlyTagTypes.includes(this.type) ? this.type : "neutral";

    return html`
      <span class="base" data-type=${type}>
        ${this._showIcon
          ? html`<mi-icon
              class="icon"
              type=${this.iconType}
              aria-hidden="true"
            ></mi-icon>`
          : nothing}
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
