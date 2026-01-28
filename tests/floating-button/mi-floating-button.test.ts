import "../../src/components/floating-button/mi-floating-button";

import { beforeEach, describe, expect, test, vi } from "vitest";

import type { MiFloatingButton } from "../../src/components/floating-button/mi-floating-button";

function getMiFloatingButton(): MiFloatingButton {
  return document.querySelector("mi-floating-button") as MiFloatingButton;
}

function isLoading(): boolean {
  return getMiFloatingButton().shadowRoot?.querySelector("mi-loading") !== null;
}

describe("mi-floating-button", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("loading属性", () => {
    test("loading属性にtrueを設定すると、ローディング状態になる", async () => {
      document.body.innerHTML =
        '<mi-floating-button loading="true"></mi-floating-button>';
      await customElements.whenDefined("mi-floating-button");

      expect(isLoading()).toBe(true);
    });

    test("loading属性に空文字列を設定すると、ローディング状態になる", async () => {
      document.body.innerHTML =
        "<mi-floating-button loading></mi-floating-button>";
      await customElements.whenDefined("mi-floating-button");

      expect(isLoading()).toBe(true);
    });

    test("loading属性を設定しない場合、ローディング状態ではない", async () => {
      document.body.innerHTML = "<mi-floating-button></mi-floating-button>";
      await customElements.whenDefined("mi-floating-button");

      expect(isLoading()).toBe(false);
    });

    test("loading属性を削除すると、ローディング状態が解除される", async () => {
      document.body.innerHTML =
        "<mi-floating-button loading></mi-floating-button>";
      await customElements.whenDefined("mi-floating-button");

      const spFloatingButton = getMiFloatingButton();
      spFloatingButton.removeAttribute("loading");
      await spFloatingButton.updateComplete;

      expect(isLoading()).toBe(false);
    });
  });

  describe("clickイベント", () => {
    test("クリックすると、clickイベントが発行される", async () => {
      document.body.innerHTML = "<mi-floating-button></mi-floating-button>";
      await customElements.whenDefined("mi-floating-button");

      const spFloatingButton = getMiFloatingButton();
      const clickHandler = vi.fn();
      spFloatingButton.addEventListener("click", clickHandler);

      spFloatingButton.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
