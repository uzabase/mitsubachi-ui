import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { nothing } from 'lit';
import { PropertyValues } from '@lit/reactive-element';
import { TemplateResult } from 'lit-html';
import { TemplateResult as TemplateResult_2 } from 'lit';

declare type AiVariant = (typeof aiVariants)[number];

declare const aiVariants: readonly ["primary", "secondary"];

declare type AvatarColor = (typeof colors)[number];

declare type AvatarSize = (typeof size)[number];

/**
 * ボタン共通ベースクラス。mi-neutral-button / mi-danger-button / mi-ai-button / mi-icon-button が継承する。
 * @typeParam S - size プロパティの型。サブクラスが独自のサイズ体系を持つ場合にオーバーライドする。
 *
 * internalとstripInternalを併用すると、npm run buildの実行中に@microsoft/api-extractorが内部エラーになりました。
 * stripInternalを使わずにinternalを指定するとButtonBaseがindex.d.tsに出力されなくなり、index.d.tsでコンパイルエラーになります。
 */
declare class ButtonBase<S extends string = Size> extends LitElement {
    #private;
    static styles: CSSResult[];
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
    /**
     * 所属する `<form>` の id（`form` 属性）。省略時は祖先の form にのみ所属。
     * シャドウ外のフォームと紐付ける場合に指定する。
     */
    form: string;
    /**
     * 設定するとボタンがリンク (`<a>`) としてレンダリングされる。
     * `disabled` / `loading` 時はリンクとして機能しない（`aria-disabled` で表現）。
     */
    href: string;
    /** `href` 指定時のリンクターゲット。`href` がない場合は無視される。 */
    target: string;
    /** `href` 指定時の rel 属性。`target="_blank"` のとき自動で `"noopener noreferrer"` が付与される。 */
    rel: string;
    iconType: string;
    constructor();
    /** 継承クラスでオーバーライド可能（例: 非推奨の variants 属性の反映） */
    protected getEffectiveVariant(): Variant;
    protected get buttonClasses(): string;
    protected get isLink(): boolean;
    protected get isDisabled(): boolean;
    protected get loadingSize(): string;
    protected renderLoading(): TemplateResult_2<1>;
    protected get showIcon(): boolean | "";
    protected renderIcon(): TemplateResult_2<1>;
    /** スロットのレンダリング。テキストを持たないボタン（mi-icon-button）はオーバーライドして nothing を返す。 */
    protected renderSlot(): TemplateResult_2 | typeof nothing;
    protected get effectiveRel(): string;
    protected renderContent(): TemplateResult_2<1>;
    render(): TemplateResult_2<1>;
    protected handleClick(event: Event): void;
    protected handleLinkClick(event: MouseEvent): void;
}

declare type ButtonTheme = "normal" | "danger" | "ai";

declare const colors: readonly ["plum", "violet", "blue", "viridian", "green", "brown", "red"];

declare type DangerVariant = (typeof dangerVariants)[number];

declare const dangerVariants: readonly ["primary", "secondary", "ghost"];

/**
 * モーダルダイアログの共通ベースクラス。
 * mi-action-dialog / mi-form-dialog / mi-information-dialog が継承する。
 *
 * イベント:
 * - **close**: ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。
 */
declare abstract class DialogBase extends LitElement {
    static styles: CSSResult[];
    /** 開閉状態 */
    open: boolean;
    /** ヘッダーに表示するタイトルテキスト */
    headerText: string;
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel: string;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** 破壊的アクション（削除等）の場合は true。アクションボタンに mi-danger-button を使用 */
    danger: boolean;
    /**
     * slot 内 `<form id="...">` の id。フッターのアクションボタンに `form` 属性として渡す。
     * mi-form-dialog で `actionButtonType` と組み合わせて Enter 送信を opt-in する。
     */
    formId: string;
    private _bodyEl;
    private _isScrolledFromTop;
    private _isScrolledFromBottom;
    private _resizeObserver?;
    /** フッターのキャンセル／アクションで閉じた直後の close では open-change を出さない */
    private _closingFromFooterButton;
    /** 継承クラスでオーバーライド: ダイアログのサイズ */
    protected abstract get dialogSize(): DialogSize;
    /** 継承クラスでオーバーライド: ダイアログのバリアント（phone 時のスタイル用） */
    protected abstract get variant(): DialogVariant;
    protected get sizeClass(): string;
    /** フッターアクションボタンの `type`。mi-form-dialog は `form-id` 指定時に `submit` を返す。 */
    protected get actionButtonType(): "button" | "submit";
    private _boundCheckScroll;
    disconnectedCallback(): void;
    updated(changed: Map<PropertyKey, unknown>): void;
    private _checkScroll;
    private _handleOpenChange;
    private _handleClose;
    private _nativeDialog;
    private _handleCancelClick;
    private _handleActionClick;
    render(): typeof nothing | TemplateResult<1>;
}

