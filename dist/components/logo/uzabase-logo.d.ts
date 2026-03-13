import { LitElement } from 'lit';
/**
 * @summary Uzabaseのロゴです。
 *
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 */
export declare class MiUzabaseLogo extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    inverse: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-uzabase-logo": MiUzabaseLogo;
    }
}
//# sourceMappingURL=uzabase-logo.d.ts.map