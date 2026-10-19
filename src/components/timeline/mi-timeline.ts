import "./mi-timeline-item";

import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { makeStyles } from "../styles";
import style from "./timeline.styles";

export const timelineItemSpacings = ["normal", "loose"] as const;
export type TimelineItemSpacing = (typeof timelineItemSpacings)[number];

/** 内部用の属性（公開 API ではない）。mi-timeline-item 側の CSS がこれを見て接続線を出し分ける */
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

function affectsPositions(record: MutationRecord) {
  // 監視しているのは hidden だけなので、属性変化は常に関係する
  if (record.type === "attributes") return true;
  return includesItem(record.addedNodes) || includesItem(record.removedNodes);
}

/**
 * @summary mi-timeline-item を時系列に並べるコンテナです。
 * 先頭・末尾の接続線の出し分けは、表示中の `mi-timeline-item` を数えて判定します。
 * アイテム同士の間隔は `item-spacing` で一括制御します。
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
   * @default 'normal'
   */
  @property({ type: String, reflect: true, attribute: "item-spacing" })
  itemSpacing: TimelineItemSpacing = "normal";

  connectedCallback() {
    super.connectedCallback();
    // ラッパーではなくホストに付けることで、利用側が書いた
    // aria-label / aria-labelledby がそのまま効く
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "list");
    }
    // MutationObserver は 1 マイクロタスクぶんをまとめて 1 回通知するため、
    // ここでそのまま再計算してよい
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

  /** 入れ子の mi-timeline に属するアイテムは、そちらの担当なので除く */
  #items(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>(ITEM_SELECTOR)].filter(
      (item) => item.closest("mi-timeline") === this,
    );
  }

  #updatePositions() {
    const items = this.#items();
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
    // ラッパー要素を描かない。ol / ul は子に li しか置けず、slot を差し込めないため
    // （ホスト自身が role="list" を持つ）
    return html`<slot></slot>`;
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
