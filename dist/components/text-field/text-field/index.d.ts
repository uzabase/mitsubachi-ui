import { LitElement } from 'lit';
/**
 * @summary テキストフィールドです。
 */
export declare class MiTextField extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    error: string;
    placeholder: string;
    autocomplete: AutoFill;
    disabled: boolean;
    name: string;
    value: string;
    type: string;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiTextField を使用してください */
export declare class SpTextField extends MiTextField {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-text-field": MiTextField;
        "sp-text-field": SpTextField;
    }
}
//# sourceMappingURL=index.d.ts.map