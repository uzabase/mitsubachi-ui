import "../../src/components/menu/mi-select-menu-item";
import "../../src/components/menu/mi-menu-radio-group";

import type { LitElement } from "lit";
import { describe, expect, test, vi } from "vitest";

describe("mi-select-menu-item", async () => {
  test("mi-menu-radio-groupのvalueと一致するとselected属性が付く", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="a">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
        <mi-select-menu-item value="b">B</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-select-menu-item");
    await customElements.whenDefined("mi-menu-radio-group");

    const items = document.querySelectorAll("mi-select-menu-item");
    // selected getterを通じて確認
    await (items[0] as unknown as LitElement).updateComplete;

    expect(items[0].hasAttribute("selected")).toBe(true);
    expect(items[1].hasAttribute("selected")).toBe(false);
  });

  test("disabled時はクリックしてもmenu-item-activateが発火しない", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="">
        <mi-select-menu-item value="a" disabled>A</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-select-menu-item");

    const el = document.querySelector("mi-select-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    expect(handler).toHaveBeenCalledTimes(0);
  });

  test("クリック時にmenu-item-activateイベントが発火する", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-select-menu-item");

    const el = document.querySelector("mi-select-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("menu-item-activateイベントはbubbles: true, composed: falseである", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-select-menu-item");

    const el = document.querySelector("mi-select-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    const event = handler.mock.calls[0][0] as Event;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(false);
  });

  test("role=menuitemradioが設定される", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-select-menu-item");

    const el = document.querySelector("mi-select-menu-item")!;
    expect(el.getAttribute("role")).toBe("menuitemradio");
  });
});
