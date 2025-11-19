import "../../src/components/text-field/text-field-unit";

import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

describe("sp-text-field", () => {
  test("入力すると、valueが更新される。", async () => {
    document.body.innerHTML = `<sp-text-field-unit placeholder="placeholder"></sp-text-field-unit>`;
    await customElements.whenDefined("sp-text-field");
    await customElements.whenDefined("sp-text-field-unit");

    const input = document
      .querySelector("sp-text-field-unit")
      ?.shadowRoot?.querySelector("sp-text-field")
      ?.shadowRoot?.querySelector("input");

    await page.elementLocator(input!).fill("new-text");

    expect(document.querySelector("sp-text-field-unit")?.value).toBe(
      "new-text",
    );
  });

  test(`autocomplete属性を指定できる`, async () => {
    document.body.innerHTML = `<sp-text-field-unit autocomplete="foobar"></sp-text-field-unit>`;
    await customElements.whenDefined("sp-text-field");
    await customElements.whenDefined("sp-text-field-unit");

    const input = document
      .querySelector("sp-text-field-unit")
      ?.shadowRoot?.querySelector("sp-text-field");

    expect(input?.getAttribute("autocomplete")).eq("foobar");
  });
});
