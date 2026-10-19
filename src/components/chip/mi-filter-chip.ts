import "../icon";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { filterChipStyles } from "./filter-chip.styles";

/** チップが取りうる role。親グループの種類で決まる */
export type FilterChipRole = "button" | "radio";

/**
 * @summary 絞り込み条件の1件を表し、クリックで選択をトグルするチップです。
 *
 * 単体でも使えますが、通常は `mi-filter-chip-group-single`（単一選択）または
 * `mi-filter-chip-group-multiple`（複数選択）の中に配置します。
 * 選択中は先頭にチェックアイコンが自動表示されます（アイコンの差し替えはできません）。
 *
 * role / tabindex / aria 属性はこの要素自身（host）に付与します。
 * Shadow DOM 内に `<button>` を置くと、親グループからロービングフォーカスの
 * tabindex を制御できなくなるためです。
 *
 * | 置かれている場所 | role | 選択状態 |
 * | --- | --- | --- |
 * | 単体 | `button` | `aria-pressed` |
 * | `mi-filter-chip-group-single` の中 | `radio` | `aria-checked` |
 * | `mi-filter-chip-group-multiple` の中 | `button` | `aria-pressed` |
 *
 * イベントはネイティブの `click` のみです（`composed: true` で Shadow DOM の外へ
 * 届くため再発火しません）。グループ内では親グループが `change` として再発火します。
 *
 * @example
 * ```html
 * <mi-filter-chip label="東京" value="tokyo"></mi-filter-chip>
 * ```
 */
export class MiFilterChip extends LitElement {
  static override styles = makeStyles(filterChipStyles);

  /** チップに表示するテキスト。グループ幅に収まらない場合は折り返します。 */
  @property({ type: String })
  label = "";

  #value = "";

  /**
   * グループが選択値を識別するための値。
   *
   * 未指定のときは `label` をそのまま値として扱います。`value` を省略した
   * ネイティブの `<option>` がテキストコンテンツを値にするのと同じ挙動です。
   * 空のままにすると、単一選択グループで複数のチップが同時に一致してしまいます。
   */
  @property({ type: String })
  get value(): string {
    return this.#value || this.label;
  }

  set value(newValue: string) {
    const previous = this.#value;
    this.#value = newValue;
    this.requestUpdate("value", previous);
  }

  /**
   * 選択状態
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * 無効化状態。クリック・キー操作を受け付けず、Tab でもフォーカスできません。
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 親グループに応じた role。
   * 単一選択グループの中だけ `radio`、それ以外（単体 / 複数選択グループ）は `button`。
   */
  get #chipRole(): FilterChipRole {
    return this.closest("mi-filter-chip-group-single") ? "radio" : "button";
  }

  override connectedCallback() {
    super.connectedCallback();
    // 初期値。描画後に updated() で親を見て確定させる
    this.#applyHostAttributes();
    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeyDown);
  }

  override updated(changed: Map<string, unknown>) {
    super.updated(changed);
    this.#applyHostAttributes();
  }

  #applyHostAttributes() {
    const role = this.#chipRole;
    this.setAttribute("role", role);

    // radiogroup の子は aria-checked、トグルボタンは aria-pressed で選択状態を表す
    const selectedAttr = role === "radio" ? "aria-checked" : "aria-pressed";
    const unusedAttr = role === "radio" ? "aria-pressed" : "aria-checked";
    this.removeAttribute(unusedAttr);
    this.setAttribute(selectedAttr, this.selected ? "true" : "false");

    if (this.disabled) {
      // カスタム要素の disabled 属性は支援技術に伝わらないため aria で明示する
      this.setAttribute("aria-disabled", "true");
      this.removeAttribute("tabindex");
      return;
    }

    this.removeAttribute("aria-disabled");

    if (role === "radio") {
      // radiogroup 内の tabindex は mi-filter-chip-group-single が制御する。
      // まだ配られていないときだけ、フォーカス不能にならないよう既定値を置く
      if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
      return;
    }

    this.setAttribute("tabindex", "0");
  }

  #handleClick = (e: Event) => {
    if (this.disabled) {
      // 無効な要素のクリックは祖先にも伝えない。
      // ネイティブの <button disabled> がそもそも click を発火しない挙動に合わせる
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 単一選択グループ内では「常に1つ選択」を保つため、選択はグループ側が決める
    if (this.#chipRole === "radio") return;
    this.selected = !this.selected;
  };

  #handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      // Space によるスクロールを抑止し、ネイティブ button と同じ操作感にする
      e.preventDefault();
      this.click();
    }
  };

  override render() {
    return html`
      ${this.selected
        ? html`<span class="check-icon" aria-hidden="true">
            <mi-icon type="check-small"></mi-icon>
          </span>`
        : nothing}
      <span class="label">${this.label}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-filter-chip": MiFilterChip;
  }
}

if (!customElements.get("mi-filter-chip")) {
  customElements.define("mi-filter-chip", MiFilterChip);
}
