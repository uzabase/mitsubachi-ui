import { nothing } from 'lit';
import { Placement } from '../tooltip/mi-tooltip';
import { ButtonBase } from './base';
export declare const iconButtonVariants: readonly ["primary", "secondary", "tertiary", "ghost"];
export type IconButtonVariant = (typeof iconButtonVariants)[number];
export declare const iconButtonSizes: readonly ["small", "medium", "large"];
export type IconButtonSize = (typeof iconButtonSizes)[number];
/**
 * @summary アイコンのみのコンパクトなボタンです。
 * テキストを持たず、アイコンのみで操作を表現します。
 * aria-label 属性でラベルを必ず指定してください。
 *
 * @example
 * ```html
 * <!-- ツールチップあり（デフォルト） -->
 * <mi-icon-button icon-type="search" aria-label="検索"></mi-icon-button>
 *
 * <!-- ツールチップなし（title 属性で代替） -->
 * <mi-icon-button icon-type="search" aria-label="検索" tooltip-disabled></mi-icon-button>
 * ```
 */
export declare class MiIconButton extends ButtonBase<IconButtonSize> {
    static styles: import('lit').CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry | null;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    variant: IconButtonVariant;
    size: IconButtonSize;
    /**
     * ボタンのラベルテキスト。
     * - 常に aria-label に設定されます
     * - tooltip-disabled が false（デフォルト）のとき: ツールチップのテキストとして使用
     * - tooltip-disabled が true のとき: title 属性として設定
     */
    label: string;
    /** ツールチップの表示位置。デフォルトは "top"。 */
    tooltipPlacement: Placement;
    /** true のときツールチップを非表示にし、代わりに title 属性を設定します。 */
    tooltipDisabled: boolean;
    protected get loadingSize(): string;
    /**
     * icon-button.css は theme クラス（normal/danger/ai）を持たず、
     * size も独自体系（small/medium/large）のため、base のクラス組み立てロジックとは
     * 互換性がない。そのため super.buttonClasses を呼ばず完全オーバーライドしている。
     */
    protected get buttonClasses(): string;
    protected renderSlot(): typeof nothing;
    /**
     * base.ts の render() とは disabled・aria-label・title・aria-disabled の扱いが異なるため
     * 完全にオーバーライドしている。
     * - disabled: loading 時は aria-disabled で代替し、ネイティブ disabled は付与しない
     * - aria-label / title: label プロパティから設定
     */
    render(): import('lit-html').TemplateResult<1>;
}
export type { IconButtonSize as Size, IconButtonVariant as Variant };
declare global {
    interface HTMLElementTagNameMap {
        "mi-icon-button": MiIconButton;
    }
}
//# sourceMappingURL=mi-icon-button.d.ts.map