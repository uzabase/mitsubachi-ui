import "../../src/components/select-box/mi-select-box";
import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-menu-radio-group";
import "../../src/components/menu/mi-select-menu-item";

import { describe, expect, test, vi } from "vitest";

import type { MiSelectBox } from "../../src/components/select-box/mi-select-box";

describe("mi-select-box", async () => {
  test("デフォルトプロパティが正しく設定される", async () => {
    document.body.innerHTML = `<mi-select-box></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    expect(el.variant).toBe("primary");
    expect(el.size).toBe("medium");
    expect(el.placeholder).toBe("");
    expect(el.value).toBe("");
    expect(el.error).toBe("");
    expect(el.disabled).toBe(false);
  });

  test("valueが空のときplaceholderが表示される", async () => {
    document.body.innerHTML = `
      <mi-select-box placeholder="選択してください"></mi-select-box>
    `;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const text = el.shadowRoot!.querySelector(".text") as HTMLElement;
    expect(text.textContent).toBe("選択してください");
    expect(text.classList.contains("placeholder")).toBe(true);
  });

  test("displayTextがあるときdisplayTextが表示される", async () => {
    document.body.innerHTML = `
      <mi-select-box display-text="営業" placeholder="選択してください"></mi-select-box>
    `;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const text = el.shadowRoot!.querySelector(".text") as HTMLElement;
    expect(text.textContent).toBe("営業");
    expect(text.classList.contains("placeholder")).toBe(false);
  });

  test("disabledが設定されるとbuttonがdisabledになる", async () => {
    document.body.innerHTML = `<mi-select-box disabled></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  test("errorが設定されるとエラー表示が出る", async () => {
    document.body.innerHTML = `
      <mi-select-box error="選択は必須です"></mi-select-box>
    `;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.classList.contains("error")).toBe(true);
    expect(button.getAttribute("aria-invalid")).toBe("true");

    const errorText = el.shadowRoot!.querySelector(
      ".error-text",
    ) as HTMLElement;
    expect(errorText).not.toBeNull();
    expect(errorText.textContent).toContain("選択は必須です");
  });

  test("disabled中はerrorが設定されてもエラー表示されない", async () => {
    document.body.innerHTML = `
      <mi-select-box disabled error="エラー"></mi-select-box>
    `;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.classList.contains("error")).toBe(false);

    const errorText = el.shadowRoot!.querySelector(".error-text");
    expect(errorText).toBeNull();
  });

  test("chevron-down-smallアイコンが表示される", async () => {
    document.body.innerHTML = `<mi-select-box></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const icon = el.shadowRoot!.querySelector("mi-icon.chevron") as HTMLElement;
    expect(icon).not.toBeNull();
    expect(icon.getAttribute("type")).toBe("chevron-down-small");
  });

  test("buttonにtype='button'が設定されている", async () => {
    document.body.innerHTML = `<mi-select-box></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.type).toBe("button");
  });

  test("aria-haspopupが設定されている", async () => {
    document.body.innerHTML = `<mi-select-box></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.getAttribute("aria-haspopup")).toBe("listbox");
  });

  test("variantがreflectされる", async () => {
    document.body.innerHTML = `<mi-select-box variant="secondary"></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    expect(el.getAttribute("variant")).toBe("secondary");
  });

  test("sizeがreflectされる", async () => {
    document.body.innerHTML = `<mi-select-box size="small"></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    expect(el.getAttribute("size")).toBe("small");
  });

  test("primaryバリアントではsize=smallを指定してもmediumとして扱われる", async () => {
    document.body.innerHTML = `<mi-select-box variant="primary" size="small"></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.classList.contains("medium")).toBe(true);
    expect(button.classList.contains("small")).toBe(false);
  });

  test("secondaryバリアントではsize=smallが有効になる", async () => {
    document.body.innerHTML = `<mi-select-box variant="secondary" size="small"></mi-select-box>`;
    await customElements.whenDefined("mi-select-box");

    const el = document.querySelector("mi-select-box") as MiSelectBox;
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    expect(button.classList.contains("small")).toBe(true);
  });

  test("選択時にchangeイベントが1回だけ発行される", async () => {
    document.body.innerHTML = `
      <mi-menu>
        <mi-select-box slot="trigger" placeholder="選択"></mi-select-box>
        <mi-menu-dropdown>
          <mi-menu-radio-group value="">
            <mi-select-menu-item value="a">項目A</mi-select-menu-item>
            <mi-select-menu-item value="b">項目B</mi-select-menu-item>
          </mi-menu-radio-group>
        </mi-menu-dropdown>
      </mi-menu>
    `;
    await customElements.whenDefined("mi-select-box");
    await customElements.whenDefined("mi-menu");
    await customElements.whenDefined("mi-select-menu-item");

    const selectBox = document.querySelector("mi-select-box") as MiSelectBox;
    await selectBox.updateComplete;

    const handler = vi.fn();
    selectBox.addEventListener("change", handler);

    const itemB = document.querySelectorAll("mi-select-menu-item")[1];
    itemB.click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(selectBox.value).toBe("b");
    expect(selectBox.displayText).toBe("項目B");
  });
});
