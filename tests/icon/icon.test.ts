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

  test("information-circleを指定できる", async () => {
    document.body.innerHTML = `<sp-icon type="information-circle"></sp-icon>`;
    const icon = document
      .querySelector("sp-icon")
      ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    
  });
});
