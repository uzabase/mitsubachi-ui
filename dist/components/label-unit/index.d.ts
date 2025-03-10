export declare class SpLabelUnit extends HTMLElement {
    #private;
    static styles: CSSStyleSheet;
    static observedAttributes: string[];
    get text(): string;
    set text(text: string);
    get supporttext(): string;
    set supporttext(value: string);
    constructor();
    connectedCallback(): void;
    isEmpty(): boolean;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-label-unit": SpLabelUnit;
    }
}
//# sourceMappingURL=index.d.ts.map