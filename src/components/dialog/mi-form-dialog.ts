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
 * @attr {string} form-id - Enter キーで送信を有効にしたいとき、slot 内の form 要素の id を指定する（省略時は Enter 送信なし）
 *
 * @fires close - ダイアログが閉じたとき。ネイティブ `<dialog>` の `close` イベントを再発火。bubbles / composed は false。`form-id` 指定時はフォームのバリデーションが失敗すると閉じない（`close` も発火しない）。
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

  protected override get actionButtonType(): "button" | "submit" {
    return this.formId ? "submit" : "button";
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
