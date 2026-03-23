import { DialogSize, DialogVariant, DialogBase } from './base';
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
 * @fires open-change - 開閉状態が変わったとき（detail: { open: boolean }）
 * @fires cancel - キャンセルボタンがクリックされたとき
 * @fires action - アクションボタンがクリックされたとき
 */
export declare class MiActionDialog extends DialogBase {
    protected get dialogSize(): DialogSize;
    protected get variant(): DialogVariant;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-action-dialog": MiActionDialog;
    }
}
//# sourceMappingURL=mi-action-dialog.d.ts.map