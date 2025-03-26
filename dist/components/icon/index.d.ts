export declare class SpIcon extends HTMLElement {
    #private;
    constructor();
    set type(newValue: string);
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-icon": SpIcon;
    }
}
//# sourceMappingURL=index.d.ts.map