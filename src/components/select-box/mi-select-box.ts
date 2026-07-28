import "../icon";
import "../icon-color";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../styles";
import { selectBoxStyles } from "./select-box.styles";

export type SelectBoxVariant = "primary" | "secondary";
export type SelectBoxSize = "small" | "medium";

/**
 * セレクトボックスのトリガーコンポーネントです。
 *
 * `mi-menu` の `trigger` スロットに配置して使用します。
 * クリックで選択肢を含む Menu を展開し、ユーザーが1つを選択します。
 *
 * @summary セレクトボックスのトリガーコンポーネントです。
 */
export class MiSelectBox extends LitElement {
  static styles = makeStyles(selectBoxStyles);

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

  get #effectiveSize(): SelectBoxSize {
    return this.variant === "primary" ? "medium" : this.size;
  }

  #buttonClasses() {
    return classMap({
      "select-box": true,
      [this.variant]: true,
      [this.#effectiveSize]: true,
      error: !!this.error && !this.disabled,
    });
  }

  #textClasses() {
    return classMap({
      text: true,
      placeholder: !this.value,
    });
  }

  #displayText() {
    return this.value || this.placeholder;
  }

  render() {
    return html`
      <button
        class="${this.#buttonClasses()}"
        ?disabled="${this.disabled}"
        type="button"
        aria-haspopup="listbox"
        aria-invalid="${this.error && !this.disabled ? "true" : "false"}"
      >
        <span class="${this.#textClasses()}">${this.#displayText()}</span>
        <mi-icon class="chevron" type="chevron-down-small"></mi-icon>
      </button>
      ${this.error && !this.disabled
        ? html`
            <div class="error-text" role="alert">
              <mi-icon-color class="error-icon" type="error"></mi-icon-color>
              <span class="error-message">${this.error}</span>
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-select-box": MiSelectBox;
  }
}

if (!customElements.get("mi-select-box")) {
  customElements.define("mi-select-box", MiSelectBox);
}
