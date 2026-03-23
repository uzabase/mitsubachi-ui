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
 *
 * @fires open-change - 開閉状態が変わったとき（detail: { open: boolean }）
 * @fires cancel - キャンセルボタンがクリックされたとき
 * @fires action - アクションボタンがクリックされたとき
 */
export declare class MiFormDialog extends DialogBase {
    /** ダイアログのサイズ（Desktop 時） */
    size: FormDialogSize;
    protected get dialogSize(): DialogSize;
    protected get variant(): DialogVariant;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-form-dialog": MiFormDialog;
    }
}
//# sourceMappingURL=mi-form-dialog.d.ts.map