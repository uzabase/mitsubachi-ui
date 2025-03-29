import "../text-field";
import "../../label-unit";
export declare class SpTextFieldUnit extends HTMLElement {
    #private;
    static observedAttributes: string[];
    static formAssociated: boolean;
    set text(text: string);
    set error(text: string);
    set disabled(newValue: boolean);
    set placeholder(newValue: string);
    set name(value: string);
    get value(): string;
    set value(value: string);
    set type(newValue: string);
    set supportText(value: string);
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: "error" | "text" | "placeholder" | "disabled" | "name" | "value" | "type" | "support-text" | "autocomplete", oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field-unit": SpTextFieldUnit;
    }
}
//# sourceMappingURL=index.d.ts.map