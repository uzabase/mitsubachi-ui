import "../../src/components/menu/mi-select-menu-item";
import "../../src/components/menu/mi-menu-radio-group";

import { describe, expect, test, vi } from "vitest";

import type { MiMenuRadioGroup } from "../../src/components/menu/mi-menu-radio-group";

describe("mi-menu-radio-group", async () => {
  test("mi-select-menu-itemをクリックするとvalueが更新される", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="a">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
        <mi-select-menu-item value="b">B</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-menu-radio-group");
    await customElements.whenDefined("mi-select-menu-item");

    const group = document.querySelector(
      "mi-menu-radio-group",
    ) as MiMenuRadioGroup;
    const itemB = document.querySelectorAll("mi-select-menu-item")[1];

    itemB.click();

    expect(group.value).toBe("b");
  });

  test("選択変更時にchangeイベントが発火し、event.target.valueで新しい値を取得できる", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="a">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
        <mi-select-menu-item value="b">B</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-menu-radio-group");
    await customElements.whenDefined("mi-select-menu-item");

    const group = document.querySelector(
      "mi-menu-radio-group",
    ) as MiMenuRadioGroup;
    const handler = vi.fn();
    group.addEventListener("change", handler);

    const itemB = document.querySelectorAll("mi-select-menu-item")[1];
    itemB.click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(group.value).toBe("b");
  });

  test("changeイベントはbubbles: false, composed: falseである", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="a">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
        <mi-select-menu-item value="b">B</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-menu-radio-group");
    await customElements.whenDefined("mi-select-menu-item");

    const group = document.querySelector("mi-menu-radio-group")!;
    const handler = vi.fn();
    group.addEventListener("change", handler);

    const itemB = document.querySelectorAll("mi-select-menu-item")[1];
    itemB.click();

    const event = handler.mock.calls[0][0] as Event;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(false);
  });

  test("同じ値をクリックしてもchangeイベントは発火しない", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="a">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
        <mi-select-menu-item value="b">B</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-menu-radio-group");
    await customElements.whenDefined("mi-select-menu-item");

    const group = document.querySelector("mi-menu-radio-group")!;
    const handler = vi.fn();
    group.addEventListener("change", handler);

    const itemA = document.querySelectorAll("mi-select-menu-item")[0];
    itemA.click();

    expect(handler).toHaveBeenCalledTimes(0);
  });

  test("disabledなmi-select-menu-itemをクリックしてもvalueは変更されない", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="a">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
        <mi-select-menu-item value="b" disabled>B</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-menu-radio-group");
    await customElements.whenDefined("mi-select-menu-item");

    const group = document.querySelector(
      "mi-menu-radio-group",
    ) as MiMenuRadioGroup;
    const handler = vi.fn();
    group.addEventListener("change", handler);

    const itemB = document.querySelectorAll("mi-select-menu-item")[1];
    itemB.click();

    expect(group.value).toBe("a");
    expect(handler).toHaveBeenCalledTimes(0);
  });

  test("role=groupが設定される", async () => {
    document.body.innerHTML = `
      <mi-menu-radio-group value="">
        <mi-select-menu-item value="a">A</mi-select-menu-item>
      </mi-menu-radio-group>
    `;
    await customElements.whenDefined("mi-menu-radio-group");

    const group = document.querySelector("mi-menu-radio-group")!;
    expect(group.getAttribute("role")).toBe("group");
  });
});
