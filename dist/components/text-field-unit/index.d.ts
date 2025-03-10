import "./error-text";
import "./text-field";
import "./label";
export declare class SpTextFieldUnit extends HTMLElement {
    #private;
    static observedAttributes: string[];
    static formAssociated: boolean;
    get text(): string;
    set text(text: string);
    get error(): string;
    set error(text: string);
    get disabled(): boolean;
    set disabled(newValue: boolean);
    set placeholder(newValue: string | undefined | null);
    get name(): string;
    set name(value: string);
    get value(): string;
    set value(value: string);
    get type(): string;
    set type(newValue: string);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field-unit": SpTextFieldUnit;
    }
}
//# sourceMappingURL=index.d.ts.map