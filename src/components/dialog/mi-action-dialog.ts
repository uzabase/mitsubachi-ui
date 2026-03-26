import type { DialogSize, DialogVariant } from "./base";
import { DialogBase } from "./base";

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
 * @fires open-change - ネイティブ `<dialog>` の `close` が走り、かつフッターのキャンセル／アクションボタン由来でないとき。bubbles / composed は true。detail は `{ open: false, reason: "escape" | null }`。`reason` はユーザーが Esc で閉じたときのみ `"escape"`（信頼できるネイティブ `cancel` の直後の close）。ホストが `open` を false にしたとき・スクリプトで `dialog.close()` したときなどは `null`。オーバーレイ領域のクリックでは閉じない（背景クリックで閉じる経路はない）。
 * @fires mi-cancel - `cancel-label` があるときにキャンセル（ghost）ボタンがクリックされたとき。cancelable ではない。閉じたあと発火。このとき `open-change` は発火しない。
 * @fires action - アクション（primary / danger）ボタンがクリックされたとき。cancelable。`preventDefault()` すると閉じない（そのとき `open-change` も発火しない）。阻止されず閉じた場合も `open-change` は発火しない。
 */
export class MiActionDialog extends DialogBase {
  protected override get dialogSize(): DialogSize {
    return "small";
  }

  protected override get variant(): DialogVariant {
    return "action";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-action-dialog": MiActionDialog;
  }
}

if (!customElements.get("mi-action-dialog")) {
  customElements.define("mi-action-dialog", MiActionDialog);
}
