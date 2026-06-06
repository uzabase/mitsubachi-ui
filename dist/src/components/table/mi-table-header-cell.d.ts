import { LitElement, TemplateResult } from 'lit';
/** ヘッダーセルのコンテンツタイプ */
export type TableHeaderCellContentType = "text" | "checkbox" | "icon-button";
/** ソート状態 */
export type TableSortState = "default" | "ascending" | "descending";
/** カラムアクションメニューの項目 */
export interface TableHeaderMenuItem {
    /** メニュー項目のラベル */
    label: string;
    /** クリック時のコールバック */
    onClick: () => void;
    /**
     * 選択状態（チェックアイコンを表示）
     * @default false
     */
    selected?: boolean;
}
/**
 * @summary テーブルのヘッダーセル。`<th>` に相当。
 *
 * ソート機能、カラムアクションメニュー、カラムリサイズに対応。
 *
 * @fires sort-change - ソート状態が変更されたとき。`detail.sortState` に新しい状態を含む。
 */
export declare class MiTableHeaderCell extends LitElement {
    static styles: import('lit').CSSResult[];
    /**
     * セルのコンテンツタイプ
     * @default 'text'
     */
    contentType: TableHeaderCellContentType;
    /**
     * ソート状態。設定すると自動でソートボタンが表示される。
     * @default undefined（ソート不可）
     */
    sortState?: TableSortState;
    /** カラムアクションメニューの項目（JS プロパティで設定） */
    menuItems: TableHeaderMenuItem[];
    /**
     * カラム幅のリサイズを許可
     * @default false
     */
    resizable: boolean;
    private _menuOpen;
    private _menuDropdown?;
    private _menuButton?;
    private _boundHandleOutsideClick;
    connectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    disconnectedCallback(): void;
    private _toAriaSortValue;
    private _handleSortClick;
    private _handleOutsideClick;
    private _handleMenuKeyDown;
    private _handleMenuItemClick;
    private _handleResizeMouseDown;
    private _getCellIndex;
    private _renderSortIcon;
    private _renderMenu;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-table-header-cell": MiTableHeaderCell;
    }
}
//# sourceMappingURL=mi-table-header-cell.d.ts.map