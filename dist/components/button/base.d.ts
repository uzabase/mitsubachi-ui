import { LitElement, nothing, TemplateResult } from 'lit';
export declare const variants: readonly ["primary", "secondary", "tertiary", "ghost", "plane"];
export type Variant = (typeof variants)[number];
export declare const sizes: readonly ["medium", "large", "xLarge"];
export type Size = (typeof sizes)[number];
export type ButtonTheme = "normal" | "danger" | "ai";
export declare function isValidVariant(value: string): value is Variant;
export declare function isValidSize(value: string): value is Size;
/**
 * ボタン共通ベースクラス。mi-neutral-button / mi-danger-button / mi-ai-button / mi-icon-button が継承する。
 * @internal
 * @typeParam S - size プロパティの型。サブクラスが独自のサイズ体系を持つ場合にオーバーライドする。
 */
export declare class ButtonBase<S extends string = Size> extends LitElement {
    #private;
    static styles: import('lit').CSSResult[];
    static formAssociated: boolean;
    /** 継承クラスでオーバーライド可能。テーマ（normal / danger / ai） */
    protected getTheme(): ButtonTheme;
    loading: boolean;
    disabled: boolean;
    /**
     * 選択状態。`toggle=true` と併用するとスクリーンリーダーに状態が伝わる。
     * `toggle=false` のまま `selected=true` にすると視覚的な選択スタイルは適用されるが、
     * スクリーンリーダーには伝わらない。ナビゲーションの active 状態など意味的マーキングが
     * 別途必要な場合は `aria-current` などを合わせて使用すること。
     */
    selected: boolean;
    /**
     * true のときトグルボタンとして振る舞い、aria-pressed 属性を "true"/"false" で出力する。
     * false（デフォルト）のときは通常ボタンとして扱われ、aria-pressed は付与されない。
     * トグルボタンとして使う場合は `selected` と必ず併用すること。
     */
    toggle: boolean;
    variant: Variant;
    size: S;
    name: string;
    value: string;
    type: "button" | "submit" | "reset";
    iconType: string;
    lightdom: boolean;
    private _content;
    constructor();
    /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
    protected getEffectiveVariant(): Variant;
    private isLightDom;
    createRenderRoot(): HTMLElement | DocumentFragment;
    connectedCallback(): void;
    protected get buttonClasses(): string;
    protected get isDisabled(): boolean;
    protected get loadingSize(): string;
    protected renderLoading(): TemplateResult<1>;
    protected get showIcon(): boolean | "";
    protected renderIcon(): TemplateResult<1>;
    /** スロットのレンダリング。テキストを持たないボタン（mi-icon-button）はオーバーライドして nothing を返す。 */
    protected renderSlot(): Node[] | TemplateResult | typeof nothing;
    render(): TemplateResult<1>;
    protected handleClick(event: Event): void;
}
//# sourceMappingURL=base.d.ts.map