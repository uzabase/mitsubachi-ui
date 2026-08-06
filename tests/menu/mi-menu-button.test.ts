import "../../src/components/menu/mi-menu-button";

import { describe, expect, test } from "vitest";

describe("mi-menu-button", () => {
  test("デフォルトのプロパティでレンダリングされる", async () => {
    document.body.innerHTML = `
      <mi-menu-button>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button).toBeTruthy();
    expect(button?.classList.contains("primary")).toBe(true);
    expect(button?.classList.contains("medium")).toBe(true);
    expect(button?.disabled).toBe(false);
  });

  test("variant属性が反映される", async () => {
    document.body.innerHTML = `
      <mi-menu-button variant="secondary">メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("secondary")).toBe(true);
  });

  test("size属性が反映される", async () => {
    document.body.innerHTML = `
      <mi-menu-button size="large">メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("large")).toBe(true);
  });

  test('size="xLarge"のとき"x-large"クラスが適用される', async () => {
    document.body.innerHTML = `
      <mi-menu-button size="xLarge">メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("x-large")).toBe(true);
  });

  test("disabled属性でボタンが無効になる", async () => {
    document.body.innerHTML = `
      <mi-menu-button disabled>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.disabled).toBe(true);
  });

  test("loading属性でボタンが無効になりスピナーが表示される", async () => {
    document.body.innerHTML = `
      <mi-menu-button loading>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute("aria-busy")).toBe("true");

    const loading = el.shadowRoot?.querySelector("mi-loading");
    expect(loading).toBeTruthy();
  });

  test("chevron-down-smallアイコンが常に表示される", async () => {
    document.body.innerHTML = `
      <mi-menu-button>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const chevron = el.shadowRoot?.querySelector(".chevron");
    expect(chevron).toBeTruthy();
    expect(chevron?.getAttribute("type")).toBe("chevron-down-small");
  });

  test("icon-type属性で先頭アイコンが表示される", async () => {
    document.body.innerHTML = `
      <mi-menu-button icon-type="download">メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector(".icon");
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute("type")).toBe("download");
  });

  test("icon-type未指定時は先頭アイコンが表示されない", async () => {
    document.body.innerHTML = `
      <mi-menu-button>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector(".icon");
    expect(icon).toBeNull();
  });

  test("loading中は先頭アイコンが非表示になる", async () => {
    document.body.innerHTML = `
      <mi-menu-button icon-type="download" loading>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector(".icon");
    expect(icon).toBeNull();

    const loading = el.shadowRoot?.querySelector("mi-loading");
    expect(loading).toBeTruthy();
  });

  test("無効なvariant属性の場合、primaryにフォールバックする", async () => {
    document.body.innerHTML = `
      <mi-menu-button variant="invalid">メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.classList.contains("primary")).toBe(true);
  });

  test("ボタンのtype属性がbuttonである", async () => {
    document.body.innerHTML = `
      <mi-menu-button>メニュー</mi-menu-button>
    `;
    await customElements.whenDefined("mi-menu-button");

    const el = document.querySelector("mi-menu-button")!;
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.type).toBe("button");
  });
});
