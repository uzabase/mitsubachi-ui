import "../../src/components/suggestion-search-box/mi-suggestion-search-box";
import "../../src/components/suggestion-search-box/mi-suggestion-item";

import { describe, expect, test, vi } from "vitest";
import { cdp, userEvent } from "vitest/browser";

import type { MiSuggestionItem } from "../../src/components/suggestion-search-box/mi-suggestion-item";
import type { MiSuggestionSearchBox } from "../../src/components/suggestion-search-box/mi-suggestion-search-box";

const DEFAULT_ITEMS = ["トヨタ自動車", "トヨタ紡織", "豊田通商"];

async function setup({
  items = DEFAULT_ITEMS,
  value = "",
}: { items?: string[]; value?: string } = {}) {
  document.body.innerHTML = `
    <div id="ancestor">
      <mi-suggestion-search-box label="企業検索" value="${value}">
        ${items
          .map(
            (name, i) =>
              `<mi-suggestion-item value="id-${i}">${name}</mi-suggestion-item>`,
          )
          .join("")}
      </mi-suggestion-search-box>
    </div>
    <button id="outside">outside</button>
  `;
  await customElements.whenDefined("mi-suggestion-search-box");
  await customElements.whenDefined("mi-suggestion-item");
  const sut = getSut();
  await sut.updateComplete;
  return sut;
}

function getSut() {
  return document.querySelector(
    "mi-suggestion-search-box",
  ) as MiSuggestionSearchBox;
}

function getInput() {
  return getSut().shadowRoot?.querySelector(
    'input[type="search"]',
  ) as HTMLInputElement;
}

function getClearButton() {
  return getSut().shadowRoot?.querySelector(
    ".clear-button",
  ) as HTMLButtonElement | null;
}

function getItems() {
  return [
    ...document.querySelectorAll("mi-suggestion-item"),
  ] as MiSuggestionItem[];
}

function getListbox() {
  return getInput().ariaControlsElements?.[0] as HTMLElement | undefined;
}

function getStatus() {
  return getSut().shadowRoot?.querySelector('[role="status"]');
}

function getActiveItem() {
  return getInput().ariaActiveDescendantElement;
}

function isFocusInInput() {
  return (
    document.activeElement === getSut() &&
    getSut().shadowRoot?.activeElement === getInput()
  );
}

function appendItem(name: string, value: string) {
  const item = document.createElement("mi-suggestion-item");
  item.value = value;
  item.textContent = name;
  getSut().append(item);
}

async function settle() {
  await getSut().updateComplete;
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await getSut().updateComplete;
}

async function focusInput() {
  getInput().focus();
  await settle();
}

async function press(keys: string) {
  await userEvent.keyboard(keys);
  await settle();
}

function expectOpen() {
  expect(getInput().getAttribute("aria-expanded")).toBe("true");
  expect(getListbox()?.checkVisibility()).toBe(true);
}

function expectClosed() {
  expect(getInput().getAttribute("aria-expanded")).toBe("false");
  expect(getListbox()?.checkVisibility() ?? false).toBe(false);
}

function captureKeydown() {
  const captured: KeyboardEvent[] = [];
  const listener = (e: KeyboardEvent) => captured.push(e);
  document.addEventListener("keydown", listener);
  return {
    last: () => captured[captured.length - 1],
    dispose: () => document.removeEventListener("keydown", listener),
  };
}

function dispatchComposingKey(key: string) {
  const event = new KeyboardEvent("keydown", {
    key,
    isComposing: true,
    bubbles: true,
    composed: true,
    cancelable: true,
  });
  getInput().dispatchEvent(event);
  return event;
}

async function imeCompose(text: string) {
  await cdp().send("Input.imeSetComposition", {
    text,
    selectionStart: text.length,
    selectionEnd: text.length,
  });
  await settle();
}

async function imeCommit(text: string) {
  await cdp().send("Input.insertText", { text });
  await settle();
}

/**
 * Safari 26 以前のイベント順（WebKit bug 165004）を再現する。
 * 変換を確定する Enter の keydown が compositionend の後に、
 * isComposing=false・keyCode=229 で届く。
 */
function dispatchSafariCommitEnter() {
  const init = { bubbles: true, composed: true };
  getInput().dispatchEvent(new CompositionEvent("compositionstart", init));
  getInput().dispatchEvent(
    new CompositionEvent("compositionend", { ...init, data: "" }),
  );
  const enter = new KeyboardEvent("keydown", {
    ...init,
    key: "Enter",
    keyCode: 229,
    isComposing: false,
    cancelable: true,
  });
  getInput().dispatchEvent(enter);
  return enter;
}

