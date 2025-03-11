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