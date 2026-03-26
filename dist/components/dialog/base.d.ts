import { LitElement, nothing } from 'lit';
export type DialogSize = "small" | "medium" | "large";
export type DialogVariant = "action" | "information" | "form";
/** フッター以外で閉じたときの `open-change` の detail（`open` は常に false） */
export type DialogOpenChangeDetail = {
    open: false;
    /** Esc で閉じたとき `"escape"`。ホストが `open` を false にした場合・`dialog.close()` などでは `null`（オーバーレイクリックでは閉じない） */
    reason: "escape" | null;
};
/**
 * モーダルダイアログの共通ベースクラス。
 * mi-action-dialog / mi-form-dialog / mi-information-dialog が継承する。
 *
 * カスタムイベント（各具象要素の `@fires` と一致）:
 * - **open-change**: ネイティブ `<dialog>` の `close` かつフッターボタン由来でないとき（Esc・ホストの `open=false`・`dialog.close()` 等。オーバーレイクリックでは閉じない）。bubbles / composed。detail `{ open: false, reason: "escape" | null }`（Esc のみ `reason` が `"escape"`）。
 * - **mi-cancel**: キャンセル（ghost）クリック時。非 cancelable。`open-change` は出さない。
 * - **action**: アクション（primary/danger）クリック時。cancelable。`preventDefault()` で閉じ中止。閉じた場合も `open-change` は出さない。
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
    /**
     * ネイティブ `cancel`（Esc）のあと続く `close` で `open-change` の reason を付ける。
     * 合成イベントは無視（`close()` 経由の誤検知を避ける）。
     */
    private _closeSource;
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
    private _handleNativeDialogCancel;
    private _handleClose;
    private _nativeDialog;
    private _handleCancelClick;
    private _handleActionClick;
    render(): typeof nothing | import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=base.d.ts.map