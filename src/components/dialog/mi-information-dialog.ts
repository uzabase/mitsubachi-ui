import { property } from "lit/decorators.js";

import type { DialogVariant } from "./base";
import { DialogBase } from "./base";

export const informationDialogSizes = ["small", "medium"] as const;
export type InformationDialogSize = (typeof informationDialogSizes)[number];

function isValidSize(value: string): value is InformationDialogSize {
  return informationDialogSizes.includes(value as InformationDialogSize);
}

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
export class MiInformationDialog extends DialogBase {
  /** ダイアログのサイズ（Desktop 時） */
  @property({ type: String, reflect: true })
  size: InformationDialogSize = "medium";

  protected override get dialogSize(): InformationDialogSize {
    const valid = isValidSize(this.size);
    if (!valid) {
      console.warn(
        `"${this.size}" は無効な size 属性です。"medium" を使用します。`,
      );
    }
    return valid ? this.size : "medium";
  }

  protected override get variant(): DialogVariant {
    return "information";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-information-dialog": MiInformationDialog;
  }
}

if (!customElements.get("mi-information-dialog")) {
  customElements.define("mi-information-dialog", MiInformationDialog);
}
