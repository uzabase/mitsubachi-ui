import { LitElement } from 'lit';
export declare class SpRadioButtonText extends LitElement {
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
declare global {
    interface HTMLElementTagNameMap {
        "sp-radio-button-text": SpRadioButtonText;
    }
}
//# sourceMappingURL=sp-radio-button-text.d.ts.map