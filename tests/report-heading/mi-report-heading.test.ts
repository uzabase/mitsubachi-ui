import "../../src/components/report-heading/mi-report-heading";

import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import type { MiReportHeading } from "../../src/components/report-heading/mi-report-heading";

/**
 * ブラウザモードの既定の viewport は 414px（= 720px 以下）なので、
 * 何も指定しないと `@media (max-width: 720px)` のスマートフォン用スタイルで動いてしまう。
 * このリポジトリの実装規約は PC ファースト（ブレイクポイントは 720px の1箇所）なので、
 * 既定は desktop 幅で検証し、スマートフォン幅は該当の describe で明示的に切り替える。
 *
 * viewport の変更はブラウザに対する副作用のある操作なので、テストごと（beforeEach）ではなく
 * ファイル/describe 単位（beforeAll）で最小回数だけ呼ぶ。
 */
const DESKTOP_WIDTH = 1280;
const PHONE_WIDTH = 414;
const VIEWPORT_HEIGHT = 900;

/** slotchange は非同期に飛ぶため、再描画が落ち着くのを待つ */
const settle = async (element: MiReportHeading) => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await element.updateComplete;
};

const setup = async (html: string) => {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-report-heading");

  const element = document.querySelector("mi-report-heading")!;
  await element.updateComplete;
  await settle(element);

  return {
    element,
    /** 見出しとアクションを横並びにする行（見出し要素の外側のラッパー） */
    row: element.shadowRoot!.querySelector<HTMLElement>(".row")!,
    /** 実際に描画された見出し要素（h1〜h6） */
    heading: element.shadowRoot!.querySelector<HTMLElement>(".heading")!,
  };
};

/** default slot（見出しテキストが割り当てられる先） */
const defaultSlot = (element: MiReportHeading) =>
  element.shadowRoot!.querySelector<HTMLSlotElement>("slot:not([name])")!;

/** 見出しの本文（default slot に割り当てられたテキスト） */
const slottedText = (element: MiReportHeading) => {
  return defaultSlot(element)
    .assignedNodes({ flatten: true })
    .map((node) => node.textContent ?? "")
    .join("")
    .trim();
};

/**
 * Figma のタイポグラフィ。line-height / letter-spacing は
 * font-size に対する比率で指定しているため、期待値も比率で持つ。
 */
type Typography = {
  level: number;
  fontSize: number;
  weight: "normal" | "bold";
  lineHeight: number;
  tracking: number;
};

const desktopTypography: Typography[] = [
  {
    level: 1,
    fontSize: 32,
    weight: "normal",
    lineHeight: 1.3,
    tracking: -0.02,
  },
  { level: 2, fontSize: 25, weight: "bold", lineHeight: 1.3, tracking: -0.02 },
  { level: 3, fontSize: 20, weight: "bold", lineHeight: 1.3, tracking: -0.01 },
  { level: 4, fontSize: 18, weight: "bold", lineHeight: 1.5, tracking: 0.01 },
  { level: 5, fontSize: 16, weight: "bold", lineHeight: 1.5, tracking: 0.01 },
  { level: 6, fontSize: 16, weight: "bold", lineHeight: 1.5, tracking: 0.01 },
];

/**
 * `--font-weight-bold` / `--font-weight-normal` は foundation.css が言語ごとに
 * 切り替えるため、数値を直接期待値にせずトークンの解決値と比較する。
 */
const expectTypography = (
  heading: HTMLElement,
  { fontSize, weight, lineHeight, tracking }: Typography,
) => {
  const styles = getComputedStyle(heading);

  expect(styles.fontSize).toBe(`${fontSize}px`);
  expect(styles.fontWeight).toBe(
    styles.getPropertyValue(`--font-weight-${weight}`).trim(),
  );
  expect(parseFloat(styles.lineHeight)).toBeCloseTo(fontSize * lineHeight, 1);
  expect(parseFloat(styles.letterSpacing)).toBeCloseTo(fontSize * tracking, 2);
};

