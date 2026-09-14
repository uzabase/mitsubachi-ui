import "../../src/components/tag/mi-read-only-tag";
import "../../src/components/icon";

import { beforeEach, describe, expect, test, vi } from "vitest";

import type { MiReadOnlyTag } from "../../src/components/tag/mi-read-only-tag";

const setup = async (html: string) => {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-read-only-tag");

  const element = document.querySelector<MiReadOnlyTag>("mi-read-only-tag")!;
  await element.updateComplete;

  const base = element.shadowRoot!.querySelector<HTMLElement>(".base")!;
  return { element, base };
};

describe("mi-read-only-tag", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("type", () => {
    test("type を指定しない場合は neutral になる", async () => {
      const { element, base } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      expect(element.type).toBe("neutral");
      expect(base.dataset.type).toBe("neutral");
    });

    test.each(["neutral", "information", "positive", "negative"])(
      'type="%s" が data-type に反映される',
      async (type) => {
        const { base } = await setup(
          `<mi-read-only-tag type="${type}">ラベル</mi-read-only-tag>`,
        );

        expect(base.dataset.type).toBe(type);
      },
    );

    test("type を更新すると data-type と属性の両方が追従する", async () => {
      const { element, base } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      element.type = "positive";
      await element.updateComplete;

      expect(base.dataset.type).toBe("positive");
      // reflect: true なので属性にも反映される（利用側が属性セレクタを書けるようにするため）
      expect(element.getAttribute("type")).toBe("positive");
    });

    test("一覧にない値を指定した場合は neutral にフォールバックする", async () => {
      const { base } = await setup(
        `<mi-read-only-tag type="hello">ラベル</mi-read-only-tag>`,
      );

      expect(base.dataset.type).toBe("neutral");
    });
  });

  describe("スロット", () => {
    test("デフォルトスロットのテキストが表示される", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      const slot = element.shadowRoot!.querySelector<HTMLSlotElement>(
        ".label slot:not([name])",
      )!;
      expect(slot.assignedNodes()[0]?.textContent).toBe("ラベル");
    });

    test("icon-type を指定しない場合はアイコンを表示しない", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      expect(element.shadowRoot!.querySelector("mi-icon")).toBeNull();
    });

    test("icon-type を指定するとアイコンを表示する", async () => {
      const { element } = await setup(
        `<mi-read-only-tag icon-type="arrow-up-small">ラベル</mi-read-only-tag>`,
      );

      const icon = element.shadowRoot!.querySelector("mi-icon");
      expect(icon).not.toBeNull();
      expect(icon!.getAttribute("type")).toBe("arrow-up-small");
      // アイコンは装飾なのでスクリーンリーダーから隠す
      expect(icon!.getAttribute("aria-hidden")).toBe("true");
    });

    test("無効な icon-type を指定した場合はアイコンを表示しない", async () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { element } = await setup(
        `<mi-read-only-tag icon-type="not-exist">ラベル</mi-read-only-tag>`,
      );

      expect(element.shadowRoot!.querySelector("mi-icon")).toBeNull();
      expect(warn).toHaveBeenCalled();

      warn.mockRestore();
    });

    test("icon-type を後から設定・解除するとアイコンが出入りする", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );
      expect(element.shadowRoot!.querySelector("mi-icon")).toBeNull();

      element.iconType = "arrow-up-small";
      await element.updateComplete;
      expect(element.shadowRoot!.querySelector("mi-icon")).not.toBeNull();

      element.iconType = "";
      await element.updateComplete;
      expect(element.shadowRoot!.querySelector("mi-icon")).toBeNull();
    });

    test("角丸からはみ出さないよう overflow を隠す", async () => {
      const { base } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      expect(getComputedStyle(base).overflow).toBe("hidden");
    });

    // Figma のコンテナに gap の指定が無いため、アイコンの有無で間隔を変えない
    test("アイコンの有無にかかわらずラベルとの間隔を空けない", async () => {
      const { base: withoutIcon } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );
      expect(getComputedStyle(withoutIcon).gap).toBe("normal");

      const { base: withIcon } = await setup(
        `<mi-read-only-tag icon-type="arrow-up-small">ラベル</mi-read-only-tag>`,
      );
      expect(getComputedStyle(withIcon).gap).toBe("normal");
    });
  });

  describe("アクセシビリティ", () => {
    test('role="mark" を持つ', async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      expect(element.getAttribute("role")).toBe("mark");
    });

    test("操作できる要素のロール（button / link）は持たない", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      // 押せると誤解させないため、Shadow DOM 内にも操作系の要素を置かない
      expect(element.shadowRoot!.querySelector("button, a")).toBeNull();
    });
  });

  describe("デザイン値", () => {
    test("角丸・余白・フォントが Figma の指定どおりになる", async () => {
      const { base } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );
      const style = getComputedStyle(base);

      expect(style.borderRadius).toBe("4px");
      expect(style.paddingInlineStart).toBe("4px");
      expect(style.paddingInlineEnd).toBe("4px");
      expect(style.paddingBlockStart).toBe("2px");
      expect(style.paddingBlockEnd).toBe("2px");
      expect(style.fontSize).toBe("12px");
      expect(style.letterSpacing).toBe("0.12px");
    });

    test.each([
      ["neutral", "rgba(0, 0, 0, 0.84)", "rgb(237, 237, 237)"],
      ["information", "rgb(49, 92, 232)", "rgb(237, 241, 255)"],
      ["positive", "rgb(0, 120, 60)", "rgb(223, 245, 234)"],
      ["negative", "rgb(201, 40, 18)", "rgb(255, 237, 235)"],
    ])(
      'type="%s" の文字色と背景色が Figma の指定どおりになる',
      async (type, color, backgroundColor) => {
        const { base } = await setup(
          `<mi-read-only-tag type="${type}">ラベル</mi-read-only-tag>`,
        );
        const style = getComputedStyle(base);

        expect(style.color).toBe(color);
        expect(style.backgroundColor).toBe(backgroundColor);
      },
    );
  });
});
