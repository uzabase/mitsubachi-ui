import "../../src/components/chip/mi-input-chip-group";

import { describe, expect, test, vi } from "vitest";

import type { MiInputChipGroup } from "../../src/components/chip/mi-input-chip-group";

function getMiInputChipGroup() {
  return document.querySelector("mi-input-chip-group") as MiInputChipGroup;
}

function getContainer() {
  return getMiInputChipGroup().shadowRoot?.querySelector(".container");
}

function getItems() {
  return getMiInputChipGroup().shadowRoot?.querySelectorAll(".item") ?? [];
}

function getChips() {
  return (
    getMiInputChipGroup().shadowRoot?.querySelectorAll("mi-input-chip") ?? []
  );
}

describe("mi-input-chip-group", () => {
  describe("items属性", () => {
    test("items属性を設定すると、Chipが表示される", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [
        { id: "1", label: "Apple" },
        { id: "2", label: "Banana" },
      ];
      await el.updateComplete;

      expect(getChips().length).toBe(2);
    });

    test("各Chipに正しいlabelが設定される", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [
        { id: "1", label: "Apple" },
        { id: "2", label: "Banana" },
      ];
      await el.updateComplete;

      const chips = getChips();
      expect(chips[0].getAttribute("label")).toBe("Apple");
      expect(chips[1].getAttribute("label")).toBe("Banana");
    });

    test("items属性が空配列の場合、Chipが表示されない", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [];
      await el.updateComplete;

      expect(getChips().length).toBe(0);
    });

    test("items属性を更新すると、Chipが更新される", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [{ id: "1", label: "Apple" }];
      await el.updateComplete;
      expect(getChips().length).toBe(1);

      el.items = [
        { id: "1", label: "Apple" },
        { id: "2", label: "Banana" },
        { id: "3", label: "Cherry" },
      ];
      await el.updateComplete;
      expect(getChips().length).toBe(3);
    });
  });

  describe("removeイベント", () => {
    test("Chipの削除ボタンをクリックすると、removeイベントが発火する", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [
        { id: "1", label: "Apple" },
        { id: "2", label: "Banana" },
      ];
      await el.updateComplete;

      const handler = vi.fn();
      el.addEventListener("remove", handler);

      const chips = getChips();
      await customElements.whenDefined("mi-input-chip");
      const iconButton = chips[1].shadowRoot?.querySelector("mi-icon-button");
      await customElements.whenDefined("mi-icon-button");
      const button =
        iconButton?.shadowRoot?.querySelector<HTMLButtonElement>("button");
      button?.click();

      expect(handler).toHaveBeenCalledTimes(1);
      expect((handler.mock.calls[0][0] as CustomEvent).detail.id).toBe("2");
    });

    test("removeイベントがbubbles: falseとcomposed: falseを持つ", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [{ id: "1", label: "Apple" }];
      await el.updateComplete;

      let event: CustomEvent | null = null;
      el.addEventListener("remove", (e) => {
        event = e as CustomEvent;
      });

      const chips = getChips();
      await customElements.whenDefined("mi-input-chip");
      const iconButton = chips[0].shadowRoot?.querySelector("mi-icon-button");
      await customElements.whenDefined("mi-icon-button");
      const button =
        iconButton?.shadowRoot?.querySelector<HTMLButtonElement>("button");
      button?.click();

      expect(event).toBeTruthy();
      expect(event!.bubbles).toBe(false);
      expect(event!.composed).toBe(false);
      expect(event!.cancelable).toBe(false);
    });
  });

  describe("アクセシビリティ", () => {
    test("コンテナにrole=listが設定される", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [{ id: "1", label: "Apple" }];
      await el.updateComplete;

      expect(getContainer()?.getAttribute("role")).toBe("list");
    });

    test("各アイテムにrole=listitemが設定される", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      el.items = [
        { id: "1", label: "Apple" },
        { id: "2", label: "Banana" },
      ];
      await el.updateComplete;

      const items = getItems();
      for (const item of items) {
        expect(item.getAttribute("role")).toBe("listitem");
      }
    });
  });

  describe("構造", () => {
    test("container要素が存在する", async () => {
      document.body.innerHTML = `<mi-input-chip-group></mi-input-chip-group>`;
      await customElements.whenDefined("mi-input-chip-group");

      expect(getContainer()).toBeTruthy();
    });
  });
});