declare type DialogSize = "small" | "medium" | "large";

declare type DialogVariant = "action" | "information" | "form";

export declare type FormDialogSize = (typeof formDialogSizes)[number];

export declare const formDialogSizes: readonly ["small", "medium", "large"];

declare type IconButtonSize = (typeof iconButtonSizes)[number];

export declare const iconButtonSizes: readonly ["small", "medium", "large"];

declare type IconButtonVariant = (typeof iconButtonVariants)[number];

export declare const iconButtonVariants: readonly ["primary", "secondary", "tertiary", "ghost"];

export declare type InformationDialogSize = (typeof informationDialogSizes)[number];

export declare const informationDialogSizes: readonly ["small", "medium"];

/**
 * Action Dialog
 *
 * 確認や削除など、ユーザーの意思決定を求めるダイアログ。
 * Desktop: size=small、Phone: 横に余白を持ち、高さは広がらない。
 *
 * @slot - ダイアログ本文のコンテンツ
 *
 * @attr {boolean} open - 開閉状態
 * @attr {string} header-text - ヘッダーに表示するタイトルテキスト
 * @attr {string} cancel-label - キャンセル・閉じるボタンのラベル（省略時は非表示）
 * @attr {string} action-label - アクションボタンのラベル
 * @attr {boolean} danger - 破壊的アクション（削除等）の場合は true。アクションボタンに mi-danger-button を使用
 *
 * @fires close - ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。
 */
export declare class MiActionDialog extends DialogBase {
    protected get dialogSize(): DialogSize;
    protected get variant(): DialogVariant;
}

/**
 * @summary AIボタンです。AI機能の起動などに使用します。
 * アイコンは常に magic-fill が表示されます。icon-type 属性は無効です。
 *
 * @slot - ボタンのテキスト
 */
export declare class MiAiButton extends ButtonBase {
    variant: AiVariant;
    /**
     * icon-type 属性は mi-ai-button では無効です。アイコンは常に magic-fill が使用されます。
     * @deprecated 設定しても効果はありません。
     */
    iconType: string;
    protected getTheme(): ButtonTheme;
    protected get showIcon(): boolean;
    protected renderIcon(): TemplateResult<1>;
    protected renderLoading(): TemplateResult<1>;
}

/**
 * @summary アバターです。
 */
export declare class MiAvatar extends LitElement {
    #private;
    static styles: CSSResult[];
    src: string;
    alt: string;
    initials: string;
    size: AvatarSize;
    color: AvatarColor | "";
    inactive: boolean;
    render(): TemplateResult<1>;
}

/** @deprecated 代わりに MiNeutralButton を使用してください。後方互換のため別クラスとして登録しています。 */
export declare class MiButton extends MiNeutralButton {
}

/**
 * @summary チェックボックスです。
 */
export declare class MiCheckbox extends LitElement {
    static styles: CSSResult[];
    static formAssociated: boolean;
    value: string;
    name: string;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    private handleChange;
    render(): TemplateResult<1>;
}

/**
 * @summary テキスト付きチェックボックスです。
 */
export declare class MiCheckboxText extends LitElement {
    static styles: CSSResult[];
    static formAssociated: boolean;
    value: string;
    name: string;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    text: string;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    private handleChange;
    render(): TemplateResult<1>;
}

/**
 * @summary ドロップダウンメニューのコンポーネントです。<mi-control-menu><mi-control-menu-item><mi-control-menu-item></mi-control-menu>のように使います。
 *
 * @slot - メニュー項目（mi-control-menu-item）
 */
export declare class MiControlMenu extends LitElement {
    static styles: CSSResult[];
    render(): TemplateResult<1>;
}

/**
 * @summary メニューの項目を表すコンポーネントです。
 *
 * @attr {text} text - 項目のテキスト
 *
 * @attr {boolean} selected - 項目が選択されていることを示します。属性があるときはチェックマークが表示されます。
 *
 * @attr {boolean} disabled - 項目が無効であることを示します。属性があれば、灰色で項目が表示されます。
 */
