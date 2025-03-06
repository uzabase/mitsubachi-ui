export declare class SpTextFieldXLargeInput extends HTMLElement {
    #private;
    static observedAttributes: string[];
    static formAssociated: boolean;
    get error(): boolean;
    set error(isError: boolean);
    get placeholder(): string;
    set placeholder(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    get name(): string;
    set name(value: string);
    get value(): string;
    set value(value: string);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field-x-large-input": SpTextFieldXLargeInput;
    }
}
//# sourceMappingURL=index.d.ts.map