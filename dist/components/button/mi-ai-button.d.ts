import { ButtonBase, ButtonTheme, Size, sizes } from './base';
export declare const aiVariants: readonly ["primary", "secondary"];
export type AiVariant = (typeof aiVariants)[number];
/**
 * @summary AIボタンです。AI機能の起動などに使用します。
 * アイコンは常に magic-fill が表示されます。icon-type 属性は無効です。
 */
export declare class MiAiButton extends ButtonBase {
    variant: AiVariant;
    /**
     * icon-type 属性は mi-ai-button では無効です。アイコンは常に magic-fill が使用されます。
     * @deprecated 設定しても効果はありません。
     */
    iconType: string;
    protected getTheme(): ButtonTheme;
    protected get showIcon(): boolean;
    protected renderIcon(): import('lit-html').TemplateResult<1>;
    protected renderLoading(): import('lit-html').TemplateResult<1>;
}
export type { Size };
export { sizes };
declare global {
    interface HTMLElementTagNameMap {
        "mi-ai-button": MiAiButton;
    }
}
//# sourceMappingURL=mi-ai-button.d.ts.map