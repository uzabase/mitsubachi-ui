import "../../src/components/floating-button/sp-floating-button";

import { beforeEach, describe, expect, test, vi } from "vitest";

import type { SpFloatingButton } from "../../src/components/floating-button/sp-floating-button";

function getSpFloatingButton(): SpFloatingButton {
  return document.querySelector("sp-floating-button") as SpFloatingButton;
}

function isLoading(): boolean {
  return getSpFloatingButton().shadowRoot?.querySelector("sp-loading") !== null;
}

describe("sp-floating-button", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("loading属性", () => {
    test("loading属性にtrueを設定すると、ローディング状態になる", async () => {
      document.body.innerHTML =
        '<sp-floating-button loading="true"></sp-floating-button>';
      await customElements.whenDefined("sp-floating-button");

      expect(isLoading()).toBe(true);
    });

    test("loading属性に空文字列を設定すると、ローディング状態になる", async () => {
      document.body.innerHTML =
        "<sp-floating-button loading></sp-floating-button>";
      await customElements.whenDefined("sp-floating-button");

      expect(isLoading()).toBe(true);
    });

    test("loading属性を設定しない場合、ローディング状態ではない", async () => {
      document.body.innerHTML = "<sp-floating-button></sp-floating-button>";
      await customElements.whenDefined("sp-floating-button");

      expect(isLoading()).toBe(false);
    });

    test("loading属性を削除すると、ローディング状態が解除される", async () => {
      document.body.innerHTML =
        "<sp-floating-button loading></sp-floating-button>";
      await customElements.whenDefined("sp-floating-button");

      const spFloatingButton = getSpFloatingButton();
      spFloatingButton.removeAttribute("loading");
      await spFloatingButton.updateComplete;

      expect(isLoading()).toBe(false);
    });
  });

  describe("clickイベント", () => {
    test("クリックすると、clickイベントが発行される", async () => {
      document.body.innerHTML = "<sp-floating-button></sp-floating-button>";
      await customElements.whenDefined("sp-floating-button");

      const spFloatingButton = getSpFloatingButton();
      const clickHandler = vi.fn();
      spFloatingButton.addEventListener("click", clickHandler);

      spFloatingButton.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
