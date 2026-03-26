import { LitElement } from 'lit';
export type SearchBoxVariant = "primary" | "secondary";
/**
 * @summary ユーザーが必要な情報を素早く見つけるための入力コンポーネントです。
 * キーワードの入力に応じて、候補表示や検索実行を行い、コンテンツ探索の効率を高めます。
 *
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 *
 * @attr {string} variant - 見た目のバリアント（`primary` | `secondary`）。デフォルトは `primary`。
 * @attr {string} value - 入力値の文字列。
 * @attr {string} placeholder - プレースホルダー。
 * @attr {string} name - フォームの name。
 * @attr {boolean} disabled - 無効化するかどうか。
 * @attr {string} autocomplete - autocomplete 属性。
 * @attr {boolean} autofocus - 自動フォーカスするかどうか。
 * @fires input - 内部の `input` と同様。シャドウ内で `composed` が付かない場合、ホストで `composed: true` として再発火します。
 * @fires change - 内部の `change`（値の確定、主にフォーカスが外れたとき）と同様。シャドウを越えて受け取れるよう必要時に再発火します。
 * @fires clear - クリアボタンが押されたときに発火します。
 */
export declare class MiSearchBox extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    static formAssociated: boolean;
    variant: SearchBoxVariant;
    value: string;
    placeholder: string;
    name: string;
    /** 内部の `input` に付与する id（`<label for>` と紐づける場合に指定）。 */
    inputId: string;
    disabled: boolean;
    autocomplete: AutoFill;
    autofocus: boolean;
    private inputEl;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiSearchBox を使用してください */
export declare class SpSearchBox extends MiSearchBox {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-search-box": MiSearchBox;
        "sp-search-box": SpSearchBox;
    }
}
//# sourceMappingURL=mi-search-box.d.ts.map