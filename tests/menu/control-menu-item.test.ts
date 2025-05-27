import "../../src/components/menu/control-menu-item";

import { page } from "@vitest/browser/context";
import { describe, expect, test } from "vitest";

describe("sp-control-menu-item", async () => {
  test("text属性の値が表示される", async () => {
    document.body.innerHTML = `<sp-control-menu-item text="Test Item"></sp-control-menu-item>`;

    const found = page.getByText("Test Item");

    expect(found).toBeVisible();
  });

  test("selected属性があるときはcheckマークが表示される。", async () => {
    document.body.innerHTML = `<sp-control-menu-item selected text="Test Item"></sp-control-menu-item>`;

    const found = document
      .querySelector("sp-control-menu-item")
      ?.shadowRoot?.querySelector("sp-icon");

    const iconType = found?.getAttribute("type");
    expect(iconType).toBe("check-small");

    const icon = found?.shadowRoot?.querySelector("svg");
    expect(icon, "sp-iconが定義されている").toBeVisible();
  });
});
