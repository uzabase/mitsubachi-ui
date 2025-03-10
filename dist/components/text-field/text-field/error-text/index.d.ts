/**
 *
 */
export declare class SpTextFieldErrorText extends HTMLElement {
    #private;
    static observedAttributes: string[];
    get text(): string;
    set text(value: string);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field-error-text": SpTextFieldErrorText;
    }
}
//# sourceMappingURL=index.d.ts.map