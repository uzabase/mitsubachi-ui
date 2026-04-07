import { LitElement } from 'lit';
/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export declare class MiLogo extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    language: string;
    brand: string;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiLogo を使用してください */
export declare class SpLogo extends MiLogo {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-logo": MiLogo;
        "sp-logo": SpLogo;
    }
}
//# sourceMappingURL=index.d.ts.map