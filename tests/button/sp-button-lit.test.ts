import "../../src/components/button/sp-button-lit";

import { describe, expect, test } from "vitest";

import type { SpButtonLit } from "../../src/components/button/sp-button-lit";

function getSpButtonLit() {
  return document.querySelector("sp-button-lit") as SpButtonLit;
}

function getButton(): HTMLButtonElement | undefined | null {
  return getSpButtonLit().shadowRoot?.querySelector("button");
}

// Litコンポーネントが完全にレンダリングされるまで待つヘルパー関数
async function waitForLitComponent() {
  const element = getSpButtonLit();
  await element.updateComplete;
}

describe("sp-button-lit", () => {
  describe("テキストのslot", () => {
    test("slotに文字列を渡すと、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = "<sp-button-lit>ダウンロード</sp-button-lit>";
      await waitForLitComponent();

      const button = getSpButtonLit();

      expect(button.textContent).toBe("ダウンロード");
    });
  });

  test("name属性値指定すると、name属性が有効なタグに渡される。", async () => {
    const expected = "name";
    // arrange
    document.body.innerHTML = `<sp-button-lit name='${expected}'>ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const actual = getButton()?.getAttribute("name");
    // assert
    expect(actual).toBe(expected);
  });

  test("value属性値指定すると、value属性が有効なタグに渡される。", async () => {
    const expected = "atai";
    // arrange
    document.body.innerHTML = `<sp-button-lit value='${expected}'>ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const actual = getButton()?.getAttribute("value");
    // assert
    expect(actual).toBe(expected);
  });

  test("loading属性がtrueの時、ボタンがdisabledになる", async () => {
    // arrange
    document.body.innerHTML = `<sp-button-lit loading>ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const button = getButton();
    // assert
    expect(button?.disabled).toBe(true);
  });

  test("disabled属性がtrueの時、ボタンがdisabledになる", async () => {
    // arrange
    document.body.innerHTML = `<sp-button-lit disabled>ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const button = getButton();
    // assert
    expect(button?.disabled).toBe(true);
  });

  test("variants属性を指定すると、対応するCSSクラスが適用される", async () => {
    // arrange
    document.body.innerHTML = `<sp-button-lit variants="secondary">ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const button = getButton();
    // assert
    expect(button?.classList.contains("secondary")).toBe(true);
  });

  test("size属性を指定すると、対応するCSSクラスが適用される", async () => {
    // arrange
    document.body.innerHTML = `<sp-button-lit size="large">ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const button = getButton();
    // assert
    expect(button?.classList.contains("large")).toBe(true);
  });

  test("danger属性がtrueの時、dangerクラスが適用される", async () => {
    // arrange
    document.body.innerHTML = `<sp-button-lit danger>ダウンロード</sp-button-lit>`;
    await waitForLitComponent();
    // act
    const button = getButton();
    // assert
    expect(button?.classList.contains("danger")).toBe(true);
  });
});
