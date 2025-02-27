import './error-message';
import "./input";
import "./label";
export declare class SpTextFieldXLarge extends HTMLElement {
    #private;
    static observedAttributes: string[];
    static formAssociated: boolean;
    get label(): string;
    set label(text: string);
    get error(): string;
    set error(text: string);
    get disabled(): boolean;
    set disabled(newValue: boolean);
    set placeholder(newValue: string | undefined | null);
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
        "sp-text-field-x-large": SpTextFieldXLarge;
    }
}
//# sourceMappingURL=index.d.ts.map