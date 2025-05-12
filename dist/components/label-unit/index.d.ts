/**
 * ラベルです。
 *
 * @summary ラベルです。テキストフィールド上に置き、テキストフィールドを説明するために使います。
 *
 * @attr {string} text - ラベルのテキストです。文字の色は黒です。
 *
 * @attr {string} support-text - ラベルの下に灰色で表示されるテキストです。textを補足します。
 *
 */
export declare class SpLabelUnit extends HTMLElement {
    #private;
    static styles: CSSStyleSheet;
    static observedAttributes: string[];
    set text(text: string);
    set supportText(value: string);
    constructor();
    connectedCallback(): void;
    /**
     * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
     */
    isEmpty(): boolean;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-label-unit": SpLabelUnit;
    }
}
//# sourceMappingURL=index.d.ts.map