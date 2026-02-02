import { BaseButton } from './base-button';
export declare const dangerVariants: readonly ["primary", "secondary", "ghost"];
export type DangerVariant = (typeof dangerVariants)[number];
/**
 * @summary Dangerボタンです。削除や破壊的なアクションに使用します。
 *
 * @example
 * ```html
 * <sp-danger-button variant="primary">削除</sp-danger-button>
 * <sp-danger-button variant="secondary">キャンセル</sp-danger-button>
 * ```
 */
export declare class SpDangerButton extends BaseButton {
    variant: DangerVariant;
    protected get buttonModeClass(): string;
    protected get variantClass(): "primary" | "secondary" | "ghost";
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-danger-button": SpDangerButton;
    }
}
//# sourceMappingURL=sp-danger-button.d.ts.map