import { LitElement } from 'lit';
/** ActionMenuItem のバリアント */
export type ActionMenuItemVariant = "neutral" | "danger";
/**
 * @summary 画面遷移を伴わずに特定のアクションを実行するメニュー項目。
 *
 * 選択すると、データの更新、実行、削除などの操作が即座に実行される。
 * データの削除や取り消し困難な変更など、不可逆的な操作には `variant="danger"` を使用する。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 */
export declare class MiActionMenuItem extends LitElement {
    static styles: import('lit').CSSResult[];
    /**
     * バリアント。danger は削除などの破壊的操作に使用
     * @default 'neutral'
     */
    variant: ActionMenuItemVariant;
    /**
     * 無効化状態
     * @default false
     */
    disabled: boolean;
    /** ラベル下に表示する補助テキスト */
    supportText: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleClick;
    private _handleKeyDown;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-action-menu-item": MiActionMenuItem;
    }
}
//# sourceMappingURL=mi-action-menu-item.d.ts.map