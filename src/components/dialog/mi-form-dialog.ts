import { property } from "lit/decorators.js";

import type { DialogSize, DialogVariant } from "./base";
import { DialogBase } from "./base";

export const formDialogSizes = ["small", "medium", "large"] as const;
export type FormDialogSize = (typeof formDialogSizes)[number];

function isValidFormSize(value: string): value is FormDialogSize {
  return formDialogSizes.includes(value as FormDialogSize);
}

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
export class MiFormDialog extends DialogBase {
  /** ダイアログのサイズ（Desktop 時） */
  @property({ type: String, reflect: true })
  size: FormDialogSize = "medium";

  protected override get dialogSize(): DialogSize {
    const valid = isValidFormSize(this.size);
    if (!valid) {
      console.warn(
        `"${this.size}" は無効な size 属性です。"medium" を使用します。`,
      );
    }
    return valid ? this.size : "medium";
  }

  protected override get variant(): DialogVariant {
    return "form";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-form-dialog": MiFormDialog;
  }
}

if (!customElements.get("mi-form-dialog")) {
  customElements.define("mi-form-dialog", MiFormDialog);
}
