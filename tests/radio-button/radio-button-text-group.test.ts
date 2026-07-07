import "../../src/components/radio-button/radio-button-text";
import "../../src/components/radio-button/radio-button-text-group";

import { describe, expect, test, vi } from "vitest";

import type { MiRadioButtonText } from "../../src/components/radio-button/radio-button-text";
import type { MiRadioButtonTextGroup } from "../../src/components/radio-button/radio-button-text-group";

function getRadioButtonTextGroup() {
  const radioButtonTextGroup = document.querySelector(
    "mi-radio-button-text-group",
  ) as MiRadioButtonTextGroup | null;
  if (!radioButtonTextGroup) {
    throw new Error("Radio button text group not found");
  }
  return radioButtonTextGroup;
}

function getSlot() {
  const shadowRoot = getRadioButtonTextGroup().shadowRoot;
  if (!shadowRoot) {
    throw new Error("Shadow root not found");
  }
  const slot = shadowRoot.querySelector("slot");
  if (!slot) {
    throw new Error("Slot not found");
  }
  return slot;
}

function getRadioButtonTexts(): MiRadioButtonText[] {
  return getSlot().assignedElements() as MiRadioButtonText[];
}

function getRadioInput(radioButtonText: MiRadioButtonText) {
  const input = radioButtonText.shadowRoot?.querySelector("input");
  if (!input) {
    throw new Error("Radio input not found");
  }
  return input as HTMLInputElement;
}

function getForm() {
  const form = document.querySelector("form");
  if (!form) {
    throw new Error("Form not found");
  }
  return form;
}

async function setup(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-radio-button-text-group");
  await customElements.whenDefined("mi-radio-button-text");

  const group = getRadioButtonTextGroup();
  await group.updateComplete;
  for (const radioButtonText of getRadioButtonTexts()) {
    await radioButtonText.updateComplete;
  }
  return group;
}

