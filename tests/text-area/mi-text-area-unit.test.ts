import "../../src/components/text-area/mi-text-area-unit";

import { beforeAll, describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";

import type { MiTextAreaUnit } from "../../src/components/text-area/mi-text-area-unit";

const setup = async (html: string) => {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-text-area-unit");
  await customElements.whenDefined("mi-text-area");

  const element = document.querySelector("mi-text-area-unit")!;
  await element.updateComplete;

  const textArea = element.shadowRoot!.querySelector("mi-text-area")!;
  await textArea.updateComplete;

  return {
    element,
    labelUnit: element.shadowRoot!.querySelector("mi-label-unit")!,
    textArea,
    textarea: textArea.shadowRoot!.querySelector("textarea")!,
  };
};

/** slotchange と内側コンポーネントの再描画が落ち着くのを待つ */
const settle = async (element: MiTextAreaUnit) => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await element.updateComplete;
  const textArea = element.shadowRoot!.querySelector("mi-text-area")!;
  await textArea.updateComplete;
  return textArea;
};

/**
 * ブラウザモードの既定の viewport は 414px（= 720px 以下）なので、
 * 指定しないとスマートフォン用スタイルで動いてしまう。
 * mi-text-area.test.ts と同じく、既定は desktop 幅で検証する。
 * viewport の変更は副作用のある操作なので beforeAll で1回だけ呼ぶ。
 */
const DESKTOP_WIDTH = 1280;
const VIEWPORT_HEIGHT = 900;

