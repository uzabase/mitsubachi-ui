import { LitElement } from 'lit';
/** MenuDropdown の表示方向 */
export type MenuSide = "top" | "bottom" | "inline-start" | "inline-end";
/** MenuDropdown の配置調整 */
export type MenuAlign = "start" | "center" | "end";
/**
 * @summary メニューのルートコンポーネント。
 *
 * トリガー要素のクリックで開き、外側クリックまたは ESC で閉じるドロップダウンメニュー。
 *
 * @slot trigger - メニューを開閉するトリガー要素
 * @slot - メニューのドロップダウン（mi-menu-dropdown）
 */
export declare class MiMenu extends LitElement {
    static styles: import('lit').CSSResult[];
    /** 開閉状態 */
    open: boolean;
    private _cleanup?;
    private get _triggerEl();
    private get _dropdownEl();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    /** メニューを閉じる */
    closeMenu(): void;
    private _handleTriggerClick;
    private _handleKeyDown;
    private _handleItemActivate;
    private _handleOutsideClick;
    private _addOutsideListeners;
    private _removeOutsideListeners;
    private _positionDropdown;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-menu": MiMenu;
    }
}
//# sourceMappingURL=mi-menu.d.ts.map