import "../../src/components/dialog/mi-information-dialog";

import { describe, expect, test, vi } from "vitest";
import { userEvent } from "vitest/browser";

import {
  informationDialogSizes,
  type MiInformationDialog,
} from "../../src/components/dialog/mi-information-dialog";

function getInformationDialog() {
  return document.querySelector("mi-information-dialog") as MiInformationDialog;
}

function getDialogEl() {
  return getInformationDialog().shadowRoot?.querySelector("dialog");
}

function getPopup() {
  return getInformationDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-popup']",
  );
}

function getActionButton() {
  const footer = getInformationDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-footer']",
  );
  return footer?.querySelector("mi-neutral-button[variant='primary']");
}

describe("mi-information-dialog", () => {
  describe("open属性", () => {
    test("open=false のときダイアログは DOM に存在しない", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="利用規約"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const el = getInformationDialog();
      el.open = false;
      await el.updateComplete;

      expect(getDialogEl()).toBeNull();
    });

    test("open=true のときダイアログが表示される", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="利用規約"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      expect(getDialogEl()).toBeTruthy();
    });
  });

  describe("size属性", () => {
    test.each(informationDialogSizes)(
      "size='%s' のとき popup に対応する size クラスが付与される",
      async (size) => {
        document.body.innerHTML = `
          <mi-information-dialog
            open
            size="${size}"
            header-text="タイトル"
            action-label="閉じる"
          ></mi-information-dialog>
        `;
        await customElements.whenDefined("mi-information-dialog");

        const popup = getPopup();
        expect(popup?.classList.contains(`size-${size}`)).toBe(true);
      },
    );

    test("size を設定しないときデフォルトは medium", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="タイトル"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const popup = getPopup();
      expect(popup?.classList.contains("size-medium")).toBe(true);
    });

    test("無効な size のとき medium にフォールバックする", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      document.body.innerHTML = `
        <mi-information-dialog
          open
          size="invalid"
          header-text="タイトル"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const popup = getPopup();
      expect(popup?.classList.contains("size-medium")).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('"invalid" は無効な size 属性です'),
      );

      consoleSpy.mockRestore();
    });
  });

  describe("action-label", () => {
    test("action-label が閉じるボタンに表示される", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="利用規約"
          action-label="同意する"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      expect(getActionButton()?.textContent?.trim()).toBe("同意する");
    });
  });

  describe("イベント", () => {
    test("閉じるボタンをクリックすると close イベントが発火する", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="利用規約"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const el = getInformationDialog();
      let closed = false;
      el.addEventListener("close", () => {
        closed = true;
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(closed).toBe(true);
      expect(el.open).toBe(false);
    });

    test("Esc キーで閉じたとき close イベントが発火する", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="利用規約"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const el = getInformationDialog();
      let closed = false;
      el.addEventListener("close", () => {
        closed = true;
      });

      await el.updateComplete;
      const dialog = getDialogEl() as HTMLDialogElement;
      dialog.focus();
      await userEvent.keyboard("{Escape}");

      expect(closed).toBe(true);
      expect(el.open).toBe(false);
    });

    test("どの方法で閉じても close イベントは1回だけ発火する", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="利用規約"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const el = getInformationDialog();
      let closeCount = 0;
      el.addEventListener("close", () => {
        closeCount += 1;
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(closeCount).toBe(1);
      expect(el.open).toBe(false);
    });
  });

  describe("variant", () => {
    test("viewport と popup に data-variant='information' が設定される", async () => {
      document.body.innerHTML = `
        <mi-information-dialog
          open
          header-text="タイトル"
          action-label="閉じる"
        ></mi-information-dialog>
      `;
      await customElements.whenDefined("mi-information-dialog");

      const viewport = getInformationDialog().shadowRoot?.querySelector(
        "[data-testid='dialog-viewport']",
      );
      const popup = getInformationDialog().shadowRoot?.querySelector(
        "[data-testid='dialog-popup']",
      );
      expect(viewport?.getAttribute("data-variant")).toBe("information");
      expect(popup?.getAttribute("data-variant")).toBe("information");
    });
  });
});