describe("mi-text-area-unit", () => {
  beforeAll(async () => {
    await page.viewport(DESKTOP_WIDTH, VIEWPORT_HEIGHT);
  });
  describe("ラベル", () => {
    test("text がラベルとして表示される", async () => {
      const { labelUnit } = await setup(
        `<mi-text-area-unit text="自己紹介"></mi-text-area-unit>`,
      );
      await labelUnit.updateComplete;

      expect(labelUnit.getAttribute("text")).toBe("自己紹介");
      expect(
        labelUnit.shadowRoot!.querySelector(".label")!.textContent,
      ).toContain("自己紹介");
    });

    test("text がない場合はラベルを表示しない", async () => {
      const { labelUnit } = await setup(
        `<mi-text-area-unit></mi-text-area-unit>`,
      );

      expect(labelUnit.classList.contains("none")).toBe(true);
    });

    test("support-text がラベルの下に表示される", async () => {
      const { labelUnit } = await setup(
        `<mi-text-area-unit text="自己紹介" support-text="500文字以内で入力してください"></mi-text-area-unit>`,
      );
      await labelUnit.updateComplete;

      expect(
        labelUnit.shadowRoot!.querySelector(".support")!.textContent,
      ).toContain("500文字以内で入力してください");
    });

    test("text がなく support-text だけでもラベル領域を表示する", async () => {
      const { labelUnit } = await setup(
        `<mi-text-area-unit support-text="補足だけ"></mi-text-area-unit>`,
      );
      await labelUnit.updateComplete;

      expect(labelUnit.classList.contains("none")).toBe(false);
      expect(
        labelUnit.shadowRoot!.querySelector(".support")!.textContent,
      ).toContain("補足だけ");
    });

    test("text も support-text もない場合はラベル領域を隠す", async () => {
      const { labelUnit } = await setup(
        `<mi-text-area-unit></mi-text-area-unit>`,
      );

      expect(labelUnit.classList.contains("none")).toBe(true);
    });

    test("support-text が読み上げでも欄の説明として関連付く", async () => {
      // 見えている補足テキストは mi-label-unit の Shadow DOM 内にあり
      // aria-describedby では参照できないため、同じ文言を description として渡している
      const { textArea, textarea } = await setup(
        `<mi-text-area-unit text="自己紹介" support-text="500文字以内で入力してください"></mi-text-area-unit>`,
      );
      await textArea.updateComplete;

      const ids = textarea.getAttribute("aria-describedby")!.split(" ");
      expect(ids).toContain("description");

      const description = textArea.shadowRoot!.getElementById("description")!;
      expect(description.textContent?.trim()).toBe(
        "500文字以内で入力してください",
      );
    });

    test("text が内側の textarea の aria-label にも渡る", async () => {
      // mi-label-unit のテキストは別の Shadow DOM 内にあり aria-labelledby では参照できないため
      const { textarea } = await setup(
        `<mi-text-area-unit text="自己紹介"></mi-text-area-unit>`,
      );

      expect(textarea.getAttribute("aria-label")).toBe("自己紹介");
    });
  });

  describe("required", () => {
    test("ラベルに必須バッジが表示される", async () => {
      const { labelUnit } = await setup(
        `<mi-text-area-unit text="自己紹介" required></mi-text-area-unit>`,
      );
      await labelUnit.updateComplete;

      expect(
        labelUnit.shadowRoot!.querySelector(".required")?.textContent,
      ).toBe("必須");
    });

    test("入力欄に aria-required が付く", async () => {
      const { textarea } = await setup(
        `<mi-text-area-unit text="自己紹介" required></mi-text-area-unit>`,
      );

      expect(textarea.getAttribute("aria-required")).toBe("true");
    });
  });

  describe("値とフォーム連携", () => {
    test("value が内側の textarea に反映される", async () => {
      const { textarea } = await setup(
        `<mi-text-area-unit value="初期値"></mi-text-area-unit>`,
      );

      expect(textarea.value).toBe("初期値");
    });

    test("入力すると value が更新される", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area-unit></mi-text-area-unit>`,
      );

      await page.elementLocator(textarea).fill("入力したテキスト");

      expect(element.value).toBe("入力したテキスト");
    });

    test("入力すると form の送信値に反映される", async () => {
      document.body.innerHTML = `
        <form id="form">
          <mi-text-area-unit name="body"></mi-text-area-unit>
        </form>`;
      await customElements.whenDefined("mi-text-area-unit");
      const element = document.querySelector("mi-text-area-unit")!;
      await element.updateComplete;
      const textArea = element.shadowRoot!.querySelector("mi-text-area")!;
      await textArea.updateComplete;
      const textarea = textArea.shadowRoot!.querySelector("textarea")!;

      await page.elementLocator(textarea).fill("送信されるテキスト");
      await element.updateComplete;

      const form = document.getElementById("form") as HTMLFormElement;
      expect(new FormData(form).get("body")).toBe("送信されるテキスト");
    });

    test("フォームをリセットすると初期値に戻る", async () => {
      document.body.innerHTML = `
        <form id="form">
          <mi-text-area-unit name="body" value="初期値"></mi-text-area-unit>
        </form>`;
      await customElements.whenDefined("mi-text-area-unit");
      const element = document.querySelector("mi-text-area-unit")!;
      await element.updateComplete;

      element.value = "編集後のテキスト";
      await element.updateComplete;

      (document.getElementById("form") as HTMLFormElement).reset();
      await element.updateComplete;

      expect(element.value).toBe("初期値");
    });
  });

  describe("エラー表示", () => {
    test('slot="error" が内側のテキストエリアに流れる', async () => {
      const { textArea } = await setup(
        `<mi-text-area-unit text="自己紹介">
          <span slot="error">入力内容に誤りがあります</span>
        </mi-text-area-unit>`,
      );
      await textArea.updateComplete;

      const helperTexts =
        textArea.shadowRoot!.querySelectorAll("mi-helper-text");
      expect(helperTexts.length).toBe(1);
      expect(helperTexts[0].textContent?.trim()).toBe(
        "入力内容に誤りがあります",
      );
    });

    test("複数のエラーがすべて表示される", async () => {
      const { textArea } = await setup(
        `<mi-text-area-unit text="自己紹介">
          <span slot="error">エラー1</span>
          <span slot="error">エラー2</span>
          <span slot="error">エラー3</span>
        </mi-text-area-unit>`,
      );
      await textArea.updateComplete;

      expect(
        textArea.shadowRoot!.querySelectorAll("mi-helper-text").length,
      ).toBe(3);
    });

    test("エラー内のリンクが保持される", async () => {
      const { textArea } = await setup(
        `<mi-text-area-unit text="自己紹介">
          <span slot="error">詳しくは<a href="/help">こちら</a></span>
        </mi-text-area-unit>`,
      );
      await textArea.updateComplete;

      const helperText = textArea.shadowRoot!.querySelector("mi-helper-text")!;
      expect(helperText.querySelector("a")?.getAttribute("href")).toBe("/help");
    });

    test("後から追加したエラーが表示される", async () => {
      const { element } = await setup(
        `<mi-text-area-unit text="自己紹介"></mi-text-area-unit>`,
      );

      const span = document.createElement("span");
      span.slot = "error";
      span.textContent = "後から追加したエラー";
      element.appendChild(span);

      const textArea = await settle(element);

      expect(
        textArea.shadowRoot!.querySelectorAll("mi-helper-text").length,
      ).toBe(1);
    });
  });

  describe("テキストエリアへの委譲", () => {
    test("size が反映される", async () => {
      const { textarea } = await setup(
        `<mi-text-area-unit size="large"></mi-text-area-unit>`,
      );

      expect(textarea.dataset.size).toBe("large");
    });

    test("placeholder / disabled が反映される", async () => {
      const { textarea } = await setup(
        `<mi-text-area-unit placeholder="入力してください" disabled></mi-text-area-unit>`,
      );

      expect(textarea.placeholder).toBe("入力してください");
      expect(textarea.disabled).toBe(true);
    });

    test("min-rows / max-rows が反映される", async () => {
      const { textarea } = await setup(
        `<mi-text-area-unit min-rows="4" max-rows="8"></mi-text-area-unit>`,
      );

      expect(textarea.rows).toBe(4);
      expect(textarea.style.getPropertyValue("--text-area-min-rows")).toBe("4");
      expect(textarea.style.getPropertyValue("--text-area-max-rows")).toBe("8");
    });

    test("show-count / max-length が反映される", async () => {
      const { textArea } = await setup(
        `<mi-text-area-unit show-count max-length="100" value="あいう"></mi-text-area-unit>`,
      );
      await textArea.updateComplete;

      const count = textArea.shadowRoot!.querySelector(".count")!;
      expect(count.textContent?.replace(/\s/g, "")).toBe("3/100");
    });
  });

  describe("レイアウトと行数の正規化", () => {
    test("flex コンテナの中でも潰れずコンテナ幅に追従する", async () => {
      document.body.innerHTML = `<div style="display:flex; width:200px"><mi-text-area-unit text="ラベル"></mi-text-area-unit></div>`;
      await customElements.whenDefined("mi-text-area-unit");
      const element = document.querySelector("mi-text-area-unit")!;
      await element.updateComplete;

      expect(Math.round(element.getBoundingClientRect().width)).toBe(200);
    });

    test("min-rows に2未満を指定すると unit 側のプロパティも2に正規化される", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area-unit min-rows="1"></mi-text-area-unit>`,
      );

      expect(element.minRows).toBe(2);
      expect(element.getAttribute("min-rows")).toBe("2");
      expect(textarea.rows).toBe(2);
    });

    test("値のない max-rows は unit 側でも上限なしになる", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area-unit max-rows></mi-text-area-unit>`,
      );

      expect(element.maxRows).toBe(null);
      expect(textarea.hasAttribute("data-has-max-rows")).toBe(false);
    });

    test("max-rows が min-rows より小さい場合は min-rows に揃う", async () => {
      const { element } = await setup(
        `<mi-text-area-unit min-rows="5" max-rows="3"></mi-text-area-unit>`,
      );

      expect(element.maxRows).toBe(5);
    });
  });

  describe("Figma との寸法照合", () => {
    const heightOf = (e: Element) =>
      Math.round(e.getBoundingClientRect().height);

    test("ラベルとテキストエリアの間隔が Figma の 8px と一致する", async () => {
      const { labelUnit, textArea } = await setup(
        `<div style="width:256px"><mi-text-area-unit text="ラベル" min-rows="3"></mi-text-area-unit></div>`,
      );
      await labelUnit.updateComplete;

      const gap =
        textArea.getBoundingClientRect().top -
        labelUnit.getBoundingClientRect().bottom;
      expect(Math.round(gap)).toBe(8);
    });

    test("desktop / medium の全体高さが Figma の 108px と一致する", async () => {
      // Figma: label 21 + 間隔 8 + テキストエリア 79（3行分）
      const { element, labelUnit } = await setup(
        `<div style="width:256px"><mi-text-area-unit text="ラベル" min-rows="3"></mi-text-area-unit></div>`,
      );
      await labelUnit.updateComplete;

      expect(heightOf(element)).toBe(108);
    });

    test("desktop / large（補足テキストあり）の全体高さ", async () => {
      // Figma は 137px（label 41 + 間隔 8 + テキストエリア 88）だが実装は 139px。
      // 差の 2px は mi-label-unit の .support に line-height の指定がなく
      // 補足テキストが 16px ではなく 18px になっているため（別課題）。
      const { element, labelUnit } = await setup(
        `<div style="width:256px"><mi-text-area-unit text="ラベル" support-text="補足" size="large" min-rows="3"></mi-text-area-unit></div>`,
      );
      await labelUnit.updateComplete;

      expect(heightOf(element)).toBe(139);
    });
  });

  describe("イベント", () => {
    test("input イベントがホスト要素の外まで届く", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area-unit></mi-text-area-unit>`,
      );

      const handler = vi.fn();
      element.addEventListener("input", handler);

      await page.elementLocator(textarea).fill("abc");

      expect(handler).toHaveBeenCalled();
    });

    test("change が1回だけ再発火され、ネイティブと同じ bubbles / composed になる", async () => {
      document.body.innerHTML = `<div id="ancestor"><mi-text-area-unit></mi-text-area-unit></div>`;
      await customElements.whenDefined("mi-text-area-unit");
      const element = document.querySelector("mi-text-area-unit")!;
      await element.updateComplete;
      const textArea = element.shadowRoot!.querySelector("mi-text-area")!;
      await textArea.updateComplete;
      const textarea = textArea.shadowRoot!.querySelector("textarea")!;

      const received: Event[] = [];
      element.addEventListener("change", (e) => received.push(e));
      const onAncestor = vi.fn();
      document
        .getElementById("ancestor")!
        .addEventListener("change", onAncestor);

      // value の同期は input で起きるため、実際の操作と同じ順序で発火させる
      textarea.value = "abc";
      textarea.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
      await element.updateComplete;
      textarea.dispatchEvent(new Event("change", { bubbles: true }));
      await element.updateComplete;

      // 内側の change を止めてから発火し直すので、二重に飛ばない
      expect(received).toHaveLength(1);
      expect(received[0].bubbles).toBe(true);
      expect(received[0].composed).toBe(false);
      expect(onAncestor).toHaveBeenCalledTimes(1);
      expect(element.value).toBe("abc");
    });
  });

  test("autofocus が内側の textarea に委譲される", async () => {
    const { textarea } = await setup(
      `<mi-text-area-unit autofocus></mi-text-area-unit>`,
    );

    expect(textarea.hasAttribute("autofocus")).toBe(true);
  });

  test("autofocus を指定しない場合は付かない", async () => {
    const { textarea } = await setup(`<mi-text-area-unit></mi-text-area-unit>`);

    expect(textarea.hasAttribute("autofocus")).toBe(false);
  });

  test("フォーカスすると内側の textarea にフォーカスが移る", async () => {
    const { element, textarea } = await setup(
      `<mi-text-area-unit></mi-text-area-unit>`,
    );

    element.focus();

    expect(element.shadowRoot!.activeElement?.shadowRoot?.activeElement).toBe(
      textarea,
    );
  });
});