export declare class MiControlMenuItem extends LitElement {
    static styles: CSSResult[];
    text: string;
    selected: boolean;
    disabled: boolean;
    render(): TemplateResult<1>;
}

/**
 * @summary Dangerボタンです。削除・破壊的操作などに使用します。
 *
 * @slot - ボタンのテキスト
 */
export declare class MiDangerButton extends ButtonBase {
    variant: DangerVariant;
    protected getTheme(): ButtonTheme;
}

export declare class MiFloatingButton extends LitElement {
    static styles: CSSResult[];
    loading: boolean;
    render(): TemplateResult<1>;
}

/**
 * Form Dialog
 *
 * フォーム入力を行うダイアログ。
 * Desktop: size=small(560px) / medium(800px) / large(1280px)。
 * Phone: 横余白なし・画面端まで、高さも広がる（フルスクリーン）。
 *
 * @slot - ダイアログ本文のコンテンツ（フォーム等）
 *
 * @attr {boolean} open - 開閉状態
 * @attr {string} size - ダイアログのサイズ（small | medium | large）
 * @attr {string} header-text - ヘッダーに表示するタイトルテキスト
 * @attr {string} cancel-label - キャンセル・閉じるボタンのラベル（省略時は非表示）
 * @attr {string} action-label - アクションボタンのラベル
 * @attr {string} form-id - Enter キーで送信を有効にしたいとき、slot 内の form 要素の id を指定する（省略時は Enter 送信なし）
 *
 * @fires close - ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。`form-id` 指定時はフォームのバリデーションが失敗すると閉じない（`close` も発火しない）。
 */
export declare class MiFormDialog extends DialogBase {
    /** ダイアログのサイズ（Desktop 時） */
    size: FormDialogSize;
    protected get dialogSize(): DialogSize;
    protected get variant(): DialogVariant;
    protected get actionButtonType(): "button" | "submit";
}

/**
 * アイコンです。
 *
 * @summary アイコンです。
 *
 * @attr {string} type - iconの画像を定義します。error-fillは赤いバツ印。information-circleは逆向きの!マーク。personは肩より上の人のアイコンです。checkCircleは白い丸の中にチェックマークがあります。  chevronDownとchevronDownSmallは下向きの矢印です。globeは地球儀のアイコンです。
 */
export declare class MiIcon extends LitElement {
    static styles: CSSResult[];
    type: string;
    render(): TemplateResult<1>;
}

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
    static styles: CSSResult[];
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
    render(): TemplateResult<1>;
}

/**
 * カラーアイコンです。
 *
 * @summary カラーアイコンです。
 *
 * @attr {string} type - カラーアイコンの画像を定義します。
 */
export declare class MiIconColor extends LitElement {
    static styles: CSSResult[];
    type: string;
    render(): TemplateResult<1>;
}

/**
 * Information Dialog
 *
 * 利用規約など、重要な情報を表示するダイアログ。
 * Desktop: size=small / medium。Phone: small は横余白ありのモーダル、medium はフルスクリーン。
 *
 * @slot - ダイアログ本文のコンテンツ
 *
 * @attr {boolean} open - 開閉状態
 * @attr {string} size - ダイアログのサイズ（small | medium）
 * @attr {string} header-text - ヘッダーに表示するタイトルテキスト
 * @attr {string} action-label - 閉じるボタンのラベル
 *
 * @fires close - ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。
 */
export declare class MiInformationDialog extends DialogBase {
    /** ダイアログのサイズ（Desktop 時） */
    size: InformationDialogSize;
    protected get dialogSize(): InformationDialogSize;
    protected get variant(): DialogVariant;
}

/**
 * @slot - 通知メッセージのコンテンツ
 */
export declare class MiInlineNotification extends LitElement {
    type: Type;
    static styles: CSSResult[];
    render(): TemplateResult<1>;
}

/**
 * ラベルです。
 *
 * @summary ラベルです。テキストフィールド上に置き、テキストフィールドを説明するために使います。
 *
 * @attr {string} text - ラベルのテキストです。文字の色は黒です。
 *
 * @attr {string} support-text - ラベルの下に灰色で表示されるテキストです。textを補足します。
 */
