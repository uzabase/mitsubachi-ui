import "../../src/components/text-field/text-field-unit";

import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";

describe("mi-text-field-unit", () => {
  test("入力すると、valueが更新される。", async () => {
    document.body.innerHTML = `<mi-text-field-unit placeholder="placeholder"></mi-text-field-unit>`;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const input = document
      .querySelector("mi-text-field-unit")
      ?.shadowRoot?.querySelector("mi-text-field")
      ?.shadowRoot?.querySelector("input");

    await page.elementLocator(input!).fill("new-text");

    expect(document.querySelector("mi-text-field-unit")?.value).toBe(
      "new-text",
    );
  });

  test(`autocomplete属性を指定できる`, async () => {
    document.body.innerHTML = `<mi-text-field-unit autocomplete="foobar"></mi-text-field-unit>`;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const input = document
      .querySelector("mi-text-field-unit")
      ?.shadowRoot?.querySelector("mi-text-field");

    expect(input?.getAttribute("autocomplete")).eq("foobar");
  });

  test(`autofocus属性を指定できる`, async () => {
    document.body.innerHTML = `<mi-text-field-unit autofocus="foobar"></mi-text-field-unit>`;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const miTextField = document
      .querySelector("mi-text-field-unit")
      ?.shadowRoot?.querySelector("mi-text-field");

    expect(miTextField?.hasAttribute("autofocus")).toBe(true);

    const input = miTextField?.shadowRoot?.querySelector("input");
    expect(input?.hasAttribute("autofocus")).toBe(true);
  });

  test(`submitOnEnter属性を指定すると、Enterキーでフォームが送信される`, async () => {
    document.body.innerHTML = `
      <form id="form">
        <mi-text-field-unit id="text-field" submit-on-enter></mi-text-field-unit>
      </form>
    `;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const sut = document.querySelector("#text-field");
    const form = document.querySelector("#form");

    const submitHandler = vi.fn();
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      submitHandler();
    });

    const input = sut?.shadowRoot?.querySelector("mi-text-field");
    input!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(submitHandler).toHaveBeenCalled();
  });

  test(`submitOnEnter属性が指定されていない場合は、Enterキーでフォームが送信されない`, async () => {
    document.body.innerHTML = `
      <form id="form">
        <mi-text-field-unit id="text-field"></mi-text-field-unit>
      </form>
    `;
    await customElements.whenDefined("mi-text-field");
    await customElements.whenDefined("mi-text-field-unit");

    const sut = document.querySelector("#text-field");
    const form = document.querySelector("#form");

    const submitHandler = vi.fn();
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      submitHandler();
    });

    const input = sut?.shadowRoot?.querySelector("mi-text-field")?.shadowRoot?.querySelector("input");
    input!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(submitHandler).not.toHaveBeenCalled();
  });  
});
