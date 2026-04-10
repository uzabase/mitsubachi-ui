import { DialogSize, DialogVariant, DialogBase } from './base';
export declare const formDialogSizes: readonly ["small", "medium", "large"];
export type FormDialogSize = (typeof formDialogSizes)[number];
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
declare global {
    interface HTMLElementTagNameMap {
        "mi-form-dialog": MiFormDialog;
    }
}
//# sourceMappingURL=mi-form-dialog.d.ts.map