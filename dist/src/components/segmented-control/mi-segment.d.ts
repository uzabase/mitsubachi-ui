import { LitElement } from 'lit';
export declare const segmentVariants: readonly ["text", "icon"];
export type SegmentVariant = (typeof segmentVariants)[number];
/**
 * SegmentedControl 内の個別セグメントです。
 * mi-segmented-control の直接の子として配置して使用します。
 *
 * @summary セグメントコントロールの個別セグメント
 *
 * @slot - セグメントに表示するコンテンツ（テキストまたはアイコン）
 *
 * @example
 * ```html
 * <mi-segment value="tab1" variant="text">タブ1</mi-segment>
 * ```
 */
export declare class MiSegment extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    /** セグメントの値（mi-segmented-control の選択制御に使用） */
    value: string;
    /** セグメントの表示バリアント */
    variant: SegmentVariant;
    /** 無効化状態 */
    disabled: boolean;
    /** 選択状態（mi-segmented-control から制御される） */
    selected: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-segment": MiSegment;
    }
}
//# sourceMappingURL=mi-segment.d.ts.map