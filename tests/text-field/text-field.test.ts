import "../../src/components/text-field/text-field";

import { describe, expect, test } from "vitest";

describe("sp-text-field", () => {
  test("nameの実引数は、name属性が有効なタグの属性値になる。", async () => {
    document.body.innerHTML = `<sp-text-field name="username"></sp-text-field>`;
    await customElements.whenDefined("sp-text-field");

    const sut = document.querySelector("sp-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.name).toBe("username");
  });

  test("エラーがあるとき、name属性が有効なタグにaria-invalid属性がある", async () => {
    document.body.innerHTML = `<sp-text-field error="エラー"></sp-text-field>`;
    await customElements.whenDefined("sp-text-field");

    const sut = document.querySelector("sp-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.hasAttribute("aria-invalid")).toBe(true);
  });

  test("autocomplete属性を指定できる", async () => {
    document.body.innerHTML = `<sp-text-field autocomplete="on"></sp-text-field>`;
    await customElements.whenDefined("sp-text-field");

    const sut = document.querySelector("sp-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.getAttribute("autocomplete")).toBe("on");
  });
});
