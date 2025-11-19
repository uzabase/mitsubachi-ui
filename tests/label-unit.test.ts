import "../src/components/label-unit";

import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

describe("sp-label-unit", () => {
  test("空文字でないtext属性の値は表示される", async () => {
    document.body.innerHTML = `<sp-label-unit text="ラベル"></sp-label-unit>`;
    await customElements.whenDefined("sp-label-unit");

    const a = page.getByText("ラベル");

    expect(a.element().textContent).toBe("ラベル");
  });

  test("空文字でないsupport-text属性の値は表示される", async () => {
    document.body.innerHTML = `<sp-label-unit support-text="サポート" text="ラベル"></sp-label-unit>`;
    await customElements.whenDefined("sp-label-unit");

    const a = page.getByText("サポート");

    expect(a.element().textContent).toBe("サポート");
  });
});
