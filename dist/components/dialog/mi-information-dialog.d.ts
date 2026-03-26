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
 * @remarks `mi-cancel` イベントは本コンポーネントの公開属性に `cancel-label` がなく、想定利用ではキャンセルボタンが表示されないため、通常は発火しない。
 *
 * @fires open-change - ネイティブ `<dialog>` の `close` が走り、かつフッターの閉じる（action）ボタン由来でないとき。bubbles / composed は true。detail は `{ open: false, reason: "escape" | null }`。`reason` はユーザーが Esc で閉じたときのみ `"escape"`（信頼できるネイティブ `cancel` の直後の close）。ホストが `open` を false にしたとき・スクリプトで `dialog.close()` したときなどは `null`。オーバーレイ領域のクリックでは閉じない（背景クリックで閉じる経路はない）。
 * @fires action - 閉じる（primary）ボタンがクリックされたとき。cancelable。`preventDefault()` すると閉じない（そのとき `open-change` も発火しない）。阻止されず閉じた場合も `open-change` は発火しない。
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