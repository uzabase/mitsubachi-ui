import "./mi-timeline-item";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./timeline.styles";

export const timelineItemSpacings = ["normal", "loose"] as const;
export type TimelineItemSpacing = (typeof timelineItemSpacings)[number];

/**
 * 子の mi-timeline-item へ位置を伝える内部用の属性。公開 API ではない。
 * 接続線の出し分けは、この属性を見て mi-timeline-item 側の CSS が行う。
 */
const POSITION_ATTRIBUTE = "data-timeline-position";

const ITEM_SELECTOR = "mi-timeline-item";

function positionOf(index: number, total: number) {
  if (index === 0) return "first";
  if (index === total - 1) return "last";
  return "middle";
}

function includesItem(nodes: NodeList) {
  for (const node of nodes) {
    if (!(node instanceof Element)) continue;
    if (node.matches(ITEM_SELECTOR) || node.querySelector(ITEM_SELECTOR)) {
      return true;
    }
  }
  return false;
}

/**
 * 位置の配り直しが必要な変更かどうか。
 * slot に入れたコンテンツが書き換わっただけでは配り直さない。
 */
function affectsPositions(record: MutationRecord) {
  // 監視しているのは hidden だけなので、属性変化は常に関係する
  if (record.type === "attributes") return true;
  return includesItem(record.addedNodes) || includesItem(record.removedNodes);
}

/**
 * 出来事や状態の変化を時系列に沿って並べるコンテナです。
 * 中に `mi-timeline-item` を並べて使います。
 *
 * 接続線の出し分け（先頭は上線なし・末尾は下線なし）は、このコンテナが
 * 表示中の `mi-timeline-item` を数えて判定します。そのため
 * 見出しなどを挟んでも、`div` でくくっても正しく描画されます。
 * `hidden` を付けたアイテムは数えないので、末尾を隠しても線が宙に浮きません。
 *
 * 表示中のアイテムが 1 件だけのときは、上下どちらの接続線も表示しません。
 *
 * アイテム同士の間隔は、このコンテナの `item-spacing` で一括制御します。
 *
 * 1画面に複数のタイムラインを置く場合は、`aria-label` でリストの名前を付けてください。
 * ホストの `aria-label` は内部のリスト要素へ転記されます。
 * `aria-labelledby` は Shadow DOM を越えて ID を参照できないため転記されません。
 *
 * @summary mi-timeline-item を時系列に並べるコンテナ
 *
 * @slot - `mi-timeline-item` 要素を配置します。
 *
 * @example
 * ```html
 * <mi-timeline item-spacing="normal" aria-label="沿革">
 *   <mi-timeline-item emphasized>2026年1月 リリース</mi-timeline-item>
 *   <mi-timeline-item>2025年12月 ベータ公開</mi-timeline-item>
 * </mi-timeline>
 * ```
 */
export class MiTimeline extends LitElement {
  static styles = makeStyles(style);

  /**
   * アイテム同士の間隔。
   * `loose` 以外の値を渡した場合は `normal` として描画する
   * （利用側が書いた属性は書き換えない）。
   * @default 'normal'
   */
  @property({ type: String, reflect: true, attribute: "item-spacing" })
  itemSpacing: TimelineItemSpacing = "normal";

  connectedCallback() {
    super.connectedCallback();
    // アイテムの増減と hidden の切り替えを拾う。
    // MutationObserver は 1 マイクロタスクぶんをまとめて 1 回通知するため、
    // ここでそのまま再計算してよい。
    this.#observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"],
    });
    this.#updatePositions();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer.disconnect();
  }

  firstUpdated() {
    // 接続時にまだ子が無かった場合（ストリーミング中の HTML など）の取りこぼし対策
    this.#updatePositions();
  }

  #observer = new MutationObserver((records) => {
    if (records.some(affectsPositions)) {
      this.#updatePositions();
    }
  });

  /**
   * 配下の mi-timeline-item を文書順に集める。
   * 入れ子の mi-timeline に属するものは、そちらの担当なので除く。
   */
  #items(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>(ITEM_SELECTOR)].filter(
      (item) => item.closest("mi-timeline") === this,
    );
  }

  /** 表示中のアイテムだけを数えて、先頭・中間・末尾を子に伝える */
  #updatePositions() {
    const items = this.#items();
    // 1 件だけ（または 0 件）のときは接続線を出さない
    const visible = items.filter((item) => !item.hasAttribute("hidden"));
    const positions = new Map<HTMLElement, string>();
    if (visible.length >= 2) {
      visible.forEach((item, index) => {
        positions.set(item, positionOf(index, visible.length));
      });
    }

    // 値が変わるものだけ書き換える（無駄なスタイル再計算を避ける）
    for (const item of items) {
      const next = positions.get(item);
      if (next === undefined) {
        item.removeAttribute(POSITION_ATTRIBUTE);
      } else if (item.getAttribute(POSITION_ATTRIBUTE) !== next) {
        item.setAttribute(POSITION_ATTRIBUTE, next);
      }
    }
  }

  render() {
    return html`
      <ol
        class="container"
        role="list"
        aria-label="${this.getAttribute("aria-label") ?? nothing}"
      >
        <slot></slot>
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mi-timeline": MiTimeline;
  }
}

if (!customElements.get("mi-timeline")) {
  customElements.define("mi-timeline", MiTimeline);
}
