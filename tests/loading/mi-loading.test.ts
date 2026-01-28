import "../../src/components/loading/mi-loading";

import { beforeEach, describe, expect, test } from "vitest";

import type { MiLoading } from "../../src/components/loading/mi-loading";

function getMiLoading(): MiLoading {
  return document.querySelector("mi-loading") as MiLoading;
}

function getLoadingElement(): Element | null | undefined {
  return getMiLoading().shadowRoot?.querySelector(".loading");
}

describe("mi-loading", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("ai属性", () => {
    test("ai属性を指定しない場合、normalタイプのloadingアイコンが表示される", async () => {
      document.body.innerHTML = "<mi-loading></mi-loading>";
      await customElements.whenDefined("mi-loading");

      const element = getLoadingElement();
      expect(element?.classList.contains("variant-normal")).toBe(true);
    });

    test("ai属性を指定した場合、aiタイプのloadingアイコンが表示される", async () => {
      document.body.innerHTML = "<mi-loading ai></mi-loading>";
      await customElements.whenDefined("mi-loading");

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
        document.body.innerHTML = `<mi-loading size="${size}"></mi-loading>`;
        await customElements.whenDefined("mi-loading");

        const element = getLoadingElement();

        expect(element?.classList.contains(expectedClass)).toBe(true);
      },
    );

    test("デフォルトサイズはmedium", async () => {
      document.body.innerHTML = "<mi-loading></mi-loading>";
      await customElements.whenDefined("mi-loading");

      const element = getLoadingElement();
      expect(element?.classList.contains("size-medium")).toBe(true);
    });
  });

  describe("アクセシビリティ", () => {
    test("role='status'が設定されている", async () => {
      document.body.innerHTML = "<mi-loading></mi-loading>";
      await customElements.whenDefined("mi-loading");

      const element = getLoadingElement();
      expect(element?.getAttribute("role")).toBe("status");
    });
  });
});
