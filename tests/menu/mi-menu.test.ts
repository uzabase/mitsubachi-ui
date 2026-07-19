import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-action-menu-item";

import { describe, expect, test } from "vitest";

import type { MiMenu } from "../../src/components/menu/mi-menu";

describe("mi-menu", async () => {
  test("トリガークリックでopenが切り替わる", async () => {
    document.body.innerHTML = `
      <mi-menu>
        <button slot="trigger">Open</button>
        <mi-menu-dropdown>
          <mi-action-menu-item>編集</mi-action-menu-item>
        </mi-menu-dropdown>
      </mi-menu>
    `;
    await customElements.whenDefined("mi-menu");

    const menu = document.querySelector("mi-menu") as MiMenu;
    const trigger = document.querySelector("[slot='trigger']") as HTMLElement;

    expect(menu.open).toBe(false);

    trigger.click();
    expect(menu.open).toBe(true);

    trigger.click();
    expect(menu.open).toBe(false);
  });

  test("Escapeキーでメニューが閉じる", async () => {
    document.body.innerHTML = `
      <mi-menu open>
        <button slot="trigger">Open</button>
        <mi-menu-dropdown>
          <mi-action-menu-item>編集</mi-action-menu-item>
        </mi-menu-dropdown>
      </mi-menu>
    `;
    await customElements.whenDefined("mi-menu");

    const menu = document.querySelector("mi-menu") as MiMenu;
    expect(menu.open).toBe(true);

    menu.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(menu.open).toBe(false);
  });

  test("menu-item-activateイベントでメニューが閉じる", async () => {
    document.body.innerHTML = `
      <mi-menu open>
        <button slot="trigger">Open</button>
        <mi-menu-dropdown>
          <mi-action-menu-item>編集</mi-action-menu-item>
        </mi-menu-dropdown>
      </mi-menu>
    `;
    await customElements.whenDefined("mi-menu");
    await customElements.whenDefined("mi-action-menu-item");

    const menu = document.querySelector("mi-menu") as MiMenu;
    expect(menu.open).toBe(true);

    const item = document.querySelector("mi-action-menu-item")!;
    item.click();

    expect(menu.open).toBe(false);
  });

  test("closeMenu()でメニューが閉じる", async () => {
    document.body.innerHTML = `
      <mi-menu open>
        <button slot="trigger">Open</button>
        <mi-menu-dropdown>
          <mi-action-menu-item>編集</mi-action-menu-item>
        </mi-menu-dropdown>
      </mi-menu>
    `;
    await customElements.whenDefined("mi-menu");

    const menu = document.querySelector("mi-menu") as MiMenu;
    expect(menu.open).toBe(true);

    menu.closeMenu();
    expect(menu.open).toBe(false);
  });
});
