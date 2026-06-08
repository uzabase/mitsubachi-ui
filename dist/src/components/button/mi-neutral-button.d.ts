import { ButtonBase, ButtonTheme, Size, sizes, Variant, variants } from './base';
/**
 * @summary ノーマル（ニュートラル）ボタンです。
 *
 * @slot - ボタンのテキスト
 */
export declare class MiNeutralButton extends ButtonBase {
    /**
     * Danger スタイルで表示するかどうか。
     * @deprecated この属性は非推奨です。Danger ボタンには `mi-danger-button` の利用を推奨します。
     */
    danger: boolean;
    /**
     * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
     */
    variants: Variant | null;
    variant: Variant;
    protected getTheme(): ButtonTheme;
    protected getEffectiveVariant(): Variant;
}
export type { Size, Variant };
export { sizes, variants };
/** @deprecated 代わりに MiNeutralButton を使用してください。後方互換のため別クラスとして登録しています。 */
export declare class MiButton extends MiNeutralButton {
}
/** @deprecated 代わりに MiNeutralButton を使用してください */
export declare class SpButton extends MiButton {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-neutral-button": MiNeutralButton;
        "mi-button": MiButton;
        "sp-button": SpButton;
    }
}
//# sourceMappingURL=mi-neutral-button.d.ts.map