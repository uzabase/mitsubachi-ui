import "../icon";
import "../helper-text/mi-helper-text";
import "../menu/mi-menu";
import "../menu/mi-menu-dropdown";
import "../menu/mi-menu-radio-group";

import { html, LitElement, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import type { MiMenu } from "../menu/mi-menu";
import type { MiMenuDropdown } from "../menu/mi-menu-dropdown";
import type { MiMenuRadioGroup } from "../menu/mi-menu-radio-group";
import type { MiSelectMenuItem } from "../menu/mi-select-menu-item";
import { querySelectorAllThroughSlots } from "../menu/slot-traversal";
import { makeStyles } from "../styles";
import { selectBoxStyles } from "./select-box.styles";

export type SelectBoxVariant = "primary" | "secondary";
export type SelectBoxSize = "small" | "medium";

/**
 * セレクトボックスです。
 *
 * ネイティブの `<select>` / `<option>` と同じように、`mi-select-menu-item` を直接の子として並べます。
 * ドロップダウンの開閉・配置は内部で完結するため、`mi-menu` で囲む必要はありません。
 *
 * ```html
 * <mi-select-box placeholder="部署を選択" name="department">
 *   <mi-select-menu-item value="sales">営業</mi-select-menu-item>
 *   <mi-select-menu-item value="marketing">マーケティング</mi-select-menu-item>
 * </mi-select-box>
 * ```
 *
 * @summary セレクトボックスです。
 *
 * @slot - 選択肢（mi-select-menu-item）
 *
 * @fires change - 選択値が変更されたとき。ネイティブの `<select>` と同じく `bubbles: true` / `composed: false`。
 *                 `event.target.value` で選択された識別子、`event.target.displayText` で表示テキストを取得できる。
 */
export class MiSelectBox extends LitElement {
  static styles = makeStyles(selectBoxStyles);

  static formAssociated = true;

  /** バリアント。primary は枠線付き全幅、secondary はコンパクト */
  @property({ type: String, reflect: true })
  variant: SelectBoxVariant = "primary";

  /** サイズ。small は secondary バリアントでのみ有効（primary では常に medium 扱い） */
  @property({ type: String, reflect: true })
  size: SelectBoxSize = "medium";

  /** 未選択時のプレースホルダー */
  @property({ type: String, reflect: true })
  placeholder = "";

  /** 選択中の値（mi-select-menu-item の value 属性に対応する識別子） */
  @property({ type: String, reflect: true })
  value = "";

  /** フォーム送信時の名前 */
  @property({ type: String, reflect: true })
  name = "";

  /** エラーメッセージ（空でなければエラー状態） */
  @property({ type: String, reflect: true })
  error = "";

  /** 無効状態 */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** 選択中の項目のテキスト。選択肢から自動的に導出される（読み取り専用） */
  get displayText(): string {
    return this._displayText;
  }

  @state()
  private _displayText = "";

  /** ドロップダウンの開閉状態（aria-expanded 用） */
  @state()
  private _open = false;

  @query("mi-menu")
  private _menu?: MiMenu;

  @query("button")
  private _button?: HTMLButtonElement;

  @query("mi-menu-dropdown")
  private _dropdown?: MiMenuDropdown;

  private internals: ElementInternals;

  /** mi-menu の open 属性を監視して aria-expanded に反映する */
  #openObserver?: MutationObserver;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("menu-item-activate", this.#stopInternalEvent);
    // 一度描画済みの要素が DOM から外して付け直された場合、firstUpdated は
    // 再実行されない。disconnectedCallback で破棄した監視をここで貼り直す。
    if (this.hasUpdated) this.#observeMenuOpen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("menu-item-activate", this.#stopInternalEvent);
    this.#openObserver?.disconnect();
    this.#openObserver = undefined;
  }

  /**
   * menu-item-activate は mi-menu がメニューを閉じるための内部連絡用イベント。
   *
   * 選択肢は利用側が書く Light DOM の子要素なので、composed: false でも
   * そのまま利用側までバブリングしてしまう。mi-menu には slot 経由で
   * ここより先に届いているため、ホストで止めて外へ漏らさない。
   */
  #stopInternalEvent = (e: Event) => {
    e.stopPropagation();
  };

  protected firstUpdated() {
    this.#observeMenuOpen();
  }

  /** mi-menu の open 属性を監視して aria-expanded とドロップダウン幅に反映する */
  #observeMenuOpen() {
    const menu = this._menu;
    if (!menu || this.#openObserver) return;

    this.#openObserver = new MutationObserver(() => {
      this._open = menu.open;
      if (menu.open) this.#syncDropdownMinWidth();
    });
    this.#openObserver.observe(menu, {
      attributes: true,
      attributeFilter: ["open"],
    });
  }

  protected willUpdate(changedProperties: Map<string, unknown>) {
    // render 前に解決する。updated() で書き換えると再レンダリングが1回余計に走る
    if (changedProperties.has("value")) {
      this._displayText = this.#resolveDisplayText();
    }
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.internals.setFormValue(this.value);
    }
  }

  /** 選択肢一覧。mi-select-box-unit 経由で slot を挟む場合もあるため slot をまたいで集める */
  get #items(): MiSelectMenuItem[] {
    return querySelectorAllThroughSlots(
      this,
      "mi-select-menu-item",
    ) as unknown as MiSelectMenuItem[];
  }

  /**
   * ドロップダウンがトリガーより狭くならないよう、最小幅を渡す。
   *
   * 固定幅ではなく最小幅にすることで、
   * トリガーが狭くても選択肢が長ければドロップダウン側は広がれる（ネイティブの select と同じ）。
   */
  #syncDropdownMinWidth() {
    if (!this._button || !this._dropdown) return;

    this._dropdown.style.setProperty(
      "--menu-dropdown-min-inline-size",
      `${this._button.offsetWidth}px`,
    );
  }

  /** value に対応する項目のテキストを取り出す */
  #resolveDisplayText(): string {
    const selected = this.#items.find((item) => item.value === this.value);
    return selected?.textContent?.trim() ?? "";
  }

  /** 選択肢が差し替わったとき、表示テキストを取り直す */
  #handleSlotChange() {
    this._displayText = this.#resolveDisplayText();
    // 項目の role は親ドロップダウンの popup-role から決まる。差し込み完了後に
    // 再描画させて確定させる（mi-menu-radio-group と同じやり方）。
    this.#items.forEach((item) => item.requestUpdate());
  }

  /**
   * 内部の mi-menu-radio-group が発火する change を受け取り、自身の change として再発火する。
   *
   * 内部イベントは明示的に止めてから発火し直す（docs/event-architecture.md）。
   * bubbles / composed はネイティブの <select> の change と同じ値にする。
   * ネイティブも祖先までバブリングし、Shadow DOM の外には出ない（composed: false）。
   */
  #handleGroupChange(e: Event) {
    e.stopPropagation();
    const group = e.target as MiMenuRadioGroup;
    this.value = group.value;
    // change のリスナーが displayText を同期的に読めるよう、発火前に確定させる
    this._displayText = this.#resolveDisplayText();
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  get #effectiveSize(): SelectBoxSize {
    return this.variant === "primary" ? "medium" : this.size;
  }

  #errorId = "error";

  get #hasError() {
    return !!this.error && !this.disabled;
  }

  #buttonClasses() {
    return classMap({
      "select-box": true,
      [this.variant]: true,
      [this.#effectiveSize]: true,
      error: this.#hasError,
    });
  }

  #textClasses() {
    return classMap({
      text: true,
      placeholder: !this._displayText,
    });
  }

  get #displayLabel() {
    return this._displayText || this.placeholder;
  }

  render() {
    return html`
      <mi-menu class="menu">
        <button
          slot="trigger"
          class="${this.#buttonClasses()}"
          ?disabled="${this.disabled}"
          type="button"
          aria-haspopup="listbox"
          aria-expanded="${this._open ? "true" : "false"}"
          aria-invalid="${this.#hasError ? "true" : "false"}"
          aria-describedby="${this.#hasError ? this.#errorId : ""}"
        >
          <span class="${this.#textClasses()}">${this.#displayLabel}</span>
          <mi-icon class="chevron" type="chevron-down-small"></mi-icon>
        </button>
        <!-- width=0 は fit-content。最も長い選択肢に合わせる -->
        <mi-menu-dropdown popup-role="listbox" .width="${0}">
          <mi-menu-radio-group
            .value="${this.value}"
            @change="${this.#handleGroupChange}"
          >
            <slot @slotchange="${this.#handleSlotChange}"></slot>
          </mi-menu-radio-group>
        </mi-menu-dropdown>
      </mi-menu>
      ${this.#hasError
        ? html`<mi-helper-text
            id="${this.#errorId}"
            class="error-text"
            status="error"
            size="medium"
            >${this.error}</mi-helper-text
          >`
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