export declare class MiLabelUnit extends LitElement {
    #private;
    static styles: CSSResult[];
    text: string;
    supportText: string;
    /**
     * テキストもサポートテキストも空のとき、かつそのときに限り、真を返す。
     */
    isEmpty(): boolean;
    render(): TemplateResult<1>;
}

/**
 * @summary ローディングスピナーです。
 */
export declare class MiLoading extends LitElement {
    static styles: CSSResult[];
    ai: boolean;
    size: Size_2;
    private get loadingClasses();
    render(): TemplateResult<1>;
}

/**
 * @deprecated 代わりに MiSpeedaLogo または MiUzabaseLogo を使用してください
 *
 * @summary スピーダのロゴです。
 *
 * @attr {string} brand - uzabaseであれば、Uzabaseのロゴを表示します。speedaのときは、スピーダのロゴを表示します。
 *
 * @attr {string} language - スピーダのロゴ内の文字の言語を指定します。brand属性がspeedaのときのみ有効です。language=jaであれば日本語, language=enであれば英語, zhであれば簡体字です。
 */
export declare class MiLogo extends LitElement {
    #private;
    static styles: CSSResult[];
    language: string;
    brand: string;
    label: string;
    updated(): void;
    render(): typeof nothing | TemplateResult<1>;
}

/**
 * @summary ノーマル（ニュートラル）ボタンです。
 *
 * @slot - ボタンのテキスト
 */
export declare class MiNeutralButton extends ButtonBase {
    /**
     * Danger スタイルで表示するかどうか。
     * @deprecated この属性は非推奨です。Danger ボタンには `mi-danger-button` の利用を推奨します。
     */
    danger: boolean;
    /**
     * @deprecated このプロパティは非推奨です。代わりに `variant` を使用してください。
     */
    variants: Variant | null;
    variant: Variant;
    protected getTheme(): ButtonTheme;
    protected getEffectiveVariant(): Variant;
}

/**
 * @slot - ラジオボタンのラベルテキスト
 */
export declare class MiRadioButtonText extends LitElement {
    #private;
    static styles: CSSResult[];
    value: string;
    name: string;
    checked: boolean;
    disabled: boolean;
    static formAssociated: boolean;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    formResetCallback(): void;
    render(): TemplateResult<1>;
}

/**
 * @summary ユーザーが必要な情報を素早く見つけるための入力コンポーネントです。
 * キーワードの入力に応じて、候補表示や検索実行を行い、コンテンツ探索の効率を高めます。
 *
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 *
 * @attr {string} variant - 見た目のバリアント（`primary` | `secondary`）。デフォルトは `primary`。
 * @attr {string} value - 入力値の文字列。
 * @attr {string} placeholder - プレースホルダー。
 * @attr {string} name - フォームの name。
 * @attr {string} label - 内部の input に設定する aria-label。
 * @attr {boolean} disabled - 無効化するかどうか。
 * @attr {string} autocomplete - autocomplete 属性。
 * @attr {boolean} autofocus - 自動フォーカスするかどうか。
 * @fires input - 内部の `input` と同様。シャドウ内で `composed` が付かない場合、ホストで再発火します。
 * @fires change - 内部の `change`（値の確定、主にフォーカスが外れたとき）と同様。シャドウを越えて受け取れるよう必要時に再発火します。
 */
export declare class MiSearchBox extends LitElement {
    #private;
    static styles: CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry | null;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    static formAssociated: boolean;
    variant: SearchBoxVariant;
    value: string;
    placeholder: string;
    name: string;
    /** 内部の `input` に設定する aria-label。 */
    label: string;
    disabled: boolean;
    autocomplete: AutoFill;
    autofocus: boolean;
    private inputEl;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    render(): TemplateResult<1>;
}

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
    static styles: CSSResult[];
    /** セグメントの値（mi-segmented-control の選択制御に使用） */
    value: string;
    /** セグメントの表示バリアント */
    variant: SegmentVariant;
    /** 無効化状態 */
    disabled: boolean;
    /** 選択状態（mi-segmented-control から制御される） */
    selected: boolean;
    render(): TemplateResult<1>;
}

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
    static styles: CSSResult[];
    /** 現在選択されているセグメントの値 */
    value: string;
    /** 無効化状態（全セグメントを無効化） */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changedProperties: Map<string, unknown>): void;
    protected firstUpdated(): void;
    render(): TemplateResult<1>;
}

