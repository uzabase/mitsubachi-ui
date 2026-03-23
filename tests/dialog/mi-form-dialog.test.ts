import "../../src/components/dialog/mi-form-dialog";

import { describe, expect, test, vi } from "vitest";

import {
  formDialogSizes,
  type MiFormDialog,
} from "../../src/components/dialog/mi-form-dialog";

function getFormDialog() {
  return document.querySelector("mi-form-dialog") as MiFormDialog;
}

function getDialogEl() {
  return getFormDialog().shadowRoot?.querySelector("dialog");
}

function getPopup() {
  return getFormDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-popup']",
  );
}

function getActionButton() {
  const footer = getFormDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-footer']",
  );
  return (
    footer?.querySelector("mi-danger-button") ??
    footer?.querySelector("mi-neutral-button[variant='primary']")
  );
}

describe("mi-form-dialog", () => {
  describe("open属性", () => {
    test("open=false のときダイアログは DOM に存在しない", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      el.open = false;
      await el.updateComplete;

      expect(getDialogEl()).toBeNull();
    });

    test("open=true のときダイアログが表示される", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      expect(getDialogEl()).toBeTruthy();
    });
  });

  describe("size属性", () => {
    test.each(formDialogSizes)(
      "size='%s' のとき popup に size-%s クラスが付与される",
      async (size) => {
        document.body.innerHTML = `
          <mi-form-dialog
            open
            size="${size}"
            header-text="フォーム"
            action-label="送信"
          ></mi-form-dialog>
        `;
        await customElements.whenDefined("mi-form-dialog");

        const popup = getPopup();
        expect(popup?.classList.contains(`size-${size}`)).toBe(true);
      },
    );

    test("size を設定しないときデフォルトは medium", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const popup = getPopup();
      expect(popup?.classList.contains("size-medium")).toBe(true);
    });

    test("無効な size のとき medium にフォールバックする", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      document.body.innerHTML = `
        <mi-form-dialog
          open
          size="invalid"
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const popup = getPopup();
      expect(popup?.classList.contains("size-medium")).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('"invalid" は無効な size 属性です'),
      );

      consoleSpy.mockRestore();
    });
  });

  describe("header-text, cancel-label, action-label", () => {
    test("header-text がタイトルに表示される", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="プロフィール編集"
          action-label="保存"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const header = getFormDialog().shadowRoot?.querySelector(
        "[data-testid='dialog-header']",
      );
      expect(header?.querySelector(".title")?.textContent).toBe(
        "プロフィール編集",
      );
    });

    test("cancel-label を設定するとキャンセルボタンが表示される", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          cancel-label="キャンセル"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const cancelBtn = getFormDialog()
        .shadowRoot?.querySelector("[data-testid='dialog-footer']")
        ?.querySelector("mi-neutral-button[variant='ghost']");
      expect(cancelBtn).toBeTruthy();
      expect(cancelBtn?.textContent?.trim()).toBe("キャンセル");
    });

    test("action-label がアクションボタンに表示される", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="保存する"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      expect(getActionButton()?.textContent?.trim()).toBe("保存する");
    });
  });

  describe("イベント", () => {
    test("アクションボタンをクリックすると action イベントが発火する", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      let acted = false;
      el.addEventListener("action", () => {
        acted = true;
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(acted).toBe(true);
    });

    test("閉じたときに open-change イベントが発火し open が false になる", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      const openChangePromise = new Promise<{ open: boolean }>((resolve) => {
        el.addEventListener(
          "open-change",
          ((e: CustomEvent) => resolve(e.detail)) as EventListener,
          { once: true },
        );
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      const detail = await openChangePromise;

      expect(detail).toEqual({ open: false });
      expect(el.open).toBe(false);
    });
  });

  describe("variant", () => {
    test("viewport と popup に data-variant='form' が設定される", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const viewport = getFormDialog().shadowRoot?.querySelector(
        "[data-testid='dialog-viewport']",
      );
      const popup = getFormDialog().shadowRoot?.querySelector(
        "[data-testid='dialog-popup']",
      );
      expect(viewport?.getAttribute("data-variant")).toBe("form");
      expect(popup?.getAttribute("data-variant")).toBe("form");
    });
  });
});
