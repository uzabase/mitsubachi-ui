import "../../src/components/icon";

import { describe, expect, test } from "vitest";

import { iconTypes } from "../../src/components/icon/icons";

describe("mi-icon", () => {
  test("typeで指定したアイコンが表示される", async () => {
    for (const type of iconTypes) {
      document.body.innerHTML = `<mi-icon type="${type}"></mi-icon>`;
      await customElements.whenDefined("mi-icon");

      const icon = document
        .querySelector("mi-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });

  test("スクリーンリーダーがアイコンを読み上げない", async () => {
    for (const type of iconTypes) {
      document.body.innerHTML = `<mi-icon type="${type}"></mi-icon>`;
      await customElements.whenDefined("mi-icon");

      const icon = document
        .querySelector("mi-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    }
  });

  test("type=error-fillである場合、アイコンの色を要素の外のcolorで変更できる", async () => {
    document.body.innerHTML = `<mi-icon type="error-fill"></mi-icon>`;
    await customElements.whenDefined("mi-icon");

    const fill = document
      .querySelector("mi-icon")
      ?.shadowRoot?.querySelector("svg")
      ?.querySelector("path")
      ?.getAttribute("fill");
    expect(fill).toBe("currentColor");
  });
});
