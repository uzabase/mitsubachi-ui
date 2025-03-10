import "../src/components/label-unit";

import { page } from "@vitest/browser/context";
import { describe, expect, test } from "vitest";

describe("sp-label-unit", () => {
  test("空文字でないtext属性の値は表示される", async () => {
    document.body.innerHTML = `<sp-label-unit text="ラベル"></sp-label-unit>`;

    const a = page.getByText("ラベル");

    expect(a.element().textContent).toBe("ラベル");
  });

  test("空文字でないsupporttext属性の値は表示される", async () => {
    document.body.innerHTML = `<sp-label-unit supporttext="サポート" text="ラベル"></sp-label-unit>`;

    const a = page.getByText("サポート");

    expect(a.element().textContent).toBe("サポート");
  });
});
