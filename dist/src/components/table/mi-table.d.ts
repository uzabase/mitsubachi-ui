import { LitElement } from 'lit';
export type TableView = "grid" | "list";
/**
 * @summary テーブルのルートコンポーネント。view をCSS変数経由で子コンポーネントに配信する。
 */
export declare class MiTable extends LitElement {
    static styles: import('lit').CSSResult[];
    /** テーブルのビューモード */
    view: TableView;
    /** テーブルのアクセシブルラベル */
    label: string;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-table": MiTable;
    }
}
//# sourceMappingURL=mi-table.d.ts.map