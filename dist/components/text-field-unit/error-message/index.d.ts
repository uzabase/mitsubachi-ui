export declare class SpTextFieldErrorMessage extends HTMLElement {
    #private;
    static observedAttributes: string[];
    get message(): string;
    set message(value: string);
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