import "../../src/components/radio-button/sp-radio-button-text";

import { describe, expect, test } from "vitest";

import type { SpRadioButtonText } from "../../src/components/radio-button/sp-radio-button-text";

describe("sp-radio-button-text", () => {
  const getSpRadioButton = () =>
    document.querySelector("sp-radio-button-text") as SpRadioButtonText & {
      value: string;
      name: string;
      checked: boolean;
      disabled: boolean;
    };

  const getInput = () =>
    getSpRadioButton().shadowRoot?.querySelector("input") as HTMLInputElement;

  describe("value属性", () => {
    test("value属性を設定すると、inputのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text value="option1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().value).toBe("option1");
    });

    test("value属性を更新すると、inputのvalue属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text value="option1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      const sut = getSpRadioButton();
      sut.setAttribute("value", "option2");
      await sut.updateComplete;
      expect(getInput().value).toBe("option2");
    });

    test("value属性を設定しない場合、inputのvalue属性は空文字になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().value).toBe("");
    });
  });

  describe("name属性", () => {
    test("name属性を設定すると、inputのname属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text name="group1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().name).toBe("group1");
    });

    test("name属性を更新すると、inputのname属性にも反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text name="group1"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      const sut = getSpRadioButton();
      sut.setAttribute("name", "group2");
      await sut.updateComplete;
      expect(getInput().name).toBe("group2");
    });

    test("name属性を設定しない場合、inputのname属性は空文字になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().name).toBe("");
    });
  });

  describe("checked属性", () => {
    test("checked属性にtrueを設定すると、inputがチェックされた状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().checked).toBe(true);
    });

    test("checked属性に空文字列を設定すると、inputがチェックされた状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().checked).toBe(true);
    });

    test("checked属性を削除すると、inputがチェックされていない状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      const sut = getSpRadioButton();
      sut.removeAttribute("checked");
      await sut.updateComplete;
      expect(getInput().checked).toBe(false);
    });

    test("checked属性を更新（削除）すると、inputには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text checked="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      const sut = getSpRadioButton();
      sut.removeAttribute("checked");
      await sut.updateComplete;
      expect(getInput().checked).toBe(false);
    });

    test("checked属性を設定しない場合、inputがチェックされていない状態になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().checked).toBe(false);
    });
  });

  describe("disabled属性", () => {
    test("disabled属性にtrueを設定すると、inputが無効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().disabled).toBe(true);
    });

    test("disabled属性に空文字列を設定すると、inputが無効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().disabled).toBe(true);
    });

    test("disabled属性を削除すると、inputが有効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      const sut = getSpRadioButton();
      sut.removeAttribute("disabled");
      await sut.updateComplete;
      expect(getInput().disabled).toBe(false);
    });

    test("disabled属性を更新（削除）すると、inputには更新後の状態が反映される", async () => {
      document.body.innerHTML = `<sp-radio-button-text disabled="true"></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      const sut = getSpRadioButton();
      sut.removeAttribute("disabled");
      await sut.updateComplete;
      expect(getInput().disabled).toBe(false);
    });

    test("disabled属性を設定しない場合、inputが有効になる", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");
      expect(getInput().disabled).toBe(false);
    });
  });

  test("slotに渡したテキストが表示される", async () => {
    document.body.innerHTML = `<sp-radio-button-text>Radio Label</sp-radio-button-text>`;
    await customElements.whenDefined("sp-radio-button-text");
    expect(getSpRadioButton().textContent?.trim()).toBe("Radio Label");
  });

  describe("アクセシビリティ", () => {
    test("input要素はテキスト要素と紐付けられ、テキストの内容をラベルとして使用する", async () => {
      document.body.innerHTML = `<sp-radio-button-text>Accessible Label</sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const sut = getSpRadioButton();
      const shadowRoot = sut.shadowRoot;
      const input = shadowRoot?.querySelector("input");

      const labelledById = input?.getAttribute("aria-labelledby");
      const textElement = shadowRoot?.getElementById(labelledById!);

      expect(textElement).toBeTruthy();
    });

    test("テキスト要素はスクリーンリーダーで読み上げられない（この要素は表示用であり、スクリーンリーダーはinput要素のラベルを読み上げる）", async () => {
      document.body.innerHTML = `<sp-radio-button-text>Hidden Text</sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const sut = getSpRadioButton();
      const shadowRoot = sut.shadowRoot;
      const input = shadowRoot?.querySelector("input");

      const labelledById = input?.getAttribute("aria-labelledby");
      const textElement = shadowRoot?.getElementById(labelledById!);

      expect(textElement?.getAttribute("aria-hidden")).toBe("true");
    });

    test("ラジオボタンの装飾用の要素はスクリーンリーダーで読み上げられない", async () => {
      document.body.innerHTML = `<sp-radio-button-text></sp-radio-button-text>`;
      await customElements.whenDefined("sp-radio-button-text");

      const radioDecoration =
        getSpRadioButton().shadowRoot?.querySelector(".radio");

      expect(radioDecoration?.getAttribute("aria-hidden")).toBe("true");
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

      const sut = getSpRadioButton();
      sut.checked = true;
      expect(sut.checked).toBe(true);

      const form = document.querySelector("form");
      form!.reset();

      expect(sut.checked).toBe(false);
    });
  });
});
