/**
 * slot をまたいだ DOM 探索のヘルパー。
 *
 * `mi-menu-dropdown` や `mi-menu-radio-group` は、通常は Light DOM の子として
 * メニュー項目を受け取るが、`mi-select-box` のように Shadow DOM 内へ
 * これらを組み立てる場合、項目は `<slot>` 経由で差し込まれる。
 * その場合 `querySelectorAll` / `closest` では項目に辿り着けないため、
 * slot の割り当てを辿る版を用意する。
 */

/**
 * `selector` に一致する子孫要素を集める。`<slot>` に差し込まれた要素も辿る。
 *
 * `querySelectorAll` の代わりに使う。
 */
export function querySelectorAllThroughSlots(
  root: ParentNode,
  selector: string,
): HTMLElement[] {
  const found: HTMLElement[] = [];

  const visit = (node: Element) => {
    // slot は自身を判定せず、差し込まれた要素（無ければフォールバック内容）を辿る。
    // 差し込まれた要素がさらに slot であることもある（mi-select-box-unit のように slot が2段になる場合）
    if (node instanceof HTMLSlotElement) {
      const assigned = node.assignedElements();
      const targets =
        assigned.length > 0 ? assigned : Array.from(node.children);
      targets.forEach(visit);
      return;
    }

    if (node.matches(selector)) found.push(node as HTMLElement);
    Array.from(node.children).forEach(visit);
  };

  Array.from(root.children).forEach(visit);
  return found;
}

/**
 * `selector` に一致する最も近い祖先要素を返す。差し込み先の `<slot>` の祖先も辿る。
 *
 * `closest` の代わりに使う。
 */
export function closestThroughSlots(
  element: Element,
  selector: string,
): HTMLElement | null {
  let current: Element | null = element;

  while (current) {
    const found = current.closest(selector);
    if (found) return found as HTMLElement;
    // 自身が slot に差し込まれているなら、差し込み先から探索を続ける
    current = current.assignedSlot;
  }

  return null;
}
