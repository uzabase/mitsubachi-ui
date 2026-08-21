import "../helper-text/mi-helper-text";

import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { makeStyles } from "../styles";
import style from "./text-area.styles";

export const sizes = ["medium", "large"] as const;

export type TextAreaSize = (typeof sizes)[number];

/**
 * 文字数をスクリーンリーダーに読み上げるまでの待ち時間（ミリ秒）。
 *
 * 入力のたびに読み上げるとキー入力を妨げるほど冗長になるため、入力が止まってから通知する。
 * GOV.UK Design System は 500ms、SmartHR Design System は 1000ms を採用している。
 */
const SR_COUNT_ANNOUNCE_DELAY_MS = 1000;

/**
 * 文字数を数える。
 *
 * `String.length` は UTF-16 コード単位を数えるため、絵文字（😀）が2文字になってしまう。
 * ユーザーの見た目に近づけるため、コードポイント単位で数える。
 * SmartHR がサロゲートペアを引き算しているのと同じ結果になる。
 *
 * ただし ZWJ で連結された絵文字（👨‍👩‍👧‍👦 は7）や結合文字（か+濁点の「が」は2）は
 * 見た目どおりにならない。完全に一致させるには `Intl.Segmenter`（書記素）が必要だが、
 * 採用しているデザインシステムが無く、tsconfig の lib 変更も伴うため見送っている。
 */
const countCharacters = (value: string): number => [...value].length;

/**
 * 行数の指定を正規化する。mi-text-area / mi-text-area-unit の両方から使う。
 *
 * - 下限はデザイン仕様上 2 行。数値でない指定（`min-rows="abc"` 等）も 2 に寄せる
 * - 上限が行数として意味を持たない場合（`max-rows`（値なし）は空文字 → 0 になる）は
 *   「上限なし」として扱う。そのままだと上限 = 下限になり「一切伸びない」状態が
 *   書き間違いで静かに作られてしまう
 * - 上限は下限より小さくできない
 */
export const normalizeRows = (
  minRows: number,
  maxRows: number | null,
): { minRows: number; maxRows: number | null } => {
  const min = Math.max(2, Number.isFinite(minRows) ? minRows : 2);

  if (maxRows == null || !Number.isFinite(maxRows) || maxRows <= 0) {
    return { minRows: min, maxRows: null };
  }
  return { minRows: min, maxRows: Math.max(min, maxRows) };
};

/**
 * @summary 複数行のテキストを入力・編集するテキストエリアです。1行の場合は `mi-text-field` を使用してください。
 *
 * @slot error - エラーメッセージ。要素ごとに1件のエラーとして表示されます。
 *
 * @fires change - 入力が確定したとき（ネイティブの `change` と同じタイミング）。
 *                 ネイティブの `change` は `composed: false` で Shadow DOM を越えないため、ホスト要素から発火し直している。
 *                 ネイティブの `<textarea>` と同じく `bubbles: true` / `composed: false`。
 *                 新しい値は `event.target.value` で取得する。
 */
export class MiTextArea extends LitElement {
  static styles = makeStyles(style);

