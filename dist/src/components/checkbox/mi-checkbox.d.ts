import { LitElement } from 'lit';
/**
 * @summary チェックボックスです。
 */
export declare class MiCheckbox extends LitElement {
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
/** @deprecated 代わりに MiCheckbox を使用してください */
export declare class SpCheckbox extends MiCheckbox {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-checkbox": MiCheckbox;
        "sp-checkbox": SpCheckbox;
    }
}
//# sourceMappingURL=mi-checkbox.d.ts.map