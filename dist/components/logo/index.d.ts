/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export declare class SpLogo extends HTMLElement {
    static observedAttributes: string[];
    constructor();
    get language(): string | null;
    get brand(): string | null;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-logo": SpLogo;
    }
}
//# sourceMappingURL=index.d.ts.map