import "../../src/components/tag/mi-read-only-tag";
import "../../src/components/icon";

import { beforeEach, describe, expect, test } from "vitest";

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

    test("icon スロットが空のときはアイコン領域を表示しない", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      expect(element.shadowRoot!.querySelector(".icon")).toBeNull();
    });

    test("icon スロットに要素があるときだけアイコン領域を表示する", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>
           <mi-icon slot="icon" type="check"></mi-icon>
           ラベル
         </mi-read-only-tag>`,
      );

      const icon = element.shadowRoot!.querySelector(".icon");
      expect(icon).not.toBeNull();
      // アイコンは装飾なのでスクリーンリーダーから隠す
      expect(icon!.getAttribute("aria-hidden")).toBe("true");
    });

    test("後からアイコンを追加すると表示される", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );
      expect(element.shadowRoot!.querySelector(".icon")).toBeNull();

      const icon = document.createElement("mi-icon");
      icon.setAttribute("slot", "icon");
      icon.setAttribute("type", "check");
      element.append(icon);
      // slotchange が @state を更新し、その更新が描画されるまで待つ
      await element.updateComplete;
      await element.updateComplete;

      expect(element.shadowRoot!.querySelector(".icon")).not.toBeNull();
    });

    test("後からアイコンを削除すると表示されなくなる", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>
           <mi-icon slot="icon" type="check"></mi-icon>
           ラベル
         </mi-read-only-tag>`,
      );
      expect(element.shadowRoot!.querySelector(".icon")).not.toBeNull();

      element.querySelector("mi-icon")!.remove();
      await element.updateComplete;
      await element.updateComplete;

      expect(element.shadowRoot!.querySelector(".icon")).toBeNull();
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
        `<mi-read-only-tag>
           <mi-icon slot="icon" type="check"></mi-icon>
           ラベル
         </mi-read-only-tag>`,
      );
      expect(getComputedStyle(withIcon).gap).toBe("normal");
    });
  });

  describe("アクセシビリティ", () => {
    test("操作できない表示専用の要素なので role を持たない", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>ラベル</mi-read-only-tag>`,
      );

      expect(element.getAttribute("role")).toBeNull();
      expect(element.shadowRoot!.querySelector("[role]")).toBeNull();
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

    test("アイコン領域は 18px 四方になる", async () => {
      const { element } = await setup(
        `<mi-read-only-tag>
           <mi-icon slot="icon" type="check"></mi-icon>
           ラベル
         </mi-read-only-tag>`,
      );

      const style = getComputedStyle(
        element.shadowRoot!.querySelector<HTMLElement>(".icon")!,
      );
      expect(style.inlineSize).toBe("18px");
      expect(style.blockSize).toBe("18px");
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
