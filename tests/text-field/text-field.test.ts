import "../../src/components/text-field/text-field";

import { describe, expect, test, vi } from "vitest";

describe("mi-text-field", () => {
  test("nameの実引数は、name属性が有効なタグの属性値になる。", async () => {
    document.body.innerHTML = `<mi-text-field name="username"></mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.name).toBe("username");
  });

  test("エラーがあるとき、name属性が有効なタグにaria-invalid属性がある", async () => {
    document.body.innerHTML = `<mi-text-field error="エラー"></mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.hasAttribute("aria-invalid")).toBe(true);
  });

  test("autocomplete属性を指定できる", async () => {
    document.body.innerHTML = `<mi-text-field autocomplete="on"></mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.getAttribute("autocomplete")).toBe("on");
  });

  test("autofocus属性を指定できる", async () => {
    document.body.innerHTML = `<mi-text-field autofocus></mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field");

    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.hasAttribute("autofocus")).toBe(true);
  });

  test("submitOnEnter属性を指定すると、Enterキーでフォームが送信される", async () => {
    document.body.innerHTML = `
      <form id="form">
        <mi-text-field id="text-field" submit-on-enter></mi-text-field>
      </form>
    `;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("#text-field");
    const form = document.querySelector("#form");

    const input = sut?.shadowRoot?.querySelector("input");

    const submitHandler = vi.fn();
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      submitHandler();
    });

    input!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(submitHandler).toHaveBeenCalled();
  });

  test("submitOnEnter属性が指定されていない場合は、Enterキーでフォームが送信されない", async () => {
    document.body.innerHTML = `
      <form id="form">
        <mi-text-field id="text-field"></mi-text-field>
      </form>
    `;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("#text-field");
    const form = document.querySelector("#form");

    const input = sut?.shadowRoot?.querySelector("input");

    const submitHandler = vi.fn();
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      submitHandler();
    });

    input?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(submitHandler).not.toHaveBeenCalled();
  });
});
