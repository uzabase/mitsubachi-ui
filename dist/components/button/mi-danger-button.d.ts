import { ButtonBase, ButtonTheme, Size, sizes } from './base';
export declare const dangerVariants: readonly ["primary", "secondary", "ghost"];
export type DangerVariant = (typeof dangerVariants)[number];
/**
 * @summary Dangerボタンです。削除・破壊的操作などに使用します。
 */
export declare class MiDangerButton extends ButtonBase {
    variant: DangerVariant;
    protected getTheme(): ButtonTheme;
}
export type { Size };
export { sizes };
declare global {
    interface HTMLElementTagNameMap {
        "mi-danger-button": MiDangerButton;
    }
}
//# sourceMappingURL=mi-danger-button.d.ts.map