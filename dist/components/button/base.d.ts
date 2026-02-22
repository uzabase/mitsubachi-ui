import { LitElement } from 'lit';
export declare const variants: readonly ["primary", "secondary", "tertiary", "ghost", "plane"];
export type Variant = (typeof variants)[number];
export declare const sizes: readonly ["medium", "large", "xLarge"];
export type Size = (typeof sizes)[number];
export type ButtonTheme = "normal" | "danger" | "ai";
export declare function isValidVariant(value: string): Variant;
export declare function isValidSize(value: string): Size;
/**
 * ボタン共通ベースクラス。mi-button / mi-danger-button / mi-ai-button が継承する。
 * @internal
 */
export declare class ButtonBase extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    /** 継承クラスでオーバーライド可能。テーマ（normal / danger / ai） */
    protected getTheme(): ButtonTheme;
    loading: boolean;
    disabled: boolean;
    variant: Variant;
    size: string;
    name: string;
    value: string;
    type: "button" | "submit" | "reset";
    iconType: string;
    constructor();
    /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
    protected getEffectiveVariant(): Variant;
    protected get buttonClasses(): string;
    protected get isDisabled(): boolean;
    protected get loadingSize(): string;
    protected renderLoading(): import('lit-html').TemplateResult<1>;
    protected get showIcon(): boolean | "";
    protected renderIcon(): import('lit-html').TemplateResult<1>;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=base.d.ts.map