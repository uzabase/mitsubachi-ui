import "../../src/components/chip/mi-filter-chip";
import "../../src/components/chip/mi-filter-chip-group-multiple";
import "../../src/components/icon";

import { afterEach, describe, expect, test } from "vitest";

import type { MiFilterChip } from "../../src/components/chip/mi-filter-chip";
import type { MiFilterChipGroupMultiple } from "../../src/components/chip/mi-filter-chip-group-multiple";

function group() {
  return document.querySelector<MiFilterChipGroupMultiple>(
    "mi-filter-chip-group-multiple",
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
  await customElements.whenDefined("mi-filter-chip-group-multiple");
  await customElements.whenDefined("mi-filter-chip");
  await settle();
}

const defaultMarkup = `
  <mi-filter-chip-group-multiple aria-label="業種">
    <mi-filter-chip label="A" value="a"></mi-filter-chip>
    <mi-filter-chip label="B" value="b" selected></mi-filter-chip>
    <mi-filter-chip label="C" value="c"></mi-filter-chip>
  </mi-filter-chip-group-multiple>
`;

function press(element: HTMLElement, key: string) {
  element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-filter-chip-group-multiple", () => {
  describe("アクセシビリティ", () => {
    test('host に role="group" を持つ', async () => {
      await render(defaultMarkup);

      expect(group().getAttribute("role")).toBe("group");
    });

    test("子はトグルボタン（role=button + aria-pressed）になる", async () => {
      await render(defaultMarkup);

      expect(chips().map((chip) => chip.getAttribute("role"))).toEqual([
        "button",
        "button",
        "button",
      ]);
      expect(chips().map((chip) => chip.getAttribute("aria-pressed"))).toEqual([
        "false",
        "true",
        "false",
      ]);
      expect(chips().every((chip) => !chip.hasAttribute("aria-checked"))).toBe(
        true,
      );
    });

    test("ロービングフォーカスはせず、有効な子はすべて Tab で辿れる", async () => {
      await render(defaultMarkup);

      expect(chips().map((chip) => chip.getAttribute("tabindex"))).toEqual([
        "0",
        "0",
        "0",
      ]);
    });
  });

  describe("values getter", () => {
    test("初期の selected から選択値を読める", async () => {
      await render(defaultMarkup);

      expect(group().values).toEqual(["b"]);
    });

    test("複数同時に選択できる", async () => {
      await render(defaultMarkup);

      chips()[0].click();
      chips()[2].click();
      await settle();

      expect(group().values).toEqual(["a", "b", "c"]);
    });

    test("すべて解除して0件にできる", async () => {
      await render(defaultMarkup);

      chips()[1].click();
      await settle();

      expect(group().values).toEqual([]);
    });
  });

  describe("change イベント", () => {
    // click はネイティブイベントなので止めずに祖先へ通す。選択の通知は change が担うため
    // 二重発火にはならない（docs/event-architecture.md）。
    test("click は祖先まで届く", async () => {
      await render(`
        <div id="outer">
          <mi-filter-chip-group-multiple aria-label="業種">
            <mi-filter-chip label="A" value="a"></mi-filter-chip>
            <mi-filter-chip label="B" value="b"></mi-filter-chip>
          </mi-filter-chip-group-multiple>
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
          <mi-filter-chip-group-multiple aria-label="業種">
            <mi-filter-chip label="A" value="a"></mi-filter-chip>
            <mi-filter-chip label="B" value="b"></mi-filter-chip>
          </mi-filter-chip-group-multiple>
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

    test("bubbles: true で発火し event.target.values を読める", async () => {
      await render(defaultMarkup);
      const seen: string[][] = [];
      document.body.addEventListener("change", (e) => {
        seen.push((e.target as MiFilterChipGroupMultiple).values);
      });

      chips()[0].click();
      await settle();
      chips()[1].click();
      await settle();

      expect(seen).toEqual([["a", "b"], ["a"]]);
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

    test("Space キーでも選択がトグルし change が発火する", async () => {
      await render(defaultMarkup);
      let count = 0;
      document.body.addEventListener("change", () => count++);

      press(chips()[0], " ");
      await settle();

      expect(group().values).toEqual(["a", "b"]);
      expect(count).toBe(1);
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

    test("後から追加した子もトグルボタンとして扱われる", async () => {
      await render(defaultMarkup);

      const added = makeChip("D", "d");
      group().append(added);
      await settle();

      expect(added.getAttribute("role")).toBe("button");
      expect(added.getAttribute("aria-pressed")).toBe("false");
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

    test("選択中の子を削除すると values から消える", async () => {
      await render(defaultMarkup);
      expect(group().values).toEqual(["b"]);

      chips()[1].remove();
      await settle();

      expect(group().values).toEqual([]);
    });

    test("後から追加した選択済みの子は values に載る", async () => {
      await render(defaultMarkup);

      const added = makeChip("D", "d");
      added.selected = true;
      group().append(added);
      await settle();

      expect(group().values).toEqual(["b", "d"]);
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
        <mi-filter-chip-group-multiple aria-label="業種">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b" disabled></mi-filter-chip>
        </mi-filter-chip-group-multiple>
      `);

      group().disabled = true;
      await settle();
      group().disabled = false;
      await settle();

      expect(chips().map((chip) => chip.disabled)).toEqual([false, true]);
    });

    test("disabled な子はクリックしても選択されず change も発火しない", async () => {
      await render(`
        <mi-filter-chip-group-multiple aria-label="業種">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b" disabled></mi-filter-chip>
        </mi-filter-chip-group-multiple>
      `);
      let count = 0;
      document.body.addEventListener("change", () => count++);

      chips()[1].click();
      await settle();

      expect(group().values).toEqual([]);
      expect(count).toBe(0);
    });

    // グループが disabled を強制している間の値を「子が元々持っていた値」として
    // 記録してしまうと、解除時に利用側の意図した disabled が失われる。
    test("後から個別に付けた disabled は、グループ disabled の往復で消えない", async () => {
      await render(`
        <mi-filter-chip-group-multiple aria-label="業種">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-multiple>
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
        <mi-filter-chip-group-multiple aria-label="業種">
          <mi-filter-chip label="A" value="a"></mi-filter-chip>
          <mi-filter-chip label="B" value="b"></mi-filter-chip>
        </mi-filter-chip-group-multiple>
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
