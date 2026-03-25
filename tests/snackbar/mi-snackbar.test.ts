import "../../src/components/snackbar/mi-snackbar";

import { afterEach, describe, expect, test } from "vitest";

import type { MiSnackbar } from "../../src/components/snackbar/mi-snackbar";

function getSnackbar() {
  return document.querySelector("mi-snackbar") as MiSnackbar;
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
    test("閉じるボタンで発火し、退出アニメーション後に届く", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">メッセージ</mi-snackbar>`;
      await flush();

      let fired = false;
      getSnackbar().addEventListener("close", () => {
        fired = true;
      });

      getSnackbar()
        .shadowRoot!.querySelector("mi-icon-button")!
        .shadowRoot!.querySelector("button")!
        .click();

      await new Promise((r) => setTimeout(r, 500));
      expect(fired).toBe(true);
    });

    test("bubbles と composed が true", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
      await flush();

      let bubbles: boolean | undefined;
      let composed: boolean | undefined;
      getSnackbar().addEventListener(
        "close",
        (e) => {
          bubbles = e.bubbles;
          composed = e.composed;
        },
        { once: true },
      );

      getSnackbar()
        .shadowRoot!.querySelector("mi-icon-button")!
        .shadowRoot!.querySelector("button")!
        .click();

      await new Promise((r) => setTimeout(r, 500));
      expect(bubbles).toBe(true);
      expect(composed).toBe(true);
    });

    test("手動で閉じた場合は close が1回だけ", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="60000">m</mi-snackbar>`;
      await flush();

      let count = 0;
      getSnackbar().addEventListener("close", () => {
        count += 1;
      });

      getSnackbar()
        .shadowRoot!.querySelector("mi-icon-button")!
        .shadowRoot!.querySelector("button")!
        .click();

      await new Promise((r) => setTimeout(r, 500));
      expect(count).toBe(1);
    });
  });

  describe("auto-hide-timeout", () => {
    test("経過後に close が発火する", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="100">メッセージ</mi-snackbar>`;
      await flush();

      let fired = false;
      getSnackbar().addEventListener("close", () => {
        fired = true;
      });

      await new Promise((r) => setTimeout(r, 600));
      expect(fired).toBe(true);
    });

    test("0 のときは時間経過だけでは close しない", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="0">m</mi-snackbar>`;
      await flush();

      let fired = false;
      getSnackbar().addEventListener("close", () => {
        fired = true;
      });

      await new Promise((r) => setTimeout(r, 400));
      expect(fired).toBe(false);
    });

    test("属性を更新すると新しい時間で再スケジュールされる", async () => {
      document.body.innerHTML = `<mi-snackbar auto-hide-timeout="5000">m</mi-snackbar>`;
      await flush();

      let count = 0;
      getSnackbar().addEventListener("close", () => {
        count += 1;
      });

      getSnackbar().setAttribute("auto-hide-timeout", "150");
      await getSnackbar().updateComplete;

      await new Promise((r) => setTimeout(r, 600));
      expect(count).toBe(1);
    });
  });
});
