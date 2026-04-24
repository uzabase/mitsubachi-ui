import { LitElement, nothing } from 'lit';
/**
 * @deprecated 代わりに MiSpeedaLogo または MiUzabaseLogo を使用してください
 *
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
    label: string;
    updated(): void;
    render(): typeof nothing | import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiSpeedaLogo または MiUzabaseLogo を使用してください */
export declare class SpLogo extends MiLogo {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-logo": MiLogo;
        "sp-logo": SpLogo;
    }
}
//# sourceMappingURL=mi-logo.d.ts.map