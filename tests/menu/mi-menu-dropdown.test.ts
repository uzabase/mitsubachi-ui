import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-action-menu-item";

import { describe, expect, test } from "vitest";

import type { MiMenuDropdown } from "../../src/components/menu/mi-menu-dropdown";

describe("mi-menu-dropdown", async () => {
  test("open=falseのとき中身が描画されない", async () => {
    document.body.innerHTML = `
      <mi-menu-dropdown>
        <mi-action-menu-item>編集</mi-action-menu-item>
      </mi-menu-dropdown>
    `;
    await customElements.whenDefined("mi-menu-dropdown");

    const el = document.querySelector("mi-menu-dropdown") as MiMenuDropdown;
    await el.updateComplete;

    const popup = el.shadowRoot?.querySelector(".popup");
    expect(popup).toBeNull();
  });

  test("open=trueのとき中身が描画される", async () => {
    document.body.innerHTML = `
      <mi-menu-dropdown open>
        <mi-action-menu-item>編集</mi-action-menu-item>
      </mi-menu-dropdown>
    `;
    await customElements.whenDefined("mi-menu-dropdown");

    const el = document.querySelector("mi-menu-dropdown") as MiMenuDropdown;
    await el.updateComplete;

    const popup = el.shadowRoot?.querySelector(".popup");
    expect(popup).not.toBeNull();
  });

  test("popupにrole=menuが設定される", async () => {
    document.body.innerHTML = `
      <mi-menu-dropdown open>
        <mi-action-menu-item>編集</mi-action-menu-item>
      </mi-menu-dropdown>
    `;
    await customElements.whenDefined("mi-menu-dropdown");

    const el = document.querySelector("mi-menu-dropdown") as MiMenuDropdown;
    await el.updateComplete;

    const popup = el.shadowRoot?.querySelector(".popup");
    expect(popup?.getAttribute("role")).toBe("menu");
  });
});
