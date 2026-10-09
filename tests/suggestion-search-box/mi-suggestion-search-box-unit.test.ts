import "../../src/components/suggestion-search-box/mi-suggestion-search-box-unit";
import "../../src/components/suggestion-search-box/mi-suggestion-item";

import { describe, expect, test, vi } from "vitest";
import { cdp, userEvent } from "vitest/browser";

import type { MiSuggestionSearchBox } from "../../src/components/suggestion-search-box/mi-suggestion-search-box";
import type { MiSuggestionSearchBoxUnit } from "../../src/components/suggestion-search-box/mi-suggestion-search-box-unit";

async function setup(attrs = 'text="企業検索"', items = DEFAULT_ITEMS) {
  document.body.innerHTML = `
    <div id="ancestor">
      <mi-suggestion-search-box-unit ${attrs}>
        ${items
          .map(
            (name, i) =>
              `<mi-suggestion-item value="id-${i}">${name}</mi-suggestion-item>`,
          )
          .join("")}
      </mi-suggestion-search-box-unit>
    </div>
    <button id="outside">outside</button>
  `;
  await customElements.whenDefined("mi-suggestion-search-box-unit");
  const sut = getSut();
  await sut.updateComplete;
  await getBox()?.updateComplete;
  return sut;
}

const DEFAULT_ITEMS = ["トヨタ自動車", "トヨタ紡織", "豊田通商"];

function getSut() {
  return document.querySelector(
    "mi-suggestion-search-box-unit",
  ) as MiSuggestionSearchBoxUnit;
}

function getLabel() {
  return getSut().shadowRoot?.querySelector("mi-label-unit") as HTMLElement;
}

function getBox() {
  return getSut().shadowRoot?.querySelector(
    "mi-suggestion-search-box",
  ) as MiSuggestionSearchBox | null;
}

function getInput() {
  return getBox()?.shadowRoot?.querySelector(
    'input[type="search"]',
  ) as HTMLInputElement;
}

function getListbox() {
  return getInput().ariaControlsElements?.[0] as HTMLElement | undefined;
}

function getItems() {
  return [...document.querySelectorAll("mi-suggestion-item")];
}

function isFocusInInput() {
  const input = getInput();
  return !!input && getBox()?.shadowRoot?.activeElement === input;
}

async function settle() {
  await getSut().updateComplete;
  await getBox()?.updateComplete;
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await getBox()?.updateComplete;
}

function expectOpen() {
  expect(getInput().getAttribute("aria-expanded")).toBe("true");
  expect(getListbox()?.checkVisibility()).toBe(true);
}

