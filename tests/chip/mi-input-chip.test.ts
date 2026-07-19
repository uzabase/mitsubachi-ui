import "../../src/components/chip/mi-input-chip";

import { describe, expect, test, vi } from "vitest";

import type { MiInputChip } from "../../src/components/chip/mi-input-chip";

function getMiInputChip() {
  return document.querySelector("mi-input-chip") as MiInputChip;
}

function getChip() {
  return getMiInputChip().shadowRoot?.querySelector(".chip");
}

function getLabel() {
  return getMiInputChip().shadowRoot?.querySelector(".label");
}

function getIconButton() {
  return getMiInputChip().shadowRoot?.querySelector("mi-icon-button");
}

describe("mi-input-chip", () => {
  describe("label属性", () => {
    test("label属性を設定すると、テキストが表示される", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      expect(getLabel()?.textContent).toBe("Apple");
    });

    test("label属性を更新すると、テキストが更新される", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      const el = getMiInputChip();
      el.label = "Banana";
      await el.updateComplete;

      expect(getLabel()?.textContent).toBe("Banana");
    });

    test("label属性を設定しない場合、空文字が表示される", async () => {
      document.body.innerHTML = `<mi-input-chip></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      expect(getLabel()?.textContent).toBe("");
    });
  });

  describe("削除ボタン", () => {
    test("mi-icon-buttonがレンダリングされる", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      const iconButton = getIconButton();
      expect(iconButton).toBeTruthy();
      expect(iconButton?.getAttribute("icon-type")).toBe("cross-small");
      expect(iconButton?.getAttribute("size")).toBe("small");
      expect(iconButton?.getAttribute("variant")).toBe("ghost");
    });

    test("削除ボタンのaria-labelが「{label}を削除」になる", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      expect(getIconButton()?.getAttribute("aria-label")).toBe("Appleを削除");
    });

    test("label属性を更新すると、削除ボタンのaria-labelも更新される", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      const el = getMiInputChip();
      el.label = "Banana";
      await el.updateComplete;

      expect(getIconButton()?.getAttribute("aria-label")).toBe("Bananaを削除");
    });
  });

  describe("removeイベント", () => {
    test("削除ボタンをクリックすると、removeイベントが発火する", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      const handler = vi.fn();
      getMiInputChip().addEventListener("remove", handler);

      const iconButton = getIconButton();
      await customElements.whenDefined("mi-icon-button");
      const button =
        iconButton?.shadowRoot?.querySelector<HTMLButtonElement>("button");
      button?.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test("removeイベントがbubbles: falseとcomposed: falseを持つ", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      let event: CustomEvent | null = null;
      getMiInputChip().addEventListener("remove", (e) => {
        event = e as CustomEvent;
      });

      const iconButton = getIconButton();
      await customElements.whenDefined("mi-icon-button");
      const button =
        iconButton?.shadowRoot?.querySelector<HTMLButtonElement>("button");
      button?.click();

      expect(event).toBeTruthy();
      expect(event!.bubbles).toBe(false);
      expect(event!.composed).toBe(false);
      expect(event!.cancelable).toBe(false);
    });
  });

  describe("構造", () => {
    test("chip要素が存在する", async () => {
      document.body.innerHTML = `<mi-input-chip label="Apple"></mi-input-chip>`;
      await customElements.whenDefined("mi-input-chip");

      expect(getChip()).toBeTruthy();
    });
  });
});
