import { LitElement } from 'lit';
export declare const size: readonly ["medium", "large", "xLarge", "2xLarge", "3xLarge", "4xLarge"];
type Size = (typeof size)[number];
/**
 * @summary ローディングスピナーです。
 */
export declare class SpLoading extends LitElement {
    static styles: import('lit').CSSResult[];
    ai: boolean;
    size: Size;
    private get loadingClasses();
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-loading": SpLoading;
    }
}
export {};
//# sourceMappingURL=sp-loading.d.ts.map