describe("mi-suggestion-search-box-unit", () => {
  describe("構造", () => {
    test("text 属性がラベルとして表示される", async () => {
      await setup();

      expect(getLabel().getAttribute("text")).toBe("企業検索");
      expect(getLabel().checkVisibility()).toBe(true);
    });

    test("text が空のときはラベルを表示しない", async () => {
      await setup("");

      expect(getLabel().checkVisibility()).toBe(false);
    });

    test("text が入力欄と候補リストの読み上げ名になる（見えているラベルと読み上げ名を一致させるため）", async () => {
      await setup();

      expect(getInput().getAttribute("aria-label")).toBe("企業検索");
      expect(getListbox()?.getAttribute("aria-label")).toBe("企業検索");
    });

    test("属性が内側の mi-suggestion-search-box に渡る", async () => {
      await setup(
        'text="企業検索" variant="secondary" placeholder="企業名で検索" value="トヨ" autocomplete="on" disabled',
      );

      const box = getBox()!;
      expect(box.variant).toBe("secondary");
      expect(box.placeholder).toBe("企業名で検索");
      expect(box.value).toBe("トヨ");
      expect(box.autocomplete).toBe("on");
      expect(box.disabled).toBe(true);
    });
  });

  describe("ラベルとフォーカス", () => {
    test("ラベルをクリックすると入力欄にフォーカスする（ネイティブの label と同じ操作性のため）", async () => {
      await setup();

      await userEvent.click(getLabel());
      await settle();

      expect(isFocusInInput()).toBe(true);
    });

    test("ラベルのクリックでフォーカスすると、候補があれば開く", async () => {
      await setup();

      await userEvent.click(getLabel());
      await settle();

      expectOpen();
    });

    test("disabled のときはラベルをクリックしてもフォーカスしない", async () => {
      await setup('text="企業検索" disabled');

      await userEvent.click(getLabel());
      await settle();

      expect(isFocusInInput()).toBe(false);
    });

    test("要素の focus() で入力欄にフォーカスする", async () => {
      await setup();

      getSut().focus();
      await settle();

      expect(isFocusInInput()).toBe(true);
    });
  });

  describe("候補", () => {
    test("子要素の mi-suggestion-item が候補として表示され、キー操作で強調できる", async () => {
      await setup();
      getInput().focus();
      await settle();

      await userEvent.keyboard("{ArrowDown}");
      await settle();

      expectOpen();
      expect(getInput().ariaActiveDescendantElement).toBe(getItems()[0]);
      expect(getItems()[0].getAttribute("aria-selected")).toBe("true");
    });

    test("候補をクリックすると選ばれ、フォーカスは入力欄に残る", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      getInput().focus();
      await settle();

      await userEvent.click(getItems()[1]);
      await settle();

      expect(select).toHaveBeenCalledTimes(1);
      expect(isFocusInInput()).toBe(true);
    });
  });

  describe("イベント（mi-suggestion-search-box と同じものが、この要素から発火する。差し替えても利用側のコードを変えずに済むように）", () => {
    test("文字を入力すると input が1回だけ発火し、value が新しい値になる", async () => {
      await setup('text="企業検索"', []);
      const values: string[] = [];
      getSut().addEventListener("input", () => values.push(getSut().value));
      getInput().focus();
      await settle();

      await userEvent.keyboard("ト");
      await settle();

      expect(values).toEqual(["ト"]);
    });

    test("日本語変換中は input を発火せず、確定時に1回だけ発火する", async () => {
      await setup('text="企業検索"', []);
      const values: string[] = [];
      getSut().addEventListener("input", () => values.push(getSut().value));
      getInput().focus();
      await settle();
      const session = cdp();

      await session.send("Input.imeSetComposition", {
        text: "とよ",
        selectionStart: 2,
        selectionEnd: 2,
      });
      await settle();
      expect(values).toEqual([]);

      await session.send("Input.insertText", { text: "トヨ" });
      await settle();

      expect(values).toEqual(["トヨ"]);
    });

    test("クリアボタンを押すと input が発火し、value が空になる", async () => {
      await setup('text="企業検索" value="トヨ"');
      const input = vi.fn();
      getSut().addEventListener("input", input);

      const clear = getBox()!.shadowRoot!.querySelector(
        ".clear-button",
      ) as HTMLButtonElement;
      await userEvent.click(clear);
      await settle();

      expect(input).toHaveBeenCalledTimes(1);
      expect(getSut().value).toBe("");
    });

    test("フォーカスが外れると change が1回発火する", async () => {
      await setup('text="企業検索"', []);
      const change = vi.fn();
      getSut().addEventListener("change", change);
      getInput().focus();
      await userEvent.keyboard("ト");

      (document.querySelector("#outside") as HTMLButtonElement).focus();
      await settle();

      expect(change).toHaveBeenCalledTimes(1);
    });

    test("候補を選ぶと select が発火し、detail.value に候補の value が入る", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      getInput().focus();
      await settle();

      await userEvent.keyboard("{ArrowDown}{Enter}");
      await settle();

      expect(select).toHaveBeenCalledTimes(1);
      expect((select.mock.calls[0][0] as CustomEvent).detail).toEqual({
        value: "id-0",
      });
    });

    test("select の bubbles / composed / cancelable はすべて false で、祖先要素には届かない", async () => {
      await setup();
      const onSelf = vi.fn();
      getSut().addEventListener("select", onSelf);
      const onAncestor = vi.fn();
      document
        .querySelector("#ancestor")
        ?.addEventListener("select", onAncestor);
      getInput().focus();
      await settle();

      await userEvent.keyboard("{ArrowDown}{Enter}");
      await settle();

      const event = onSelf.mock.calls[0][0] as CustomEvent;
      expect(event.bubbles).toBe(false);
      expect(event.composed).toBe(false);
      expect(event.cancelable).toBe(false);
      expect(onAncestor).not.toHaveBeenCalled();
    });
  });

  describe("フォーム", () => {
    test("name を指定すると、FormData に入力値が含まれる", async () => {
      document.body.innerHTML = `
        <form>
          <mi-suggestion-search-box-unit text="企業検索" name="q" value="トヨタ"></mi-suggestion-search-box-unit>
        </form>
      `;
      await customElements.whenDefined("mi-suggestion-search-box-unit");
      await getSut().updateComplete;

      const data = new FormData(document.querySelector("form")!);

      expect(data.get("q")).toBe("トヨタ");
    });
  });
});
