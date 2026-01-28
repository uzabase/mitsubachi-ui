import { LitElement } from 'lit';
export declare const variants: readonly ["primary", "secondary", "tertiary", "ghost"];
type Variant = (typeof variants)[number];
export declare const sizes: readonly ["medium", "large", "xLarge"];
type Size = (typeof sizes)[number];
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
    /**
     * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
     */
    variants: Variant | null;
    variant: Variant;
    size: Size;
    name: string;
    value: string;
    type: string;
    iconType: string;
    constructor();
    private get buttonClasses();
    private get loadingSize();
    private get isDisabled();
    private renderLoading;
    private get showIcon();
    private renderIcon;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-button": SpButton;
    }
}
export {};
//# sourceMappingURL=sp-button.d.ts.map