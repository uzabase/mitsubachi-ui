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

  test("アイコンがエラー系の場合、ツールが読み上げてはいけない", async () => {
    document.body.innerHTML = `<sp-icon type="error-fill"></sp-icon>`;
    await customElements.whenDefined("sp-icon");

    const icon = document
      .querySelector("sp-icon")
      ?.shadowRoot?.querySelector("svg");

    const actual = icon?.getAttribute("aria-hidden");

    expect(actual).not.toBeNull();
  });

  test("アイコンがエラー系ではない場合、ツールが読み上げる", async () => {
    for (const type of iconTypes.filter((type) => type !== "error-fill")) {
      document.body.innerHTML = `<sp-icon type="${type}"></sp-icon>`;
      await customElements.whenDefined("sp-icon");

      const icon = document
        .querySelector("sp-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon?.getAttribute("aria-hidden")).toBeNull();
    }
  });
});
