import { DialogVariant, DialogBase } from './base';
export declare const informationDialogSizes: readonly ["small", "medium"];
export type InformationDialogSize = (typeof informationDialogSizes)[number];
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
declare global {
    interface HTMLElementTagNameMap {
        "mi-information-dialog": MiInformationDialog;
    }
}
//# sourceMappingURL=mi-information-dialog.d.ts.map