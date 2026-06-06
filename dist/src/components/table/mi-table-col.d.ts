import { LitElement } from 'lit';
/**
 * @summary テーブルカラム幅指定。`<col>` に相当。
 *
 * `mi-table` の直接の子として配置して使用する。
 */
export declare class MiTableCol extends LitElement {
    static styles: import('lit').CSSResult[];
    /** カラム幅（CSS値: "40px", "20%" など）。省略時はブラウザに委ねる */
    width: string;
    /** リサイズ時の最小幅（px）。省略時は 40 */
    minWidth?: number;
    updated(changed: Map<string, unknown>): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-table-col": MiTableCol;
    }
}
//# sourceMappingURL=mi-table-col.d.ts.map