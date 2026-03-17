import { makeStyles } from "../styles";
import { DialogBase } from "./base";
import { dialogBaseStyles, fullscreenPhoneStyles } from "./dialog.styles";

/**
 * @summary フォーム入力を行うダイアログです。
 *
 * Desktop: size=medium (800px)。
 * Phone: フルスクリーン（横余白なし・画面端まで、高さも広がる）。
 *
 * @slot - ダイアログ本文のコンテンツ（フォーム要素等）
 *
 * @fires mi-action - アクションボタンクリック時
 * @fires mi-cancel - キャンセルボタンまたは ESC キー押下時
 *
 * @example
 * ```html
 * <mi-form-dialog
 *   open
 *   header-text="プロフィール編集"
 *   cancel-label="キャンセル"
 *   action-label="保存"
 * >
 *   <mi-text-field-unit label="名前"></mi-text-field-unit>
 * </mi-form-dialog>
 * ```
 */
export class MiFormDialog extends DialogBase {
  static styles = makeStyles(dialogBaseStyles, fullscreenPhoneStyles);

  protected override getSize() {
    return "medium" as const;
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
