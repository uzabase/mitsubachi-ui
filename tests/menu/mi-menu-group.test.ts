import "../../src/components/menu/mi-menu-group";

import { describe, expect, test } from "vitest";

import type { MiMenuGroup } from "../../src/components/menu/mi-menu-group";

describe("mi-menu-group", async () => {
  test("label属性がaria-labelに反映される", async () => {
    document.body.innerHTML = `<mi-menu-group label="編集操作"></mi-menu-group>`;
    await customElements.whenDefined("mi-menu-group");

    const el = document.querySelector("mi-menu-group")!;
    expect(el.getAttribute("aria-label")).toBe("編集操作");
  });

  test("label属性がないときaria-labelが設定されない", async () => {
    document.body.innerHTML = `<mi-menu-group></mi-menu-group>`;
    await customElements.whenDefined("mi-menu-group");

    const el = document.querySelector("mi-menu-group")!;
    expect(el.hasAttribute("aria-label")).toBe(false);
  });

  test("label属性があるときグループラベルが描画される", async () => {
    document.body.innerHTML = `<mi-menu-group label="編集操作"></mi-menu-group>`;
    await customElements.whenDefined("mi-menu-group");

    const el = document.querySelector("mi-menu-group") as MiMenuGroup;
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector(".group-label");
    expect(label?.textContent).toBe("編集操作");
  });

  test("role=groupが設定される", async () => {
    document.body.innerHTML = `<mi-menu-group></mi-menu-group>`;
    await customElements.whenDefined("mi-menu-group");

    const el = document.querySelector("mi-menu-group")!;
    expect(el.getAttribute("role")).toBe("group");
  });
});
