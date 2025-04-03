import "../../src/components/logo";

import { describe, expect, test } from "vitest";

describe("sp-logo", () => {
  test("languageがcn, en, jpのときアイコンが表示される", async () => {
    for (const language of ["en", "cn", "jp"]) {
      document.body.innerHTML = `<sp-logo language="${language}"></sp-logo>`;
      const icon = document
        .querySelector("sp-logo")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });
});
