import "../../src/components/search-box/search-box";

import { describe, expect, test, vi } from "vitest";

describe("mi-search-box", () => {
  test("nameの実引数は、name属性が有効なタグの属性値になる。", async () => {
    document.body.innerHTML = `<mi-search-box name="query"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.name).toBe("query");
  });

  test("input[type=search]が使われている", async () => {
    document.body.innerHTML = `<mi-search-box></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.type).toBe("search");
  });

  test("placeholderが反映される", async () => {
    document.body.innerHTML = `<mi-search-box placeholder="検索"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.placeholder).toBe("検索");
  });

  test("disabledが反映される", async () => {
    document.body.innerHTML = `<mi-search-box disabled></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.disabled).toBe(true);
  });

  test("secondaryバリアントでerrorがあるとき、aria-invalidがtrueになる", async () => {
    document.body.innerHTML = `<mi-search-box variant="secondary" error="エラー"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.getAttribute("aria-invalid")).toBe("true");
  });

  test("primaryバリアントではerrorを指定してもaria-invalidはfalseになる", async () => {
    document.body.innerHTML = `<mi-search-box variant="primary" error="エラー"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.getAttribute("aria-invalid")).toBe("false");
  });

  test("valueがあるときクリアボタンが表示される", async () => {
    document.body.innerHTML = `<mi-search-box value="test"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const clearButton = sut?.shadowRoot?.querySelector(".clear-button");

    expect(clearButton).not.toBeNull();
  });

  test("valueが空のときクリアボタンが表示されない", async () => {
    document.body.innerHTML = `<mi-search-box></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const clearButton = sut?.shadowRoot?.querySelector(".clear-button");

    expect(clearButton).toBeNull();
  });

  test("クリアボタンにaria-labelがある", async () => {
    document.body.innerHTML = `<mi-search-box value="test"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const clearButton = sut?.shadowRoot?.querySelector(".clear-button");

    expect(clearButton?.getAttribute("aria-label")).toBe("クリア");
  });

  test("クリアボタンを押すとvalueが空になりinputイベントが発火する", async () => {
    document.body.innerHTML = `<mi-search-box value="test"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box")!;
    const clearButton = sut.shadowRoot?.querySelector(
      ".clear-button",
    ) as HTMLButtonElement;

    const inputHandler = vi.fn();
    sut.addEventListener("input", inputHandler);

    clearButton.click();

    expect(sut.value).toBe("");
    expect(inputHandler).toHaveBeenCalled();
  });

  test("入力するとvalueが更新されinputイベントが発火する", async () => {
    document.body.innerHTML = `<mi-search-box></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box")!;
    const input = sut.shadowRoot?.querySelector("input") as HTMLInputElement;

    const inputHandler = vi.fn();
    sut.addEventListener("input", inputHandler);

    input.value = "テスト";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));

    expect(sut.value).toBe("テスト");
    expect(inputHandler).toHaveBeenCalled();
  });

  test("disabled時はvalueがあってもクリアボタンが表示されない", async () => {
    document.body.innerHTML = `<mi-search-box value="test" disabled></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const clearButton = sut?.shadowRoot?.querySelector(".clear-button");

    expect(clearButton).toBeNull();
  });

  test("secondaryバリアントでerrorがあるときエラーテキストが表示される", async () => {
    document.body.innerHTML = `<mi-search-box variant="secondary" error="入力エラー"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const errorText = sut?.shadowRoot?.querySelector(".error-text");

    expect(errorText?.textContent).toBe("入力エラー");
  });

  test("variantのデフォルト値がprimaryである", async () => {
    document.body.innerHTML = `<mi-search-box></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");

    expect(sut?.variant).toBe("primary");
  });

  test("autocomplete属性を指定できる", async () => {
    document.body.innerHTML = `<mi-search-box autocomplete="on"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = document.querySelector("mi-search-box");
    const input = sut?.shadowRoot?.querySelector("input");

    expect(input?.getAttribute("autocomplete")).toBe("on");
  });
});
