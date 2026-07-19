import "../../src/components/menu/mi-sub-menu-item";

import type { LitElement } from "lit";
import { describe, expect, test } from "vitest";

describe("mi-sub-menu-item", async () => {
  test("disabled時はクリックしてもサブメニューが開かない", async () => {
    document.body.innerHTML = `<mi-sub-menu-item disabled>移動先</mi-sub-menu-item>`;
    await customElements.whenDefined("mi-sub-menu-item");

    const el = document.querySelector("mi-sub-menu-item")!;
    el.click();

    expect(el.getAttribute("aria-expanded")).toBe("false");
  });

  test("role=menuitemが設定される", async () => {
    document.body.innerHTML = `<mi-sub-menu-item>移動先</mi-sub-menu-item>`;
    await customElements.whenDefined("mi-sub-menu-item");

    const el = document.querySelector("mi-sub-menu-item")!;
    expect(el.getAttribute("role")).toBe("menuitem");
  });

  test("aria-haspopup=menuが設定される", async () => {
    document.body.innerHTML = `<mi-sub-menu-item>移動先</mi-sub-menu-item>`;
    await customElements.whenDefined("mi-sub-menu-item");

    const el = document.querySelector("mi-sub-menu-item")!;
    expect(el.getAttribute("aria-haspopup")).toBe("menu");
  });

  test("クリックでaria-expandedがtrueになる", async () => {
    document.body.innerHTML = `<mi-sub-menu-item>移動先</mi-sub-menu-item>`;
    await customElements.whenDefined("mi-sub-menu-item");

    const el = document.querySelector("mi-sub-menu-item")!;
    await (el as unknown as LitElement).updateComplete;

    expect(el.getAttribute("aria-expanded")).toBe("false");

    el.click();
    await (el as unknown as LitElement).updateComplete;

    expect(el.getAttribute("aria-expanded")).toBe("true");
  });
});
