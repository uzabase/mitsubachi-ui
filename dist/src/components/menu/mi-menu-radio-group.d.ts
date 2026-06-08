import { LitElement } from 'lit';
/**
 * @summary SelectMenuItem のラジオグループ。
 *
 * 内部の mi-select-menu-item をラジオボタングループとして管理する。
 * グループ内で1つだけ選択できる（Single-select）。
 *
 * @slot - mi-select-menu-item 要素
 * @fires change - 選択値が変更されたとき。`detail.value` に新しい値を含む。
 */
export declare class MiMenuRadioGroup extends LitElement {
    static styles: import('lit').CSSResult[];
    /** 現在の選択値 */
    value: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleItemClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-menu-radio-group": MiMenuRadioGroup;
    }
}
//# sourceMappingURL=mi-menu-radio-group.d.ts.map