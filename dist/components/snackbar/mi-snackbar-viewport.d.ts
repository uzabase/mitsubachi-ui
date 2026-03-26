import { LitElement } from 'lit';
/**
 * 複数の `mi-snackbar` を **同じ画面上の位置** に縦に積み重ねて表示するためのコンテナです。
 * アプリのルート付近に **1 つだけ** 置き、その子として `mi-snackbar` をマウント（ポータル）してください。
 *
 * @summary Snackbar 用の固定 viewport（複数件は縦にずれて表示）
 *
 * @slot - `mi-snackbar` 要素（および必要なら `class="snackbar-mount"` のラッパー）
 *
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度）
 */
export declare class MiSnackbarViewport extends LitElement {
    static styles: import('lit').CSSResult[];
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-snackbar-viewport": MiSnackbarViewport;
    }
}
//# sourceMappingURL=mi-snackbar-viewport.d.ts.map