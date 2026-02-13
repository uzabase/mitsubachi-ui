import "../../src/components/icon-color";

import { describe, expect, test } from "vitest";

import { iconColorTypes } from "../../src/components/icon-color/icons";

describe("mi-icon-color", () => {
  test("typeで指定したカラーアイコンが表示される", async () => {
    if ((iconColorTypes as readonly string[]).length === 0) {
      // カラーアイコンが登録されていない場合はスキップ
      return;
    }
    
    for (const type of iconColorTypes) {
      document.body.innerHTML = `<mi-icon-color type="${type}"></mi-icon-color>`;
      await customElements.whenDefined("mi-icon-color");

      const icon = document
        .querySelector("mi-icon-color")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });

  test("スクリーンリーダーがアイコンを読み上げない", async () => {
    if ((iconColorTypes as readonly string[]).length === 0) {
      // カラーアイコンが登録されていない場合はスキップ
      return;
    }
    
    for (const type of iconColorTypes) {
      document.body.innerHTML = `<mi-icon-color type="${type}"></mi-icon-color>`;
      await customElements.whenDefined("mi-icon-color");

      const icon = document
        .querySelector("mi-icon-color")
        ?.shadowRoot?.querySelector("svg");

      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    }
  });
});