/**
 * ユーザー操作に対する成功時の短いフィードバックを表示するオーバーレイ通知です。
 * 失敗・警告・エラーは `mi-inline-notification` 等で伝えてください。
 *
 * @summary 成功フィードバック用の Snackbar
 *
 * @slot - メッセージ本文（`text` のような属性ではなく、子要素／スロットで渡します）
 *
 * @cssprop --surface-success - 背景色
 * @cssprop --text-regular-default - テキスト色
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度の大きい値）
 * @cssprop --snackbar-transition-duration - 入退出アニメーションの時間（デフォルト 200ms）
 *
 * ## 配置について
 *
 * `mi-snackbar` 自体は画面端に固定するスタイルを内包していません（配置はマウント先のレイアウトに従います）。
 * デザインどおり「デスクトップでは右上・狭い画面では下中央」に重ね表示したい場合は、
 * `mi-snackbar-viewport` を 1 つ置き、その子としてポータルしてください（複数同時表示は縦方向に gap でずれて並びます）。
 *
 * 自前のコンテナを使う場合は `document.body` 直下など、ビューポート基準で `position: fixed` できる要素にしてください。
 * 祖先要素の `transform` などによっては `fixed` の基準がずれ、意図しない位置に見えることがあります。
 *
 * ### なぜ viewport ラッパーを組み込まないか
 *
 * - **責務の分離**: 通知の見た目・閉じる挙動・アニメに責務を絞り、画面端への固定やポータル先はアプリのレイアウトやフレームワークに合わせて載せ替えやすくしています。
 * - **利用側の差**: SSR・複数同時表示・既存の Toast 基盤・z-index の都合などで最適なマウント方法が異なり、単一のポータル方針をライブラリに押し付けにくいためです。
 * - **既存設計との整合**: React 版でも Snackbar 本体と viewport／Provider 側を分ける想定に揃えています。
 *
 * @example
 * ```html
 * <mi-snackbar size="small">保存しました</mi-snackbar>
 * <mi-snackbar size="medium">処理が完了しました。詳細は一覧をご確認ください。</mi-snackbar>
 * <!-- 自動で閉じない（テストや常時表示用） -->
 * <mi-snackbar auto-hide-timeout="0">メッセージ</mi-snackbar>
 * ```
 */
export declare class MiSnackbar extends LitElement {
    static styles: CSSResult[];
    /**
     * 表示サイズ。`small` / `medium` とも最大幅 400px（`inline-size` は内容に応じ可変）。いずれも最大3行まで。
     * @default 'small'
     */
    size: SnackbarSize;
    /**
     * 表示してから自動的に閉じるまでの時間（ミリ秒）。React 版 `Snackbar.Provider` の `timeout` に相当。
     * `0` 以下のときは自動非表示しません。
     * @default 5000
     */
    autoHideTimeout: number;
    /** 入場アニメーション用（初回は React 版 data-starting-style に相当） */
    private entering;
    /** 退場アニメーション用（React 版 data-ending-style に相当） */
    private exiting;
    private exitRemoved;
    /** 退出時に opacity / transform の transitionend を両方待つ（片方だけだとカクつきやすい） */
    private readonly exitTransitionSeen;
    private exitFallbackTimer;
    private autoHideTimerId;
    private clearAutoHideTimer;
    private scheduleAutoHide;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    protected firstUpdated(): void;
    private removeSelf;
    private beginClose;
    private handleRootTransitionEnd;
    private handleClose;
    /**
     * 閉じるボタンと同じ退出アニメーションを開始する（プログラムからの取下げ・キュー上限など）。
     * 既に退出中のときは `false` を返す。
     */
    dismiss(): boolean;
    render(): TemplateResult<1>;
}

/**
 * 複数の `mi-snackbar` を **同じ画面上の位置** に縦に積み重ねて表示するためのコンテナです。
 * アプリのルート付近に **1 つだけ** 置き、その子として `mi-snackbar` をマウント（ポータル）してください。
 *
 * @summary Snackbar 用の固定 viewport（複数件は縦にずれて表示）
 *
 * @slot - `mi-snackbar` 要素（および必要なら `class="snackbar-mount"` のラッパー）
 *
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度）
 * @cssprop --snackbar-stack-gap - 縦積み時の間隔（デフォルト 16px）
 * @cssprop --snackbar-viewport-inset - 画面上端・右端からの余白（デフォルト 16px。`inset-block-start` / `inset-inline-end` に共通）
 */
