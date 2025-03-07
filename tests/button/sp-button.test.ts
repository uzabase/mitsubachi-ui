import "../../src/components/button/sp-button";

import { describe, expect, test } from "vitest";

import type { SpButton } from "../../src/components/button/sp-button";

function getSpButton() {
  return document.querySelector("sp-button") as SpButton;
}

function getButton(): HTMLButtonElement | undefined | null {
  return getSpButton().shadowRoot?.querySelector("button");
}

describe("sp-button", () => {
  describe("テキストのslot", () => {
    test("slotに文字列を渡すと、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = "<sp-button>ダウンロード</sp-button>";

      const button = getSpButton();

      expect(button.textContent).toBe("ダウンロード");
    });
  });

  test("name属性値指定すると、name属性が有効なタグに渡される。", async () => {
    const expected = "name";
    // arrange
    document.body.innerHTML = `<sp-button name='${expected}'>ダウンロード</sp-button>`;
    // act
    const actual = getButton()?.getAttribute("name");
    // assert
    expect(actual).toBe(expected);
  });

  test("value属性値指定すると、value属性が有効なタグに渡される。", async () => {
    const expected = "atai";
    // arrange
    document.body.innerHTML = `<sp-button value='${expected}'>ダウンロード</sp-button>`;
    // act
    const actual = getButton()?.getAttribute("value");
    // assert
    expect(actual).toBe(expected);
  });
});
