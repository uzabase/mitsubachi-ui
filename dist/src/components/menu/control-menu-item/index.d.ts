import { LitElement } from 'lit';
/**
 * @summary メニューの項目を表すコンポーネントです。
 *
 * @attr {text} text - 項目のテキスト
 *
 * @attr {boolean} selected - 項目が選択されていることを示します。属性があるときはチェックマークが表示されます。
 *
 * @attr {boolean} disabled - 項目が無効であることを示します。属性があれば、灰色で項目が表示されます。
 */
export declare class MiControlMenuItem extends LitElement {
    static styles: import('lit').CSSResult[];
    text: string;
    selected: boolean;
    disabled: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
/** @deprecated 代わりに MiControlMenuItem を使用してください */
export declare class SpControlMenuItem extends MiControlMenuItem {
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-control-menu-item": MiControlMenuItem;
        "sp-control-menu-item": SpControlMenuItem;
    }
}
//# sourceMappingURL=index.d.ts.map