export declare class MiSnackbarViewport extends LitElement {
    static styles: CSSResult[];
    render(): TemplateResult<1>;
}

/**
 * @summary Speedaのロゴです。
 *
 * @attr {string} sub-brand - ロゴの種類。ai-agent, expert-research（未指定で標準のSpeedaロゴ）
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 * @attr {boolean} no-symbol - シンボルを非表示にする
 * @attr {string} logo-language - ロゴの言語。en, zh
 */
export declare class MiSpeedaLogo extends LitElement {
    #private;
    static styles: CSSResult[];
    subBrand: "ai-agent" | "expert-research" | null;
    inverse: boolean;
    noSymbol: boolean;
    logoLanguage: "en" | "zh";
    label: string;
    updated(): void;
    render(): typeof nothing | TemplateResult<1>;
}

/**
 * @summary テキストフィールドです。
 */
export declare class MiTextField extends LitElement {
    #private;
    static styles: CSSResult[];
    static formAssociated: boolean;
    error: string;
    placeholder: string;
    autocomplete: AutoFill;
    disabled: boolean;
    name: string;
    value: string;
    type: string;
    autofocus: boolean;
    submitOnEnter: boolean;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    render(): TemplateResult<1>;
}

/**
 * @summary テキストフィールドのエラーテキストコンポーネントです。
 */
export declare class MiTextFieldErrorText extends LitElement {
    #private;
    static styles: CSSResult[];
    text: string;
    render(): TemplateResult<1>;
}

/**
 * @summary inputタグに相当するテキストフィールドです。テキストフィールドを説明するラベルがあります。
 *
 * @attr {string} text - テキストフィールドを説明するテキストです。テキストフィールドの上に表示されます。
 *
 * @attr {string} support-text - テキストフィールドを補足するテキストです。textで指定したテキストの下、テキストフィールドの上に表示されます。
 */
export declare class MiTextFieldUnit extends LitElement {
    #private;
    static styles: CSSResult[];
    static formAssociated: boolean;
    text: string;
    error: string;
    placeholder: string;
    supportText: string;
    disabled: boolean;
    name: string;
    value: string;
    type: string;
    autocomplete: AutoFill;
    autofocus: boolean;
    submitOnEnter: boolean;
    private internals;
    constructor();
    protected updated(changedProperties: Map<string, unknown>): void;
    render(): TemplateResult<1>;
}

/**
 * @summary ツールチップコンポーネントです。アイコンやボタンなどにホバー・フォーカスすることで補足情報を表示します。
 *
 * @slot - ツールチップのトリガーとなる要素
 */
export declare class MiTooltip extends LitElement {
    static styles: CSSResult[];
    private static _idCounter;
    text: string;
    placement: Placement;
    private _open;
    private _tooltipEl;
    private _cleanup?;
    private _hideTimer?;
    private _pointerActive;
    private _descId;
    private _descEl?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<PropertyKey, unknown>): void;
    private _onSlotChange;
    private _handleMouseEnter;
    private _onPointerDown;
    private _handleFocusin;
    private _handleKeyDown;
    private _show;
    private _scheduleHide;
    private _updatePosition;
    render(): TemplateResult<1>;
}

/**
 * @summary Uzabaseのロゴです。
 *
 * @attr {boolean} inverse - 反転表示（暗い背景用）
 */
export declare class MiUzabaseLogo extends LitElement {
    #private;
    static styles: CSSResult[];
    inverse: boolean;
    label: string;
    updated(): void;
    render(): typeof nothing | TemplateResult<1>;
}

declare type Placement = (typeof placements)[number];

declare const placements: readonly ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"];

declare type SearchBoxVariant = "primary" | "secondary";

export declare type SegmentVariant = (typeof segmentVariants)[number];

export declare const segmentVariants: readonly ["text", "icon"];

declare type Size = (typeof sizes)[number];

declare const size: readonly ["small", "medium", "large", "x-large", "2x-large"];

declare type Size_2 = (typeof size_2)[number];

declare const size_2: readonly ["medium", "large", "xLarge", "2xLarge", "3xLarge", "4xLarge"];

declare const sizes: readonly ["medium", "large", "xLarge"];

export declare type SnackbarSize = (typeof snackbarSizes)[number];

export declare const snackbarSizes: readonly ["small", "medium"];

