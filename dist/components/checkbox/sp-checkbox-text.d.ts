import { LitElement } from 'lit';
/**
 * @summary テキスト付きチェックボックスです。
 */
export declare class SpCheckboxText extends LitElement {
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
declare global {
    interface HTMLElementTagNameMap {
        "sp-checkbox-text": SpCheckboxText;
    }
}
//# sourceMappingURL=sp-checkbox-text.d.ts.map