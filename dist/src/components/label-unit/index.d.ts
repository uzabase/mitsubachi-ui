import { LitElement } from 'lit';
/**
 * ラベルです。
 *
 * @summary ラベルです。テキストフィールド上に置き、テキストフィールドを説明するために使います。
 *
 * @attr {string} text - ラベルのテキストです。文字の色は黒です。
 *
 * @attr {string} support-text - ラベルの下に灰色で表示されるテキストです。textを補足します。
 */
export declare class MiLabelUnit extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    text: string;
    supportText: string;
    /**
     * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
     */
    isEmpty(): boolean;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiLabelUnit を使用してください */
export declare class SpLabelUnit extends MiLabelUnit {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-label-unit": MiLabelUnit;
        "sp-label-unit": SpLabelUnit;
    }
}
//# sourceMappingURL=index.d.ts.map