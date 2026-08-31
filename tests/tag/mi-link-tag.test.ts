import "../../src/components/tag/mi-link-tag";

import { afterEach, describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import type { MiLinkTag } from "../../src/components/tag/mi-link-tag";

function getLinkTag() {
  return document.querySelector("mi-link-tag") as MiLinkTag;
}

function getAnchor() {
  return getLinkTag().shadowRoot?.querySelector("a") as HTMLAnchorElement;
}

function getLabel() {
  return getLinkTag().shadowRoot?.querySelector(".label");
}

async function render(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-link-tag");
  await getLinkTag().updateComplete;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-link-tag", () => {
  describe("構造", () => {
    test("a要素がレンダリングされる", async () => {
      await render(`<mi-link-tag href="/tags/finance">金融</mi-link-tag>`);

      expect(getAnchor()).toBeTruthy();
    });

    test("デフォルトスロットのテキストが表示される", async () => {
      await render(`<mi-link-tag href="/tags/finance">金融</mi-link-tag>`);

      const slot = getLabel()?.querySelector("slot") as HTMLSlotElement;
      expect(slot.assignedNodes()[0]?.textContent).toBe("金融");
    });
  });

  describe("href属性", () => {
    test("href属性がa要素に反映される", async () => {
      await render(`<mi-link-tag href="/tags/finance">金融</mi-link-tag>`);

      expect(getAnchor().getAttribute("href")).toBe("/tags/finance");
    });

    test("href属性を更新すると、a要素のhrefも更新される", async () => {
      await render(`<mi-link-tag href="/tags/finance">金融</mi-link-tag>`);

      const el = getLinkTag();
      el.href = "/tags/energy";
      await el.updateComplete;

      expect(getAnchor().getAttribute("href")).toBe("/tags/energy");
    });

    test("href属性を指定しない場合、a要素にhref属性が付かない", async () => {
      await render(`<mi-link-tag>金融</mi-link-tag>`);

      expect(getAnchor().hasAttribute("href")).toBe(false);
    });
  });

  describe("size属性", () => {
    test.each(["x-small", "small", "medium"])(
      "size='%s' のとき a要素に同名のクラスが付く",
      async (size) => {
        await render(`<mi-link-tag href="#" size="${size}">金融</mi-link-tag>`);

        expect(getAnchor().classList.contains(size)).toBe(true);
      },
    );

    test("size を指定しない場合は medium になる", async () => {
      await render(`<mi-link-tag href="#">金融</mi-link-tag>`);

      expect(getLinkTag().size).toBe("medium");
      expect(getAnchor().classList.contains("medium")).toBe(true);
    });

    test("size を無効な値にした場合は medium として扱う", async () => {
      await render(`<mi-link-tag href="#" size="invalid">金融</mi-link-tag>`);

      expect(getAnchor().classList.contains("medium")).toBe(true);
    });

    test("size を更新すると a要素のクラスも更新される", async () => {
      await render(`<mi-link-tag href="#" size="medium">金融</mi-link-tag>`);

      const el = getLinkTag();
      el.size = "x-small";
      await el.updateComplete;

      expect(getAnchor().classList.contains("x-small")).toBe(true);
      expect(getAnchor().classList.contains("medium")).toBe(false);
    });
  });

  describe("デザイン値", () => {
    // letter-spacing は .tag に 0.01em（Figma の「1%」）。size ごとの px に解決される
    test.each([
      ["x-small", "10px", "18px", "0.1px"],
      ["small", "11px", "22px", "0.11px"],
      ["medium", "12px", "24px", "0.12px"],
    ])(
      "size='%s' は font-size %s / min-block-size %s / letter-spacing %s（Figma の値）",
      async (size, fontSize, minBlockSize, letterSpacing) => {
        await render(`<mi-link-tag href="#" size="${size}">金融</mi-link-tag>`);

        const style = getComputedStyle(getAnchor());
        expect(style.fontSize).toBe(fontSize);
        expect(style.minBlockSize).toBe(minBlockSize);
        expect(style.letterSpacing).toBe(letterSpacing);
      },
    );
  });

  describe("クリック", () => {
    // 注意: このブロックのテストでは click ハンドラで必ず preventDefault すること。
    // しないとテスト用の iframe が href 先へ遷移し、Vitest が iframe との接続を失って
    // テスト実行全体が中断する（tests/button/mi-icon-button.test.ts と同じ理由）。

    test("クリックすると click イベントが Shadow DOM の外まで届く", async () => {
      await render(
        `<mi-link-tag href="https://example.com">金融</mi-link-tag>`,
      );

      let clickCount = 0;
      getLinkTag().addEventListener("click", (e) => {
        e.preventDefault();
        clickCount++;
      });

      getAnchor().click();

      expect(clickCount).toBe(1);
    });

    test("利用側が preventDefault すると遷移がキャンセルされる", async () => {
      await render(
        `<mi-link-tag href="https://example.com">金融</mi-link-tag>`,
      );

      // mi-link-tag は素の <a> で click を再発火しないため、ホスト側のリスナーは
      // <a> のリスナーより後（バブリング中）に走る。伝播が終わってから判定する。
      const anchor = getAnchor();
      let clickEvent: Event | undefined;
      anchor.addEventListener("click", (e) => {
        clickEvent = e;
      });
      getLinkTag().addEventListener("click", (e) => {
        e.preventDefault();
      });

      anchor.click();

      expect(clickEvent?.defaultPrevented).toBe(true);
    });

    test("href が無いときはクリックしても遷移しない", async () => {
      await render(`<mi-link-tag>金融</mi-link-tag>`);

      const anchor = getAnchor();
      anchor.addEventListener("click", (e) => e.preventDefault());

      // href 属性が無い <a> はリンクとして扱われず、既定の遷移動作を持たない
      expect(anchor.hasAttribute("href")).toBe(false);
      expect(() => anchor.click()).not.toThrow();
    });
  });

  describe("hover", () => {
    test("href があるときは hover で背景色が変わる", async () => {
      await render(`<mi-link-tag href="#">金融</mi-link-tag>`);
      const anchor = getAnchor();

      // surface/semi-strong-default #ededed
      expect(getComputedStyle(anchor).backgroundColor).toBe(
        "rgb(237, 237, 237)",
      );

      await page.elementLocator(anchor).hover();

      // surface/semi-strong-hover #e5e5e5
      expect(getComputedStyle(anchor).backgroundColor).toBe(
        "rgb(229, 229, 229)",
      );
    });

    test("href が無いときは hover しても背景色が変わらない", async () => {
      await render(`<mi-link-tag>金融</mi-link-tag>`);
      const anchor = getAnchor();

      expect(getComputedStyle(anchor).backgroundColor).toBe(
        "rgb(237, 237, 237)",
      );

      await page.elementLocator(anchor).hover();

      expect(getComputedStyle(anchor).backgroundColor).toBe(
        "rgb(237, 237, 237)",
      );
    });
  });
});
