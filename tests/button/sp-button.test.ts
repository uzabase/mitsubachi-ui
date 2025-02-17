import "../../src/components/button/sp-button";

import { describe, expect, test } from "vitest";

import type { SpButton } from "../../src/components/button/sp-button";

function getSpButton() {
  return document.querySelector("sp-button") as SpButton;
}

describe("sp-button", () => {
  describe("テキストのslot", () => {
    test("slotに文字列を渡すと、ボタンにその文字列が表示される", async () => {
      document.body.innerHTML = "<sp-button>ダウンロード</sp-button>";

      const button = getSpButton();

      expect(button.textContent).toBe("ダウンロード");
    });
  });
});
