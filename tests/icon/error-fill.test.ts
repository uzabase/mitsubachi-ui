import "../../src/components/icon/error-fill";

import { describe, expect, test } from "vitest";

describe("sp-icon-error-fill", () => {
  test("ツールがエラーアイコンを読み上げてはいけない", async () => {
    document.body.innerHTML = "<sp-icon-error-fill></sp-icon-error-fill>";
    const icon = document
      .querySelector("sp-icon-error-fill")
      ?.shadowRoot?.querySelector("svg");

    const actual = icon?.getAttribute("aria-hidden");

    expect(actual).toBe("true");
  });
});
