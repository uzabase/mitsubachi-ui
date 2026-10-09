import "../../src/components/chip/mi-filter-chip";
import "../../src/components/chip/mi-filter-chip-group-single";
import "../../src/components/icon";

import { afterEach, describe, expect, test } from "vitest";

import type { MiFilterChip } from "../../src/components/chip/mi-filter-chip";
import type { MiFilterChipGroupSingle } from "../../src/components/chip/mi-filter-chip-group-single";

function group() {
  return document.querySelector<MiFilterChipGroupSingle>(
    "mi-filter-chip-group-single",
  )!;
}

function chips() {
  return Array.from(document.querySelectorAll<MiFilterChip>("mi-filter-chip"));
}

async function settle() {
  await group().updateComplete;
  await Promise.all(chips().map((chip) => chip.updateComplete));
}

async function render(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-filter-chip-group-single");
  await customElements.whenDefined("mi-filter-chip");
  await settle();
}

const defaultMarkup = `
  <mi-filter-chip-group-single aria-label="期間" value="b">
    <mi-filter-chip label="A" value="a"></mi-filter-chip>
    <mi-filter-chip label="B" value="b"></mi-filter-chip>
    <mi-filter-chip label="C" value="c"></mi-filter-chip>
  </mi-filter-chip-group-single>
`;

