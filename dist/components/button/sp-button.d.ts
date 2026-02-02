import { BaseButton } from './base-button';
export { sizes, type Size } from './base-button';
export declare const variants: readonly ["primary", "secondary", "tertiary", "ghost", "plane"];
export type Variant = (typeof variants)[number];
/**
 * @summary ボタンです。
 *
 * @deprecated danger タイプは `sp-danger-button` の使用を推奨します。
 * AI 機能には `sp-ai-button` の使用を推奨します。
 */
export declare class SpButton extends BaseButton {
    /**
     * @deprecated このプロパティは非推奨です。代わりに `sp-danger-button` コンポーネントを使用してください。
     */
    danger: boolean;
    /**
     * @deprecated このプロパティは非推奨です。代わりに `sp-danger-button` コンポーネントを使用してください。
     * このプロパティは後方互換性のために残されていますが、設定しても無視されます。
     */
    buttonType: string;
    /**
     * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
     */
    variants: Variant | null;
    variant: Variant;
    protected updated(changedProperties: Map<string, unknown>): void;
    protected get buttonModeClass(): string;
    protected get variantClass(): "primary" | "secondary" | "tertiary" | "ghost" | "plane";
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-button": SpButton;
    }
}
//# sourceMappingURL=sp-button.d.ts.map