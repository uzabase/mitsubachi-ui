import "../../src/components/menu/control-menu-item";

import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

describe("mi-control-menu-item", async () => {
  test("text属性の値が表示される", async () => {
    document.body.innerHTML = `<mi-control-menu-item text="Test Item"></mi-control-menu-item>`;
    await customElements.whenDefined("mi-icon");
    await customElements.whenDefined("mi-control-menu-item");

    const found = page.getByText("Test Item");

    expect(found).toBeVisible();
  });

  test("selected属性があるときはcheckマークが表示される。", async () => {
    document.body.innerHTML = `<mi-control-menu-item selected text="Test Item"></mi-control-menu-item>`;
    await customElements.whenDefined("mi-icon");
    await customElements.whenDefined("mi-control-menu-item");

    const found = document
      .querySelector("mi-control-menu-item")
      ?.shadowRoot?.querySelector("mi-icon");

    const iconType = found?.getAttribute("type");
    expect(iconType).toBe("check-small");

    const icon = found?.shadowRoot?.querySelector("svg");
    expect(icon, "mi-iconが定義されている").toBeVisible();
  });
});
