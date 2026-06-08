import { LitElement, nothing } from 'lit';
export type DialogSize = "small" | "medium" | "large";
export type DialogVariant = "action" | "information" | "form";
/**
 * モーダルダイアログの共通ベースクラス。
 * mi-action-dialog / mi-form-dialog / mi-information-dialog が継承する。
 *
 * イベント:
 * - **close**: ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。
 */
export declare abstract class DialogBase extends LitElement {
    static styles: import('lit').CSSResult[];
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
    render(): typeof nothing | import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=base.d.ts.map