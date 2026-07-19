import "../../src/components/chip/mi-input-chip-group";

import { describe, expect, test } from "vitest";

import type { MiInputChipGroup } from "../../src/components/chip/mi-input-chip-group";

function getMiInputChipGroup() {
  return document.querySelector("mi-input-chip-group") as MiInputChipGroup;
}

function getContainer() {
  return getMiInputChipGroup().shadowRoot?.querySelector(".container");
}

describe("mi-input-chip-group", () => {
  describe("slot", () => {
    test("slotに渡したmi-input-chipが表示される", async () => {
      document.body.innerHTML = `
        <mi-input-chip-group>
          <mi-input-chip label="Apple"></mi-input-chip>
          <mi-input-chip label="Banana"></mi-input-chip>
        </mi-input-chip-group>
      `;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      await el.updateComplete;

      const slot = getContainer()?.querySelector("slot");
      const slotted = slot?.assignedElements({ flatten: true }) ?? [];
      const chips = slotted.filter((n) => n.tagName === "MI-INPUT-CHIP");
      expect(chips.length).toBe(2);
    });
  });

  describe("アクセシビリティ", () => {
    test("コンテナにrole=listが設定される", async () => {
      document.body.innerHTML = `
        <mi-input-chip-group>
          <mi-input-chip label="Apple"></mi-input-chip>
        </mi-input-chip-group>
      `;
      await customElements.whenDefined("mi-input-chip-group");

      const el = getMiInputChipGroup();
      await el.updateComplete;

      expect(getContainer()?.getAttribute("role")).toBe("list");
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
