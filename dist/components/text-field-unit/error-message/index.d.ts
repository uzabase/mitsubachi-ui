export declare class SpTextFieldErrorMessage extends HTMLElement {
    #private;
    static observedAttributes: string[];
    get textContent(): string | null;
    set textContent(value: string | null);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field-error-message": SpTextFieldErrorMessage;
    }
}
//# sourceMappingURL=index.d.ts.map