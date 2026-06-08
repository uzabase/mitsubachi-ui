import { LitElement } from 'lit';
/**
 * @summary サブメニューを開くためのメニュー項目。
 *
 * 選択するとネストされたサブメニューが表示される。
 * 右端にシェブロンアイコンが常に表示される。
 * 非タッチデバイスでは hover、タッチデバイスでは tap で開閉する。
 * メニューの階層は最大2階層まで。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 * @slot submenu - サブメニューのドロップダウン（mi-menu-dropdown）
 */
export declare class MiSubMenuItem extends LitElement {
    static styles: import('lit').CSSResult[];
    /**
     * 無効化状態
     * @default false
     */
    disabled: boolean;
    private _subOpen;
    private _cleanup?;
    private _hoverTimer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    private _handleMouseEnter;
    private _handleMouseLeave;
    private _handleClick;
    private _handleKeyDown;
    private _positionSubmenu;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-sub-menu-item": MiSubMenuItem;
    }
}
//# sourceMappingURL=mi-sub-menu-item.d.ts.map