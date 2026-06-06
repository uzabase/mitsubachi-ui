import { LitElement } from 'lit';
/** ボディセルのコンテンツタイプ */
export type TableBodyCellContentType = "text" | "number" | "date" | "checkbox" | "icon-button" | "slot";
/**
 * @summary テーブルのボディセル。`<td>` に相当。
 *
 * コンテンツが空（テキストなし・要素なし）の場合、セル中央にダッシュ（–）を自動表示する。
 * `0` は有効な値として通常表示される。
 */
export declare class MiTableBodyCell extends LitElement {
    static styles: import('lit').CSSResult[];
    /**
     * セルのコンテンツタイプ
     * @default 'text'
     */
    contentType: TableBodyCellContentType;
    private _isEmpty;
    connectedCallback(): void;
    private _onSlotChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-table-body-cell": MiTableBodyCell;
    }
}
//# sourceMappingURL=mi-table-body-cell.d.ts.map