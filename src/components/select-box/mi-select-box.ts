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
 *
 * @fires change - 選択値が変更されたとき。`event.target.value` で選択された識別子、`event.target.displayText` で表示テキストを取得できる。
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

  /** 選択中の値（option の value 属性に対応する識別子） */
  @property({ type: String, reflect: true })
  value = "";

  /** 選択中の表示テキスト（value に対応する option のラベル） */
  @property({ type: String, attribute: "display-text", reflect: true })
  displayText = "";

  /** エラーメッセージ（空でなければエラー状態） */
  @property({ type: String, reflect: true })
  error = "";

  /** 無効状態 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this._parentMenu = this.closest("mi-menu");
    this._parentMenu?.addEventListener("change", this._handleChange);
    this._setDropdownRole();
  }

  private _setDropdownRole() {
    const dropdown = this._parentMenu?.querySelector("mi-menu-dropdown");
    if (dropdown) {
      dropdown.setAttribute("popup-role", "listbox");
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._parentMenu?.removeEventListener("change", this._handleChange);
    this._parentMenu = null;
  }

  private _parentMenu: Element | null = null;

  private _handleChange = (e: Event) => {
    const radioGroup = e.target as HTMLElement & { value?: string };
    if (radioGroup.tagName?.toLowerCase() !== "mi-menu-radio-group") return;
    e.stopPropagation();
    const selectedValue = radioGroup.value ?? "";
    const selectedItem = radioGroup.querySelector(
      `mi-select-menu-item[value="${CSS.escape(selectedValue)}"]`,
    );
    this.value = selectedValue;
    this.displayText = selectedItem?.textContent?.trim() ?? "";
    this.dispatchEvent(new Event("change", { bubbles: true }));
  };

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
      placeholder: !this.displayText,
    });
  }

  get #displayLabel() {
    return this.displayText || this.placeholder;
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
        <span class="${this.#textClasses()}">${this.#displayLabel}</span>
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
