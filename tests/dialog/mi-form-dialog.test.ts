import "../../src/components/dialog/mi-form-dialog";

import { describe, expect, test, vi } from "vitest";
import { userEvent } from "vitest/browser";

import type { ButtonBase } from "../../src/components/button/base";
import type { DialogOpenChangeDetail } from "../../src/components/dialog/base";
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

function getFooter() {
  return getFormDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-footer']",
  );
}

function getCancelButton() {
  return getFooter()?.querySelector("mi-neutral-button[variant='ghost']");
}

function getActionButton() {
  const footer = getFooter();
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
      "size='%s' のとき popup に対応する size クラスが付与される",
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

      expect(getCancelButton()).toBeTruthy();
      expect(getCancelButton()?.textContent?.trim()).toBe("キャンセル");
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

  describe("form-id属性", () => {
    test("省略時はアクションボタンが type=button で form は空", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      await el.updateComplete;
      const btn = getActionButton() as ButtonBase;

      expect(btn.type).toBe("button");
      expect(btn.form).toBe("");
    });

    test("指定時はアクションボタンが type=submit かつ form に id が渡る", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
          form-id="profile-form"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      await el.updateComplete;
      const btn = getActionButton() as ButtonBase;

      expect(btn.type).toBe("submit");
      expect(btn.form).toBe("profile-form");
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

    test("ネイティブ dialog.close() で閉じたとき open-change が発火し open が false になる", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      const dialogEl = el.shadowRoot?.querySelector("dialog");
      const openChangePromise = new Promise<DialogOpenChangeDetail>(
        (resolve) => {
          el.addEventListener(
            "open-change",
            ((e: CustomEvent<DialogOpenChangeDetail>) =>
              resolve(e.detail)) as EventListener,
            { once: true },
          );
        },
      );

      await el.updateComplete;
      (dialogEl as HTMLDialogElement | undefined)?.close();
      const detail = await openChangePromise;

      expect(detail).toEqual({ open: false, reason: null });
      expect(el.open).toBe(false);
    });

    test("action で preventDefault するとダイアログは開いたまま", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      let actionCount = 0;
      let openChangeCount = 0;
      el.addEventListener("open-change", () => {
        openChangeCount += 1;
      });
      el.addEventListener("action", (e) => {
        actionCount += 1;
        e.preventDefault();
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(actionCount).toBe(1);
      expect(openChangeCount).toBe(0);
      expect(el.open).toBe(true);
      expect(getDialogEl()).toBeTruthy();
    });

    test("アクションボタンで閉じたときは action のみで open-change は発火しない", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      let openChangeCount = 0;
      let actionCount = 0;
      el.addEventListener("open-change", () => {
        openChangeCount += 1;
      });
      el.addEventListener("action", () => {
        actionCount += 1;
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(actionCount).toBe(1);
      expect(openChangeCount).toBe(0);
      expect(el.open).toBe(false);
    });

    test("キャンセルボタンをクリックすると mi-cancel イベントが発火する", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          cancel-label="キャンセル"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      let canceled = false;
      el.addEventListener("mi-cancel", () => {
        canceled = true;
      });

      await el.updateComplete;
      (getCancelButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(canceled).toBe(true);
    });

    test("Esc キーで閉じたとき open-change の reason が escape になる", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      const openChangePromise = new Promise<DialogOpenChangeDetail>(
        (resolve) => {
          el.addEventListener(
            "open-change",
            ((e: CustomEvent<DialogOpenChangeDetail>) =>
              resolve(e.detail)) as EventListener,
            { once: true },
          );
        },
      );

      await el.updateComplete;
      const dialog = getDialogEl() as HTMLDialogElement;
      dialog.focus();
      await userEvent.keyboard("{Escape}");
      const detail = await openChangePromise;

      expect(detail).toEqual({ open: false, reason: "escape" });
      expect(el.open).toBe(false);
    });

    test("キャンセルボタンで閉じたときは mi-cancel のみで open-change は発火しない", async () => {
      document.body.innerHTML = `
        <mi-form-dialog
          open
          header-text="フォーム"
          cancel-label="キャンセル"
          action-label="送信"
        ></mi-form-dialog>
      `;
      await customElements.whenDefined("mi-form-dialog");

      const el = getFormDialog();
      let openChangeCount = 0;
      let cancelCount = 0;
      el.addEventListener("open-change", () => {
        openChangeCount += 1;
      });
      el.addEventListener("mi-cancel", () => {
        cancelCount += 1;
      });

      await el.updateComplete;
      (getCancelButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(cancelCount).toBe(1);
      expect(openChangeCount).toBe(0);
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
