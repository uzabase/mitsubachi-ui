import { LitElement } from 'lit';
/**
 * @summary 選択状態を持つメニュー項目。
 *
 * mi-menu-radio-group 内に配置し、グループ内で1つだけ選択できる（Single-select）。
 * 選択中の項目にはチェックアイコンが表示される。
 *
 * @slot - メニュー項目のラベル
 * @slot icon - ラベルの先頭に表示するアイコン
 */
export declare class MiSelectMenuItem extends LitElement {
    static styles: import('lit').CSSResult[];
    /** RadioGroup の value として使われる識別子 */
    value: string;
    /**
     * 無効化状態
     * @default false
     */
    disabled: boolean;
    /** ラベル下に表示する補助テキスト */
    supportText: string;
    /** 選択状態（mi-menu-radio-group から自動設定） */
    get selected(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(): void;
    private _handleClick;
    private _handleKeyDown;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-select-menu-item": MiSelectMenuItem;
    }
}
//# sourceMappingURL=mi-select-menu-item.d.ts.map