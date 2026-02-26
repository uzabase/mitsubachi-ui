import { LitElement } from 'lit';
/**
 * @summary テキスト付きチェックボックスです。
 */
export declare class MiCheckboxText extends LitElement {
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    value: string;
    name: string;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    text: string;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    private handleChange;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiCheckboxText を使用してください */
export declare class SpCheckboxText extends MiCheckboxText {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-checkbox-text": MiCheckboxText;
        "sp-checkbox-text": SpCheckboxText;
    }
}
//# sourceMappingURL=mi-checkbox-text.d.ts.map