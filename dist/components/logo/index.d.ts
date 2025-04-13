/**
 * @summary スピーダのロゴです。
 *
 * @attr {string} language - スピーダのロゴにある社名の言語を定義します。language=jpであれば日本語, language=enであれば英語, cnであれば簡体字です。
 */
export declare class SpLogo extends HTMLElement {
    #private;
    static observedAttributes: string[];
    constructor();
    connectedCallback(): void;
    set language(value: string);
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-logo": SpLogo;
    }
}
//# sourceMappingURL=index.d.ts.map