import { html, nothing } from "lit";
import { property } from "lit/decorators.js";

import { MitsubachiElement } from "../../mitsubachi-element";
import { makeStyles } from "../styles";
import style from "./link-tag.styles";

export const linkTagSizes = ["x-small", "small", "medium"] as const;
export type LinkTagSize = (typeof linkTagSizes)[number];

function toLinkTagSize(value: unknown): LinkTagSize {
  return typeof value === "string" &&
    (linkTagSizes as readonly string[]).includes(value)
    ? (value as LinkTagSize)
    : "medium";
}

/**
 * コンテンツの属性・分類・出典を簡潔に示すタグです。
 * タグ自体がクリック可能なリンクとして機能し、関連するカテゴリや項目へ遷移します。
 *
 * リンク機能が不要なタグは read-only-tag として別コンポーネントになる予定です（未実装）。
 *
 * 中身は素の `<a href>` のため、クリックでの遷移・`click` イベント・キーボード操作
 * （フォーカス移動と Enter）はすべてブラウザのネイティブ挙動で動きます。
 * 独自のカスタムイベントは公開していません。
 *
 * @summary 関連カテゴリへ遷移するリンク付きタグ
 *
 * @slot - タグのラベルテキスト
 *
 * @cssprop --surface-semi-strong-default - 背景色
 * @cssprop --surface-semi-strong-hover - ホバー時の背景色
 * @cssprop --surface-semi-strong-active - 押下時の背景色
 * @cssprop --text-regular-default - テキスト色
 * @cssprop --focus-ring-default - フォーカスリングの色
 * @cssprop --surface-regular-default - フォーカスリング内側の色（背景に馴染ませる用）
 *
 * @example
 * ```html
 * <mi-link-tag href="/tags/finance">金融</mi-link-tag>
 * <mi-link-tag href="/tags/finance" size="medium">金融</mi-link-tag>
 * ```
 */
export class MiLinkTag extends MitsubachiElement {
  static styles = makeStyles(style);

  /** リンク先URL */
  @property({ type: String })
  href = "";

  /**
   * タグのサイズ。想定外の値を渡した場合は `medium` として扱う。
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: LinkTagSize = "medium";

  render() {
    return html`
      <a class="tag ${toLinkTagSize(this.size)}" href=${this.href || nothing}>
        <span class="label"><slot></slot></span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-link-tag": MiLinkTag;
  }
}

if (!customElements.get("mi-link-tag")) {
  customElements.define("mi-link-tag", MiLinkTag);
}
