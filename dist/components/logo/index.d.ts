import { LitElement } from 'lit';
/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export declare class SpLogo extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    language: string;
    brand: string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-logo": SpLogo;
    }
}
//# sourceMappingURL=index.d.ts.map