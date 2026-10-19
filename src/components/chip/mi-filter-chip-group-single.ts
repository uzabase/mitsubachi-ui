import "./mi-filter-chip";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import { filterChipGroupStyles } from "./filter-chip-group.styles";
import type { MiFilterChip } from "./mi-filter-chip";

/**
 * @summary 単一選択の mi-filter-chip グループです。常に1つだけが選択されます。
 *
 * host に `role="radiogroup"` を付与し、子の `mi-filter-chip` は `role="radio"` になります。
 * グループが何を絞り込むのかを伝えるため、**利用側で `aria-label` を必ず指定してください**。
 *
 * キーボード操作は ARIA の radiogroup 標準に従います。
 * グループ内で Tab が止まるのは1つだけ（選択中、無ければ最初の有効なチップ）で、
 * 矢印キー / Home / End で移動し、移動と同時に選択されます。無効なチップはスキップします。
 *
 * @slot - `mi-filter-chip` 要素を配置します。
 *
 * @fires change - 選択値が変わったとき（bubbles: true）。新しい値は `event.target.value` で取得します。
 *
 * @example
 * ```html
 * <mi-filter-chip-group-single aria-label="期間" value="1m">
 *   <mi-filter-chip label="1ヶ月" value="1m"></mi-filter-chip>
 *   <mi-filter-chip label="3ヶ月" value="3m"></mi-filter-chip>
 * </mi-filter-chip-group-single>
 * ```
 */
export class MiFilterChipGroupSingle extends LitElement {
  static override styles = makeStyles(filterChipGroupStyles);

  /** 現在の選択値。子の `mi-filter-chip` の `value` と対応します。 */
  @property({ type: String, reflect: true })
  value = "";

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

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "radiogroup");
    this.addEventListener("click", this.#handleClick);
    this.addEventListener("keydown", this.#handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.#handleClick);
    this.removeEventListener("keydown", this.#handleKeyDown);
  }

  override willUpdate() {
    // value の決定は必ず描画前に済ませる。updated() の中で value を書くと
    // 更新が二重に走り、Lit が change-in-update の警告を出す
    if (!this.hasUpdated) this.#adoptInitialValue();
    this.#ensureValueMatchesChip();
  }

  override firstUpdated() {
    this.#syncChips();
  }

  override updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("value") || changed.has("disabled")) {
      this.#syncChips();
    }
  }

  override render() {
    return html`<slot @slotchange=${this.#handleSlotChange}></slot>`;
  }

  #chips(): MiFilterChip[] {
    return Array.from(this.querySelectorAll("mi-filter-chip"));
  }

  #enabledChips(): MiFilterChip[] {
    return this.#chips().filter((chip) => !chip.disabled);
  }

  /** value 未指定のときは、HTML に書かれた selected を初期値として採用する */
  #adoptInitialValue() {
    if (this.value !== "") return;
    const preselected = this.#chips().find((chip) => chip.selected);
    if (preselected) this.value = preselected.value;
  }

  #handleSlotChange = () => {
    this.#adoptInitialValue();
    this.#ensureValueMatchesChip();
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
      chip.selected = this.value !== "" && chip.value === this.value;
    }

    this.#forcedDisabled = groupDisabled;
    this.#updateRovingTabIndex();
  }

  /** グループの disabled と子個別の disabled を合わせた実効値 */
  #isDisabled(chip: MiFilterChip) {
    return this.disabled || (this.#originalDisabled.get(chip) ?? chip.disabled);
  }

  /**
   * 「常に1つ選択」を保つため、value がどのチップとも一致しないときは
   * 先頭の有効なチップへフォールバックする。
   *
   * value の入れ違い（選択肢の差し替え、URL から復元した古い値、書き間違い）で
   * 未選択になると、role="radiogroup" が支援技術に伝える状態と食い違うため。
   *
   * 利用側がプログラムから value を書いた場合と同じ扱いなので change は発火しない。
   * 有効なチップが1つも無いときは選択できる先が無いので、そのままにする。
   */
  #ensureValueMatchesChip() {
    const chips = this.#chips();
    if (chips.length === 0) return;
    if (chips.some((chip) => chip.value === this.value)) return;
    const fallback = chips.find(
      // label も value も空のチップは識別できないので選択先にしない
      (chip) => !this.#isDisabled(chip) && chip.value !== "",
    );
    if (fallback) this.value = fallback.value;
  }

  /** グループ内で tabindex=0 を持つのは1つだけ（選択中、無ければ最初の有効なチップ） */
  #updateRovingTabIndex() {
    const enabled = this.#enabledChips();
    const active = enabled.find((chip) => chip.selected) ?? enabled[0];
    for (const chip of this.#chips()) {
      if (chip.disabled) {
        chip.removeAttribute("tabindex");
        continue;
      }
      chip.setAttribute("tabindex", chip === active ? "0" : "-1");
    }
  }

  #select(chip: MiFilterChip) {
    if (chip.disabled || this.value === chip.value) return;
    this.value = chip.value;
    // updated() を待たず即座に子へ反映する（キー操作直後の focus 先を確定させるため）
    this.#syncChips();
    // ネイティブの <input type="radio"> / <select> の change に合わせて
    // 祖先までバブルさせる。Shadow DOM の外には出さない（composed は既定の false）
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // click はネイティブイベントなので止めずに祖先まで通す。
  // 選択の通知は change が担うため二重発火にはならない（docs/event-architecture.md）。
  #handleClick = (e: Event) => {
    const chip = (e.target as Element).closest(
      "mi-filter-chip",
    ) as MiFilterChip | null;
    if (!chip) return;
    this.#select(chip);
  };

  #handleKeyDown = (e: KeyboardEvent) => {
    const chips = this.#enabledChips();
    if (chips.length === 0) return;

    const current = (e.target as Element).closest(
      "mi-filter-chip",
    ) as MiFilterChip | null;
    const currentIndex = current ? chips.indexOf(current) : -1;
    if (currentIndex === -1) return;

    let nextIndex: number | undefined;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % chips.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + chips.length) % chips.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = chips.length - 1;
        break;
    }
    if (nextIndex === undefined) return;

    e.preventDefault();
    const next = chips[nextIndex];
    // ARIA の radiogroup 標準に従い、移動と同時に選択する
    this.#select(next);
    next.focus();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-filter-chip-group-single": MiFilterChipGroupSingle;
  }
}

if (!customElements.get("mi-filter-chip-group-single")) {
  customElements.define("mi-filter-chip-group-single", MiFilterChipGroupSingle);
}