  static formAssociated = true;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String, reflect: true })
  value = "";

  @property({ type: String, reflect: true })
  placeholder = "";

  @property({ type: String, reflect: true })
  name = "";

  /**
   * 入力欄の説明としてスクリーンリーダーに読み上げるテキスト。
   *
   * 視覚的には表示せず、`aria-describedby` から参照する。
   * `mi-text-area-unit` が、画面に見えている補足テキスト（`mi-label-unit` が描画）と
   * 同じ文言をここに渡すことで、見た目の関係を読み上げにも反映させている。
   * 補足テキストは別の Shadow DOM 内にあり `aria-describedby` で直接参照できないため、
   * 読み上げ用のテキストをこちら側に持つ形にしている。
   */
  @property({ type: String, reflect: true })
  description = "";

  /**
   * 内部の `textarea` に設定する aria-label。
   *
   * Shadow DOM の外から `<label for>` や `aria-labelledby` で紐付けることはできないため、
   * スクリーンリーダー向けの名前はこの属性で渡す。
   */
  @property({ type: String, reflect: true })
  label = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: TextAreaSize = "medium";

  /**
   * 入力エリアの最小の行数です。
   *
   * デザイン仕様上 2 行が下限のため、2 未満を指定した場合はプロパティ・属性ごと 2 に正規化されます。
   */
  @property({ type: Number, attribute: "min-rows", reflect: true })
  minRows = 2;

  /**
   * 入力エリアが自動で伸びる上限の行数です。
   *
   * 未指定の場合は入力量に応じて伸び続けます。
   * 指定するとその行数で止まり、以降はテキストエリア内がスクロールします。
   *
   * `min-rows` より小さい値を指定した場合は `min-rows` に正規化されます。
   * そのため `min-rows` と同じ値を指定すると高さが固定され、自動伸縮を止められます
   * （例: `min-rows="3" max-rows="3"` で常に3行分）。
   */
  @property({ type: Number, attribute: "max-rows", reflect: true })
  maxRows: number | null = null;

  /**
   * 文字数カウンターの上限値です。
   *
   * ネイティブの `maxlength` と異なり入力自体は制限しません。
   * 上限を超えた場合はカウンターの現在値を強調表示するのみで、送信可否の判断は利用側に委ねます。
   *
   * 文字数はコードポイント単位で数えるため、絵文字（😀）は1文字になります。
   * ネイティブの `maxlength` は UTF-16 コード単位（😀 は2文字）なので、数え方が異なります。
   *
   * また、改行はこのカウンターでは1文字ですが、フォーム送信時には仕様上 `\r\n` に
   * 正規化されるため、サーバーが受け取る文字数は改行の数だけ多くなります。
   * 改行を多く含む用途で厳密な文字数制限が必要な場合は、利用側で考慮してください。
   */
  @property({ type: Number, attribute: "max-length", reflect: true })
  maxLength: number | null = null;

  /** 文字数カウンターを表示します。 */
  @property({ type: Boolean, attribute: "show-count", reflect: true })
  showCount = false;

  /**
   * 入力欄に `aria-required="true"` を付与します。
   *
   * ネイティブの `required` は付けないため、ブラウザによる送信時バリデーションは行いません
   * （`max-length` をソフト制限としているのと同じ方針です）。
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  autofocus = false;

  @state()
  private _slottedErrorHtml: string[] = [];

  /** スクリーンリーダーへ読み上げる文字数メッセージ。入力が止まってから更新される。 */
  @state()
  private _srCountMessage = "";

  private internals: ElementInternals;

  #srCountTimerId?: number;

  /**
   * 現在の文字数。
   *
   * 1回の描画で何度も参照される（赤枠の判定・カウンター表示・aria-describedby）ため、
   * 更新ごとに1回だけ数えて持っておく。
   */
  #characterCount = 0;

  /**
   * フォームのリセット時に戻す値。
   *
   * `value` は `reflect: true` で属性が入力に追従するため、属性から初期値を復元できない。
   * そのため最初の描画時に控えておく（`mi-radio-button-text-group` と同じ方式）。
   */
  #initialValue = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#clearSrCountTimer();
  }

  protected firstUpdated() {
    this.#initialValue = this.value;
  }

  protected willUpdate() {
    this.#characterCount = countCharacters(this.value);

    // 行数はここでプロパティ自体を正規化する。
    // 描画時だけ補正すると「属性は min-rows=1 なのに 2 行で表示される」という
    // 食い違いが生まれ、DOM を見ても実際の値が分からなくなるため。
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

  /** エラーの見た目（赤枠）にする状態か。文字数超過も含む。 */
  get #hasError() {
    return (
      (!this.disabled && this._slottedErrorHtml.length > 0) ||
      this.#showsOverMaxLength
    );
  }

  /**
   * 高さの計算に使う CSS カスタムプロパティ。
   *
   * 実際の calc はサイズごとの行の高さを知っている CSS 側で行う。
   *
   * `style` 属性を文字列でバインドすると、ユーザーが手動リサイズしたときに
   * ブラウザが書き込んだ `height` を Lit が丸ごと上書きして消してしまう。
   * `styleMap` は自分が管理するプロパティだけを操作するため、手動リサイズが残る。
   */
  get #heightStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      "--text-area-min-rows": String(this.minRows),
    };
    if (this.maxRows != null) {
      styles["--text-area-max-rows"] = String(this.maxRows);
    }
    return styles;
  }

  get #isOverMaxLength() {
    return this.maxLength != null && this.#characterCount > this.maxLength;
  }

  /**
   * 上限超過をユーザーに知らせる状態か。
   *
   * カウンターを出していないときに理由の分からない赤枠だけを見せないよう、`show-count` を条件に含める。
   * disabled は入力自体ができないため対象外とする。
   */
  get #showsOverMaxLength() {
    return this.showCount && !this.disabled && this.#isOverMaxLength;
  }

  /** スクリーンリーダー向けの文字数メッセージ。記号ではなく文章で伝える。 */
  get #countMessage(): string {
    if (this.maxLength == null) return `${this.#characterCount}文字`;

    const remaining = this.maxLength - this.#characterCount;
    return remaining < 0 ? `${-remaining}文字オーバー` : `あと${remaining}文字`;
  }

  #errorIdPrefix = "error";

  #descriptionId = "description";

  #countDescriptionId = "count-description";

  get #errorIds(): string[] {
    return this._slottedErrorHtml.map((_, i) => `${this.#errorIdPrefix}-${i}`);
  }

  get #hasCountDescription() {
    return this.showCount && this.maxLength != null;
  }

  get #describedByIds(): string[] {
    const ids: string[] = [];
    if (this.description) ids.push(this.#descriptionId);
    if (this.#hasCountDescription) ids.push(this.#countDescriptionId);
    if (this.#hasError) ids.push(...this.#errorIds);
    return ids;
  }

  #clearSrCountTimer() {
    if (this.#srCountTimerId !== undefined) {
      clearTimeout(this.#srCountTimerId);
      this.#srCountTimerId = undefined;
    }
  }

  #scheduleSrCountMessage() {
    if (!this.showCount) return;

    this.#clearSrCountTimer();
    this.#srCountTimerId = window.setTimeout(() => {
      this._srCountMessage = this.#countMessage;
      this.#srCountTimerId = undefined;
    }, SR_COUNT_ANNOUNCE_DELAY_MS);
  }

  #handleErrorSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    // mi-text-area-unit のように <slot slot="error"> 経由で差し込まれる場合、
    // flatten なしだと slot 要素そのものが返り、中身を取り出せない。
    this._slottedErrorHtml = slot
      .assignedElements({ flatten: true })
      .map((el) => el.innerHTML)
      .filter((h) => h.trim() !== "");
  }

  // ネイティブの input は composed: true のため、Shadow DOM の外までそのまま届く。
  // ここでは value の同期だけを行い、再発火はしない。
  #handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.#scheduleSrCountMessage();
  }

  /**
   * ネイティブの `change` は `composed: false` で Shadow DOM を越えないため、ホスト要素から発火し直す。
   *
   * `bubbles` / `composed` は docs/event-architecture.md の「ネイティブ互換」に従い、
   * ネイティブの `<textarea>` と同じ値（`bubbles: true` / `composed: false`）にする。
   * `<form>` 側で `change` を拾う使い方をネイティブと同じようにできるようにするため。
   * `mi-select-box` が `<select>` に合わせているのと同じ方針。
   */
  #handleChange(e: Event) {
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        cancelable: e.cancelable,
        composed: false,
      }),
    );
  }

  #textareaClasses() {
    return classMap({
      textarea: true,
      error: this.#hasError,
    });
  }

  #renderCount() {
    if (!this.showCount) return nothing;

    // 見た目のカウンター（例: 111/100）は記号が読み上げに向かないため隠し、
    // 代わりにライブリージョンで「あと○文字」「○文字オーバー」と文章で通知する。
    return html`
      <div
        class="${classMap({ count: true, disabled: this.disabled })}"
        aria-hidden="true"
      >
        <span
          class="${classMap({
            "count-current": true,
            over: this.#showsOverMaxLength,
          })}"
          >${this.#characterCount}</span
        >
        ${this.maxLength != null
          ? html`<span>/</span> <span>${this.maxLength}</span>`
          : nothing}
      </div>
    `;
  }

  /** 入力欄の説明。視覚的には出さず aria-describedby から参照する。 */
  #renderDescription() {
    if (!this.description) return nothing;

    return html`
      <div id="${this.#descriptionId}" class="visually-hidden">
        ${this.description}
      </div>
    `;
  }

  /** 入力前に上限を知らせる説明。aria-describedby から参照する。 */
  #renderCountDescription() {
    if (!this.#hasCountDescription) return nothing;

    return html`
      <div id="${this.#countDescriptionId}" class="visually-hidden">
        最大${this.maxLength}文字入力できます
      </div>
    `;
  }

  /** 入力中の文字数変化を通知するライブリージョン。 */
  #renderSrCount() {
    if (!this.showCount) return nothing;

    return html`
      <div class="visually-hidden" role="status" aria-live="polite">
        ${this._srCountMessage}
      </div>
    `;
  }

  #renderErrors() {
    if (!this.#hasError) return nothing;

    return this._slottedErrorHtml.map(
      (content, i) => html`
        <mi-helper-text
          id="${this.#errorIdPrefix}-${i}"
          status="error"
          size="medium"
          >${unsafeHTML(content)}</mi-helper-text
        >
      `,
    );
  }

  render() {
    return html`
      <textarea
        class="${this.#textareaClasses()}"
        data-size="${this.size}"
        placeholder="${this.placeholder}"
        name="${this.name}"
        rows="${this.minRows}"
        style=${styleMap(this.#heightStyles)}
        ?data-has-max-rows="${this.maxRows != null}"
        ?disabled="${this.disabled}"
        ?autofocus="${this.autofocus}"
        aria-label="${this.label || nothing}"
        aria-required="${this.required ? "true" : "false"}"
        .value="${this.value}"
        aria-invalid="${this.#hasError ? "true" : "false"}"
        aria-describedby="${this.#describedByIds.join(" ")}"
        @input="${this.#handleInput}"
        @change="${this.#handleChange}"
      ></textarea>
      ${this.#renderCount()} ${this.#renderDescription()}
      ${this.#renderCountDescription()} ${this.#renderSrCount()}
      <slot
        name="error"
        @slotchange=${this.#handleErrorSlotChange}
        hidden
      ></slot>
      ${this.#renderErrors()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-text-area": MiTextArea;
  }
}

if (!customElements.get("mi-text-area")) {
  customElements.define("mi-text-area", MiTextArea);
}
