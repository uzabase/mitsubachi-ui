import { LitElement } from 'lit';
/**
 * @summary テーブル行。`<tr>` に相当。選択状態とホバー状態を管理する。
 */
export declare class MiTableRow extends LitElement {
    static styles: import('lit').CSSResult[];
    /**
     * 選択状態
     * @default false
     */
    selected: boolean;
    connectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-table-row": MiTableRow;
    }
}
//# sourceMappingURL=mi-table-row.d.ts.map