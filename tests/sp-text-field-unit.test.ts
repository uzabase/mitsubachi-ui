import "../src/components/text-field-unit";

import { describe, expect, test } from "vitest";

function setUp(element: string) {
  document.body.innerHTML = element;
  const sut = document.querySelector("sp-text-field-unit");
  const input = sut?.shadowRoot
    ?.querySelector("sp-text-field")
    ?.shadowRoot?.querySelector("input");
  if (!sut) {
    throw new Error("Not found: sp-text-field-unit");
  }
  if (!input) {
    throw new Error("Not found: input");
  }

  const icon = sut?.shadowRoot
    ?.querySelector("sp-text-field-error-text")
    ?.shadowRoot?.querySelector("sp-text-field-error-icon")
    ?.shadowRoot?.querySelector("svg");
  if (!icon) {
    throw new Error("Not found: svg");
  }

  return {
    sut,
    input,
    icon,
  };
}

describe("sp-text-field-unit", () => {
  test("nameの実引数は、name属性が有効なタグの属性値になる。", async () => {
    const { input } = setUp(
      `<sp-text-field-unit text="wow" name="username"></sp-text-field-unit>`,
    );
    expect(input.name).toBe("username");
  });

  test("ツールがエラーアイコンを読み上げてはいけない", async () => {
    const { icon } = setUp(
      `<sp-text-field-unit error="エラー"></sp-text-field-unit>`,
    );
    expect(icon.getAttribute("aria-hidden")).toBe("true");
  });

  test("エラーがあるとき、name属性が有効なタグにaria-invalid属性がある", async () => {
    const { input } = setUp(
      `<sp-text-field-unit error="エラー"></sp-text-field-unit>`,
    );
    expect(input.hasAttribute("aria-invalid")).toBe(true);
  });
});
