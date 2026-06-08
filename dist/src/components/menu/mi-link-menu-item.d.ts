import { LitElement } from 'lit';
/**
 * @summary 別のページや画面に遷移するためのメニュー項目。
 *
 * 選択すると指定されたリンク先へ移動する。
 * `new-window` を指定すると新しいウィンドウで開くアイコンが表示される。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 */
export declare class MiLinkMenuItem extends LitElement {
    static styles: import('lit').CSSResult[];
    /** リンク先URL */
    href: string;
    /**
     * 新しいウィンドウで開くかどうか
     * @default false
     */
    newWindow: boolean;
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
        "mi-link-menu-item": MiLinkMenuItem;
    }
}
//# sourceMappingURL=mi-link-menu-item.d.ts.map