describe("mi-radio-button-text-group", () => {
  test("radio-button-textを後から追加すると、nameとcheckedが同期される", async () => {
    const group = await setup(`<mi-radio-button-text-group name="group1" value="option2">
      <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
    </mi-radio-button-text-group>`);
    const slot = getSlot();
    const slotChangePromise = new Promise<void>((resolve) => {
      slot.addEventListener("slotchange", () => resolve(), { once: true });
    });
    const radioButtonText = document.createElement(
      "mi-radio-button-text",
    ) as MiRadioButtonText;
    radioButtonText.value = "option2";
    radioButtonText.textContent = "Option 2";

    group.appendChild(radioButtonText);
    await slotChangePromise;

    expect(radioButtonText.name).toBe("group1");
    expect(radioButtonText.checked).toBe(true);
  });

  describe("name属性", () => {
    test("name属性を設定すると、子のradio-button-textに同じnameが設定される", async () => {
      await setup(`<mi-radio-button-text-group name="group1" value="option1">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      const radioButtonTexts = getRadioButtonTexts();
      expect(radioButtonTexts[0].name).toBe("group1");
      expect(radioButtonTexts[1].name).toBe("group1");
    });

    test("name属性を空文字に更新すると、子のradio-button-textのnameも空になる", async () => {
      const group = await setup(`<mi-radio-button-text-group name="group1">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      group.name = "";
      await group.updateComplete;

      const radioButtonTexts = getRadioButtonTexts();
      expect(radioButtonTexts[0].name).toBe("");
      expect(radioButtonTexts[1].name).toBe("");
    });
  });

  describe("value属性", () => {
    test("value属性を設定すると、対応するradio-button-textがcheckedになる", async () => {
      await setup(`<mi-radio-button-text-group value="option2">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
        <mi-radio-button-text value="option3">Option 3</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      const radioButtonTexts = getRadioButtonTexts();
      expect(radioButtonTexts[0].checked).toBe(false);
      expect(radioButtonTexts[1].checked).toBe(true);
      expect(radioButtonTexts[2].checked).toBe(false);
    });

    test("value属性を更新すると、選択状態が変わる", async () => {
      const group = await setup(`<mi-radio-button-text-group value="option1">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      group.value = "option2";
      await group.updateComplete;

      const radioButtonTexts = getRadioButtonTexts();
      expect(radioButtonTexts[0].checked).toBe(false);
      expect(radioButtonTexts[1].checked).toBe(true);
    });
  });

  describe("フォーム連携", () => {
    test("フォームをリセットすると、初期valueの選択状態に戻る", async () => {
      const group = await setup(`<form>
        <mi-radio-button-text-group name="choice" value="option1">
          <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
          <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
        </mi-radio-button-text-group>
      </form>`);
      const radioButtonTexts = getRadioButtonTexts();
      getRadioInput(radioButtonTexts[1]).click();
      await group.updateComplete;

      getForm().reset();
      await group.updateComplete;
      for (const radioButtonText of radioButtonTexts) {
        await radioButtonText.updateComplete;
      }

      expect(group.value).toBe("option1");
      expect(radioButtonTexts[0].checked).toBe(true);
      expect(radioButtonTexts[1].checked).toBe(false);
    });
  });

  describe("ラジオボタンのクリック", () => {
    test("ラジオボタンをクリックすると、valueが更新されchangeイベントが発火する", async () => {
      const group = await setup(`<mi-radio-button-text-group>
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
        <mi-radio-button-text value="option3">Option 3</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      const changeSpy = vi.fn();
      group.addEventListener("change", changeSpy);

      const radioButtonTexts = getRadioButtonTexts();
      getRadioInput(radioButtonTexts[0]).click();
      await group.updateComplete;

      expect(group.value).toBe("option1");
      expect(radioButtonTexts[0].checked).toBe(true);
      expect(radioButtonTexts[1].checked).toBe(false);
      expect(radioButtonTexts[2].checked).toBe(false);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toBe("option1");
    });

    test("別のラジオボタンをクリックすると、valueが更新されchangeイベントが発火する", async () => {
      const group = await setup(`<mi-radio-button-text-group value="option1">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      const changeSpy = vi.fn();
      group.addEventListener("change", changeSpy);

      const radioButtonTexts = getRadioButtonTexts();
      getRadioInput(radioButtonTexts[1]).click();
      await group.updateComplete;

      expect(group.value).toBe("option2");
      expect(radioButtonTexts[0].checked).toBe(false);
      expect(radioButtonTexts[1].checked).toBe(true);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toBe("option2");
    });

    test("changeイベントは親要素に伝搬する", async () => {
      const group = await setup(`<div>
        <mi-radio-button-text-group value="option1">
          <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
          <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
        </mi-radio-button-text-group>
      </div>`);
      const parent = group.parentElement;
      if (!parent) {
        throw new Error("Parent element not found");
      }
      const changeSpy = vi.fn();
      parent.addEventListener("change", changeSpy);

      const radioButtonTexts = getRadioButtonTexts();
      getRadioInput(radioButtonTexts[1]).click();
      await group.updateComplete;

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toBe("option2");
    });

    test("既に選択中のラジオボタンをクリックしても、changeイベントは発火しない", async () => {
      const group = await setup(`<mi-radio-button-text-group value="option1">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2">Option 2</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      const changeSpy = vi.fn();
      group.addEventListener("change", changeSpy);

      const radioButtonTexts = getRadioButtonTexts();
      getRadioInput(radioButtonTexts[0]).click();
      await group.updateComplete;

      expect(changeSpy).not.toHaveBeenCalled();
    });

    test("disabledなラジオボタンをクリックしても、valueは更新されない", async () => {
      const group = await setup(`<mi-radio-button-text-group value="option1">
        <mi-radio-button-text value="option1">Option 1</mi-radio-button-text>
        <mi-radio-button-text value="option2" disabled>Option 2</mi-radio-button-text>
      </mi-radio-button-text-group>`);

      const changeSpy = vi.fn();
      group.addEventListener("change", changeSpy);

      const radioButtonTexts = getRadioButtonTexts();
      getRadioInput(radioButtonTexts[1]).click();
      await group.updateComplete;

      expect(group.value).toBe("option1");
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });
});
