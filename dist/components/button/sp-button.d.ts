import { LitElement } from 'lit';
export declare const variants: readonly ["primary", "secondary", "tertiary"];
type Variants = (typeof variants)[number];
export declare const size: readonly ["medium", "large", "xLarge"];
type Size = (typeof size)[number];
/**
 * @summary ボタンです。
 */
export declare class SpButton extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    loading: boolean;
    disabled: boolean;
    danger: boolean;
    variants: Variants;
    size: Size;
    name: string;
    value: string;
    type: string;
    constructor();
    private get buttonClasses();
    private get isDisabled();
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-button": SpButton;
    }
}
export {};
//# sourceMappingURL=sp-button.d.ts.map