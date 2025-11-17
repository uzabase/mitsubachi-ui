import "../../src/components/loading/sp-loading";

import { beforeEach, describe, expect, test } from "vitest";

import type { SpLoading } from "../../src/components/loading/sp-loading";

function getSpLoading(): SpLoading {
  return document.querySelector("sp-loading") as SpLoading;
}

function getSpIcon(): Element | null | undefined {
  return getSpLoading().shadowRoot?.querySelector("sp-icon");
}

describe("sp-loading", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("ai属性", () => {
    test("ai属性を指定しない場合、normalタイプのloadingアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-loading></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const spIcon = getSpIcon();
      expect(spIcon?.getAttribute("type")).toBe("loading-normal");
    });

    test("ai属性を指定した場合、aiタイプのloadingアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-loading ai></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const spIcon = getSpIcon();
      expect(spIcon?.getAttribute("type")).toBe("loading-ai");
    });
  });

  describe("size属性", () => {
    test.each([
      ["medium", "size-medium"],
      ["large", "size-large"],
      ["xLarge", "size-x-large"],
      ["2xLarge", "size-2x-large"],
      ["3xLarge", "size-3x-large"],
    ])(
      "size='%s'を指定すると、'%s'クラスが適用される",
      async (size, expectedClass) => {
        document.body.innerHTML = `<sp-loading size="${size}"></sp-loading>`;
        await customElements.whenDefined("sp-loading");

        const spLoading = getSpLoading();
        const span = spLoading.shadowRoot?.querySelector("span");

        expect(span?.classList.contains(expectedClass)).toBe(true);
      },
    );

    test("デフォルトサイズはmedium", async () => {
      document.body.innerHTML = "<sp-loading></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const spLoading = getSpLoading();
      expect(spLoading.size).toBe("medium");
    });
  });

  describe("アクセシビリティ", () => {
    test("role='status'が設定されている", async () => {
      document.body.innerHTML = "<sp-loading></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const spLoading = getSpLoading();
      const span = spLoading.shadowRoot?.querySelector("span");

      expect(span?.getAttribute("role")).toBe("status");
    });
  });
});
