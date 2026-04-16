import { LitElement } from 'lit';
/**
 * @summary テキストフィールドのエラーテキストコンポーネントです。
 */
export declare class MiTextFieldErrorText extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    text: string;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiTextFieldErrorText を使用してください */
export declare class SpTextFieldErrorText extends MiTextFieldErrorText {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-text-field-error-text": MiTextFieldErrorText;
        "sp-text-field-error-text": SpTextFieldErrorText;
    }
}
//# sourceMappingURL=index.d.ts.map