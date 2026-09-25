import "../../src/components/chip/mi-filter-chip";
import "../../src/components/chip/mi-filter-chip-group-single";
import "../../src/components/chip/mi-filter-chip-group-multiple";
import "../../src/components/icon";

import { afterEach, describe, expect, test } from "vitest";

import type { MiFilterChip } from "../../src/components/chip/mi-filter-chip";

function chips() {
  return Array.from(document.querySelectorAll<MiFilterChip>("mi-filter-chip"));
}

async function render(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-filter-chip");
  await Promise.all(chips().map((chip) => chip.updateComplete));
  return chips()[0];
}

function press(element: HTMLElement, key: string) {
  element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

/**
 * デザイン値は `@media (max-width: 720px)` で切り替わる（viewport プロパティは持たない）。
 * テストブラウザの幅に依存しないよう、期待値をメディアクエリで出し分ける。
 */
const isPhoneViewport = () => window.matchMedia("(max-width: 720px)").matches;

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-filter-chip", () => {
  describe("プロパティ", () => {
    test("既定値", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      expect(chip.label).toBe("");
      expect(chip.value).toBe("");
      expect(chip.selected).toBe(false);
      expect(chip.disabled).toBe(false);
    });

    // value 未指定なら label を値として扱う（ネイティブの <option> と同じ）。
    // 空のままだと単一選択グループで複数チップが同時に一致してしまうため。
    test("value 未指定なら label が値になる", async () => {
      const chip = await render(
        `<mi-filter-chip label="東京"></mi-filter-chip>`,
      );

      expect(chip.value).toBe("東京");
    });

    test("value を明示した場合はそちらが優先される", async () => {
      const chip = await render(
        `<mi-filter-chip label="東京" value="tokyo"></mi-filter-chip>`,
      );

      expect(chip.value).toBe("tokyo");
    });

    test("value を空文字に戻すと label に戻る", async () => {
      const chip = await render(
        `<mi-filter-chip label="東京" value="tokyo"></mi-filter-chip>`,
      );

      chip.value = "";
      await chip.updateComplete;

      expect(chip.value).toBe("東京");
    });

    test("label が表示される", async () => {
      const chip = await render(
        `<mi-filter-chip label="東京"></mi-filter-chip>`,
      );

      expect(chip.shadowRoot!.querySelector(".label")!.textContent).toContain(
        "東京",
      );
    });

    test("selected は属性に反映される", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);
      expect(chip.hasAttribute("selected")).toBe(false);

      chip.selected = true;
      await chip.updateComplete;

      expect(chip.hasAttribute("selected")).toBe(true);
    });

    test("disabled は属性に反映される", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);
      expect(chip.hasAttribute("disabled")).toBe(false);

      chip.disabled = true;
      await chip.updateComplete;

      expect(chip.hasAttribute("disabled")).toBe(true);
    });
  });

  describe("チェックアイコン", () => {
    test("未選択のときは表示しない", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      expect(chip.shadowRoot!.querySelector("mi-icon")).toBeNull();
    });

    test("選択中は check-small を装飾として表示する", async () => {
      const chip = await render(`<mi-filter-chip selected></mi-filter-chip>`);

      const icon = chip.shadowRoot!.querySelector("mi-icon");
      expect(icon).not.toBeNull();
      expect(icon!.getAttribute("type")).toBe("check-small");
      expect(
        chip
          .shadowRoot!.querySelector(".check-icon")!
          .getAttribute("aria-hidden"),
      ).toBe("true");
    });
  });

  describe("role の出し分け", () => {
    test("単体では role=button + aria-pressed", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      expect(chip.getAttribute("role")).toBe("button");
      expect(chip.getAttribute("aria-pressed")).toBe("false");
      expect(chip.hasAttribute("aria-checked")).toBe(false);
    });

    test("単一選択グループ内では role=radio + aria-checked", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="a">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);
      const chip = chips()[0];
      await chip.updateComplete;

      expect(chip.getAttribute("role")).toBe("radio");
      expect(chip.getAttribute("aria-checked")).toBe("true");
      // 使わないほうの属性は残さない
      expect(chip.hasAttribute("aria-pressed")).toBe(false);
    });

    test("複数選択グループ内では role=button + aria-pressed", async () => {
      await render(`
        <mi-filter-chip-group-multiple aria-label="業種">
          <mi-filter-chip label="A" value="a" selected></mi-filter-chip>
        </mi-filter-chip-group-multiple>
      `);
      const chip = chips()[0];
      await chip.updateComplete;

      expect(chip.getAttribute("role")).toBe("button");
      expect(chip.getAttribute("aria-pressed")).toBe("true");
      expect(chip.hasAttribute("aria-checked")).toBe(false);
    });

    test("aria の選択状態は selected に追従する", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);
      expect(chip.getAttribute("aria-pressed")).toBe("false");

      chip.selected = true;
      await chip.updateComplete;

      expect(chip.getAttribute("aria-pressed")).toBe("true");
    });
  });

  describe("フォーカス", () => {
    test("単体では tabindex=0 でフォーカスできる", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      expect(chip.getAttribute("tabindex")).toBe("0");
      chip.focus();
      expect(document.activeElement).toBe(chip);
    });

    test("disabled では tabindex を付けず aria-disabled を立てる", async () => {
      const chip = await render(`<mi-filter-chip disabled></mi-filter-chip>`);

      expect(chip.hasAttribute("tabindex")).toBe(false);
      expect(chip.getAttribute("aria-disabled")).toBe("true");
    });

    test("disabled を解除すると再びフォーカスできる", async () => {
      const chip = await render(`<mi-filter-chip disabled></mi-filter-chip>`);

      chip.disabled = false;
      await chip.updateComplete;

      expect(chip.getAttribute("tabindex")).toBe("0");
      expect(chip.hasAttribute("aria-disabled")).toBe(false);
    });
  });

  describe("操作", () => {
    test("クリックで選択がトグルする", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      chip.click();
      await chip.updateComplete;
      expect(chip.selected).toBe(true);

      chip.click();
      await chip.updateComplete;
      expect(chip.selected).toBe(false);
    });

    test.each([["Enter"], [" "]])("%s キーで選択がトグルする", async (key) => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      press(chip, key);
      await chip.updateComplete;

      expect(chip.selected).toBe(true);
    });

    test("矢印キーでは何も起きない（単体のとき）", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);

      press(chip, "ArrowRight");
      await chip.updateComplete;

      expect(chip.selected).toBe(false);
    });

    test("disabled ではクリックとキー操作を受け付けない", async () => {
      const chip = await render(`<mi-filter-chip disabled></mi-filter-chip>`);

      chip.click();
      press(chip, "Enter");
      press(chip, " ");
      await chip.updateComplete;

      expect(chip.selected).toBe(false);
    });

    test("disabled のクリックは外へ漏らさない", async () => {
      const chip = await render(`<mi-filter-chip disabled></mi-filter-chip>`);
      let received = 0;
      document.body.addEventListener("click", () => received++);

      chip.click();

      expect(received).toBe(0);
    });

    test("クリックは composed なので外側まで届く（単体のとき）", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);
      let received = 0;
      document.body.addEventListener("click", () => received++);

      chip.click();

      expect(received).toBe(1);
    });
  });

  describe("デザイン値", () => {
    test("ラベルは省略せず折り返す", async () => {
      const chip = await render(
        `<mi-filter-chip label="とても長いラベル"></mi-filter-chip>`,
      );
      const style = getComputedStyle(
        chip.shadowRoot!.querySelector<HTMLElement>(".label")!,
      );

      expect(style.whiteSpace).toBe("normal");
      expect(style.textOverflow).toBe("clip");
    });

    test("角丸・余白・タイポが Figma の指定どおりになる", async () => {
      const chip = await render(`<mi-filter-chip></mi-filter-chip>`);
      const style = getComputedStyle(chip);
      const phone = isPhoneViewport();

      expect(style.borderRadius).toBe("9999px");
      expect(style.paddingBlockStart).toBe("2px");
      expect(style.paddingBlockEnd).toBe("2px");
      expect(style.minBlockSize).toBe(phone ? "28px" : "24px");
      expect(style.paddingInlineStart).toBe(phone ? "12px" : "8px");
      expect(style.paddingInlineEnd).toBe(phone ? "12px" : "8px");
      expect(style.fontSize).toBe(phone ? "14px" : "12px");
      expect(style.letterSpacing).toBe(phone ? "0.14px" : "0.12px");
    });

    test("選択中はチェックアイコンの分だけ start 側の余白が詰まる", async () => {
      const chip = await render(`<mi-filter-chip selected></mi-filter-chip>`);
      const style = getComputedStyle(chip);
      const phone = isPhoneViewport();

      expect(style.paddingInlineStart).toBe("4px");
      expect(style.paddingInlineEnd).toBe(phone ? "12px" : "8px");
    });

    test("チェックアイコンのサイズが Figma の指定どおりになる", async () => {
      const chip = await render(`<mi-filter-chip selected></mi-filter-chip>`);
      const style = getComputedStyle(
        chip.shadowRoot!.querySelector<HTMLElement>(".check-icon")!,
      );
      const phone = isPhoneViewport();

      expect(style.inlineSize).toBe(phone ? "20px" : "18px");
      expect(style.blockSize).toBe(phone ? "20px" : "18px");
    });

    test("disabled では背景色を変えず文字色だけ薄くする", async () => {
      await render(`
        <div>
          <mi-filter-chip label="A"></mi-filter-chip>
          <mi-filter-chip label="B" disabled></mi-filter-chip>
        </div>
      `);
      const [normal, disabled] = chips();

      expect(getComputedStyle(disabled).backgroundColor).toBe(
        getComputedStyle(normal).backgroundColor,
      );
      expect(getComputedStyle(disabled).color).not.toBe(
        getComputedStyle(normal).color,
      );
    });

    test("selected かつ disabled でも選択時の背景色を保つ", async () => {
      await render(`
        <div>
          <mi-filter-chip label="A" selected></mi-filter-chip>
          <mi-filter-chip label="B" selected disabled></mi-filter-chip>
        </div>
      `);
      const [normal, disabled] = chips();

      expect(getComputedStyle(disabled).backgroundColor).toBe(
        getComputedStyle(normal).backgroundColor,
      );
    });
  });
});
