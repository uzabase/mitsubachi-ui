import "../label-unit";
import "./mi-select-box";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../styles";
import type {
  MiSelectBox,
  SelectBoxSize,
  SelectBoxVariant,
} from "./mi-select-box";
import { selectBoxUnitStyles } from "./select-box-unit.styles";

/**
 * セレクトボックスとラベルを組み合わせたコンポーネントです。
 *
 * 選択肢は `mi-select-box` と同じく `mi-select-menu-item` を直接の子として並べます。
 *
 * ```html
 * <mi-select-box-unit text="部署" placeholder="部署を選択">
 *   <mi-select-menu-item value="sales">営業</mi-select-menu-item>
 * </mi-select-box-unit>
 * ```
 *
 * @summary セレクトボックスを説明するラベル付きのセレクトボックスです。
 *
 * @attr {string} text - セレクトボックスを説明するテキストです。セレクトボックスの上に表示されます。
 *
 * @slot - 選択肢（mi-select-menu-item）
 *
 * @fires change - 選択値が変更されたとき。`event.target.value` で選択された識別子を取得できる。
 */
export class MiSelectBoxUnit extends LitElement {
  static styles = makeStyles(selectBoxUnitStyles);

  static formAssociated = true;

  /** ラベルテキスト */
  @property({ type: String, reflect: true })
  text = "";

  /** 必須バッジを表示するかどうか */
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

  /** 選択中の項目のテキスト（読み取り専用） */
  get displayText(): string {
    return this.#selectBox?.displayText ?? "";
  }

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.internals.setFormValue(this.value);
    }
  }

  get #selectBox(): MiSelectBox | null {
    return this.shadowRoot?.querySelector("mi-select-box") ?? null;
  }

  /**
   * mi-select-box の change は composed: false のため Shadow DOM の外に出ない。
   * docs/event-architecture.md の方針に従い、ホスト要素から発火し直す。
   */
  #handleChange(e: Event) {
    const selectBox = e.target as MiSelectBox;
    this.value = selectBox.value;
    this.dispatchEvent(new Event("change"));
  }

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
          ?required="${this.required}"
        ></mi-label-unit>
        <mi-select-box
          variant="${this.variant}"
          size="${this.size}"
          placeholder="${this.placeholder}"
          .value="${this.value}"
          error="${this.error}"
          ?disabled="${this.disabled}"
          @change="${this.#handleChange}"
        >
          <slot></slot>
        </mi-select-box>
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
