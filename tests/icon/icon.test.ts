import "../../src/components/icon";

import { describe, expect, test } from "vitest";

describe("sp-icon", () => {
  test("ツールがエラーアイコンを読み上げてはいけない", async () => {
    document.body.innerHTML = `<sp-icon type="error-fill"></sp-icon>`;
    const icon = document
      .querySelector("sp-icon")
      ?.shadowRoot?.querySelector("svg");

    const actual = icon?.getAttribute("aria-hidden");

    expect(actual).toBe("true");
  });

  test("typeで指定したアイコンが表示される", async () => {
    for (const name of [
      "error-fill",
      "information-circle",
      "person",
      "check-circle-fill",
    ]) {
      document.body.innerHTML = `<sp-icon type="${name}"></sp-icon>`;
      const icon = document
        .querySelector("sp-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });
});
