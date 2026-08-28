import { html, LitElement } from "lit";

import { makeStyles } from "../styles";
import style from "./link-tag-group.styles";

/**
 * 複数の `mi-link-tag` を一定の間隔で並べるコンテナです。
 * 幅に収まらないタグは次の行へ折り返します。
 *
 * サイズは `mi-link-tag` 側の `size` で指定します。グループは間隔と折り返しだけを担当し、
 * 子のサイズには関与しません（デザイン上、タグの間隔はサイズによらず一定のため）。
 *
 * @summary mi-link-tag を並べるコンテナ
 *
 * @slot - `mi-link-tag` 要素を配置します。
 *
 * @example
 * ```html
 * <mi-link-tag-group>
 *   <mi-link-tag href="/tags/finance" size="small">金融</mi-link-tag>
 *   <mi-link-tag href="/tags/retail" size="small">小売</mi-link-tag>
 * </mi-link-tag-group>
 * ```
 */
export class MiLinkTagGroup extends LitElement {
  static styles = makeStyles(style);

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-link-tag-group": MiLinkTagGroup;
  }
}

if (!customElements.get("mi-link-tag-group")) {
  customElements.define("mi-link-tag-group", MiLinkTagGroup);
}
