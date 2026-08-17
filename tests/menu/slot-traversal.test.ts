import { describe, expect, test } from "vitest";

import {
  closestThroughSlots,
  querySelectorAllThroughSlots,
} from "../../src/components/menu/slot-traversal";

/** 中身をそのまま slot に流す入れ物。slot を1段挟むケースを作るために使う */
class SlotWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "<div><slot></slot></div>";
  }
}
customElements.define("slot-wrapper-a", SlotWrapper);

/** slot が2段になるケース（mi-select-box-unit と同じ構造）を作るための入れ物 */
class NestedSlotWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      "<slot-wrapper-a><slot></slot></slot-wrapper-a>";
  }
}
customElements.define("slot-wrapper-nested", NestedSlotWrapper);

/** slot に何も差し込まれなかったときのフォールバック内容を持つ入れ物 */
class FallbackWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      "<slot><span class='target' data-name='fallback'></span></slot>";
  }
}
customElements.define("slot-wrapper-fallback", FallbackWrapper);

const names = (elements: HTMLElement[]) =>
  elements.map((el) => el.dataset.name);

describe("querySelectorAllThroughSlots", () => {
  test("通常の子孫を集められる（querySelectorAll と同じ）", () => {
    document.body.innerHTML = `
      <div id="root">
        <span class="target" data-name="a"></span>
        <div><span class="target" data-name="b"></span></div>
        <span class="other"></span>
      </div>
    `;
    const root = document.querySelector("#root")!;

    expect(names(querySelectorAllThroughSlots(root, ".target"))).toEqual([
      "a",
      "b",
    ]);
  });

  test("slot に差し込まれた要素も辿れる", () => {
    document.body.innerHTML = `
      <div id="root">
        <slot-wrapper-a>
          <span class="target" data-name="slotted"></span>
        </slot-wrapper-a>
      </div>
    `;
    const wrapper = document.querySelector("slot-wrapper-a")!;

    // querySelectorAll は Shadow DOM 側の slot を辿らないので、こちらは 0 件
    expect(wrapper.shadowRoot!.querySelectorAll(".target").length).toBe(0);
    // slot をまたげば見つかる
    expect(
      names(querySelectorAllThroughSlots(wrapper.shadowRoot!, ".target")),
    ).toEqual(["slotted"]);
  });

  test("slot が2段になっていても辿れる", () => {
    document.body.innerHTML = `
      <slot-wrapper-nested>
        <span class="target" data-name="deep"></span>
      </slot-wrapper-nested>
    `;
    const nested = document.querySelector("slot-wrapper-nested")!;

    expect(
      names(querySelectorAllThroughSlots(nested.shadowRoot!, ".target")),
    ).toEqual(["deep"]);
  });

  test("差し込みが無いときは slot のフォールバック内容を辿る", () => {
    document.body.innerHTML = `<slot-wrapper-fallback></slot-wrapper-fallback>`;
    const el = document.querySelector("slot-wrapper-fallback")!;

    expect(
      names(querySelectorAllThroughSlots(el.shadowRoot!, ".target")),
    ).toEqual(["fallback"]);
  });

  test("差し込みがあるときはフォールバック内容を拾わない", () => {
    document.body.innerHTML = `
      <slot-wrapper-fallback>
        <span class="target" data-name="assigned"></span>
      </slot-wrapper-fallback>
    `;
    const el = document.querySelector("slot-wrapper-fallback")!;

    expect(
      names(querySelectorAllThroughSlots(el.shadowRoot!, ".target")),
    ).toEqual(["assigned"]);
  });

  test("一致するものが無ければ空配列", () => {
    document.body.innerHTML = `<div id="root"><span></span></div>`;
    const root = document.querySelector("#root")!;

    expect(querySelectorAllThroughSlots(root, ".target")).toEqual([]);
  });
});

describe("closestThroughSlots", () => {
  test("通常の祖先を辿れる（closest と同じ）", () => {
    document.body.innerHTML = `
      <div class="ancestor"><div><span id="child"></span></div></div>
    `;
    const child = document.querySelector("#child")!;

    expect(closestThroughSlots(child, ".ancestor")).toBe(
      document.querySelector(".ancestor"),
    );
  });

  test("自分自身も対象になる", () => {
    document.body.innerHTML = `<span id="child" class="ancestor"></span>`;
    const child = document.querySelector("#child")!;

    expect(closestThroughSlots(child, ".ancestor")).toBe(child);
  });

  test("差し込み先の祖先も辿れる", () => {
    document.body.innerHTML = `
      <slot-wrapper-a><span id="child"></span></slot-wrapper-a>
    `;
    const child = document.querySelector("#child")!;

    // closest は Light DOM しか見ないので、差し込み先の div には辿り着けない
    expect(child.closest("div")).toBeNull();
    // slot をまたげば辿り着く
    expect(closestThroughSlots(child, "div")).toBe(
      document
        .querySelector("slot-wrapper-a")!
        .shadowRoot!.querySelector("div"),
    );
  });

  test("slot が2段になっていても辿れる", () => {
    document.body.innerHTML = `
      <slot-wrapper-nested><span id="child"></span></slot-wrapper-nested>
    `;
    const child = document.querySelector("#child")!;
    const inner = document
      .querySelector("slot-wrapper-nested")!
      .shadowRoot!.querySelector("slot-wrapper-a")!;

    expect(closestThroughSlots(child, "div")).toBe(
      inner.shadowRoot!.querySelector("div"),
    );
  });

  test("見つからなければ null", () => {
    document.body.innerHTML = `<span id="child"></span>`;
    const child = document.querySelector("#child")!;

    expect(closestThroughSlots(child, ".nope")).toBeNull();
  });
});
