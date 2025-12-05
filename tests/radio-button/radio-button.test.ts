import "../../src/components/radio-button/sp-radio-button-text";

import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

import type { SpRadioButtonText } from "../../src/components/radio-button/sp-radio-button-text";

function getSpRadioButton() {
  return document.querySelector("sp-radio-button-text") as SpRadioButtonText;
}

function getInput() {
  return screen.getByShadowRole("radio") as HTMLInputElement;
}

function getRadioDecoration() {
  const spRadioButton = getSpRadioButton();
  const radioDecoration = spRadioButton.shadowRoot!.querySelector(".radio");
  if (!radioDecoration) {
    throw new Error("Radio decoration not found");
  }
  return radioDecoration as HTMLSpanElement;
}

function getTextById(id: string) {
  const spRadioButton = getSpRadioButton();
  const textElement = spRadioButton.shadowRoot!.getElementById(id);
  if (!textElement) {
    throw new Error("Text element not found");
  }
  return textElement as HTMLSpanElement;
}

describe("sp-radio-button-text", () => {
  describe("value属性", () => {
    test("value属性を設定すると、inputのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text value="option1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.value).toBe("option1");
    });

    test("value属性を更新すると、inputのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text value="option1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.setAttribute("value", "option2");
      await spRadioButton.updateComplete;

      const input = getInput();
      expect(input.value).toBe("option2");
    });

    test("value属性を設定しない場合、inputのvalue属性は空文字になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.value).toBe("");
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、inputのname属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text name="group1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.name).toBe("group1");
    });

    test("name属性を更新すると、inputのname属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text name="group1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.setAttribute("name", "group2");
      await spRadioButton.updateComplete;

      const input = getInput();
      expect(input.name).toBe("group2");
    });

    test("name属性を設定しない場合、inputのname属性は空文字になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.name).toBe("");
    });
  });

  describe("checked属性", () => {
    test("checked属性にtrueを設定すると、inputがチェックされた状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.checked).toBe(true);
    });

    test("checked属性に空文字列を設定すると、inputがチェックされた状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.checked).toBe(true);
    });

    test("checked属性を削除すると、inputがチェックされていない状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.removeAttribute("checked");
      await spRadioButton.updateComplete;

      const input = getInput();
      expect(input.checked).toBe(false);
    });

    test("checked属性を更新（削除）すると、inputには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.removeAttribute("checked");
      await spRadioButton.updateComplete;

      const input = getInput();
      expect(input.checked).toBe(false);
    });

    test("checked属性を設定しない場合、inputがチェックされていない状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.checked).toBe(false);
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、inputが無効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.disabled).toBe(true);
    });

    test("disabled属性に空文字列を設定すると、inputが無効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.disabled).toBe(true);
    });

    test("disabled属性を削除すると、inputが有効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.removeAttribute("disabled");
      await spRadioButton.updateComplete;

      const input = getInput();
      expect(input.disabled).toBe(false);
    });

    test("disabled属性を更新（削除）すると、inputには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.removeAttribute("disabled");
      await spRadioButton.updateComplete;

      const input = getInput();
      expect(input.disabled).toBe(false);
    });

    test("disabled属性を設定しない場合、inputが有効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const input = getInput();
      expect(input.disabled).toBe(false);
    });
  });

  test("slotに渡したテキストが表示される", async () => {
    document.body.innerHTML = `<sp-radio-button-text>Radio Label</sp-radio-button-text>`;
    await customElements.whenDefined("sp-radio-button-text");

    const spRadioButton = getSpRadioButton();
    expect(spRadioButton.textContent!.trim()).toBe("Radio Label");
  });

  describe("アクセシビリティ", () => {
    test("input要素はテキスト要素と紐付けられ、テキストの内容をラベルとして使用する", async () => {
      document.body.innerHTML = `<sp-radio-button-text>Accessible Label</sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const labelledById = getInput().getAttribute("aria-labelledby");
      const textElement = getTextById(labelledById!);

      expect(textElement).toBeTruthy();
    });

    test("テキスト要素はスクリーンリーダーで読み上げられない（この要素は表示用であり、スクリーンリーダーはinput要素のラベルを読み上げる）", async () => {
      document.body.innerHTML = `<sp-radio-button-text>Hidden Text</sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const labelledById = getInput().getAttribute("aria-labelledby");
      const textElement = getTextById(labelledById!);

      expect(textElement.getAttribute("aria-hidden")).toBe("true");
    });

    test("ラジオボタンの装飾用の要素はスクリーンリーダーで読み上げられない", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const radioDecoration = getRadioDecoration();
      expect(radioDecoration.getAttribute("aria-hidden")).toBe("true");
    });
  });

  describe("フォームの部品として正しく機能する", () => {
    test("フォームからラジオボタンの値を取得できる", async () => {
      document.body.innerHTML = `
        <form>
          <sp-radio-button-text name="choice" value="A" checked></sp-radio-button-text>
        </form>
      `;
      await customElements.whenDefined("sp-radio-button-text");

      const form = document.querySelector("form");
      const formData = new FormData(form!);
      expect(formData.get("choice")).toBe("A");
    });

    test("フォームをリセットすると、ラジオボタンの状態が初期状態（属性の値）に戻る", async () => {
      document.body.innerHTML = `
        <form>
          <sp-radio-button-text name="choice" value="A"></sp-radio-button-text>
        </form>
      `;
      await customElements.whenDefined("sp-radio-button-text");

      const spRadioButton = getSpRadioButton();
      spRadioButton.checked = true;
      expect(spRadioButton.checked).toBe(true);

      const form = document.querySelector("form") as HTMLFormElement;
      form.reset();

      expect(spRadioButton.checked).toBe(false);
    });
  });
});