describe("mi-suggestion-search-box", () => {
  describe("構造と役割", () => {
    test("内部の input は role=combobox と aria-autocomplete=list を持つ", async () => {
      await setup();

      expect(getInput().getAttribute("role")).toBe("combobox");
      expect(getInput().getAttribute("aria-autocomplete")).toBe("list");
    });

    test("候補が0件でも input は role=combobox のまま", async () => {
      await setup({ items: [] });

      expect(getInput().getAttribute("role")).toBe("combobox");
      expect(getInput().getAttribute("aria-expanded")).toBe("false");
    });

    test("input の aria-controls は role=listbox の要素を指す", async () => {
      await setup();

      expect(getListbox()?.getAttribute("role")).toBe("listbox");
    });

    test("label 属性が input と listbox の aria-label になる", async () => {
      await setup();

      expect(getInput().getAttribute("aria-label")).toBe("企業検索");
      expect(getListbox()?.getAttribute("aria-label")).toBe("企業検索");
    });

    test("mi-suggestion-item は role=option を持つ", async () => {
      await setup();

      for (const item of getItems()) {
        expect(item.getAttribute("role")).toBe("option");
      }
    });
  });

  describe("開閉", () => {
    test("フォーカスがあり候補が1件以上あると開く", async () => {
      await setup();

      await focusInput();

      expectOpen();
    });

    test("フォーカスがなければ候補があっても開かない", async () => {
      await setup();

      expectClosed();
    });

    test("候補が0件になると閉じる", async () => {
      await setup();
      await focusInput();

      getItems().forEach((item) => item.remove());
      await settle();

      expectClosed();
    });

    test("候補が0件の状態から候補が追加されると開く", async () => {
      await setup({ items: [] });
      await focusInput();

      appendItem("トヨタ自動車", "id-0");
      await settle();

      expectOpen();
    });

    test("フォーカスが外れると閉じる", async () => {
      await setup();
      await focusInput();

      (document.querySelector("#outside") as HTMLButtonElement).focus();
      await settle();

      expectClosed();
    });

    test("フォーカスが戻ると、候補が残っていれば再び開く", async () => {
      await setup();
      await focusInput();
      (document.querySelector("#outside") as HTMLButtonElement).focus();
      await settle();

      await focusInput();

      expectOpen();
    });

    test("開いているときに入力欄をクリックしても閉じない", async () => {
      await setup();
      await focusInput();

      await userEvent.click(getInput());
      await settle();

      expectOpen();
    });

    test("Esc で閉じた後、文字を入力すると再び開く", async () => {
      await setup();
      await focusInput();
      await press("{Escape}");

      await press("ト");

      expectOpen();
    });

    test("Esc で閉じた後、↓ で再び開く", async () => {
      await setup();
      await focusInput();
      await press("{Escape}");

      await press("{ArrowDown}");

      expectOpen();
    });

    test("Esc で閉じた後、入力欄をクリックすると再び開く", async () => {
      await setup();
      await focusInput();
      await press("{Escape}");

      await userEvent.click(getInput());
      await settle();

      expectOpen();
    });

    test("候補を選んで閉じた後は、候補が残っていても閉じたまま", async () => {
      await setup();
      await focusInput();
      await press("{ArrowDown}");
      await press("{Enter}");

      await settle();

      expectClosed();
      expect(getItems()).toHaveLength(3);
    });
  });

  describe("キー操作", () => {
    test("閉じているときの ↓ は開くだけで、強調はしない", async () => {
      await setup();
      await focusInput();
      await press("{Escape}");

      await press("{ArrowDown}");

      expectOpen();
      expect(getActiveItem()).toBeNull();
    });

    test("↓ で先頭から順に強調し、最後の次は強調なし、その次は先頭に戻る", async () => {
      await setup();
      await focusInput();
      const [first, second, third] = getItems();

      await press("{ArrowDown}");
      expect(getActiveItem()).toBe(first);
      await press("{ArrowDown}");
      expect(getActiveItem()).toBe(second);
      await press("{ArrowDown}");
      expect(getActiveItem()).toBe(third);
      await press("{ArrowDown}");
      expect(getActiveItem()).toBeNull();
      await press("{ArrowDown}");
      expect(getActiveItem()).toBe(first);
    });

    test("↑ で最後から順に強調し、先頭の次は強調なし、その次は最後に戻る", async () => {
      await setup();
      await focusInput();
      const [first, second, third] = getItems();

      await press("{ArrowUp}");
      expect(getActiveItem()).toBe(third);
      await press("{ArrowUp}");
      expect(getActiveItem()).toBe(second);
      await press("{ArrowUp}");
      expect(getActiveItem()).toBe(first);
      await press("{ArrowUp}");
      expect(getActiveItem()).toBeNull();
      await press("{ArrowUp}");
      expect(getActiveItem()).toBe(third);
    });

    test("閉じているときの ↑ は何もしない", async () => {
      await setup();
      await focusInput();
      await press("{Escape}");

      await press("{ArrowUp}");

      expectClosed();
      expect(getActiveItem()).toBeNull();
    });

    test("強調しても入力欄の文字は変わらない", async () => {
      await setup({ value: "トヨ" });
      await focusInput();

      await press("{ArrowDown}");

      expect(getActiveItem()).toBe(getItems()[0]);
      expect(getInput().value).toBe("トヨ");
      expect(getSut().value).toBe("トヨ");
    });

    test("強調中に Enter を押すと候補を選んで閉じる", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      await press("{ArrowDown}");

      await press("{Enter}");

      expect(select).toHaveBeenCalledTimes(1);
      expectClosed();
    });

    test("強調がないときの Enter は候補を選ばず、開いたまま", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      expectOpen();

      await press("{Enter}");

      expect(select).not.toHaveBeenCalled();
      expectOpen();
    });

    test("開いているときの Esc は閉じるだけで、文字は消さない", async () => {
      await setup({ value: "トヨ" });
      await focusInput();
      const keydown = captureKeydown();

      await press("{Escape}");

      expectClosed();
      expect(getSut().value).toBe("トヨ");
      expect(keydown.last().defaultPrevented).toBe(true);
      keydown.dispose();
    });

    test("閉じているときの Esc は既定動作（入力欄の文字の消去）を妨げない", async () => {
      await setup({ value: "トヨ" });
      await focusInput();
      await press("{Escape}");
      expectClosed();
      const keydown = captureKeydown();

      await press("{Escape}");

      expect(keydown.last().defaultPrevented).toBe(false);
      keydown.dispose();
    });

    test("Tab で閉じ、強調中の候補は選ばない", async () => {
      await setup({ value: "トヨ" });
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      await press("{ArrowDown}");

      await press("{Tab}");

      expectClosed();
      expect(select).not.toHaveBeenCalled();
    });

    test.each([
      ["←", "ArrowLeft"],
      ["→", "ArrowRight"],
      ["Home", "Home"],
      ["End", "End"],
    ])(
      "強調中に %s を押すと強調が外れ、カーソル移動は妨げない",
      async (_label, key) => {
        await setup({ value: "トヨ" });
        await focusInput();
        await press("{ArrowDown}");
        const keydown = captureKeydown();

        await press(`{${key}}`);

        expect(getActiveItem()).toBeNull();
        expectOpen();
        expect(keydown.last().defaultPrevented).toBe(false);
        keydown.dispose();
      },
    );
  });

  describe("候補の入れ替え", () => {
    test("候補が入れ替わると強調が外れる", async () => {
      await setup();
      await focusInput();
      await press("{ArrowDown}");
      expect(getActiveItem()).toBe(getItems()[0]);

      appendItem("豊田自動織機", "id-3");
      await settle();

      expect(getActiveItem()).toBeNull();
    });
  });

  describe("マウス操作", () => {
    test("候補をクリックすると選ばれて閉じ、フォーカスは入力欄に残る", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();

      await userEvent.click(getItems()[1]);
      await settle();

      expect(select).toHaveBeenCalledTimes(1);
      expect((select.mock.calls[0][0] as CustomEvent).detail.value).toBe(
        "id-1",
      );
      expectClosed();
      expect(isFocusInInput()).toBe(true);
    });

    test("候補を押した瞬間に入力欄のフォーカスが外れない（mousedown の既定動作を止める）", async () => {
      await setup();
      await focusInput();
      const mousedown = new MouseEvent("mousedown", {
        bubbles: true,
        composed: true,
        cancelable: true,
      });

      getItems()[0].dispatchEvent(mousedown);

      expect(mousedown.defaultPrevented).toBe(true);
    });

    test("候補にホバーしても強調は変わらない", async () => {
      await setup();
      await focusInput();
      await press("{ArrowDown}");
      const [first, second] = getItems();

      await userEvent.hover(second);
      await settle();

      expect(getActiveItem()).toBe(first);
      expect(second.getAttribute("aria-selected")).toBe("false");
    });

    test("強調中の候補には 2px の実線の枠が付き、それ以外には付かない", async () => {
      await setup();
      await focusInput();
      const [first, second] = getItems();

      await press("{ArrowDown}");

      expect(getComputedStyle(first).outlineStyle).toBe("solid");
      expect(getComputedStyle(first).outlineWidth).toBe("2px");
      expect(getComputedStyle(second).outlineStyle).toBe("none");
    });
  });

  describe("クリアボタン", () => {
    test("クリアボタンを押した瞬間に入力欄のフォーカスが外れない（mousedown の既定動作を止める）", async () => {
      await setup({ value: "トヨ" });
      await focusInput();
      const mousedown = new MouseEvent("mousedown", {
        bubbles: true,
        composed: true,
        cancelable: true,
      });

      getClearButton()?.dispatchEvent(mousedown);

      expect(mousedown.defaultPrevented).toBe(true);
    });

    test("クリアすると input が発火し、強調が外れ、フォーカスは入力欄に残る", async () => {
      await setup({ value: "トヨ" });
      const input = vi.fn();
      getSut().addEventListener("input", input);
      await focusInput();
      await press("{ArrowDown}");
      expect(getActiveItem()).toBe(getItems()[0]);

      await userEvent.click(getClearButton()!);
      await settle();

      expect(input).toHaveBeenCalled();
      expect(getSut().value).toBe("");
      expect(getActiveItem()).toBeNull();
      expect(isFocusInInput()).toBe(true);
    });

    test("Tab でクリアボタンに移ると閉じる", async () => {
      await setup({ value: "トヨ" });
      await focusInput();

      await press("{Tab}");

      expect(getSut().shadowRoot?.activeElement).toBe(getClearButton());
      expectClosed();
    });
  });

  describe("select イベント", () => {
    test("detail.value に選んだ候補の value が入る", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      await press("{ArrowDown}{ArrowDown}");

      await press("{Enter}");

      expect((select.mock.calls[0][0] as CustomEvent).detail).toEqual({
        value: "id-1",
      });
    });

    test("bubbles / composed / cancelable はすべて false", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      await press("{ArrowDown}");

      await press("{Enter}");

      const event = select.mock.calls[0][0] as CustomEvent;
      expect(event.bubbles).toBe(false);
      expect(event.composed).toBe(false);
      expect(event.cancelable).toBe(false);
    });

    test("祖先要素には届かない", async () => {
      await setup();
      const onSelf = vi.fn();
      getSut().addEventListener("select", onSelf);
      const onAncestor = vi.fn();
      document
        .querySelector("#ancestor")
        ?.addEventListener("select", onAncestor);
      await focusInput();
      await press("{ArrowDown}");

      await press("{Enter}");

      expect(onSelf).toHaveBeenCalledTimes(1);
      expect(onAncestor).not.toHaveBeenCalled();
    });

    test("選んでも入力欄の値は変えない", async () => {
      await setup({ value: "トヨ" });
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      await press("{ArrowDown}");

      await press("{Enter}");

      expect(select).toHaveBeenCalledTimes(1);
      expect(getSut().value).toBe("トヨ");
      expect(getInput().value).toBe("トヨ");
    });

    test("入力欄の文字列を範囲選択しても select は発火しない", async () => {
      await setup({ value: "トヨタ" });
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      expectOpen();

      getInput().select();
      await settle();

      expect(select).not.toHaveBeenCalled();
    });
  });

  describe("スクリーンリーダー向けの状態", () => {
    test("開閉に合わせて aria-expanded が切り替わる", async () => {
      await setup();
      expect(getInput().getAttribute("aria-expanded")).toBe("false");

      await focusInput();
      expect(getInput().getAttribute("aria-expanded")).toBe("true");

      await press("{Escape}");
      expect(getInput().getAttribute("aria-expanded")).toBe("false");
    });

    test("強調中の候補を aria-activedescendant が指し、その候補だけ aria-selected=true になる", async () => {
      await setup();
      await focusInput();
      const [first, second, third] = getItems();

      await press("{ArrowDown}{ArrowDown}");

      expect(getActiveItem()).toBe(second);
      expect(first.getAttribute("aria-selected")).toBe("false");
      expect(second.getAttribute("aria-selected")).toBe("true");
      expect(third.getAttribute("aria-selected")).toBe("false");
    });

    test("強調がないときは aria-activedescendant が何も指さない", async () => {
      await setup();
      await focusInput();

      expect(getActiveItem()).toBeNull();
      for (const item of getItems()) {
        expect(item.getAttribute("aria-selected")).toBe("false");
      }
    });

    test("開くと候補の件数が status で読み上げられる", async () => {
      await setup();

      await focusInput();

      expect(getStatus()?.textContent?.trim()).toBe("3件の候補があります");
    });

    test("候補の件数が変わると status の読み上げも変わる", async () => {
      await setup();
      await focusInput();

      getItems()[2].remove();
      await settle();

      expect(getStatus()?.textContent?.trim()).toBe("2件の候補があります");
    });
  });

  describe("IME（変換中は候補に何も影響を与えず、確定時に反映する）", () => {
    test.each([
      ["↓", "ArrowDown"],
      ["↑", "ArrowUp"],
      ["Enter", "Enter"],
      ["Esc", "Escape"],
    ])(
      "変換中の %s は無視し、強調・開閉・選択を変えず、既定動作も妨げない",
      async (_label, key) => {
        await setup();
        const select = vi.fn();
        getSut().addEventListener("select", select);
        await focusInput();
        await press("{ArrowDown}");

        const event = dispatchComposingKey(key);
        await settle();

        expect(getActiveItem()).toBe(getItems()[0]);
        expectOpen();
        expect(select).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(false);
      },
    );

    test("変換中は input を発火せず value も変えない。確定時に input が1回だけ発火する", async () => {
      await setup({ items: [] });
      const valuesOnInput: string[] = [];
      getSut().addEventListener("input", () =>
        valuesOnInput.push(getSut().value),
      );
      await focusInput();

      await imeCompose("と");
      await imeCompose("とよ");

      expect(valuesOnInput).toEqual([]);
      expect(getSut().value).toBe("");

      await imeCommit("トヨ");

      expect(valuesOnInput).toEqual(["トヨ"]);
      expect(getSut().value).toBe("トヨ");
      expect(getInput().value).toBe("トヨ");
    });

    test("変換中に候補が変わっても、強調・開閉・読み上げは確定まで変わらない", async () => {
      await setup();
      await focusInput();
      await press("{ArrowDown}");
      const [first] = getItems();

      await imeCompose("と");
      appendItem("豊田自動織機", "id-3");
      await settle();

      expect(getActiveItem()).toBe(first);
      expectOpen();
      expect(getStatus()?.textContent?.trim()).toBe("3件の候補があります");

      await imeCommit("と");

      expect(getActiveItem()).toBeNull();
      expectOpen();
      expect(getStatus()?.textContent?.trim()).toBe("4件の候補があります");
    });

    test("変換中に候補が0件になっても閉じず、確定時に閉じる", async () => {
      await setup();
      await focusInput();

      await imeCompose("あ");
      getItems().forEach((item) => item.remove());
      await settle();

      expectOpen();

      await imeCommit("あ");

      expectClosed();
    });

    test("Esc で閉じた後、変換中は開かず、確定時に開く", async () => {
      await setup();
      await focusInput();
      await press("{Escape}");

      await imeCompose("と");

      expectClosed();

      await imeCommit("と");

      expectOpen();
    });

    test("確定時の input で候補が追加されると開き、フォーカスは入力欄から動かず変換も崩れない", async () => {
      await setup({ items: [] });
      getSut().addEventListener("input", () => {
        if (getItems().length === 0) appendItem("ソニーグループ", "id-sony");
      });
      await focusInput();

      await imeCompose("ソ");
      await imeCompose("ソニ");

      expectClosed();
      expect(isFocusInInput()).toBe(true);

      await imeCommit("ソニー");

      expectOpen();
      expect(getInput().value).toBe("ソニー");
      expect(isFocusInInput()).toBe(true);
    });

    test("変換を確定する Enter では候補を選ばない（Safari 26 以前のイベント順でも）", async () => {
      await setup();
      const select = vi.fn();
      getSut().addEventListener("select", select);
      await focusInput();
      await press("{ArrowDown}");

      const enter = dispatchSafariCommitEnter();
      await settle();

      expect(select).not.toHaveBeenCalled();
      expect(enter.defaultPrevented).toBe(false);

      // 確定後の通常の Enter では選べる（無視しすぎていない）
      await press("{Enter}");

      expect(select).toHaveBeenCalledTimes(1);
    });
  });
});
