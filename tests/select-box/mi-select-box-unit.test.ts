import "../../src/components/select-box/mi-select-box-unit";

import { describe, expect, test } from "vitest";

import type { MiSelectBoxUnit } from "../../src/components/select-box/mi-select-box-unit";

describe("mi-select-box-unit", async () => {
  test("ラベルが表示される", async () => {
    document.body.innerHTML = `
      <mi-select-box-unit text="部署"></mi-select-box-unit>
    `;
    await customElements.whenDefined("mi-select-box-unit");

    const el = document.querySelector("mi-select-box-unit") as MiSelectBoxUnit;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector("mi-label-unit");
    expect(label).not.toBeNull();
    expect(label!.getAttribute("text")).toBe("部署");
  });

  test("プロパティがmi-select-boxにプロキシされる", async () => {
    document.body.innerHTML = `
      <mi-select-box-unit
        variant="secondary"
        size="small"
        placeholder="選択してください"
        value="営業"
        error="エラー"
        disabled
      ></mi-select-box-unit>
    `;
    await customElements.whenDefined("mi-select-box-unit");

    const el = document.querySelector("mi-select-box-unit") as MiSelectBoxUnit;
    await el.updateComplete;

    const selectBox = el.shadowRoot!.querySelector("mi-select-box");
    expect(selectBox).not.toBeNull();
    expect(selectBox!.getAttribute("variant")).toBe("secondary");
    expect(selectBox!.getAttribute("size")).toBe("small");
    expect(selectBox!.getAttribute("placeholder")).toBe("選択してください");
    expect(selectBox!.getAttribute("error")).toBe("エラー");
    expect(selectBox!.hasAttribute("disabled")).toBe(true);
  });

  test("textが空のときラベルが非表示になる", async () => {
    document.body.innerHTML = `
      <mi-select-box-unit></mi-select-box-unit>
    `;
    await customElements.whenDefined("mi-select-box-unit");

    const el = document.querySelector("mi-select-box-unit") as MiSelectBoxUnit;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector("mi-label-unit");
    expect(label).not.toBeNull();
    expect(label!.classList.contains("none")).toBe(true);
  });

  test("textがあるときラベルが表示される", async () => {
    document.body.innerHTML = `
      <mi-select-box-unit text="ラベル"></mi-select-box-unit>
    `;
    await customElements.whenDefined("mi-select-box-unit");

    const el = document.querySelector("mi-select-box-unit") as MiSelectBoxUnit;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector("mi-label-unit");
    expect(label!.classList.contains("none")).toBe(false);
  });

  test("デフォルトプロパティが正しく設定される", async () => {
    document.body.innerHTML = `<mi-select-box-unit></mi-select-box-unit>`;
    await customElements.whenDefined("mi-select-box-unit");

    const el = document.querySelector("mi-select-box-unit") as MiSelectBoxUnit;
    expect(el.text).toBe("");
    expect(el.required).toBe(false);
    expect(el.variant).toBe("primary");
    expect(el.size).toBe("medium");
    expect(el.placeholder).toBe("");
    expect(el.value).toBe("");
    expect(el.error).toBe("");
    expect(el.disabled).toBe(false);
  });
});
