import "../../src/components/logo";

import { describe, expect, test } from "vitest";

describe("sp-logo", () => {
  test("languageがzh, en, jaのときアイコンが表示される", async () => {
    for (const language of ["en", "zh", "ja"]) {
      document.body.innerHTML = `<sp-logo language="${language}"></sp-logo>`;
      const icon = document
        .querySelector("sp-logo")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });
});
