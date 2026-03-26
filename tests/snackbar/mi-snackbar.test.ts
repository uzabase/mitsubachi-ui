import "../../src/components/snackbar/mi-snackbar";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { MiSnackbar } from "../../src/components/snackbar/mi-snackbar";

function getSnackbar() {
  return document.querySelector("mi-snackbar") as MiSnackbar;
}

/** 次の `close` を待つ（固定 sleep より速く、未発火時はテストのタイムアウトで失敗する） */
function nextCloseEvent(target: EventTarget): Promise<Event> {
  return new Promise((resolve) => {
    target.addEventListener("close", resolve as EventListener, { once: true });
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

  describe("close イベント", () => {
    test("閉じるボタンで発火し、bubbles と composed が true", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">メッセージ</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      const closePromise = nextCloseEvent(el);
      clickSnackbarClose(el);
      const e = await closePromise;

      expect(e.type).toBe("close");
      expect(e.bubbles).toBe(true);
      expect(e.composed).toBe(true);
    });

    test("手動で閉じた場合は close が1回だけ", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="60000">m</mi-snackbar>`;
      await flush();

      let count = 0;
      getSnackbar().addEventListener("close", () => {
        count += 1;
      });

      clickSnackbarClose(getSnackbar());
      await nextCloseEvent(getSnackbar());
      expect(count).toBe(1);
    });

    test("dismiss() で close が1回発火し、退出中は2回目は false", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      const closePromise = nextCloseEvent(el);
      expect(el.dismiss()).toBe(true);
      await closePromise;
      expect(el.dismiss()).toBe(false);
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

      test("閉じるボタン連打でも close は1回だけ", async () => {
        document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
        await flush();

        let count = 0;
        getSnackbar().addEventListener("close", () => {
          count += 1;
        });

        const btn = getSnackbar()
          .shadowRoot!.querySelector("mi-icon-button")!
          .shadowRoot!.querySelector("button")!;
        btn.click();
        btn.click();

        await Promise.resolve();
        expect(count).toBe(1);
      });
    });
  });

  describe("auto-hide-timeout", () => {
    test("経過後に close が発火する", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="100">メッセージ</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      await expect(nextCloseEvent(el)).resolves.toMatchObject({
        type: "close",
      });
    });

    test("0 のときは時間経過だけでは close しない", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
      await flush();

      let fired = false;
      getSnackbar().addEventListener("close", () => {
        fired = true;
      });

      await new Promise((r) => setTimeout(r, 100));
      expect(fired).toBe(false);
    });

    test("属性を更新すると新しい時間で再スケジュールされる", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="5000">m</mi-snackbar>`;
      await flush();

      const el = getSnackbar();
      const closePromise = nextCloseEvent(el);
      el.setAttribute("auto-hide-timeout", "150");
      await el.updateComplete;

      await expect(closePromise).resolves.toMatchObject({ type: "close" });
    });
  });
});
