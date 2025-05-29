/**
 * @summary inputタグに相当するテキストフィールドです。テキストフィールドを説明するラベルがあります。
 *
 * @attr {string} text - テキストフィールドを説明するテキストです。テキストフィールドの上に表示されます。
 *
 * @attr {string} support-text - テキストフィールドを補足するテキストです。textで指定したテキストの下、テキストフィールドの上に表示されます。
 */
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
    get autocomplete(): AutoFill;
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