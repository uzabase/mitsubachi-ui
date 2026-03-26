import "../../src/components/search-box/mi-search-box";

import { describe, expect, test, vi } from "vitest";

import type { MiSearchBox } from "../../src/components/search-box/mi-search-box";

function getSearchBox() {
  return document.querySelector("mi-search-box") as MiSearchBox;
}

function getInput() {
  return getSearchBox().shadowRoot?.querySelector('input[type="search"]') as
    | HTMLInputElement
    | null
    | undefined;
}

function getClearButton() {
  return getSearchBox().shadowRoot?.querySelector(".clear-button") as
    | HTMLButtonElement
    | null
    | undefined;
}

describe("mi-search-box", () => {
  test("variant属性に応じてコンテナに primary / secondary クラスが付く", async () => {
    document.body.innerHTML = `<mi-search-box variant="secondary"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const container = getSearchBox().shadowRoot?.querySelector("search");
    expect(container?.classList.contains("secondary")).toBe(true);
    expect(container?.classList.contains("primary")).toBe(false);
  });

  test("内部の input は type=search", async () => {
    document.body.innerHTML = `<mi-search-box></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    expect(getInput()?.type).toBe("search");
  });

  test("name属性が input に渡る", async () => {
    document.body.innerHTML = `<mi-search-box name="q"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    expect(getInput()?.name).toBe("q");
  });

  test("input-id が内部 input の id になる", async () => {
    document.body.innerHTML = `<mi-search-box input-id="search-field"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    expect(getInput()?.id).toBe("search-field");
  });

  test("value があるときクリアボタンが表示され、押下で値が空になり clear イベントが発火する", async () => {
    document.body.innerHTML = `<mi-search-box value="hello"></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = getSearchBox();
    await sut.updateComplete;

    expect(getClearButton()).toBeTruthy();

    const clearHandler = vi.fn();
    sut.addEventListener("clear", clearHandler);

    getClearButton()?.click();
    await sut.updateComplete;

    expect(sut.value).toBe("");
    expect(getInput()?.value).toBe("");
    expect(clearHandler).toHaveBeenCalledTimes(1);
  });

  test("disabled のときはクリアボタンが表示されない", async () => {
    document.body.innerHTML = `<mi-search-box value="hello" disabled></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = getSearchBox();
    await sut.updateComplete;

    expect(getClearButton()).toBeFalsy();
  });

  test("内部 input の change が composed でないとき、ホストで composed 付きで再発火される", async () => {
    document.body.innerHTML = `<mi-search-box></mi-search-box>`;
    await customElements.whenDefined("mi-search-box");

    const sut = getSearchBox();
    await sut.updateComplete;

    const handler = vi.fn();
    sut.addEventListener("change", handler);

    getInput()?.dispatchEvent(
      new Event("change", { bubbles: true, composed: false }),
    );

    expect(handler).toHaveBeenCalledTimes(1);
    expect((handler.mock.calls[0][0] as Event).composed).toBe(true);
  });
});
