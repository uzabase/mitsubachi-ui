import "../../src/components/icon";

import { describe, expect, test } from "vitest";

import { iconTypes } from "../../src/components/icon/icons";

describe("sp-icon", () => {
  test("typeで指定したアイコンが表示される", async () => {
    for (const type of iconTypes) {
      document.body.innerHTML = `<sp-icon type="${type}"></sp-icon>`;
      await customElements.whenDefined("sp-icon");

      const icon = document
        .querySelector("sp-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });

  test("スクリーンリーダーがアイコンを読み上げない", async () => {
    for (const type of iconTypes) {
      document.body.innerHTML = `<sp-icon type="${type}"></sp-icon>`;
      await customElements.whenDefined("sp-icon");

      const icon = document
        .querySelector("sp-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon?.getAttribute("aria-hidden")).toBe("true");
    }
  });

  test("type=error-fillである場合、アイコンの色を要素の外のcolorで変更できる", async () => {
    document.body.innerHTML = `<sp-icon type="error-fill"></sp-icon>`;
    await customElements.whenDefined("sp-icon");

    const fill = document
      .querySelector("sp-icon")
      ?.shadowRoot?.querySelector("svg")
      ?.querySelector("path")
      ?.getAttribute("fill");
    expect(fill).toBe("currentColor");
  });
});
