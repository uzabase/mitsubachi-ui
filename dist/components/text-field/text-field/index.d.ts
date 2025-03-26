import "./error-text";
export declare class SpTextField extends HTMLElement {
    #private;
    static observedAttributes: string[];
    static formAssociated: boolean;
    set type(newType: string);
    set error(text: string);
    set autocomplete(value: AutoFill);
    get autocomplete(): AutoFill;
    set placeholder(value: string);
    set disabled(value: boolean);
    set name(value: string);
    get value(): string;
    set value(value: string);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field": SpTextField;
    }
}
//# sourceMappingURL=index.d.ts.map