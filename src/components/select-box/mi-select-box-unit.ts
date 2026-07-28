import "../label-unit";
import "./mi-select-box";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../styles";
import type { SelectBoxSize, SelectBoxVariant } from "./mi-select-box";
import { selectBoxUnitStyles } from "./select-box-unit.styles";

/**
 * セレクトボックスとラベルを組み合わせたコンポーネントです。
 *
 * @summary セレクトボックスを説明するラベル付きのセレクトボックスです。
 *
 * @attr {string} text - セレクトボックスを説明するテキストです。セレクトボックスの上に表示されます。
 *
 */
export class MiSelectBoxUnit extends LitElement {
  static styles = makeStyles(selectBoxUnitStyles);

  /** ラベルテキスト */
  @property({ type: String, reflect: true })
  text = "";

  /** 必須かどうか */
  @property({ type: Boolean, reflect: true })
  required = false;

  /** バリアント。primary は枠線付き全幅、secondary はコンパクト */
  @property({ type: String, reflect: true })
  variant: SelectBoxVariant = "primary";

  /** サイズ。small は secondary バリアントでのみ有効（primary では常に medium 扱い） */
  @property({ type: String, reflect: true })
  size: SelectBoxSize = "medium";

  /** 未選択時のプレースホルダー */
  @property({ type: String, reflect: true })
  placeholder = "";

  /** 選択中の値（表示テキスト） */
  @property({ type: String, reflect: true })
  value = "";

  /** エラーメッセージ（空でなければエラー状態） */
  @property({ type: String, reflect: true })
  error = "";

  /** 無効状態 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  #labelClasses() {
    return classMap({
      label: true,
      none: !this.text,
    });
  }

  render() {
    return html`
      <fieldset>
        <mi-label-unit
          class="${this.#labelClasses()}"
          text="${this.text}"
        ></mi-label-unit>
        <mi-select-box
          variant="${this.variant}"
          size="${this.size}"
          placeholder="${this.placeholder}"
          .value="${this.value}"
          error="${this.error}"
          ?disabled="${this.disabled}"
        ></mi-select-box>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-select-box-unit": MiSelectBoxUnit;
  }
}

if (!customElements.get("mi-select-box-unit")) {
  customElements.define("mi-select-box-unit", MiSelectBoxUnit);
}
