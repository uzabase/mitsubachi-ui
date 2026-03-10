import { LitElement } from 'lit';
/**
 * @summary Speedaのロゴです。
 *
 * @attr {string} type - ロゴの種類。ai-agent, sales-insights, customer-analytics, startup-insights, innovation-insights, expert-research（未指定で標準のSPEEDAロゴ）
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 * @attr {boolean} no-symbol - シンボルを非表示にする
 * @attr {string} logo-language - ロゴの言語。en, zh
 */
export declare class MiSpeedaLogo extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    type: "ai-agent" | "expert-research" | null;
    inverse: boolean;
    noSymbol: boolean;
    logoLanguage: "en" | "zh";
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-speeda-logo": MiSpeedaLogo;
    }
}
//# sourceMappingURL=speeda-logo.d.ts.map