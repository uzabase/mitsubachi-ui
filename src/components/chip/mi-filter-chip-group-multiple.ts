import "./mi-filter-chip";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { filterChipGroupStyles } from "./filter-chip-group.styles";
import type { MiFilterChip } from "./mi-filter-chip";

/**
 * @summary 複数選択の mi-filter-chip グループです。0件選択も許容します。
 *
 * host に `role="group"` を付与し、子の `mi-filter-chip` はトグルボタン
 * （`role="button"` + `aria-pressed`）として読み上げられます。
 * グループが何を絞り込むのかを伝えるため、**利用側で `aria-label` を必ず指定してください**。
 *
 * 選択状態の実体は各 `mi-filter-chip` の `selected` です。
 * このコンポーネントは配列プロパティを持たず、読み取り専用の `values` getter を提供します。
 *
 * ロービングフォーカスは行いません。`role="group"` 内のトグルボタンは
 * 個別に Tab で辿るのが標準の挙動です。
 *
 * @slot - `mi-filter-chip` 要素を配置します。
 *
 * @fires change - いずれかのチップの選択が切り替わったとき（bubbles: true）。選択値の一覧は `event.target.values` で取得します。
 *
 * @example
 * ```html
 * <mi-filter-chip-group-multiple aria-label="業種">
 *   <mi-filter-chip label="金融" value="finance"></mi-filter-chip>
 *   <mi-filter-chip label="小売" value="retail" selected></mi-filter-chip>
 * </mi-filter-chip-group-multiple>
 * ```
 */
export class MiFilterChipGroupMultiple extends LitElement {
  static override styles = makeStyles(filterChipGroupStyles);

  /**
   * グループ全体の無効化。子個別の `disabled` との OR で効きます。
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * 子が自分で持っていた disabled。グループの disabled を解除したときに復元する。
   *
   * グループが強制している間は記録を更新しない。強制中の値を読むと、
   * グループが付けた true を「子が元々 true だった」と誤記録してしまうため。
   */
  #originalDisabled = new WeakMap<MiFilterChip, boolean>();

  /** 前回の同期時点でグループが disabled を強制していたか */
  #forcedDisabled = false;

  /**
   * 選択中のチップの `value` 一覧（読み取り専用）。
   * 配列プロパティは持たせず、子の `selected` から都度算出します。
   */
  get values(): string[] {
    return this.#chips()
      .filter((chip) => chip.selected)
      .map((chip) => chip.value);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
    this.addEventListener("click", this.#handleClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.#handleClick);
  }

  override firstUpdated() {
    this.#syncChips();
  }

  override updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("disabled")) {
      this.#syncChips();
    }
  }

  override render() {
    return html`<slot @slotchange=${this.#handleSlotChange}></slot>`;
  }

  #chips(): MiFilterChip[] {
    return Array.from(this.querySelectorAll("mi-filter-chip"));
  }

  #handleSlotChange = () => {
    this.#syncChips();
  };

  #syncChips() {
    const groupDisabled = this.disabled;

    for (const chip of this.#chips()) {
      // 強制していない間の値だけが、利用側が意図した disabled
      if (!this.#forcedDisabled) {
        this.#originalDisabled.set(chip, chip.disabled);
      }
      chip.disabled =
        groupDisabled || (this.#originalDisabled.get(chip) ?? false);
    }

    this.#forcedDisabled = groupDisabled;
  }

  // click はネイティブイベントなので止めずに祖先まで通す。
  // 選択の通知は change が担うため二重発火にはならない（docs/event-architecture.md）。
  #handleClick = (e: Event) => {
    const chip = (e.target as Element).closest(
      "mi-filter-chip",
    ) as MiFilterChip | null;
    if (!chip || chip.disabled) return;
    // 選択のトグル自体は mi-filter-chip 側で済んでいる（target フェーズが先に走る）
    // ネイティブの <input type="radio"> / <select> の change に合わせて
    // 祖先までバブルさせる。Shadow DOM の外には出さない（composed は既定の false）
    this.dispatchEvent(new Event("change", { bubbles: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-filter-chip-group-multiple": MiFilterChipGroupMultiple;
  }
}

if (!customElements.get("mi-filter-chip-group-multiple")) {
  customElements.define(
    "mi-filter-chip-group-multiple",
    MiFilterChipGroupMultiple,
  );
}
