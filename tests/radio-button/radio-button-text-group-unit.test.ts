import "../../src/components/radio-button/radio-button-text";
import "../../src/components/radio-button/radio-button-text-group-unit";

import { describe, expect, test, vi } from "vitest";

import type { MiRadioButtonText } from "../../src/components/radio-button/radio-button-text";
import type { MiRadioButtonTextGroupUnit } from "../../src/components/radio-button/radio-button-text-group-unit";

function getUnit() {
  const unit = document.querySelector(
    "mi-radio-button-text-group-unit",
  ) as MiRadioButtonTextGroupUnit | null;
  if (!unit) {
    throw new Error("Radio button text group unit not found");
  }
  return unit;
}

function getLabelUnit() {
  const labelUnit = getUnit().shadowRoot?.querySelector("mi-label-unit");
  if (!labelUnit) {
    throw new Error("Label unit not found");
  }
  return labelUnit;
}

function getGroup() {
  const group = getUnit().shadowRoot?.querySelector(
    "mi-radio-button-text-group",
  );
  if (!group) {
    throw new Error("Radio button text group not found");
  }
  return group;
}

function getRadioButtonTexts(): MiRadioButtonText[] {
  return Array.from(getUnit().querySelectorAll("mi-radio-button-text"));
}

function getRadioInput(radioButtonText: MiRadioButtonText) {
  const input = radioButtonText.shadowRoot?.querySelector("input");
  if (!input) {
    throw new Error("Radio input not found");
  }
  return input as HTMLInputElement;
}

async function setup(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-radio-button-text-group-unit");
  await customElements.whenDefined("mi-radio-button-text-group");
  await customElements.whenDefined("mi-radio-button-text");

  const unit = getUnit();
  await unit.updateComplete;
  await getGroup().updateComplete;
  for (const radioButtonText of getRadioButtonTexts()) {
    await radioButtonText.updateComplete;
  }
  return unit;
}

describe("mi-radio-button-text-group-unit", () => {
  test("text属性を指定すると、mi-label-unitに反映される", async () => {
    await setup(
      `<mi-radio-button-text-group-unit text="選ぶなら？"></mi-radio-button-text-group-unit>`,
    );

    expect(getLabelUnit().getAttribute("text")).toBe("選ぶなら？");
  });

  test("name/value属性が、slot越しに子のmi-radio-button-textに同期される", async () => {
    await setup(`<mi-radio-button-text-group-unit name="choice" value="option2">
      <mi-radio-button-text value="option1">きのこの山</mi-radio-button-text>
      <mi-radio-button-text value="option2">たけのこの里</mi-radio-button-text>
    </mi-radio-button-text-group-unit>`);

    const radioButtonTexts = getRadioButtonTexts();
    expect(radioButtonTexts[0].name).toBe("choice");
    expect(radioButtonTexts[0].checked).toBe(false);
    expect(radioButtonTexts[1].name).toBe("choice");
    expect(radioButtonTexts[1].checked).toBe(true);
  });

  test("ラジオボタンをクリックすると、valueが更新されchangeイベントがunit自体で受け取れる", async () => {
    const unit = await setup(`<mi-radio-button-text-group-unit value="option1">
      <mi-radio-button-text value="option1">きのこの山</mi-radio-button-text>
      <mi-radio-button-text value="option2">たけのこの里</mi-radio-button-text>
    </mi-radio-button-text-group-unit>`);

    const changeSpy = vi.fn();
    unit.addEventListener("change", changeSpy);

    const radioButtonTexts = getRadioButtonTexts();
    getRadioInput(radioButtonTexts[1]).click();
    await unit.updateComplete;

    expect(unit.value).toBe("option2");
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail.value).toBe("option2");
  });

  test("フォームをリセットすると、valueが初期値に戻る", async () => {
    const unit = await setup(`<form>
      <mi-radio-button-text-group-unit name="choice" value="option1">
        <mi-radio-button-text value="option1">きのこの山</mi-radio-button-text>
        <mi-radio-button-text value="option2">たけのこの里</mi-radio-button-text>
      </mi-radio-button-text-group-unit>
    </form>`);

    const radioButtonTexts = getRadioButtonTexts();
    getRadioInput(radioButtonTexts[1]).click();
    await unit.updateComplete;
    expect(unit.value).toBe("option2");

    const form = document.querySelector("form");
    if (!form) {
      throw new Error("Form not found");
    }
    form.reset();
    await unit.updateComplete;

    expect(unit.value).toBe("option1");
  });
});
