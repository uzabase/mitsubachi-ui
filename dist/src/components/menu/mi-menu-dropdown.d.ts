import { LitElement, nothing } from 'lit';
import { MenuAlign, MenuSide } from './mi-menu';
/**
 * @summary メニューのドロップダウンコンポーネント。
 *
 * mi-menu 内に配置して使用する。ポジショニングは mi-menu が @floating-ui/dom で行う。
 *
 * @slot - メニュー項目（mi-action-menu-item, mi-menu-group 等）
 */
export declare class MiMenuDropdown extends LitElement {
    static styles: import('lit').CSSResult[];
    /** 開閉状態（mi-menu から制御される） */
    open: boolean;
    /**
     * トリガーに対する表示方向
     * @default 'bottom'
     */
    side: MenuSide;
    /**
     * 表示方向の軸に沿った配置
     * @default 'start'
     */
    align: MenuAlign;
    /**
     * トリガーからのオフセット（px）
     * @default 4
     */
    sideOffset: number;
    /**
     * ドロップダウンの幅（px）
     * @default 200
     */
    width: number;
    /** 最初のメニュー項目にフォーカスを当てる */
    focusFirstItem(): void;
    /** メニュー項目一覧を取得（キーボードナビ用） */
    private _getMenuItems;
    private _handleKeyDown;
    render(): typeof nothing | import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-menu-dropdown": MiMenuDropdown;
    }
}
//# sourceMappingURL=mi-menu-dropdown.d.ts.map