import "../../src/components/loading/sp-loading";

import { beforeEach, describe, expect, test } from "vitest";

import type { SpLoading } from "../../src/components/loading/sp-loading";

function getSpLoading(): SpLoading {
  return document.querySelector("sp-loading") as SpLoading;
}

function getLoadingElement(): Element | null | undefined {
  return getSpLoading().shadowRoot?.querySelector(".loading");
}

describe("sp-loading", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("ai属性", () => {
    test("ai属性を指定しない場合、normalタイプのloadingアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-loading></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const element = getLoadingElement();
      expect(element?.classList.contains("variant-normal")).toBe(true);
    });

    test("ai属性を指定した場合、aiタイプのloadingアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-loading ai></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const element = getLoadingElement();
      expect(element?.classList.contains("variant-ai")).toBe(true);
    });
  });

  describe("size属性", () => {
    test.each([
      ["medium", "size-medium"],
      ["large", "size-large"],
      ["xLarge", "size-x-large"],
      ["2xLarge", "size-2x-large"],
      ["3xLarge", "size-3x-large"],
      ["4xLarge", "size-4x-large"],
    ])(
      "size='%s'を指定すると、'%s'クラスが適用される",
      async (size, expectedClass) => {
        document.body.innerHTML = `<sp-loading size="${size}"></sp-loading>`;
        await customElements.whenDefined("sp-loading");

        const element = getLoadingElement();

        expect(element?.classList.contains(expectedClass)).toBe(true);
      },
    );

    test("デフォルトサイズはmedium", async () => {
      document.body.innerHTML = "<sp-loading></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const element = getLoadingElement();
      expect(element?.classList.contains("size-medium")).toBe(true);
    });
  });

  describe("アクセシビリティ", () => {
    test("role='status'が設定されている", async () => {
      document.body.innerHTML = "<sp-loading></sp-loading>";
      await customElements.whenDefined("sp-loading");

      const element = getLoadingElement();
      expect(element?.getAttribute("role")).toBe("status");
    });
  });
});
