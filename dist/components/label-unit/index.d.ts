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
export declare class SpLabelUnit extends LitElement {
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
declare global {
    interface HTMLElementTagNameMap {
        "sp-label-unit": SpLabelUnit;
    }
}
//# sourceMappingURL=index.d.ts.map