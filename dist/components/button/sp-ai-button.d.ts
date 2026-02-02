import { BaseButton } from './base-button';
export declare const aiVariants: readonly ["primary", "secondary"];
export type AiVariant = (typeof aiVariants)[number];
/**
 * @summary AIボタンです。AI機能に関連するアクションに使用します。
 *
 * @example
 * ```html
 * <sp-ai-button variant="primary">AIで生成</sp-ai-button>
 * <sp-ai-button variant="secondary">AIアシスト</sp-ai-button>
 * ```
 */
export declare class SpAiButton extends BaseButton {
    variant: AiVariant;
    protected get buttonModeClass(): string;
    protected get variantClass(): "primary" | "secondary";
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-ai-button": SpAiButton;
    }
}
//# sourceMappingURL=sp-ai-button.d.ts.map