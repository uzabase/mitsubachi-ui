import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./timeline-item.styles";

/**
 * 時系列上のひとつの出来事を表すアイテムです。
 * 左側にドットと接続線、右側に slot のコンテンツを表示します。
 *
 * `mi-timeline` の中に並べて使います。先頭の上線・末尾の下線は
 * 親の `mi-timeline` が表示中のアイテムを数えて判定するため、
 * 位置を指定するプロパティはありません。
 *
 * `mi-timeline` の外に単体で置いた場合は、接続線を表示しません。
 *
 * アイテム自体はインタラクティブな操作を持ちません
 * （フォーカス対象にならず、カスタムイベントも発火しません）。
 * リンクやボタンが必要な場合は slot の中に置いてください。
 *
 * `emphasized` はドットの色でしか表現されないため、色が判別できないユーザーにも
 * 伝わるよう、slot のコンテンツ側でも文言などで補完してください。
 *
 * スクリーンリーダー向けに `role="listitem"` を付与します
 * （利用側で `role` を指定している場合は上書きしません）。
 *
 * @summary 時系列上のひとつの出来事を表すアイテム
 *
 * @slot - 出来事の内容（日付・見出し・本文など任意のコンテンツ）
 *
 * @cssprop --border-semi-strong-default - 接続線とドット（通常）の色
 * @cssprop --object-emphasized - ドット（強調時）の色
 *
 * @example
 * ```html
 * <mi-timeline-item emphasized>2026年1月 リリース</mi-timeline-item>
 * ```
 */
export class MiTimelineItem extends LitElement {
  static styles = makeStyles(style);

  /**
   * 強調表示。ドットの色が変わる。
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  emphasized = false;

  connectedCallback() {
    super.connectedCallback();
    // リストの項目であることを伝える。利用側の指定があれば尊重する
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "listitem");
    }
  }

  render() {
    return html`
      <div class="flow" aria-hidden="true">
        <span class="top-line"></span>
        <span class="dot"></span>
        <span class="bottom-line"></span>
      </div>
      <div class="contents"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-timeline-item": MiTimelineItem;
  }
}

if (!customElements.get("mi-timeline-item")) {
  customElements.define("mi-timeline-item", MiTimelineItem);
}
