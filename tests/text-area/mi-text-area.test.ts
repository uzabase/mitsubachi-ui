import "../../src/components/text-area/mi-text-area";

import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { page } from "vitest/browser";

import type { MiTextArea } from "../../src/components/text-area/mi-text-area";

const setup = async (html: string) => {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-text-area");

  const element = document.querySelector("mi-text-area")!;
  await element.updateComplete;

  return {
    element,
    textarea: element.shadowRoot!.querySelector("textarea")!,
  };
};

/**
 * ブラウザモードの既定の viewport は 414px（= 720px 以下）なので、
 * 何も指定しないと `@media (width <= 720px)` のスマートフォン用スタイルで動いてしまう。
 * このリポジトリの実装規約は PC ファースト（ブレイクポイントは 720px の1箇所）なので、
 * 既定は desktop 幅で検証し、スマートフォン幅は該当の describe で明示的に切り替える。
 *
 * viewport の変更はブラウザに対する副作用のある操作なので、テストごと（beforeEach）ではなく
 * ファイル/describe 単位（beforeAll）で最小回数だけ呼ぶ。
 */
const DESKTOP_WIDTH = 1280;
const PHONE_WIDTH = 414;
const VIEWPORT_HEIGHT = 900;

describe("mi-text-area", () => {
  beforeAll(async () => {
    await page.viewport(DESKTOP_WIDTH, VIEWPORT_HEIGHT);
  });

  test("入力すると value が更新される", async () => {
    const { element, textarea } = await setup(`<mi-text-area></mi-text-area>`);

    await page.elementLocator(textarea).fill("入力したテキスト");

    expect(element.value).toBe("入力したテキスト");
  });

  test("value を指定すると textarea に反映される", async () => {
    const { textarea } = await setup(
      `<mi-text-area value="初期値"></mi-text-area>`,
    );

    expect(textarea.value).toBe("初期値");
  });

  test("入力すると form の送信値に反映される", async () => {
    document.body.innerHTML = `
      <form id="form">
        <mi-text-area name="comment"></mi-text-area>
      </form>
    `;
    await customElements.whenDefined("mi-text-area");

    const element = document.querySelector("mi-text-area")!;
    await element.updateComplete;
    const textarea = element.shadowRoot!.querySelector("textarea")!;

    await page.elementLocator(textarea).fill("送信される値");
    await element.updateComplete;

    const formData = new FormData(document.querySelector("form")!);
    expect(formData.get("comment")).toBe("送信される値");
  });

  test("placeholder / disabled が textarea に反映される", async () => {
    const { textarea } = await setup(
      `<mi-text-area placeholder="入力してください" disabled></mi-text-area>`,
    );

    expect(textarea.placeholder).toBe("入力してください");
    expect(textarea.disabled).toBe(true);
  });

  test("size を指定すると textarea の data-size に反映される", async () => {
    const { textarea } = await setup(
      `<mi-text-area size="large"></mi-text-area>`,
    );

    expect(textarea.dataset.size).toBe("large");
  });

  test("size を指定しない場合は medium になる", async () => {
    const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

    expect(textarea.dataset.size).toBe("medium");
  });

  describe("文字数カウンター", () => {
    test("show-count を指定しない場合は表示されない", async () => {
      const { element } = await setup(
        `<mi-text-area max-length="10"></mi-text-area>`,
      );

      expect(element.shadowRoot!.querySelector(".count")).toBeNull();
    });

    test("show-count を指定すると 現在値 / 上限 が表示される", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="10" value="あいう"></mi-text-area>`,
      );

      const count = element.shadowRoot!.querySelector(".count")!;
      expect(count.textContent?.replace(/\s/g, "")).toBe("3/10");
    });

    test("max-length がない場合は現在値のみ表示される", async () => {
      const { element } = await setup(
        `<mi-text-area show-count value="あいう"></mi-text-area>`,
      );

      const count = element.shadowRoot!.querySelector(".count")!;
      expect(count.textContent?.replace(/\s/g, "")).toBe("3");
    });

    test("上限以内の場合は現在値が強調されない", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="3" value="あいう"></mi-text-area>`,
      );

      const current = element.shadowRoot!.querySelector(".count-current")!;
      expect(current.classList.contains("over")).toBe(false);
    });

    test("上限を超えても入力は保持され、現在値が強調される", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area show-count max-length="3"></mi-text-area>`,
      );

      await page.elementLocator(textarea).fill("あいうえお");
      await element.updateComplete;

      // ネイティブの maxlength と異なり、上限を超えた入力も切り捨てない
      expect(element.value).toBe("あいうえお");

      const current = element.shadowRoot!.querySelector(".count-current")!;
      expect(current.textContent?.trim()).toBe("5");
      expect(current.classList.contains("over")).toBe(true);
    });

    test("上限を超えると枠線がエラー表示になり aria-invalid が true になる", async () => {
      const { textarea } = await setup(
        `<mi-text-area show-count max-length="3" value="あいうえお"></mi-text-area>`,
      );

      expect(textarea.classList.contains("error")).toBe(true);
      expect(textarea.getAttribute("aria-invalid")).toBe("true");
    });

    test("disabled の場合は超過してもエラー表示にならない", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area show-count max-length="3" value="あいうえお" disabled></mi-text-area>`,
      );

      expect(textarea.classList.contains("error")).toBe(false);
      expect(textarea.getAttribute("aria-invalid")).toBe("false");

      const current = element.shadowRoot!.querySelector(".count-current")!;
      expect(current.classList.contains("over")).toBe(false);
    });

    test("show-count がない場合は超過してもエラー表示にならない", async () => {
      const { textarea } = await setup(
        `<mi-text-area max-length="3" value="あいうえお"></mi-text-area>`,
      );

      // カウンターを出していない状態で理由の分からない赤枠を見せないため
      expect(textarea.classList.contains("error")).toBe(false);
      expect(textarea.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("フォームのリセット", () => {
    const setupForm = async (attrs: string) => {
      document.body.innerHTML = `
        <form id="form">
          <mi-text-area name="body" ${attrs}></mi-text-area>
        </form>`;
      await customElements.whenDefined("mi-text-area");
      const element = document.querySelector("mi-text-area")!;
      await element.updateComplete;
      return {
        element,
        form: document.getElementById("form") as HTMLFormElement,
      };
    };

    test("リセットすると初期値に戻る", async () => {
      const { element, form } = await setupForm(`value="初期値"`);

      element.value = "編集後のテキスト";
      await element.updateComplete;

      form.reset();
      await element.updateComplete;

      expect(element.value).toBe("初期値");
      expect(element.shadowRoot!.querySelector("textarea")!.value).toBe(
        "初期値",
      );
    });

    test("リセット後の値がフォームの送信値にも反映される", async () => {
      const { element, form } = await setupForm(`value="初期値"`);

      element.value = "編集後のテキスト";
      await element.updateComplete;

      form.reset();
      await element.updateComplete;

      expect(new FormData(form).get("body")).toBe("初期値");
    });

    test("初期値がない場合は空に戻る", async () => {
      const { element, form } = await setupForm("");

      element.value = "編集後のテキスト";
      await element.updateComplete;

      form.reset();
      await element.updateComplete;

      expect(element.value).toBe("");
    });
  });

  describe("ラベル", () => {
    test("label を指定すると textarea に aria-label が設定される", async () => {
      const { textarea } = await setup(
        `<mi-text-area label="自己紹介"></mi-text-area>`,
      );

      expect(textarea.getAttribute("aria-label")).toBe("自己紹介");
    });

    test("label を指定しない場合は aria-label を出力しない", async () => {
      // 空文字の aria-label はアクセシブルな名前を空にしてしまうため、属性自体を出さない
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.hasAttribute("aria-label")).toBe(false);
    });
  });

  describe("入力エリアの高さ", () => {
    const heightOf = (textarea: HTMLTextAreaElement) =>
      textarea.getBoundingClientRect().height;

    test("min-rows を指定しない場合は2行分になる", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.rows).toBe(2);
    });

    test("medium の2行分の高さが Figma の指定値と一致する", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(heightOf(textarea)).toBe(58);
    });

    test("large の2行分の高さが Figma の指定値と一致する", async () => {
      const { textarea } = await setup(
        `<mi-text-area size="large"></mi-text-area>`,
      );

      expect(heightOf(textarea)).toBe(64);
    });

    test("min-rows を増やすと1行分ずつ高くなる", async () => {
      // medium の1行は 21px（font-size 14px × line-height 1.5）
      const { textarea } = await setup(
        `<mi-text-area min-rows="3"></mi-text-area>`,
      );

      expect(heightOf(textarea)).toBe(58 + 21);
    });

    test("min-rows を指定するとその行数が下限になる", async () => {
      const { textarea } = await setup(
        `<mi-text-area min-rows="4"></mi-text-area>`,
      );

      expect(textarea.rows).toBe(4);
      expect(textarea.style.getPropertyValue("--text-area-min-rows")).toBe("4");
    });

    test("min-rows に2未満を指定しても2として扱われる", async () => {
      // デザイン仕様上 2 行が下限のため
      const { element, textarea } = await setup(
        `<mi-text-area min-rows="1"></mi-text-area>`,
      );

      expect(textarea.rows).toBe(2);
      expect(textarea.style.getPropertyValue("--text-area-min-rows")).toBe("2");
      // 見た目だけでなくプロパティ・属性も 2 に揃っていること
      expect(element.minRows).toBe(2);
      expect(element.getAttribute("min-rows")).toBe("2");
    });

    test("数値でない min-rows を指定しても2に正規化される", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area min-rows="あ"></mi-text-area>`,
      );

      expect(element.minRows).toBe(2);
      expect(textarea.rows).toBe(2);
    });

    test("max-rows を指定しない場合は上限をかけない", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.hasAttribute("data-has-max-rows")).toBe(false);
      expect(textarea.style.getPropertyValue("--text-area-max-rows")).toBe("");
    });

    test("max-rows を指定すると上限がかかる", async () => {
      const { textarea } = await setup(
        `<mi-text-area max-rows="6"></mi-text-area>`,
      );

      expect(textarea.hasAttribute("data-has-max-rows")).toBe(true);
      expect(textarea.style.getPropertyValue("--text-area-max-rows")).toBe("6");
    });

    test("値のない max-rows は上限なしとして扱う", async () => {
      // 属性値が空文字だと 0 になるため、そのままでは「一切伸びない」状態になってしまう
      const { element, textarea } = await setup(
        `<mi-text-area max-rows></mi-text-area>`,
      );

      expect(element.maxRows).toBe(null);
      expect(textarea.hasAttribute("data-has-max-rows")).toBe(false);
    });

    test("max-rows に0以下を指定した場合も上限なしとして扱う", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area max-rows="0"></mi-text-area>`,
      );

      expect(element.maxRows).toBe(null);
      expect(textarea.hasAttribute("data-has-max-rows")).toBe(false);
    });

    test("手動リサイズした高さが min-rows の変更で失われない", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area></mi-text-area>`,
      );

      // ブラウザが resize ドラッグで行うのと同じこと（インライン style に height を書く）
      textarea.style.height = "200px";

      element.minRows = 4;
      await element.updateComplete;

      expect(textarea.style.height).toBe("200px");
      expect(textarea.style.getPropertyValue("--text-area-min-rows")).toBe("4");
    });

    test("max-rows が min-rows より小さい場合は min-rows に揃える", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area min-rows="5" max-rows="3"></mi-text-area>`,
      );

      expect(textarea.style.getPropertyValue("--text-area-max-rows")).toBe("5");
      expect(element.maxRows).toBe(5);
      expect(element.getAttribute("max-rows")).toBe("5");
    });

    test("入力量が増えると高さが伸びる", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area max-rows="10"></mi-text-area>`,
      );
      const initial = heightOf(textarea);

      element.value = "1行目\n2行目\n3行目\n4行目\n5行目";
      await element.updateComplete;

      expect(heightOf(textarea)).toBeGreaterThan(initial);
    });

    test("min-rows と max-rows を同じ値にすると高さが固定される", async () => {
      // 自動伸縮を止めたい場合の手段。JSDoc / Story に明記している挙動
      const { element, textarea } = await setup(
        `<mi-text-area min-rows="3" max-rows="3"></mi-text-area>`,
      );
      const initial = heightOf(textarea);

      element.value = Array.from({ length: 20 }, (_, i) => `${i}行目`).join(
        "\n",
      );
      await element.updateComplete;

      expect(heightOf(textarea)).toBe(initial);
      expect(textarea.scrollHeight).toBeGreaterThan(textarea.clientHeight);
    });

    test("flex コンテナの中でも潰れずコンテナ幅に追従する", async () => {
      // field-sizing: content は幅の intrinsic size も内容ベースにするため、
      // :host に inline-size がないと flex アイテムとして極端に細くなる
      document.body.innerHTML = `<div style="display:flex; width:200px"><mi-text-area></mi-text-area></div>`;
      await customElements.whenDefined("mi-text-area");
      const element = document.querySelector("mi-text-area")!;
      await element.updateComplete;

      expect(Math.round(element.getBoundingClientRect().width)).toBe(200);
    });

    test("利用側の幅指定が :host の既定より優先される", async () => {
      document.body.innerHTML = `<div style="display:flex; width:300px"><mi-text-area style="inline-size:120px"></mi-text-area></div>`;
      await customElements.whenDefined("mi-text-area");
      const element = document.querySelector("mi-text-area")!;
      await element.updateComplete;

      expect(Math.round(element.getBoundingClientRect().width)).toBe(120);
    });

    test("desktop では縦方向のリサイズができる", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(getComputedStyle(textarea).resize).toBe("vertical");
    });

    test("max-rows に達すると高さが止まる", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area max-rows="3"></mi-text-area>`,
      );
      const initial = heightOf(textarea);

      element.value = Array.from({ length: 20 }, (_, i) => `${i}行目`).join(
        "\n",
      );
      await element.updateComplete;
      const capped = heightOf(textarea);

      element.value = Array.from({ length: 40 }, (_, i) => `${i}行目`).join(
        "\n",
      );
      await element.updateComplete;

      // 上限まで伸びたうえで止まっていること（伸びずに止まっている状態と区別する）
      expect(capped).toBeGreaterThan(initial);
      // さらに入力しても高さは変わらず、中がスクロールする
      expect(heightOf(textarea)).toBe(capped);
      expect(textarea.scrollHeight).toBeGreaterThan(textarea.clientHeight);
    });
  });

  describe("スマートフォン幅（720px 以下）", () => {
    beforeAll(async () => {
      await page.viewport(PHONE_WIDTH, VIEWPORT_HEIGHT);
    });

    // 後続の describe が desktop 前提で動くよう必ず戻す
    afterAll(async () => {
      await page.viewport(DESKTOP_WIDTH, VIEWPORT_HEIGHT);
    });

    test("2行分の高さがタッチ操作向けに大きくなる", async () => {
      // font-size が 16px になるため1行が 24px になる
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.getBoundingClientRect().height).toBe(64);
    });

    test("min-rows を増やすと phone 用の行の高さで増える", async () => {
      const { textarea } = await setup(
        `<mi-text-area min-rows="3"></mi-text-area>`,
      );

      expect(textarea.getBoundingClientRect().height).toBe(64 + 24);
    });

    test("リサイズハンドルを出さない", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(getComputedStyle(textarea).resize).toBe("none");
    });
  });

  describe("autofocus", () => {
    test("autofocus を指定すると textarea に反映される", async () => {
      const { textarea } = await setup(
        `<mi-text-area autofocus></mi-text-area>`,
      );

      expect(textarea.hasAttribute("autofocus")).toBe(true);
    });

    test("autofocus を指定しない場合は付かない", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.hasAttribute("autofocus")).toBe(false);
    });
  });

  describe("required", () => {
    test("required を指定すると textarea に aria-required=true が設定される", async () => {
      const { textarea } = await setup(
        `<mi-text-area required></mi-text-area>`,
      );

      expect(textarea.getAttribute("aria-required")).toBe("true");
    });

    test("required を指定しないと aria-required=false が設定される", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.getAttribute("aria-required")).toBe("false");
    });

    test("required を指定してもネイティブの required は付かない", async () => {
      // ブラウザによる送信時バリデーションは行わない方針のため
      const { textarea } = await setup(
        `<mi-text-area required></mi-text-area>`,
      );

      expect(textarea.hasAttribute("required")).toBe(false);
    });
  });

  describe("文字数の数え方", () => {
    const countText = async (value: string) => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="100" value="${value}"></mi-text-area>`,
      );
      return element.shadowRoot!.querySelector(".count-current")!.textContent;
    };

    test("絵文字は1文字として数えられる", async () => {
      // String.length なら 2 になる
      expect(await countText("\u{1F600}")).toBe("1");
    });

    test("絵文字と日本語が混在しても見た目どおりに数えられる", async () => {
      // String.length なら 5 になる
      expect(await countText("あ\u{1F600}い\u{1F600}")).toBe("4");
    });

    test("絵文字を含む場合も上限超過を判定できる", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area show-count max-length="2" value="\u{1F600}\u{1F600}\u{1F600}"></mi-text-area>`,
      );

      // コードポイントで3文字なので超過する（String.length だと 6 で誤判定）
      const current = element.shadowRoot!.querySelector(".count-current")!;
      expect(current.textContent).toBe("3");
      expect(current.classList.contains("over")).toBe(true);
      expect(textarea.getAttribute("aria-invalid")).toBe("true");
    });

    test("上限ちょうどの絵文字は超過にならない", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="2" value="\u{1F600}\u{1F600}"></mi-text-area>`,
      );

      const current = element.shadowRoot!.querySelector(".count-current")!;
      expect(current.textContent).toBe("2");
      expect(current.classList.contains("over")).toBe(false);
    });

    test("ZWJ で連結された絵文字は見た目どおりにならない（既知の制約）", async () => {
      // 👨‍👩‍👧‍👦 は見た目1文字だが、コードポイントでは 7。
      // 見た目と完全に一致させるには Intl.Segmenter（書記素）が必要なため、意図的に見送っている。
      expect(
        await countText(
          "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
        ),
      ).toBe("7");
    });
  });

  describe("文字数カウンターのスクリーンリーダー対応", () => {
    const liveRegionOf = (element: Element) =>
      element.shadowRoot!.querySelector('[role="status"]');

    const input = async (element: MiTextArea, value: string) => {
      const textarea = element.shadowRoot!.querySelector("textarea")!;
      textarea.value = value;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      await element.updateComplete;
    };

    afterEach(() => {
      vi.useRealTimers();
    });

    test("見た目のカウンターは aria-hidden で読み上げられない", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="10"></mi-text-area>`,
      );

      expect(
        element
          .shadowRoot!.querySelector(".count")!
          .getAttribute("aria-hidden"),
      ).toBe("true");
    });

    test("aria-describedby から上限の説明を参照する", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area show-count max-length="10"></mi-text-area>`,
      );

      const describedBy = textarea.getAttribute("aria-describedby")!;
      expect(describedBy).toContain("count-description");

      const description =
        element.shadowRoot!.getElementById("count-description")!;
      expect(description.textContent?.trim()).toBe("最大10文字入力できます");
    });

    test("入力直後は読み上げず、入力が止まってから残り文字数を通知する", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="10"></mi-text-area>`,
      );

      vi.useFakeTimers();
      await input(element, "あいう");

      // 入力のたびに読み上げるとキー入力を妨げるため、直後は空のまま
      expect(liveRegionOf(element)!.textContent?.trim()).toBe("");

      vi.advanceTimersByTime(1000);
      await element.updateComplete;

      expect(liveRegionOf(element)!.textContent?.trim()).toBe("あと7文字");
    });

    test("上限を超えた場合は超過文字数を通知する", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="3"></mi-text-area>`,
      );

      vi.useFakeTimers();
      await input(element, "あいうえお");
      vi.advanceTimersByTime(1000);
      await element.updateComplete;

      expect(liveRegionOf(element)!.textContent?.trim()).toBe("2文字オーバー");
    });

    test("連続入力では最後の状態だけが通知される", async () => {
      const { element } = await setup(
        `<mi-text-area show-count max-length="10"></mi-text-area>`,
      );

      vi.useFakeTimers();
      await input(element, "あ");
      vi.advanceTimersByTime(500);
      await input(element, "あい");
      vi.advanceTimersByTime(500);

      // 1件目のタイマーは解除されているので、まだ何も通知されない
      expect(liveRegionOf(element)!.textContent?.trim()).toBe("");

      vi.advanceTimersByTime(500);
      await element.updateComplete;

      expect(liveRegionOf(element)!.textContent?.trim()).toBe("あと8文字");
    });

    test("show-count がない場合はライブリージョンも説明も持たない", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area max-length="10"></mi-text-area>`,
      );

      expect(liveRegionOf(element)).toBeNull();
      expect(element.shadowRoot!.getElementById("description")).toBeNull();
      expect(textarea.getAttribute("aria-describedby")).toBe("");
    });
  });

  describe("description（読み上げ用の説明）", () => {
    test("description を指定すると aria-describedby から参照される", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area description="500文字以内で入力してください"></mi-text-area>`,
      );

      const describedBy = textarea.getAttribute("aria-describedby")!;
      expect(describedBy).toContain("description");

      const description = element.shadowRoot!.getElementById("description")!;
      expect(description.textContent?.trim()).toBe(
        "500文字以内で入力してください",
      );
    });

    test("description は視覚的には表示しない", async () => {
      const { element } = await setup(
        `<mi-text-area description="説明"></mi-text-area>`,
      );

      const description = element.shadowRoot!.getElementById("description")!;
      expect(description.classList.contains("visually-hidden")).toBe(true);
    });

    test("description がない場合は要素も参照も作らない", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area></mi-text-area>`,
      );

      expect(element.shadowRoot!.getElementById("description")).toBeNull();
      expect(textarea.getAttribute("aria-describedby")).toBe("");
    });

    test("description と文字数の説明は両方参照される", async () => {
      const { textarea } = await setup(
        `<mi-text-area description="説明" show-count max-length="10"></mi-text-area>`,
      );

      const ids = textarea.getAttribute("aria-describedby")!.split(" ");
      expect(ids).toContain("description");
      expect(ids).toContain("count-description");
    });
  });

  describe("エラー表示", () => {
    test('slot="error" の内容が mi-helper-text として表示される', async () => {
      const { element } = await setup(`
        <mi-text-area>
          <span slot="error">エラーです</span>
        </mi-text-area>
      `);
      await element.updateComplete;

      const helperTexts =
        element.shadowRoot!.querySelectorAll("mi-helper-text");
      expect(helperTexts.length).toBe(1);
      expect(helperTexts[0].textContent?.trim()).toBe("エラーです");
      expect(helperTexts[0].getAttribute("status")).toBe("error");
    });

    test('slot="error" があると textarea に error クラスと aria-invalid が付く', async () => {
      const { element, textarea } = await setup(`
        <mi-text-area>
          <span slot="error">エラーです</span>
        </mi-text-area>
      `);
      await element.updateComplete;

      expect(textarea.classList.contains("error")).toBe(true);
      expect(textarea.getAttribute("aria-invalid")).toBe("true");
      expect(textarea.getAttribute("aria-describedby")).toContain("error-0");
    });

    test("disabled の場合はエラーを表示しない", async () => {
      const { element, textarea } = await setup(`
        <mi-text-area disabled>
          <span slot="error">エラーです</span>
        </mi-text-area>
      `);
      await element.updateComplete;

      expect(
        element.shadowRoot!.querySelectorAll("mi-helper-text").length,
      ).toBe(0);
      expect(textarea.getAttribute("aria-invalid")).toBe("false");
    });

    test('後から追加した slot="error" が表示される', async () => {
      const { element } = await setup(`<mi-text-area></mi-text-area>`);

      const span = document.createElement("span");
      span.slot = "error";
      span.textContent = "後から追加したエラー";
      element.appendChild(span);

      // slotchange は非同期に飛ぶため、反映を待つ
      await new Promise((resolve) => setTimeout(resolve, 0));
      await element.updateComplete;

      const helperTexts =
        element.shadowRoot!.querySelectorAll("mi-helper-text");
      expect(helperTexts.length).toBe(1);
      expect(helperTexts[0].textContent?.trim()).toBe("後から追加したエラー");
      expect(
        element
          .shadowRoot!.querySelector("textarea")!
          .getAttribute("aria-invalid"),
      ).toBe("true");
    });

    test("エラーがない場合は aria-invalid が false になる", async () => {
      const { textarea } = await setup(`<mi-text-area></mi-text-area>`);

      expect(textarea.getAttribute("aria-invalid")).toBe("false");
    });
  });

  describe("イベント", () => {
    test("input イベントがホスト要素の外まで届く", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area></mi-text-area>`,
      );

      const handler = vi.fn();
      element.addEventListener("input", handler);

      await page.elementLocator(textarea).fill("abc");

      expect(handler).toHaveBeenCalled();
    });

    test("change イベントがホスト要素から発火し直される", async () => {
      const { element, textarea } = await setup(
        `<mi-text-area></mi-text-area>`,
      );

      const handler = vi.fn();
      element.addEventListener("change", handler);

      textarea.value = "abc";
      textarea.dispatchEvent(new Event("change", { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test("change はネイティブの textarea と同じく bubbles: true / composed: false", async () => {
      document.body.innerHTML = `<div id="ancestor"><mi-text-area></mi-text-area></div>`;
      await customElements.whenDefined("mi-text-area");
      const element = document.querySelector("mi-text-area")!;
      await element.updateComplete;
      const textarea = element.shadowRoot!.querySelector("textarea")!;

      const received: Event[] = [];
      element.addEventListener("change", (e) => received.push(e));
      const onAncestor = vi.fn();
      document
        .getElementById("ancestor")!
        .addEventListener("change", onAncestor);

      textarea.dispatchEvent(new Event("change", { bubbles: true }));

      expect(received[0].bubbles).toBe(true);
      expect(received[0].composed).toBe(false);
      // ネイティブの textarea と同じく、祖先要素でも拾える
      expect(onAncestor).toHaveBeenCalledTimes(1);
    });

    test("change は外側の Shadow DOM を越えない（composed: false）", async () => {
      const host = document.createElement("div");
      document.body.replaceChildren(host);
      const outerRoot = host.attachShadow({ mode: "open" });
      outerRoot.innerHTML = `<mi-text-area></mi-text-area>`;
      await customElements.whenDefined("mi-text-area");
      const element = outerRoot.querySelector("mi-text-area")!;
      await element.updateComplete;
      const textarea = element.shadowRoot!.querySelector("textarea")!;

      const onOutside = vi.fn();
      document.addEventListener("change", onOutside);

      try {
        textarea.dispatchEvent(new Event("change", { bubbles: true }));

        expect(onOutside).not.toHaveBeenCalled();
      } finally {
        document.removeEventListener("change", onOutside);
      }
    });
  });

  test("フォーカスすると内部の textarea にフォーカスが移る", async () => {
    const { element, textarea } = await setup(`<mi-text-area></mi-text-area>`);

    element.focus();

    expect(element.shadowRoot!.activeElement).toBe(textarea);
  });
});
