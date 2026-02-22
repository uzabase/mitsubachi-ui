import { ButtonBase } from './base';
export declare const iconButtonVariants: readonly ["primary", "secondary", "tertiary", "ghost"];
export type IconButtonVariant = (typeof iconButtonVariants)[number];
export declare const iconButtonSizes: readonly ["small", "medium", "large"];
export type IconButtonSize = (typeof iconButtonSizes)[number];
/**
 * @summary アイコンのみのコンパクトなボタンです。
 * テキストを持たず、アイコンのみで操作を表現します。
 * 必ずツールチップで意味を補完してください。
 */
export declare class MiIconButton extends ButtonBase {
    #private;
    static styles: import('lit').CSSResult[];
    variant: IconButtonVariant;
    size: IconButtonSize;
    selected: boolean;
    protected get loadingSize(): string;
    protected get buttonClasses(): string;
    render(): import('lit-html').TemplateResult<1>;
}
export type { IconButtonVariant as Variant, IconButtonSize as Size };
declare global {
    interface HTMLElementTagNameMap {
        "mi-icon-button": MiIconButton;
    }
}
//# sourceMappingURL=mi-icon-button.d.ts.map