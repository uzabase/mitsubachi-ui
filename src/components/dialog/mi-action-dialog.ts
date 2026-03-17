import { makeStyles } from "../styles";
import { DialogBase } from "./base";
import { actionDialogPhoneStyles, dialogBaseStyles } from "./dialog.styles";

/**
 * @summary 確認や削除など、ユーザーの意思決定を求めるダイアログです。
 *
 * Desktop: size=small (560px)。
 * Phone: 横に余白を持ち、高さは広がらない (max: min(80dvh, 560px))。
 *
 * @slot - ダイアログ本文のコンテンツ
 *
 * @fires mi-action - アクションボタンクリック時
 * @fires mi-cancel - キャンセルボタンまたは ESC キー押下時
 *
 * @example
 * ```html
 * <mi-action-dialog
 *   open
 *   header-text="操作の確認"
 *   cancel-label="キャンセル"
 *   action-label="実行する"
 * >
 *   <p>この操作を実行してもよろしいですか？</p>
 * </mi-action-dialog>
 * ```
 */
export class MiActionDialog extends DialogBase {
  static styles = makeStyles(dialogBaseStyles, actionDialogPhoneStyles);

  protected override getSize() {
    return "small" as const;
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
