import "../../src/components/select-box/mi-select-box-unit";
import "../../src/components/menu/mi-select-menu-item";

import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";

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
    expect(el.variant).toBe("primary");
    expect(el.size).toBe("medium");
    expect(el.placeholder).toBe("");
    expect(el.value).toBe("");
    expect(el.name).toBe("");
    expect(el.error).toBe("");
    expect(el.disabled).toBe(false);
  });

  // ユニット経由では選択肢が slot を2段（unit → select-box）またぐため、個別に確認する
  describe("選択肢を子要素として受け取る", () => {
    const setup = async (attrs = "") => {
      document.body.innerHTML = `
        <mi-select-box-unit text="部署" ${attrs}>
          <mi-select-menu-item value="sales">営業</mi-select-menu-item>
          <mi-select-menu-item value="marketing">マーケティング</mi-select-menu-item>
        </mi-select-box-unit>
      `;
      await customElements.whenDefined("mi-select-box-unit");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector(
        "mi-select-box-unit",
      ) as MiSelectBoxUnit;
      await element.updateComplete;

      const selectBox = element.shadowRoot!.querySelector("mi-select-box")!;
      await selectBox.updateComplete;

      return {
        element,
        selectBox,
        items: Array.from(document.querySelectorAll("mi-select-menu-item")),
      };
    };

    test("項目を選ぶと value と表示テキストが更新される", async () => {
      const { element, selectBox, items } = await setup();

      items[1].click();
      await selectBox.updateComplete;
      await element.updateComplete;

      expect(element.value).toBe("marketing");
      expect(element.displayText).toBe("マーケティング");

      const text = selectBox.shadowRoot!.querySelector(".text")!;
      expect(text.textContent?.trim()).toBe("マーケティング");
    });

    test("選択中の項目にチェックが付く", async () => {
      const { selectBox, items } = await setup();

      items[0].click();
      await selectBox.updateComplete;
      await (items[0] as HTMLElement & { updateComplete: Promise<unknown> })
        .updateComplete;

      expect(items[0].hasAttribute("selected")).toBe(true);
      expect(items[1].hasAttribute("selected")).toBe(false);
    });

    test("change がホスト要素から発火し直される", async () => {
      const { element, items } = await setup();

      const handler = vi.fn();
      element.addEventListener("change", handler);

      items[0].click();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(element.value).toBe("sales");
    });

    test("実際のマウス操作でも選択できる", async () => {
      const { element, selectBox } = await setup();

      const button = selectBox.shadowRoot!.querySelector("button")!;
      await page.elementLocator(button).click();
      await selectBox.shadowRoot!.querySelector("mi-menu")!.updateComplete;

      const item = document.querySelector(
        'mi-select-menu-item[value="marketing"]',
      ) as HTMLElement;
      await page.elementLocator(item).click();
      await selectBox.updateComplete;
      await element.updateComplete;

      expect(element.value).toBe("marketing");
      expect(element.displayText).toBe("マーケティング");
    });

    test("内部連絡用の menu-item-activate が外に漏れない", async () => {
      const { element, selectBox, items } = await setup();

      const outerHandler = vi.fn();
      document.body.addEventListener("menu-item-activate", outerHandler);

      const menu = selectBox.shadowRoot!.querySelector("mi-menu")!;
      selectBox.shadowRoot!.querySelector("button")!.click();
      await menu.updateComplete;

      items[0].click();
      await menu.updateComplete;
      await element.updateComplete;

      expect(menu.open).toBe(false);
      expect(outerHandler).not.toHaveBeenCalled();
      document.body.removeEventListener("menu-item-activate", outerHandler);
    });

    test("name を指定すると FormData に値が含まれる", async () => {
      document.body.innerHTML = `
        <form>
          <mi-select-box-unit text="部署" name="department">
            <mi-select-menu-item value="sales">営業</mi-select-menu-item>
          </mi-select-box-unit>
        </form>
      `;
      await customElements.whenDefined("mi-select-box-unit");
      await customElements.whenDefined("mi-select-menu-item");

      const element = document.querySelector(
        "mi-select-box-unit",
      ) as MiSelectBoxUnit;
      await element.updateComplete;

      document.querySelector("mi-select-menu-item")!.click();
      await element.updateComplete;

      const formData = new FormData(document.querySelector("form")!);
      expect(formData.get("department")).toBe("sales");
    });
  });
});
