import { LitElement } from 'lit';
/**
 * @summary メニューアイテムをグルーピングするコンポーネント。
 *
 * 複数の mi-menu-group を並べると、グループ間に区切り線が表示される。
 * オプションの label でグループにラベルを付けられる。
 *
 * @slot - メニュー項目
 */
export declare class MiMenuGroup extends LitElement {
    static styles: import('lit').CSSResult[];
    /** グループのラベル */
    label: string;
    connectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-menu-group": MiMenuGroup;
    }
}
//# sourceMappingURL=mi-menu-group.d.ts.map