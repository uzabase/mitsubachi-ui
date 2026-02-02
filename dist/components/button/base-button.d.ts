import { LitElement } from 'lit';
export declare const sizes: readonly ["medium", "large", "xLarge"];
export type Size = (typeof sizes)[number];
export declare function isValidSize(value: string): Size;
/**
 * ボタンコンポーネントの基底クラス
 * @internal
 */
export declare abstract class BaseButton extends LitElement {
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    loading: boolean;
    disabled: boolean;
    size: Size;
    name: string;
    value: string;
    type: string;
    iconType: string;
    protected internals: ElementInternals;
    constructor();
    /**
     * ボタンのモードクラス（normal, danger, ai）を返す
     * 各サブクラスで実装する
     */
    protected abstract get buttonModeClass(): string;
    /**
     * バリアントクラスを返す
     * 各サブクラスで実装する
     */
    protected abstract get variantClass(): string;
    protected get buttonClasses(): string;
    protected get loadingSize(): string;
    protected get isDisabled(): boolean;
    protected renderLoading(): import('lit-html').TemplateResult<1>;
    protected get showIcon(): boolean | "";
    protected renderIcon(): import('lit-html').TemplateResult<1>;
    render(): import('lit-html').TemplateResult<1>;
    protected handleClick(event: Event): void;
}
//# sourceMappingURL=base-button.d.ts.map