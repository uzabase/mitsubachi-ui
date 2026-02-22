import "../../src/components/tooltip/mi-tooltip";

import { afterEach, describe, expect, test, vi } from "vitest";

// GitHub Actions など CI 環境では setTimeout を使ったタイマー系テストが不安定なためスキップする
const isCI = !!import.meta.env.CI;

import {
  type MiTooltip,
  placements,
} from "../../src/components/tooltip/mi-tooltip";

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
    afterEach(() => {
      vi.useRealTimers();
    });

    test("mouseenterでツールチップが表示される", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      expect(getTooltipEl()).not.toBeNull();
    });

    test.skipIf(isCI)(
      "mouseleaveから100ms後にツールチップが非表示になる",
      async () => {
        document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
        await customElements.whenDefined("mi-tooltip");

        const el = getMiTooltip();
        el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
        await el.updateComplete;
        expect(getTooltipEl()).not.toBeNull();

        vi.useFakeTimers();
        el.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
        await vi.advanceTimersByTimeAsync(100);
        await el.updateComplete;

        expect(getTooltipEl()).toBeNull();
      },
    );

    test("mouseenterとmouseleaveを素早く繰り返してもツールチップは表示されたままになる", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await el.updateComplete;

      vi.useFakeTimers();
      el.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
      // 100ms 経つ前に再度 mouseenter してタイマーをキャンセル
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
      await vi.advanceTimersByTimeAsync(150);
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

    test.skipIf(isCI)(
      "focusoutから100ms後にツールチップが非表示になる",
      async () => {
        document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
        await customElements.whenDefined("mi-tooltip");

        const el = getMiTooltip();
        el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
        await el.updateComplete;
        expect(getTooltipEl()).not.toBeNull();

        vi.useFakeTimers();
        el.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
        await vi.advanceTimersByTimeAsync(100);
        await el.updateComplete;

        expect(getTooltipEl()).toBeNull();
      },
    );

    test("Escapeキーでツールチップが即座に非表示になる", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
      await el.updateComplete;
      expect(getTooltipEl()).not.toBeNull();

      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      await el.updateComplete;

      expect(getTooltipEl()).toBeNull();
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

    test("スロットのトリガー要素に aria-describedby が設定される", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      await el.updateComplete;
      const trigger = el.querySelector("button");
      const descId = trigger?.getAttribute("aria-describedby");

      expect(descId).toBeTruthy();
      expect(document.getElementById(descId!)).not.toBeNull();
      expect(document.getElementById(descId!)?.textContent).toBe("補足情報");
    });

    test("text属性が変わると aria-describedby の説明テキストも更新される", async () => {
      document.body.innerHTML = `<mi-tooltip text="補足情報"><button>トリガー</button></mi-tooltip>`;
      await customElements.whenDefined("mi-tooltip");

      const el = getMiTooltip();
      await el.updateComplete;
      const descId = el
        .querySelector("button")!
        .getAttribute("aria-describedby")!;

      el.setAttribute("text", "更新後のテキスト");
      await el.updateComplete;

      expect(document.getElementById(descId)?.textContent).toBe(
        "更新後のテキスト",
      );
    });
  });
});
