import "../../src/components/dialog/mi-action-dialog";

import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";

import type { MiActionDialog } from "../../src/components/dialog/mi-action-dialog";

function getActionDialog() {
  return document.querySelector("mi-action-dialog") as MiActionDialog;
}

function getDialogEl() {
  return getActionDialog().shadowRoot?.querySelector("dialog");
}

function getViewport() {
  return getActionDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-viewport']",
  );
}

function getPopup() {
  return getActionDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-popup']",
  );
}

function getHeader() {
  return getActionDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-header']",
  );
}

function getBody() {
  return getActionDialog().shadowRoot?.querySelector(
    "[data-testid='dialog-body']",
  );
}

function getFooter() {
  return getActionDialog().shadowRoot?.querySelector(
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

describe("mi-action-dialog", () => {
  describe("open属性", () => {
    test("open=false のときダイアログは DOM に存在しない", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="タイトル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      el.open = false;
      await el.updateComplete;

      expect(getDialogEl()).toBeNull();
    });

    test("open=true のときダイアログが表示される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="タイトル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getDialogEl()).toBeTruthy();
      expect(getDialogEl()?.open).toBe(true);
    });

    test("open を false から true に変更するとダイアログが表示される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          header-text="タイトル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getDialogEl()).toBeNull();

      const el = getActionDialog();
      el.open = true;
      await el.updateComplete;

      expect(getDialogEl()).toBeTruthy();
    });
  });

  describe("header-text属性", () => {
    test("header-text を設定するとタイトルが表示される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="削除の確認"
          action-label="削除"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const header = getHeader();
      expect(header).toBeTruthy();
      expect(header?.querySelector(".title")?.textContent).toBe("削除の確認");
    });

    test("header-text が空のときヘッダーは表示されない", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getHeader()).toBeNull();
    });
  });

  describe("cancel-label属性", () => {
    test("cancel-label を設定するとキャンセルボタンが表示される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          cancel-label="キャンセル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getCancelButton()).toBeTruthy();
      expect(getCancelButton()?.textContent?.trim()).toBe("キャンセル");
    });

    test("cancel-label を設定しないときキャンセルボタンは表示されない", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getCancelButton()).toBeNull();
    });
  });

  describe("action-label属性", () => {
    test("action-label がアクションボタンに表示される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="削除する"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getActionButton()?.textContent?.trim()).toBe("削除する");
    });
  });

  describe("danger属性", () => {
    test("danger=true のとき mi-danger-button が使われる", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          danger
          header-text="削除確認"
          action-label="削除"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const footer = getFooter();
      expect(footer?.querySelector("mi-danger-button")).toBeTruthy();
      expect(
        footer?.querySelector("mi-neutral-button[variant='primary']"),
      ).toBeNull();
    });

    test("danger=false のとき mi-neutral-button が使われる", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const footer = getFooter();
      expect(
        footer?.querySelector("mi-neutral-button[variant='primary']"),
      ).toBeTruthy();
      expect(footer?.querySelector("mi-danger-button")).toBeNull();
    });
  });

  describe("slot", () => {
    test("slot に渡したコンテンツが body に表示される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="OK"
        >
          <p>本当に削除しますか？</p>
        </mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      await el.updateComplete;
      const slot = getBody()?.querySelector("slot");
      const slotted = slot?.assignedNodes({ flatten: true });
      const p = Array.from(slotted ?? []).find((n) => n.nodeName === "P");
      expect(p?.textContent?.trim()).toBe("本当に削除しますか？");
    });
  });

  describe("イベント", () => {
    test("キャンセルボタンをクリックすると close イベントが発火する", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          cancel-label="キャンセル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      let closed = false;
      el.addEventListener("close", () => {
        closed = true;
      });

      await el.updateComplete;
      (getCancelButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(closed).toBe(true);
      expect(el.open).toBe(false);
    });

    test("アクションボタンをクリックすると close イベントが発火する", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
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
        <mi-action-dialog
          open
          header-text="確認"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
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
        <mi-action-dialog
          open
          header-text="確認"
          cancel-label="キャンセル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      let closeCount = 0;
      el.addEventListener("close", () => {
        closeCount += 1;
      });

      await el.updateComplete;
      (getCancelButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(closeCount).toBe(1);
      expect(el.open).toBe(false);
    });

    test("アクションボタンで閉じると returnValue が 'action' になる", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      const events: string[] = [];
      el.addEventListener("close", () => {
        events.push(el.returnValue);
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(events).toEqual(["action"]);
    });

    test("キャンセルボタンで閉じると returnValue が 'cancel' になる", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          cancel-label="キャンセル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      const events: string[] = [];
      el.addEventListener("close", () => {
        events.push(el.returnValue);
      });

      await el.updateComplete;
      (getCancelButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(events).toEqual(["cancel"]);
    });

    test("Esc で閉じると returnValue が空文字になる", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      const events: string[] = [];
      el.addEventListener("close", () => {
        events.push(el.returnValue);
      });

      await el.updateComplete;
      const dialog = getDialogEl() as HTMLDialogElement;
      dialog.focus();
      await userEvent.keyboard("{Escape}");

      expect(events).toEqual([""]);
    });

    test("アクションボタンで close が1回だけ発火する", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          cancel-label="キャンセル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      let closeCount = 0;
      el.addEventListener("close", () => {
        closeCount += 1;
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;

      expect(closeCount).toBe(1);
    });

    test("ネイティブ close が非同期で発火しても close は1回だけ・returnValue は維持される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="確認"
          cancel-label="キャンセル"
          action-label="実行"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const el = getActionDialog();
      const events: string[] = [];
      el.addEventListener("close", () => {
        events.push(el.returnValue);
      });

      await el.updateComplete;
      (getActionButton() as HTMLElement | undefined)?.click();
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 50));

      expect(events).toEqual(["action"]);
    });
  });

  describe("loading", () => {
    const setup = async (attrs: string) => {
      document.body.innerHTML = `
        <mi-action-dialog open header-text="削除しますか？" cancel-label="キャンセル" action-label="削除する" ${attrs}>
          本文
        </mi-action-dialog>`;
      await customElements.whenDefined("mi-action-dialog");
      const dialog = getActionDialog();
      await dialog.updateComplete;
      return dialog;
    };

    test("loading を指定するとアクションボタンがローディング表示になる", async () => {
      await setup("loading");

      expect(getActionButton()?.hasAttribute("loading")).toBe(true);
    });

    test("loading を指定するとキャンセルボタンが無効化される", async () => {
      // 処理中にキャンセルできると、非同期処理が走ったままダイアログだけ閉じてしまう
      await setup("loading");

      expect(getCancelButton()?.hasAttribute("disabled")).toBe(true);
    });

    test("loading を指定しない場合はどちらも通常状態", async () => {
      await setup("");

      expect(getActionButton()?.hasAttribute("loading")).toBe(false);
      expect(getCancelButton()?.hasAttribute("disabled")).toBe(false);
    });

    test("danger のときもアクションボタンがローディング表示になる", async () => {
      await setup("danger loading");

      const actionButton = getActionButton()!;
      expect(actionButton.tagName.toLowerCase()).toBe("mi-danger-button");
      expect(actionButton.hasAttribute("loading")).toBe(true);
    });

    test("loading 中はアクションボタンを押しても close が発火しない", async () => {
      const dialog = await setup("loading");

      let closeCount = 0;
      dialog.addEventListener("close", () => {
        closeCount++;
      });

      const button = getActionButton() as HTMLElement & {
        updateComplete: Promise<unknown>;
      };
      await button.updateComplete;
      button.shadowRoot?.querySelector("button")?.click();

      expect(closeCount).toBe(0);
      expect(dialog.open).toBe(true);
    });

    test("form-id がない場合、slot 内フォームの送信は止めない", async () => {
      // Enter 送信は form-id による opt-in の仕組み。利用側が自分で置いたフォームの
      // 送信を横から止めるのは行き過ぎになるため、対象外にしている
      document.body.innerHTML = `
        <mi-action-dialog open header-text="確認" action-label="実行する" loading>
          <form id="own"><input id="own-input" name="a" /></form>
        </mi-action-dialog>`;
      await customElements.whenDefined("mi-action-dialog");
      const dialog = getActionDialog();
      await dialog.updateComplete;

      const form = document.getElementById("own") as HTMLFormElement;
      let submitCount = 0;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        submitCount++;
      });

      form.requestSubmit();

      expect(submitCount).toBe(1);
    });

    test("loading を解除するとアクションボタンが押せるようになる", async () => {
      const dialog = await setup("loading");
      dialog.loading = false;
      await dialog.updateComplete;

      let closeCount = 0;
      dialog.addEventListener("close", () => {
        closeCount++;
      });

      const button = getActionButton() as HTMLElement & {
        updateComplete: Promise<unknown>;
      };
      await button.updateComplete;
      button.shadowRoot?.querySelector("button")?.click();

      expect(closeCount).toBe(1);
    });
  });

  describe("アクセシビリティ", () => {
    test("dialog に role='dialog' と aria-modal='true' が設定される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="タイトル"
          action-label="OK"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const dialog = getDialogEl();
      expect(dialog?.getAttribute("role")).toBe("dialog");
      expect(dialog?.getAttribute("aria-modal")).toBe("true");
    });

    test("header-text があるとき aria-labelledby が設定される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="タイトル"
          action-label="OK"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const dialog = getDialogEl();
      expect(dialog?.getAttribute("aria-labelledby")).toBe("dialog-title");
    });

    test("aria-describedby が dialog-body を参照する", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="タイトル"
          action-label="OK"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      const dialog = getDialogEl();
      expect(dialog?.getAttribute("aria-describedby")).toBe("dialog-body");
    });
  });

  describe("data-testid", () => {
    test("viewport, popup, header, body, footer に data-testid が付与される", async () => {
      document.body.innerHTML = `
        <mi-action-dialog
          open
          header-text="タイトル"
          action-label="OK"
        ></mi-action-dialog>
      `;
      await customElements.whenDefined("mi-action-dialog");

      expect(getViewport()?.getAttribute("data-testid")).toBe(
        "dialog-viewport",
      );
      expect(getPopup()?.getAttribute("data-testid")).toBe("dialog-popup");
      expect(getHeader()?.getAttribute("data-testid")).toBe("dialog-header");
      expect(getBody()?.getAttribute("data-testid")).toBe("dialog-body");
      expect(getFooter()?.getAttribute("data-testid")).toBe("dialog-footer");
    });
  });
});
