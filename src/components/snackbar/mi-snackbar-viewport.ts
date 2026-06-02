import { html, LitElement } from "lit";

import { makeStyles } from "../styles";
import style from "./snackbar-viewport.styles";

/**
 * 複数の `mi-snackbar` を **同じ画面上の位置** に縦に積み重ねて表示するためのコンテナです。
 * アプリのルート付近に **1 つだけ** 置き、その子として `mi-snackbar` をマウント（ポータル）してください。
 *
 * @summary Snackbar 用の固定 viewport（複数件は縦にずれて表示）
 *
 * @slot - `mi-snackbar` 要素（および必要なら `class="snackbar-mount"` のラッパー）
 *
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度）
 * @cssprop --snackbar-stack-gap - 縦積み時の間隔（デフォルト 16px）
 * @cssprop --snackbar-viewport-inset - 画面上端・右端からの余白（デフォルト 16px。`inset-block-start` / `inset-inline-end` に共通）
 */
export class MiSnackbarViewport extends LitElement {
  static styles = makeStyles(style);

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-snackbar-viewport": MiSnackbarViewport;
  }
}

if (!customElements.get("mi-snackbar-viewport")) {
  customElements.define("mi-snackbar-viewport", MiSnackbarViewport);
}
