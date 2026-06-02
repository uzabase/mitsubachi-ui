import "../../src/components/snackbar/mi-snackbar";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { MiSnackbar } from "../../src/components/snackbar/mi-snackbar";

function getSnackbar() {
  return document.querySelector("mi-snackbar") as MiSnackbar;
}

/** 要素が DOM から削除されるのを待つ */
function waitForRemoval(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (!el.isConnected) {
      resolve();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!el.isConnected) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(el.parentElement ?? document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function clickSnackbarClose(snackbar: MiSnackbar) {
  snackbar
    .shadowRoot!.querySelector("mi-icon-button")!
    .shadowRoot!.querySelector("button")!
    .click();
}

async function flush() {
  const el = getSnackbar();
  await customElements.whenDefined("mi-snackbar");
  await el.updateComplete;
  await customElements.whenDefined("mi-icon-button");
  const iconBtn = el.shadowRoot!.querySelector("mi-icon-button")!;
  await iconBtn.updateComplete;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-snackbar", () => {
  describe("size", () => {
    test.each([
      ["small", "small"],
      ["medium", "medium"],
    ])(
      "size='%s' のとき .root に '%s' クラスが付く",
      async (size, expected) => {
        document.body.innerHTML = `<mi-snackbar size="${size}" auto-hide-timeout="0">メッセージ</mi-snackbar>`;
        await flush();

        expect(
          getSnackbar()
            .shadowRoot!.querySelector(".root")
            ?.classList.contains(expected),
        ).toBe(true);
      },
    );

    test('size を無効な値にした場合は "small" として扱う', async () => {
      document.body.innerHTML = `<mi-snackbar size="invalid" auto-hide-timeout="0">メッセージ</mi-snackbar>`;
      await flush();

      expect(
        getSnackbar()
          .shadowRoot!.querySelector(".root")
          ?.classList.contains("small"),
      ).toBe(true);
    });
  });

  describe("構造・アクセシビリティ", () => {
    test(".root に role=status と aria-live=polite がある", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">テスト</mi-snackbar>`;
      await flush();

      const root = getSnackbar().shadowRoot!.querySelector(".root")!;
      expect(root.getAttribute("role")).toBe("status");
      expect(root.getAttribute("aria-live")).toBe("polite");
    });

    test("成功アイコンとして mi-icon-color type=success が使われる", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">x</mi-snackbar>`;
      await flush();
      await customElements.whenDefined("mi-icon-color");

      const icon = getSnackbar().shadowRoot!.querySelector("mi-icon-color");
      expect(icon?.getAttribute("type")).toBe("success");
    });

    test("スロット内容が表示される", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">保存しました</mi-snackbar>`;
      await flush();

      expect(getSnackbar().textContent?.trim()).toContain("保存しました");
    });
  });

  describe("閉じるボタン（mi-icon-button）", () => {
    test.each([
      ["small", "cross-small", "small"],
      ["medium", "cross", "medium"],
    ])(
      "size=%s のとき icon-type=%s・size=%s",
      async (size, iconType, buttonSize) => {
        document.body.innerHTML = `<mi-snackbar size="${size}" auto-hide-timeout="0">m</mi-snackbar>`;
        await flush();

        const btn = getSnackbar().shadowRoot!.querySelector("mi-icon-button")!;
        expect(btn.getAttribute("icon-type")).toBe(iconType);
        expect(btn.getAttribute("size")).toBe(buttonSize);
        expect(btn.getAttribute("variant")).toBe("ghost");
        expect(btn.getAttribute("aria-label")).toBe("閉じる");
        expect(btn.hasAttribute("tooltip-disabled")).toBe(true);
      },
    );
  });

  describe("自動削除", () => {
    test("閉じるボタンをクリックすると DOM から削除される", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">メッセージ</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      const removalPromise = waitForRemoval(el);
      clickSnackbarClose(el);
      await removalPromise;

      expect(el.isConnected).toBe(false);
    });

    test("dismiss() で退出を開始し、退出中は2回目は false を返す", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      const removalPromise = waitForRemoval(el);
      expect(el.dismiss()).toBe(true);
      expect(el.dismiss()).toBe(false);
      await removalPromise;
      expect(el.isConnected).toBe(false);
    });

    describe("prefers-reduced-motion: reduce", () => {
      beforeEach(() => {
        vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
          const list: Partial<MediaQueryList> & { matches: boolean } = {
            matches: query === "(prefers-reduced-motion: reduce)",
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            onchange: null,
          };
          return list as MediaQueryList;
        });
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      test("閉じるボタン連打でも削除は1回だけ", async () => {
        document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
        await flush();

        const el = getSnackbar();
        const btn = el
          .shadowRoot!.querySelector("mi-icon-button")!
          .shadowRoot!.querySelector("button")!;
        btn.click();
        btn.click();

        await Promise.resolve();
        expect(el.isConnected).toBe(false);
      });
    });
  });

  describe("auto-hide-timeout", () => {
    test("経過後に DOM から削除される", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="100">メッセージ</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      await waitForRemoval(el);
      expect(el.isConnected).toBe(false);
    });

    test("0 のときは時間経過だけでは削除されない", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      await new Promise((r) => setTimeout(r, 100));
      expect(el.isConnected).toBe(true);
    });

    test("属性を更新すると新しい時間で再スケジュールされる", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="5000">m</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      const removalPromise = waitForRemoval(el);
      el.setAttribute("auto-hide-timeout", "150");
      await el.updateComplete;

      await removalPromise;
      expect(el.isConnected).toBe(false);
    });
  });
});
