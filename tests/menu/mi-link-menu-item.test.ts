import "../../src/components/menu/mi-link-menu-item";

import type { LitElement } from "lit";
import { describe, expect, test, vi } from "vitest";

describe("mi-link-menu-item", async () => {
  test("href属性が内部のaタグに反映される", async () => {
    document.body.innerHTML = `<mi-link-menu-item href="/settings">設定</mi-link-menu-item>`;
    await customElements.whenDefined("mi-link-menu-item");

    const el = document.querySelector("mi-link-menu-item")!;
    await (el as LitElement).updateComplete;

    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe("/settings");
  });

  test("new-window属性があるときtarget=_blankとrel=noopener noreferrerが設定される", async () => {
    document.body.innerHTML = `<mi-link-menu-item href="https://example.com" new-window>ヘルプ</mi-link-menu-item>`;
    await customElements.whenDefined("mi-link-menu-item");

    const el = document.querySelector("mi-link-menu-item")!;
    await (el as LitElement).updateComplete;

    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor?.getAttribute("target")).toBe("_blank");
    expect(anchor?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  test("new-window属性がないときtargetとrelが設定されない", async () => {
    document.body.innerHTML = `<mi-link-menu-item href="/settings">設定</mi-link-menu-item>`;
    await customElements.whenDefined("mi-link-menu-item");

    const el = document.querySelector("mi-link-menu-item")!;
    await (el as LitElement).updateComplete;

    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor?.hasAttribute("target")).toBe(false);
    expect(anchor?.hasAttribute("rel")).toBe(false);
  });

  test("クリック時にmenu-item-activateイベントが発火する", async () => {
    document.body.innerHTML = `<mi-link-menu-item href="/settings">設定</mi-link-menu-item>`;
    await customElements.whenDefined("mi-link-menu-item");

    const el = document.querySelector("mi-link-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("menu-item-activateイベントはbubbles: true, composed: falseである", async () => {
    document.body.innerHTML = `<mi-link-menu-item href="/settings">設定</mi-link-menu-item>`;
    await customElements.whenDefined("mi-link-menu-item");

    const el = document.querySelector("mi-link-menu-item")!;
    const handler = vi.fn();
    el.addEventListener("menu-item-activate", handler);

    el.click();

    const event = handler.mock.calls[0][0] as Event;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(false);
  });

  test("role=menuitemが設定される", async () => {
    document.body.innerHTML = `<mi-link-menu-item href="/settings">設定</mi-link-menu-item>`;
    await customElements.whenDefined("mi-link-menu-item");

    const el = document.querySelector("mi-link-menu-item")!;
    expect(el.getAttribute("role")).toBe("menuitem");
  });
});
