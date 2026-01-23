import "../src/components/label-unit";

import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

describe("mi-label-unit", () => {
  test("空文字でないtext属性の値は表示される", async () => {
    document.body.innerHTML = `<mi-label-unit text="ラベル"></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");

    const a = page.getByText("ラベル");

    expect(a.element().textContent).toBe("ラベル");
  });

  test("空文字でないsupport-text属性の値は表示される", async () => {
    document.body.innerHTML = `<mi-label-unit support-text="サポート" text="ラベル"></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");

    const a = page.getByText("サポート");

    expect(a.element().textContent).toBe("サポート");
  });
});
