import { LitElement, nothing } from 'lit';
export type DialogSize = "small" | "medium" | "large";
export type DialogVariant = "action" | "information" | "form";
/**
 * モーダルダイアログの共通ベースクラス。
 * mi-action-dialog / mi-form-dialog / mi-information-dialog が継承する。
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
    private _dialogEl;
    private _bodyEl;
    private _isScrolledFromTop;
    private _isScrolledFromBottom;
    private _resizeObserver?;
    /** 継承クラスでオーバーライド: ダイアログのサイズ */
    protected abstract get dialogSize(): DialogSize;
    /** 継承クラスでオーバーライド: ダイアログのバリアント（phone 時のスタイル用） */
    protected abstract get variant(): DialogVariant;
    protected get sizeClass(): string;
    private _boundCheckScroll;
    disconnectedCallback(): void;
    updated(changed: Map<PropertyKey, unknown>): void;
    private _checkScroll;
    private _handleOpenChange;
    private _handleClose;
    private _handleCancelClick;
    private _handleActionClick;
    render(): typeof nothing | import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=base.d.ts.map