describe("mi-report-heading", () => {
  beforeAll(async () => {
    await page.viewport(DESKTOP_WIDTH, VIEWPORT_HEIGHT);
  });

  describe("見出しレベル", () => {
    test("level を指定しないと h1 として描画される", async () => {
      const { heading } = await setup(
        `<mi-report-heading>見出し</mi-report-heading>`,
      );

      expect(heading.tagName).toBe("H1");
    });

    test.each([1, 2, 3, 4, 5, 6])(
      "level=%i を指定すると対応する見出し要素として描画される",
      async (level) => {
        const { heading } = await setup(
          `<mi-report-heading level="${level}">見出し</mi-report-heading>`,
        );

        expect(heading.tagName).toBe(`H${level}`);
      },
    );

    test.each(["0", "7", "-1", "abc", ""])(
      'level="%s" のような範囲外の値は h1 にフォールバックする',
      async (level) => {
        const { heading } = await setup(
          `<mi-report-heading level="${level}">見出し</mi-report-heading>`,
        );

        expect(heading.tagName).toBe("H1");
      },
    );

    test("level を後から変更すると見出し要素も変わる", async () => {
      const { element } = await setup(
        `<mi-report-heading level="2">見出し</mi-report-heading>`,
      );
      expect(
        element.shadowRoot!.querySelector<HTMLElement>(".heading")!.tagName,
      ).toBe("H2");

      element.level = 4;
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelector<HTMLElement>(".heading")!.tagName,
      ).toBe("H4");
      // reflect: true なので属性にも反映される（利用側が属性セレクタを書けるようにするため）
      expect(element.getAttribute("level")).toBe("4");
    });
  });

  describe("スロット", () => {
    test("default slot のテキストが見出しの本文になる", async () => {
      const { element } = await setup(
        `<mi-report-heading>市場環境の変化</mi-report-heading>`,
      );

      expect(slottedText(element)).toBe("市場環境の変化");
    });

    test("action slot に要素があるとアクション領域が描画される", async () => {
      const { element } = await setup(`
        <mi-report-heading>
          見出し
          <button slot="action">編集</button>
        </mi-report-heading>
      `);

      const action = element.shadowRoot!.querySelector(".action");
      expect(action).not.toBeNull();
      expect(
        action!
          .querySelector<HTMLSlotElement>('slot[name="action"]')!
          .assignedElements().length,
      ).toBe(1);
    });

    test("アクション領域は Figma のレイアウト値になる", async () => {
      const { element } = await setup(`
        <mi-report-heading>
          見出し
          <button slot="action">編集</button>
          <button slot="action">共有</button>
        </mi-report-heading>
      `);

      // 見出しとアクションの間隔
      expect(
        getComputedStyle(
          element.shadowRoot!.querySelector<HTMLElement>(".row")!,
        ).gap,
      ).toBe("16px");

      const style = getComputedStyle(
        element.shadowRoot!.querySelector<HTMLElement>(".action")!,
      );
      // 複数のアクションを並べたときの間隔
      expect(style.gap).toBe("8px");
      // 右寄せ（見出しが伸びてアクションは右端に残る）
      expect(style.justifyContent).toBe("flex-end");
      // 見出しが長くてもアクションは縮まない
      expect(style.flexShrink).toBe("0");
    });

    test("action slot が空のときはアクション領域を描画しない", async () => {
      const { element } = await setup(
        `<mi-report-heading>見出し</mi-report-heading>`,
      );

      expect(element.shadowRoot!.querySelector(".action")).toBeNull();
    });

    test("action slot の要素を後から追加・削除すると追従する", async () => {
      const { element } = await setup(
        `<mi-report-heading>見出し</mi-report-heading>`,
      );
      expect(element.shadowRoot!.querySelector(".action")).toBeNull();

      const button = document.createElement("button");
      button.slot = "action";
      button.textContent = "編集";
      element.appendChild(button);
      await settle(element);

      expect(element.shadowRoot!.querySelector(".action")).not.toBeNull();

      button.remove();
      await settle(element);

      expect(element.shadowRoot!.querySelector(".action")).toBeNull();
    });
  });

  describe("アクセシビリティ", () => {
    test("フォーカス対象にならない（tabindex を持たない）", async () => {
      const { element, heading } = await setup(
        `<mi-report-heading>見出し</mi-report-heading>`,
      );

      expect(element.hasAttribute("tabindex")).toBe(false);
      expect(heading.hasAttribute("tabindex")).toBe(false);
    });

    test("role を手動で付与しない（素の見出し要素に任せる）", async () => {
      const { element, heading } = await setup(
        `<mi-report-heading>見出し</mi-report-heading>`,
      );

      expect(element.hasAttribute("role")).toBe(false);
      expect(heading.hasAttribute("role")).toBe(false);
    });

    /*
     * 見出しロールはアクセシブルネームを内容から算出するため、アクションを
     * 見出し要素の内側に置くとボタンのラベルが見出しの読み上げに合流してしまう。
     */
    test("アクション領域は見出し要素の内側ではなく兄弟として描画される", async () => {
      const { element, row, heading } = await setup(`
        <mi-report-heading level="2">
          市場環境の変化
          <button slot="action">編集</button>
        </mi-report-heading>
      `);

      const action = element.shadowRoot!.querySelector(".action")!;

      expect(action.parentElement).toBe(row);
      expect(heading.parentElement).toBe(row);
      expect(heading.contains(action)).toBe(false);
      expect(heading.querySelector('slot[name="action"]')).toBeNull();
    });

    test("見出し要素の中身は見出しテキストだけになる", async () => {
      const { heading } = await setup(`
        <mi-report-heading level="3">
          市場環境の変化
          <button slot="action">編集</button>
        </mi-report-heading>
      `);

      // level 3 の装飾バーは aria-hidden なのでアクセシブルネームに影響しない
      const named = [...heading.querySelectorAll("*")].filter(
        (node) => node.getAttribute("aria-hidden") !== "true",
      );

      expect(named.map((node) => node.tagName)).toEqual(["SLOT"]);
      expect(heading.textContent!.trim()).toBe("");
    });
  });

  describe("レベル固有の装飾", () => {
    test("level=3 のときだけ左のバーが描画され、装飾として隠される", async () => {
      const { element } = await setup(
        `<mi-report-heading level="3">見出し</mi-report-heading>`,
      );

      const bar = element.shadowRoot!.querySelector(".bar")!;
      expect(bar).not.toBeNull();
      expect(bar.getAttribute("aria-hidden")).toBe("true");
      expect(getComputedStyle(bar).backgroundColor).toBe("rgb(247, 42, 72)");
      expect(getComputedStyle(bar).getPropertyValue("inline-size")).toBe("2px");
    });

    test.each([1, 2, 4, 5, 6])(
      "level=%i のときは左のバーを描画しない",
      async (level) => {
        const { element } = await setup(
          `<mi-report-heading level="${level}">見出し</mi-report-heading>`,
        );

        expect(element.shadowRoot!.querySelector(".bar")).toBeNull();
      },
    );

    /* 下線は行全体（アクション領域も含む）に引くため .row 側に付く */
    test("level=2 のときだけ下線が付く", async () => {
      const { row, heading } = await setup(
        `<mi-report-heading level="2">見出し</mi-report-heading>`,
      );
      const styles = getComputedStyle(row);

      expect(styles.borderBlockEndStyle).toBe("solid");
      expect(styles.borderBlockEndWidth).toBe("1px");
      expect(styles.paddingBlockEnd).toBe("8px");
      // 見出し要素自身は下線を持たない（テキスト幅だけに線が引かれないようにする）
      expect(getComputedStyle(heading).borderBlockEndWidth).toBe("0px");
    });

    test.each([1, 3, 4, 5, 6])(
      "level=%i のときは下線が付かない",
      async (level) => {
        const { row } = await setup(
          `<mi-report-heading level="${level}">見出し</mi-report-heading>`,
        );

        expect(getComputedStyle(row).borderBlockEndWidth).toBe("0px");
      },
    );

    test("level=6 の文字色は弱いトークンになる", async () => {
      const { heading } = await setup(
        `<mi-report-heading level="6">見出し</mi-report-heading>`,
      );

      expect(getComputedStyle(heading).color).toBe("rgba(0, 0, 0, 0.54)");
    });

    test.each([1, 2, 3, 4, 5])(
      "level=%i の文字色は標準トークンになる",
      async (level) => {
        const { heading } = await setup(
          `<mi-report-heading level="${level}">見出し</mi-report-heading>`,
        );

        expect(getComputedStyle(heading).color).toBe("rgba(0, 0, 0, 0.84)");
      },
    );
  });

  describe("タイポグラフィ（desktop）", () => {
    test.each(desktopTypography)(
      "level=$level のタイポグラフィが Figma の値と一致する",
      async (typography) => {
        const { heading } = await setup(
          `<mi-report-heading level="${typography.level}">見出し</mi-report-heading>`,
        );

        expectTypography(heading, typography);
      },
    );

    /*
     * foundation.css が Shadow DOM 内の全要素（<slot> を含む）に font-weight を
     * 指定しているため、slot 越しの見出しテキストが normal に戻らないか確認する。
     */
    test("見出しの太さが slot で打ち消されない", async () => {
      const { element, heading } = await setup(
        `<mi-report-heading level="2">見出し</mi-report-heading>`,
      );
      const slotWeight = getComputedStyle(defaultSlot(element)).fontWeight;

      expect(slotWeight).toBe(getComputedStyle(heading).fontWeight);
      expect(slotWeight).toBe(
        getComputedStyle(heading).getPropertyValue("--font-weight-bold").trim(),
      );
    });
  });

  describe("スマートフォン幅（720px 以下）", () => {
    beforeAll(async () => {
      await page.viewport(PHONE_WIDTH, VIEWPORT_HEIGHT);
    });

    afterAll(async () => {
      await page.viewport(DESKTOP_WIDTH, VIEWPORT_HEIGHT);
    });

    test("level=1 は 25px / bold になる", async () => {
      const { heading } = await setup(
        `<mi-report-heading level="1">見出し</mi-report-heading>`,
      );

      expectTypography(heading, {
        level: 1,
        fontSize: 25,
        weight: "bold",
        lineHeight: 1.3,
        tracking: -0.02,
      });
    });

    test("level=6 は 14px になる", async () => {
      const { heading } = await setup(
        `<mi-report-heading level="6">見出し</mi-report-heading>`,
      );

      expectTypography(heading, {
        level: 6,
        fontSize: 14,
        weight: "bold",
        lineHeight: 1.5,
        tracking: 0.01,
      });
    });

    test.each([2, 3, 4, 5])(
      "level=%i は desktop と同じタイポグラフィのまま",
      async (level) => {
        const { heading } = await setup(
          `<mi-report-heading level="${level}">見出し</mi-report-heading>`,
        );
        const expected = desktopTypography.find(
          (typography) => typography.level === level,
        )!;

        expectTypography(heading, expected);
      },
    );
  });
});
