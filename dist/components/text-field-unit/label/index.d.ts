export declare class SpTextFieldLabel extends HTMLElement {
    #private;
    static styles: CSSStyleSheet;
    static observedAttributes: string[];
    get htmlFor(): string;
    set htmlFor(value: string);
    get textContent(): string | null;
    set textContent(text: string | null);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field-label": SpTextFieldLabel;
    }
}
//# sourceMappingURL=index.d.ts.map