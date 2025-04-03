export declare class SpIcon extends HTMLElement {
    #private;
    static observedAttributes: string[];
    constructor();
    set type(newValue: string);
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-icon": SpIcon;
    }
}
//# sourceMappingURL=index.d.ts.map