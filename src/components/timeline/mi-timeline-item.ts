import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./timeline-item.styles";

/**
 * @summary 時系列上のひとつの出来事を表すアイテムです。
 * 左側にドットと接続線、右側に slot のコンテンツを表示します。
 * `mi-timeline` の中に並べて使います。
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
    // ホストが mi-timeline（role="list"）の直接の子になるため、role はホストに付ける
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
