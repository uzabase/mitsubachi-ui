import "../label-unit";
import "./mi-text-area";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { makeStyles } from "../styles";
import {
  type MiTextArea,
  normalizeRows,
  type TextAreaSize,
} from "./mi-text-area";
import style from "./text-area-unit.styles";

/**
 * テキストエリアとラベルを組み合わせたコンポーネントです。
 *
 * ```html
 * <mi-text-area-unit text="自己紹介" placeholder="入力してください" show-count max-length="100">
 *   <span slot="error">入力内容に誤りがあります</span>
 * </mi-text-area-unit>
 * ```
 *
 * @summary テキストエリアを説明するラベル付きのテキストエリアです。
 *
 * @attr {string} text - テキストエリアを説明するテキストです。テキストエリアの上に表示されます。
 *
 * @attr {string} support-text - テキストエリアを補足するテキストです。text の下、テキストエリアの上に表示されます。
 *
 * @slot error - エラーメッセージ。要素ごとに1件のエラーとして表示されます。
 *
 * @fires change - 入力が確定したとき。ネイティブの `<textarea>` と同じく `bubbles: true` / `composed: false`。
 *                 新しい値は `event.target.value` で取得する。
 */
export class MiTextAreaUnit extends LitElement {
  static styles = makeStyles(style);

  static formAssociated = true;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** ラベルテキスト */
  @property({ type: String, reflect: true })
  text = "";

  /** ラベルに「必須」バッジを表示し、入力欄に `aria-required` を付与します。 */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * ラベルの下に表示する補足テキスト。
   *
   * 内側の `mi-text-area` の `description` にも渡し、`aria-describedby` 経由で
   * スクリーンリーダーにも「この欄の説明」として伝わるようにしている。
   */
  @property({ type: String, attribute: "support-text", reflect: true })
  supportText = "";

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, reflect: true })
  name = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: TextAreaSize = "medium";

  /** 入力エリアの最小の行数です。2 未満は 2 に正規化されます。 */
  @property({ type: Number, attribute: "min-rows", reflect: true })
  minRows = 2;

  /**
   * 入力エリアが自動で伸びる上限の行数です。未指定なら伸び続けます。
   *
   * `min-rows` と同じ値を指定すると高さが固定され、自動伸縮を止められます。
   */
  @property({ type: Number, attribute: "max-rows", reflect: true })
  maxRows: number | null = null;

  /** 文字数カウンターの上限値です。入力自体は制限しません。 */
  @property({ type: Number, attribute: "max-length", reflect: true })
  maxLength: number | null = null;

  /** 文字数カウンターを表示します。 */
  @property({ type: Boolean, attribute: "show-count", reflect: true })
  showCount = false;

  @property({ type: Boolean, reflect: true })
  autofocus = false;

  private internals: ElementInternals;

  /**
   * フォームのリセット時に戻す値。
   *
   * `value` は `reflect: true` で属性が入力に追従するため、属性から初期値を復元できない。
   */
  #initialValue = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected firstUpdated() {
    this.#initialValue = this.value;
  }

  protected willUpdate() {
    // 内側の mi-text-area も同じ正規化を行うが、こちらの公開プロパティ・属性も
    // 揃えておかないと「属性は min-rows=1 なのに 2 行で表示される」食い違いが生まれる。
    const rows = normalizeRows(this.minRows, this.maxRows);
    this.minRows = rows.minRows;
    this.maxRows = rows.maxRows;
  }

  /** `<form>` の reset で、ネイティブの `<textarea>` と同じく初期値に戻す。 */
  formResetCallback() {
    this.value = this.#initialValue;
  }

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("value")) {
      this.internals.setFormValue(this.value);
    }
  }

  /**
   * 内側の mi-text-area の値を自身に同期する。
   *
   * `input` は `composed: true` で2段の Shadow DOM をそのまま越え、
   * 境界で `target` がこの要素に付け替わるため、再発火はしない。
   */
  #handleInput(e: Event) {
    this.value = (e.target as MiTextArea).value;
  }

  /**
   * 内側の mi-text-area が発火する change を受け取り、自身の change として再発火する。
   *
   * `change` は `composed: false` なのでこのコンポーネントの境界も越えられない。
   * 内部イベントは明示的に止めてから発火し直す（docs/event-architecture.md）。
   */
  #handleChange(e: Event) {
    e.stopPropagation();
    this.value = (e.target as MiTextArea).value;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  #labelClasses() {
    return classMap({
      label: true,
      // text が空でも support-text だけ表示したい場合があるため、両方空のときだけ隠す
      none: !this.text && !this.supportText,
    });
  }

  render() {
    return html`
      <fieldset>
        <mi-label-unit
          class="${this.#labelClasses()}"
          text="${this.text}"
          support-text="${this.supportText}"
          ?required="${this.required}"
        ></mi-label-unit>
        <!--
          name は内側に渡さない。フォーム値はこのコンポーネントが ElementInternals で
          管理しており、内側の mi-text-area は Shadow DOM 内にあるため外側の <form> には
          参加できない。両方に name を持たせても二重送信にはならないが、
          どちらが送信主体か分かりにくくなるため意図的に渡していない。
        -->
        <mi-text-area
          label="${this.text}"
          description="${this.supportText}"
          placeholder="${this.placeholder}"
          size="${this.size}"
          .minRows="${this.minRows}"
          .maxRows="${this.maxRows}"
          .maxLength="${this.maxLength}"
          ?show-count="${this.showCount}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          ?autofocus="${this.autofocus}"
          .value="${this.value}"
          @input="${this.#handleInput}"
          @change="${this.#handleChange}"
        >
          <slot name="error" slot="error"></slot>
        </mi-text-area>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-text-area-unit": MiTextAreaUnit;
  }
}

if (!customElements.get("mi-text-area-unit")) {
  customElements.define("mi-text-area-unit", MiTextAreaUnit);
}
