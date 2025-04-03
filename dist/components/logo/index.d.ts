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