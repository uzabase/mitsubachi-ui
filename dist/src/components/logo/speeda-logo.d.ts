import { LitElement, nothing } from 'lit';
/**
 * @summary Speedaのロゴです。
 *
 * @attr {string} sub-brand - ロゴの種類。ai-agent, expert-research（未指定で標準のSpeedaロゴ）
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 * @attr {boolean} no-symbol - シンボルを非表示にする
 * @attr {string} logo-language - ロゴの言語。en, zh
 */
export declare class MiSpeedaLogo extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    subBrand: "ai-agent" | "expert-research" | null;
    inverse: boolean;
    noSymbol: boolean;
    logoLanguage: "en" | "zh";
    label: string;
    updated(): void;
    render(): typeof nothing | import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-speeda-logo": MiSpeedaLogo;
    }
}
//# sourceMappingURL=speeda-logo.d.ts.map