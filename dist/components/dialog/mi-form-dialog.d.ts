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
 * @fires open-change - ネイティブ `<dialog>` の `close` が走り、かつフッターのキャンセル／アクションボタン由来でないとき。bubbles / composed は true。detail は `{ open: false, reason: "escape" | null }`。`reason` はユーザーが Esc で閉じたときのみ `"escape"`（信頼できるネイティブ `cancel` の直後の close）。ホストが `open` を false にしたとき・スクリプトで `dialog.close()` したときなどは `null`。オーバーレイ領域のクリックでは閉じない（背景クリックで閉じる経路はない）。
 * @fires mi-cancel - `cancel-label` があるときにキャンセル（ghost）ボタンがクリックされたとき。cancelable ではない。閉じたあと発火。このとき `open-change` は発火しない。
 * @fires action - アクション（primary）ボタンがクリックされたとき。cancelable。バリデーション失敗時などは `preventDefault()` で閉じない（そのとき `open-change` も発火しない）。阻止されず閉じた場合も `open-change` は発火しない。
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