/** @deprecated 代わりに MiAvatar を使用してください */
export declare class SpAvatar extends MiAvatar {
}

/** @deprecated 代わりに MiNeutralButton を使用してください */
export declare class SpButton extends MiButton {
}

/** @deprecated 代わりに MiCheckbox を使用してください */
export declare class SpCheckbox extends MiCheckbox {
}

/** @deprecated 代わりに MiCheckboxText を使用してください */
export declare class SpCheckboxText extends MiCheckboxText {
}

/** @deprecated 代わりに MiControlMenu を使用してください */
export declare class SpControlMenu extends MiControlMenu {
}

/** @deprecated 代わりに MiControlMenuItem を使用してください */
export declare class SpControlMenuItem extends MiControlMenuItem {
}

/** @deprecated 代わりに MiFloatingButton を使用してください */
export declare class SpFloatingButton extends MiFloatingButton {
}

/** @deprecated 代わりに MiIcon を使用してください */
export declare class SpIcon extends MiIcon {
}

/** @deprecated 代わりに MiLabelUnit を使用してください */
export declare class SpLabelUnit extends MiLabelUnit {
}

/** @deprecated 代わりに MiLoading を使用してください */
export declare class SpLoading extends MiLoading {
}

/** @deprecated 代わりに MiSpeedaLogo または MiUzabaseLogo を使用してください */
export declare class SpLogo extends MiLogo {
}

/** @deprecated 代わりに MiRadioButtonText を使用してください */
export declare class SpRadioButtonText extends MiRadioButtonText {
}

/** @deprecated 代わりに MiSearchBox を使用してください */
export declare class SpSearchBox extends MiSearchBox {
}

/** @deprecated 代わりに MiTextField を使用してください */
export declare class SpTextField extends MiTextField {
}

/** @deprecated 代わりに MiTextFieldErrorText を使用してください */
export declare class SpTextFieldErrorText extends MiTextFieldErrorText {
}

/** @deprecated 代わりに MiTextFieldUnit を使用してください */
export declare class SpTextFieldUnit extends MiTextFieldUnit {
}

declare type Type = (typeof types)[number];

declare const types: readonly ["information", "success", "warning", "error"];

declare type Variant = (typeof variants)[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "ghost", "plane"];

export { }


declare global {
    interface HTMLElementTagNameMap {
        "mi-label-unit": MiLabelUnit;
        "sp-label-unit": SpLabelUnit;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-checkbox-text": MiCheckboxText;
        "sp-checkbox-text": SpCheckboxText;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-floating-button": MiFloatingButton;
        "sp-floating-button": SpFloatingButton;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-icon": MiIcon;
        "sp-icon": SpIcon;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-icon-color": MiIconColor;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-danger-button": MiDangerButton;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-avatar": MiAvatar;
        "sp-avatar": SpAvatar;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-ai-button": MiAiButton;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-segment": MiSegment;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-tooltip": MiTooltip;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-loading": MiLoading;
        "sp-loading": SpLoading;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-control-menu": MiControlMenu;
        "sp-control-menu": SpControlMenu;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-control-menu-item": MiControlMenuItem;
        "sp-control-menu-item": SpControlMenuItem;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-radio-button-text": MiRadioButtonText;
        "sp-radio-button-text": SpRadioButtonText;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-icon-button": MiIconButton;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-search-box": MiSearchBox;
        "sp-search-box": SpSearchBox;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-neutral-button": MiNeutralButton;
        "mi-button": MiButton;
        "sp-button": SpButton;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-snackbar-viewport": MiSnackbarViewport;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-segmented-control": MiSegmentedControl;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-snackbar": MiSnackbar;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-text-field-error-text": MiTextFieldErrorText;
        "sp-text-field-error-text": SpTextFieldErrorText;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-text-field": MiTextField;
        "sp-text-field": SpTextField;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-text-field-unit": MiTextFieldUnit;
        "sp-text-field-unit": SpTextFieldUnit;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-checkbox": MiCheckbox;
        "sp-checkbox": SpCheckbox;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-information-dialog": MiInformationDialog;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-form-dialog": MiFormDialog;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-action-dialog": MiActionDialog;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-logo": MiLogo;
        "sp-logo": SpLogo;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-speeda-logo": MiSpeedaLogo;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "mi-uzabase-logo": MiUzabaseLogo;
    }
}