function press(element: HTMLElement, key: string) {
  element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

function selectedValues() {
  return chips()
    .filter((chip) => chip.selected)
    .map((chip) => chip.value);
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-filter-chip-group-single", () => {
  describe("アクセシビリティ", () => {
    test('host に role="radiogroup" を持つ', async () => {
      await render(defaultMarkup);

      expect(group().getAttribute("role")).toBe("radiogroup");
    });

    test("子はすべて role=radio になる", async () => {
      await render(defaultMarkup);

      expect(chips().map((chip) => chip.getAttribute("role"))).toEqual([
        "radio",
        "radio",
        "radio",
      ]);
    });

    test("aria-checked が value と一致する1件だけ true になる", async () => {
      await render(defaultMarkup);

      expect(chips().map((chip) => chip.getAttribute("aria-checked"))).toEqual([
        "false",
        "true",
        "false",
      ]);
    });
  });

  describe("value の同期", () => {
    test("初期 value に一致する子だけが選択される", async () => {
      await render(defaultMarkup);

      expect(selectedValues()).toEqual(["b"]);
    });

    test("value を変えると選択が移る", async () => {
      await render(defaultMarkup);

      group().value = "c";
      await settle();

      expect(selectedValues()).toEqual(["c"]);
    });

    test("value 未指定なら HTML の selected を初期値として採用する", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b" selected></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(group().value).toBe("b");
      expect(selectedValues()).toEqual(["b"]);
    });
  });

  // 「未選択という状態を許容しない」という仕様（Notion: filter-chip-group-single）を守る。
  // value の入れ違いで選択が 0 件になると role="radiogroup" の伝える状態と食い違うため。
  describe("常に1つ選択（未選択にならない）", () => {
    test("どの子とも一致しない value なら先頭の有効な子にフォールバックする", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="存在しない値">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(group().value).toBe("a");
      expect(selectedValues()).toEqual(["a"]);
    });

    test("フォールバック先は disabled な子を飛ばす", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="存在しない値">
          <mi-filter-chip label="A" value="a" disabled></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(group().value).toBe("b");
      expect(selectedValues()).toEqual(["b"]);
    });

    test("value も selected も無いときは先頭が選択される", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(group().value).toBe("a");
      expect(selectedValues()).toEqual(["a"]);
    });

    test("後から一致しない value を書いてもフォールバックする", async () => {
      await render(defaultMarkup);

      group().value = "存在しない値";
      await settle();

      expect(group().value).toBe("a");
      expect(selectedValues()).toEqual(["a"]);
    });

    test("有効な子が1つも無いときは選択せず value を保つ", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="存在しない値" disabled>
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(group().value).toBe("存在しない値");
      expect(selectedValues()).toEqual([]);
    });

    test("value 未指定の子が複数あっても二重選択にならない", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="種別">
          <mi-filter-chip label="X"></mi-filter-chip>
          <mi-filter-chip label="Y"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(selectedValues()).toEqual(["X"]);
    });

    test("value 未指定の子は label で識別され、先頭が選ばれる", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="種別">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="書き忘れ"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(selectedValues()).toEqual(["a"]);
    });

    test("label も value も空の子は選択先にしない", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="種別">
          <mi-filter-chip></mi-filter-chip>
          <mi-filter-chip></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(selectedValues()).toEqual([]);
    });

    test("子が無いグループでも value は書き換わらない", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="存在しない値">
        </mi-filter-chip-group-single>
      `);

      expect(group().value).toBe("存在しない値");
    });
  });

  describe("クリック", () => {
    // click はネイティブイベントなので止めずに祖先へ通す。選択の通知は change が担うため
    // 二重発火にはならない（docs/event-architecture.md）。
    test("click は祖先まで届く", async () => {
      await render(`
        <div id="outer">
          <mi-filter-chip-group-single aria-label="期間" value="a">
            <mi-filter-chip label="A" value="a"></mi-filter-chip>
            <mi-filter-chip label="B" value="b"></mi-filter-chip>
          </mi-filter-chip-group-single>
        </div>
      `);
      const outer = document.querySelector("#outer")!;
      let clicks = 0;
      outer.addEventListener("click", () => {
        clicks += 1;
      });

      chips()[1].click();
      await settle();

      expect(clicks).toBe(1);
    });

    test("click を通しても change は1回だけ発火する", async () => {
      await render(`
        <div id="outer">
          <mi-filter-chip-group-single aria-label="期間" value="a">
            <mi-filter-chip label="A" value="a"></mi-filter-chip>
            <mi-filter-chip label="B" value="b"></mi-filter-chip>
          </mi-filter-chip-group-single>
        </div>
      `);
      const outer = document.querySelector("#outer")!;
      let changes = 0;
      outer.addEventListener("change", () => {
        changes += 1;
      });

      chips()[1].click();
      await settle();

      expect(changes).toBe(1);
    });

    test("1つ選ぶと他の選択が解除される", async () => {
      await render(defaultMarkup);

      chips()[2].click();
      await settle();

      expect(group().value).toBe("c");
      expect(selectedValues()).toEqual(["c"]);
    });

    test("change が bubbles: true で発火し event.target.value を読める", async () => {
      await render(defaultMarkup);
      const values: string[] = [];
      document.body.addEventListener("change", (e) => {
        values.push((e.target as MiFilterChipGroupSingle).value);
      });

      chips()[0].click();
      await settle();

      expect(values).toEqual(["a"]);
    });

    // composed: false は「Shadow DOM の外には出さない」という設計判断。
    // 検証が無いと、後から composed: true を足しても気づけない。
    test("change は bubbles: true / composed: false / cancelable: false", async () => {
      await render(defaultMarkup);
      let event: Event | null = null;
      document.body.addEventListener("change", (e) => {
        event = e;
      });

      chips()[0].click();
      await settle();

      expect(event).toBeTruthy();
      expect(event!.bubbles).toBe(true);
      expect(event!.composed).toBe(false);
      expect(event!.cancelable).toBe(false);
    });

    test("選択中のチップを押しても解除されず change も発火しない", async () => {
      await render(defaultMarkup);
      let count = 0;
      document.body.addEventListener("change", () => count++);

      chips()[1].click();
      await settle();

      expect(group().value).toBe("b");
      expect(selectedValues()).toEqual(["b"]);
      expect(count).toBe(0);
    });

    test("Space キーでも選択できる", async () => {
      await render(defaultMarkup);

      press(chips()[0], " ");
      await settle();

      expect(group().value).toBe("a");
    });
  });

  describe("disabled", () => {
    test("グループの disabled は子すべてを無効化する", async () => {
      await render(defaultMarkup);

      group().disabled = true;
      await settle();

      expect(chips().every((chip) => chip.disabled)).toBe(true);
      expect(chips().every((chip) => !chip.hasAttribute("tabindex"))).toBe(
        true,
      );
    });

    test("グループの disabled を解除しても子個別の disabled は残る", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="a">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b" disabled></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      group().disabled = true;
      await settle();
      group().disabled = false;
      await settle();

      expect(chips().map((chip) => chip.disabled)).toEqual([false, true]);
    });

    test("disabled な子はクリックしても選択されない", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="a">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b" disabled></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      chips()[1].click();
      await settle();

      expect(group().value).toBe("a");
    });

    // グループが disabled を強制している間の値を「子が元々持っていた値」として
    // 記録してしまうと、解除時に利用側の意図した disabled が失われる。
    test("後から個別に付けた disabled は、グループ disabled の往復で消えない", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="a">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      const [first] = chips();
      first.disabled = true;
      await settle();

      group().disabled = true;
      await settle();
      group().disabled = false;
      await settle();

      expect(first.disabled).toBe(true);
    });

    test("往復を繰り返しても子の disabled が壊れない", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="a">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      const [first, second] = chips();
      first.disabled = true;
      await settle();

      for (let i = 0; i < 2; i += 1) {
        group().disabled = true;
        await settle();
        group().disabled = false;
        await settle();
      }

      expect(first.disabled).toBe(true);
      expect(second.disabled).toBe(false);
    });
  });

  // Figma の使用例（accordion-filter）では検索ボックスでチップを絞り込むため、
  // 子の追加・削除は実際に起きる。slotchange 経路が同期を維持できるかを確認する。
  describe("子の動的な追加・削除", () => {
    function makeChip(label: string, value: string) {
      const chip = document.createElement("mi-filter-chip");
      chip.label = label;
      chip.value = value;
      return chip;
    }

    test("後から追加した子にも role と tabindex が配られる", async () => {
      await render(defaultMarkup);

      const added = makeChip("D", "d");
      group().append(added);
      await settle();

      expect(added.getAttribute("role")).toBe("radio");
      expect(added.getAttribute("tabindex")).toBe("-1");
      expect(added.selected).toBe(false);
    });

    test("後から追加した子にもグループの disabled が及ぶ", async () => {
      await render(defaultMarkup);
      group().disabled = true;
      await settle();

      const added = makeChip("D", "d");
      group().append(added);
      await settle();

      expect(added.disabled).toBe(true);
    });

    test("選択中の子を削除すると先頭の有効な子へフォールバックする", async () => {
      await render(defaultMarkup);
      expect(group().value).toBe("b");

      chips()[1].remove();
      await settle();

      expect(group().value).toBe("a");
      expect(selectedValues()).toEqual(["a"]);
    });

    test("選択中でない子を削除しても選択は動かない", async () => {
      await render(defaultMarkup);

      chips()[2].remove();
      await settle();

      expect(group().value).toBe("b");
      expect(selectedValues()).toEqual(["b"]);
    });
  });

  describe("ロービングフォーカス", () => {
    test("tabindex=0 は選択中の1件だけ", async () => {
      await render(defaultMarkup);

      expect(chips().map((chip) => chip.getAttribute("tabindex"))).toEqual([
        "-1",
        "0",
        "-1",
      ]);
    });

    test("未選択のときは最初の有効な子が tabindex=0 になる", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間">
          <mi-filter-chip label="A" value="a" disabled></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
          <mi-filter-chip label="C" value="c"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);

      expect(chips().map((chip) => chip.getAttribute("tabindex"))).toEqual([
        null,
        "0",
        "-1",
      ]);
    });

    test.each([["ArrowRight"], ["ArrowDown"]])(
      "%s で次へ移動し、同時に選択される",
      async (key) => {
        await render(defaultMarkup);
        chips()[1].focus();

        press(chips()[1], key);
        await settle();

        expect(document.activeElement).toBe(chips()[2]);
        expect(group().value).toBe("c");
      },
    );

    test.each([["ArrowLeft"], ["ArrowUp"]])(
      "%s で前へ移動し、同時に選択される",
      async (key) => {
        await render(defaultMarkup);
        chips()[1].focus();

        press(chips()[1], key);
        await settle();

        expect(document.activeElement).toBe(chips()[0]);
        expect(group().value).toBe("a");
      },
    );

    test("末尾で次へ進むと先頭へループする", async () => {
      await render(defaultMarkup);
      chips()[2].focus();

      press(chips()[2], "ArrowRight");
      await settle();

      expect(group().value).toBe("a");
    });

    test("先頭で前へ戻ると末尾へループする", async () => {
      await render(defaultMarkup);
      chips()[0].focus();

      press(chips()[0], "ArrowLeft");
      await settle();

      expect(group().value).toBe("c");
    });

    test("Home で最初の有効な子、End で最後の有効な子へ移動する", async () => {
      await render(defaultMarkup);
      chips()[1].focus();

      press(chips()[1], "End");
      await settle();
      expect(group().value).toBe("c");

      press(chips()[2], "Home");
      await settle();
      expect(group().value).toBe("a");
    });

    test("disabled な子はスキップする", async () => {
      await render(`
        <mi-filter-chip-group-single aria-label="期間" value="a">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b" disabled></mi-filter-chip>
          <mi-filter-chip label="C" value="c"></mi-filter-chip>
        </mi-filter-chip-group-single>
      `);
      chips()[0].focus();

      press(chips()[0], "ArrowRight");
      await settle();

      expect(group().value).toBe("c");
      expect(document.activeElement).toBe(chips()[2]);
    });

    test("移動のたびに change が発火する", async () => {
      await render(defaultMarkup);
      const values: string[] = [];
      document.body.addEventListener("change", (e) => {
        values.push((e.target as MiFilterChipGroupSingle).value);
      });
      chips()[1].focus();

      press(chips()[1], "ArrowRight");
      await settle();
      press(chips()[2], "ArrowRight");
      await settle();

      expect(values).toEqual(["c", "a"]);
    });
  });

  describe("レイアウト", () => {
    test("折り返し可能な flex で並べ、間隔は 4px（Figma の値）", async () => {
      await render(defaultMarkup);
      const style = getComputedStyle(group());

      expect(style.display).toBe("flex");
      expect(style.flexWrap).toBe("wrap");
      expect(style.gap).toBe("4px");
    });
  });
});
