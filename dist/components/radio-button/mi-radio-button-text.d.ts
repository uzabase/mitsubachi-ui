import { LitElement } from 'lit';
export declare class MiRadioButtonText extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    value: string;
    name: string;
    checked: boolean;
    disabled: boolean;
    static formAssociated: boolean;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    formResetCallback(): void;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiRadioButtonText を使用してください */
export declare class SpRadioButtonText extends MiRadioButtonText {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-radio-button-text": MiRadioButtonText;
        "sp-radio-button-text": SpRadioButtonText;
    }
}
//# sourceMappingURL=mi-radio-button-text.d.ts.map