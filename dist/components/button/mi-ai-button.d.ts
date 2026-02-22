import { ButtonBase, ButtonTheme, Size, sizes } from './base';
export declare const aiVariants: readonly ["primary", "secondary"];
export type AiVariant = (typeof aiVariants)[number];
/**
 * @summary AIボタンです。AI機能の起動などに使用します。
 * アイコンは常に magic-fill が表示されます。
 */
export declare class MiAiButton extends ButtonBase {
    variant: AiVariant;
    protected getTheme(): ButtonTheme;
    protected get showIcon(): boolean;
    protected renderIcon(): import('lit-html').TemplateResult<1>;
}
export type { Size };
export { sizes };
declare global {
    interface HTMLElementTagNameMap {
        "mi-ai-button": MiAiButton;
    }
}
//# sourceMappingURL=mi-ai-button.d.ts.map