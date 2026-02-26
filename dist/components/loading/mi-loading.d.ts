import { LitElement } from 'lit';
export declare const size: readonly ["medium", "large", "xLarge", "2xLarge", "3xLarge", "4xLarge"];
type Size = (typeof size)[number];
/**
 * @summary ローディングスピナーです。
 */
export declare class MiLoading extends LitElement {
    static styles: import('lit').CSSResult[];
    ai: boolean;
    size: Size;
    private get loadingClasses();
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiLoading を使用してください */
export declare class SpLoading extends MiLoading {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-loading": MiLoading;
        "sp-loading": SpLoading;
    }
}
export {};
//# sourceMappingURL=mi-loading.d.ts.map