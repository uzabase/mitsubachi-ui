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

  test("slot=errorで複数のエラーメッセージが表示される", async () => {
    document.body.innerHTML = `
      <mi-text-field>
        <span slot="error">エラー1</span>
        <span slot="error">エラー2</span>
        <span slot="error">エラー3</span>
      </mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field")!;
    await sut.updateComplete;
    await sut.updateComplete;

    const helperTexts = sut.shadowRoot?.querySelectorAll("mi-helper-text");
    expect(helperTexts?.length).toBe(3);
  });

  test("error属性とslot=errorを併用した場合、error属性が先頭に表示される", async () => {
    document.body.innerHTML = `
      <mi-text-field error="単一エラー">
        <span slot="error">追加エラー1</span>
        <span slot="error">追加エラー2</span>
      </mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field")!;
    await sut.updateComplete;
    await sut.updateComplete;

    const helperTexts = sut.shadowRoot?.querySelectorAll("mi-helper-text");
    expect(helperTexts?.length).toBe(3);
    expect(helperTexts?.[0]?.textContent?.trim()).toBe("単一エラー");
    expect(helperTexts?.[1]?.textContent?.trim()).toBe("追加エラー1");
  });

  test("disabled時はslot=errorが表示されない", async () => {
    document.body.innerHTML = `
      <mi-text-field disabled>
        <span slot="error">エラー1</span>
        <span slot="error">エラー2</span>
      </mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field")!;
    await sut.updateComplete;
    await sut.updateComplete;

    const helperTexts = sut.shadowRoot?.querySelectorAll("mi-helper-text");
    expect(helperTexts?.length).toBe(0);
  });

  test("slot=errorのHTML構造が保持される", async () => {
    document.body.innerHTML = `
      <mi-text-field>
        <span slot="error">詳しくは<a href="/help">こちら</a></span>
      </mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field")!;
    await sut.updateComplete;
    await sut.updateComplete;

    const helperText = sut.shadowRoot?.querySelector("mi-helper-text");
    const link = helperText?.querySelector("a");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("/help");
  });

  test("slot=errorがあるとき、inputにaria-describedbyが設定される", async () => {
    document.body.innerHTML = `
      <mi-text-field>
        <span slot="error">エラー1</span>
        <span slot="error">エラー2</span>
      </mi-text-field>`;
    await customElements.whenDefined("mi-text-field");

    const sut = document.querySelector("mi-text-field")!;
    await sut.updateComplete;
    await sut.updateComplete;

    const input = sut.shadowRoot?.querySelector("input");
    const describedby = input?.getAttribute("aria-describedby");
    expect(describedby).toBe("error-0 error-1");

    const ids = describedby!.split(" ");
    for (const id of ids) {
      expect(sut.shadowRoot?.getElementById(id)).toBeTruthy();
    }
  });
});
