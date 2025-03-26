import "../../src/components/icon";

import { describe, expect, test } from "vitest";

describe("sp-icon", () => {
  test("ツールがエラーアイコンを読み上げてはいけない", async () => {
    document.body.innerHTML = "<sp-icon></sp-icon>";
    const icon = document
      .querySelector("sp-icon")
      ?.shadowRoot?.querySelector("svg");

    const actual = icon?.getAttribute("aria-hidden");

    expect(actual).toBe("true");
  });
});
