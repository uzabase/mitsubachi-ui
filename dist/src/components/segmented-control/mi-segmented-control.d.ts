import { LitElement } from 'lit';
/**
 * 排他的な単一選択のセグメントグループです。
 * mi-segment コンポーネントを子として配置して使用します。
 *
 * @summary セグメントコントロール
 *
 * @slot - mi-segment コンポーネント群
 *
 * @fires change - セグメントの選択が変更されたとき。detail: { value: string }
 *
 * @example
 * ```html
 * <mi-segmented-control value="tab1" aria-label="表示切り替え">
 *   <mi-segment value="tab1" variant="text">タブ1</mi-segment>
 *   <mi-segment value="tab2" variant="text">タブ2</mi-segment>
 *   <mi-segment value="tab3" variant="text">タブ3</mi-segment>
 * </mi-segmented-control>
 * ```
 */
export declare class MiSegmentedControl extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    /** 現在選択されているセグメントの値 */
    value: string;
    /** 無効化状態（全セグメントを無効化） */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changedProperties: Map<string, unknown>): void;
    protected firstUpdated(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-segmented-control": MiSegmentedControl;
    }
}
//# sourceMappingURL=mi-segmented-control.d.ts.map