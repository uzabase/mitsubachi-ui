import { LitElement } from 'lit';
/**
 * @summary チェックボックスです。
 */
export declare class SpCheckbox extends LitElement {
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    value: string;
    name: string;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    private handleChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-checkbox": SpCheckbox;
    }
}
//# sourceMappingURL=sp-checkbox.d.ts.map