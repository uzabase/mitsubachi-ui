import "../../src/components/tooltip/mi-tooltip";

import { describe, expect, test } from "vitest";

import {
  type MiTooltip,
  placements,
} from "../../src/components/tooltip/mi-tooltip";

/**
 * ツールチップが非表示になるまで待機する。
 * タイマーのポーリングではなく MutationObserver でシャドウ DOM の変化を監視するため、
 * CI 環境のタイマー遅延に影響されない。
 */
function waitForTooltipHidden(el: MiTooltip, timeout = 2000): Promise<void> {
  if (!el.shadowRoot?.querySelector('[role="tooltip"]'))
    return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Tooltip was not hidden within ${timeout}ms`));
    }, timeout);
    const observer = new MutationObserver(() => {
      if (!el.shadowRoot?.querySelector('[role="tooltip"]')) {
        observer.disconnect();
        clearTimeout(id);
        resolve();
      }
    });
    observer.observe(el.shadowRoot!, { childList: true, subtree: true });
  });
}

function getMiTooltip() {
  return document.querySelector("mi-tooltip") as MiTooltip;
}

function getTooltipEl() {
  return getMiTooltip().shadowRoot?.querySelector(
    '[role="tooltip"]',
  ) as HTMLElement | null;
}

describe("mi-tooltip", () => {
  describe("初期状態", () => {
    test("初期状態ではツールチップは表示されない", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      expect(getTooltipEl()).toBeNull();
    });

    test("placement属性のデフォルト値は 'top'", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      expect(getMiTooltip().placement).toBe("top");
    });
  });

  describe("text属性", () => {
    test("text属性を設定すると、ツールチップにその文字列が表示される", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      expect(getTooltipEl()?.textContent).toBe("補足情報");
    });

    test("text属性が空の場合、mouseenterしてもツールチップは表示されない", async () => {
      document.body.innerHTML = `<mi-tooltip text=""><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      expect(getTooltipEl()).toBeNull();
    });

    test("表示中にtext属性を更新するとツールチップの内容も更新される", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      el.setAttribute("text", "更新後のテキスト");
      await el.updateComplete;

      expect(getTooltipEl()?.textContent).toBe("更新後のテキスト");
    });
  });

  describe("placement属性", () => {
    test.each(placements)('placement="%s" を設定できる', async (placement) => {
      document.body.innerHTML = `<mi-tooltip text="補足" placement="${placement}"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      expect(getMiTooltip().placement).toBe(placement);
    });
  });

  describe("表示・非表示", () => {
    test("mouseenterでツールチップが表示される", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      expect(getTooltipEl()).not.toBeNull();
    });

    test("mouseleaveから100ms後にツールチップが非表示になる", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;
      expect(getTooltipEl()).not.toBeNull();

      el.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
      await waitForTooltipHidden(el);
    });

    test("mouseenterとmouseleaveを素早く繰り返してもツールチップは表示されたままになる", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      el.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
      // 100ms 経つ前に再度 mouseenter してタイマーをキャンセル
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      // clearTimeout は同期的に確定するので、100ms 超えて待機してもタイマーは発火しない
      await new Promise<void>((resolve) => setTimeout(resolve, 200));
      await el.updateComplete;

      expect(getTooltipEl()).not.toBeNull();
    });

    test("focusinでツールチップが表示される（キーボード操作）", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
      await el.updateComplete;

      expect(getTooltipEl()).not.toBeNull();
    });

    test("pointerdownのあとfocusinしてもツールチップは表示されない（クリック操作）", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      // クリック時の挙動を再現：pointerdown → focusin が同一タスク内で発火する
      el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
      await el.updateComplete;

      expect(getTooltipEl()).toBeNull();
    });

    test("focusoutから100ms後にツールチップが非表示になる", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
      await el.updateComplete;
      expect(getTooltipEl()).not.toBeNull();

      el.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      await waitForTooltipHidden(el);
    });
  });

  describe("アクセシビリティ", () => {
    test("ツールチップに role='tooltip' が設定されている", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      expect(getTooltipEl()?.getAttribute("role")).toBe("tooltip");
    });
  });
});
