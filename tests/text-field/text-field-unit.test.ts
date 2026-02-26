import "../../src/components/text-field/text-field-unit";

import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

describe("mi-text-field-unit", () => {
  test("入力すると、valueが更新される。", async () => {
    document.body.innerHTML = `<mi-text-field-unit placeholder="placeholder"></mi-text-field-unit>`;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const input = document
      .querySelector("mi-text-field-unit")
      ?.shadowRoot?.querySelector("mi-text-field")
      ?.shadowRoot?.querySelector("input");

    await page.elementLocator(input!).fill("new-text");

    expect(document.querySelector("mi-text-field-unit")?.value).toBe(
      "new-text",
    );
  });

  test(`autocomplete属性を指定できる`, async () => {
    document.body.innerHTML = `<mi-text-field-unit autocomplete="foobar"></mi-text-field-unit>`;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const input = document
      .querySelector("mi-text-field-unit")
      ?.shadowRoot?.querySelector("mi-text-field");

    expect(input?.getAttribute("autocomplete")).eq("foobar");
  });
});
