import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { DialogBase, type DialogSize } from "./base";
import {
  dialogBaseStyles,
  informationDialogPhoneStyles,
} from "./dialog.styles";

export type InformationDialogSize = "small" | "medium" | "large";

/**
 * @summary 利用規約など、重要な情報を表示するダイアログです。
 *
 * Desktop: size=small (560px) / medium (800px) / large (1280px)。
 * Phone: size=small は横余白あり、medium/large はフルスクリーン。
 *
 * @slot - ダイアログ本文のコンテンツ
 *
 * @fires mi-action - アクションボタンクリック時
 * @fires mi-cancel - キャンセルボタンまたは ESC キー押下時
 *
 * @example
 * ```html
 * <mi-information-dialog
 *   open
 *   size="medium"
 *   header-text="利用規約"
 *   action-label="閉じる"
 * >
 *   <p>利用規約の内容...</p>
 * </mi-information-dialog>
 * ```
 */
export class MiInformationDialog extends DialogBase {
  static styles = makeStyles(dialogBaseStyles, informationDialogPhoneStyles);

  @property({ type: String, reflect: true })
  size: InformationDialogSize = "medium";

  protected override getSize(): DialogSize {
    return this.size;
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
