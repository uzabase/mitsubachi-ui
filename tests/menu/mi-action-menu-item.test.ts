import "../../src/components/menu/mi-action-menu-item";

import { describe, expect, test, vi } from "vitest";

describe("mi-action-menu-item", async () => {
  test("variant属性に応じてattributeが反映される", async () => {
    document.body.innerHTML = `<mi-action-menu-item variant="danger">削除</mi-action-menu-item>`;
    await customElements.whenDefined("mi-action-menu-item");

    const el = document.querySelector("mi-action-menu-item")!;
    expect(el.getAttribute("variant")).toBe("danger");
  });

  test("disabled時はクリックしてもmenu-item-activateが発火しない", async () => {
    document.body.innerHTML = `<mi-action-menu-item disabled>編集</mi-action-menu-item>`;
    await customElements.whenDefined("mi-action-menu-item");

    const el = document.querySelector("mi-action-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    expect(handler).toHaveBeenCalledTimes(0);
  });

  test("クリック時にmenu-item-activateイベントが発火する", async () => {
    document.body.innerHTML = `<mi-action-menu-item>編集</mi-action-menu-item>`;
    await customElements.whenDefined("mi-action-menu-item");

    const el = document.querySelector("mi-action-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("menu-item-activateイベントはbubbles: true, composed: falseである", async () => {
    document.body.innerHTML = `<mi-action-menu-item>編集</mi-action-menu-item>`;
    await customElements.whenDefined("mi-action-menu-item");

    const el = document.querySelector("mi-action-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    const event = handler.mock.calls[0][0] as Event;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(false);
  });

  test("role=menuitemが設定される", async () => {
    document.body.innerHTML = `<mi-action-menu-item>編集</mi-action-menu-item>`;
    await customElements.whenDefined("mi-action-menu-item");

    const el = document.querySelector("mi-action-menu-item")!;
    expect(el.getAttribute("role")).toBe("menuitem");
  });
});
