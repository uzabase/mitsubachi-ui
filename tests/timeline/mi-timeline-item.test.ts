import "../../src/components/timeline/mi-timeline";
import "../../src/components/timeline/mi-timeline-item";

import { afterEach, describe, expect, test } from "vitest";

import type { MiTimelineItem } from "../../src/components/timeline/mi-timeline-item";

function getItems() {
  return [...document.querySelectorAll("mi-timeline-item")];
}

function shadow(item: MiTimelineItem, selector: string) {
  return item.shadowRoot?.querySelector(selector) as HTMLElement;
}

async function render(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-timeline");
  await customElements.whenDefined("mi-timeline-item");
  const timeline = document.querySelector("mi-timeline");
  if (timeline) {
    await timeline.updateComplete;
  }
  for (const item of getItems()) {
    await item.updateComplete;
  }
}

/**
 * 位置の配り直しは mi-timeline の MutationObserver（マイクロタスク）で走るため、
 * マクロタスクを 1 回挟んで確実にそのあとを見る。
 */
function waitForPositions() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-timeline-item", () => {
  describe("構造", () => {
    test("フロー列（上線・ドット・下線）とコンテンツがレンダリングされる", async () => {
      await render(`<mi-timeline-item>内容</mi-timeline-item>`);

      const item = getItems()[0];
      expect(shadow(item, ".flow")).toBeTruthy();
      expect(shadow(item, ".top-line")).toBeTruthy();
      expect(shadow(item, ".dot")).toBeTruthy();
      expect(shadow(item, ".bottom-line")).toBeTruthy();
      expect(shadow(item, ".contents")).toBeTruthy();
    });

    test("slot に渡した内容が割り当てられる", async () => {
      await render(`<mi-timeline-item><span>内容</span></mi-timeline-item>`);

      const slot = shadow(getItems()[0], ".contents").querySelector(
        "slot",
      ) as HTMLSlotElement;

      expect(slot.assignedElements()).toHaveLength(1);
    });
  });

  describe("アクセシビリティ", () => {
    test("role=listitem が付与される", async () => {
      await render(`<mi-timeline-item>内容</mi-timeline-item>`);

      expect(getItems()[0].getAttribute("role")).toBe("listitem");
    });

    test("利用側が指定した role は上書きしない", async () => {
      await render(`<mi-timeline-item role="none">内容</mi-timeline-item>`);

      expect(getItems()[0].getAttribute("role")).toBe("none");
    });

    test("装飾のフロー列は aria-hidden になっている", async () => {
      await render(`<mi-timeline-item>内容</mi-timeline-item>`);

      expect(shadow(getItems()[0], ".flow").getAttribute("aria-hidden")).toBe(
        "true",
      );
    });

    test("フォーカス対象にならない（tabindex を持たない）", async () => {
      await render(`<mi-timeline-item>内容</mi-timeline-item>`);

      expect(getItems()[0].hasAttribute("tabindex")).toBe(false);
    });
  });

  describe("emphasized", () => {
    test("既定値は false", async () => {
      await render(`<mi-timeline-item>内容</mi-timeline-item>`);

      expect(getItems()[0].emphasized).toBe(false);
    });

    test("プロパティを立てると属性に反映される", async () => {
      await render(`<mi-timeline-item>内容</mi-timeline-item>`);

      const item = getItems()[0];
      item.emphasized = true;
      await item.updateComplete;

      expect(item.hasAttribute("emphasized")).toBe(true);
    });

    test("ドットの色が通常時と変わる", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>通常</mi-timeline-item>
          <mi-timeline-item emphasized>強調</mi-timeline-item>
        </mi-timeline>
      `);

      const [normal, emphasized] = getItems();
      const normalColor = getComputedStyle(
        shadow(normal, ".dot"),
      ).backgroundColor;
      const emphasizedColor = getComputedStyle(
        shadow(emphasized, ".dot"),
      ).backgroundColor;

      expect(emphasizedColor).not.toBe(normalColor);
    });
  });

  describe("位置による接続線の出し分け", () => {
    const threeItems = `
      <mi-timeline>
        <mi-timeline-item>1</mi-timeline-item>
        <mi-timeline-item>2</mi-timeline-item>
        <mi-timeline-item>3</mi-timeline-item>
      </mi-timeline>
    `;

    test("先頭のアイテムは上線を表示しない", async () => {
      await render(threeItems);

      const [first, middle] = getItems();
      expect(getComputedStyle(shadow(first, ".top-line")).display).toBe("none");
      expect(getComputedStyle(shadow(middle, ".top-line")).display).not.toBe(
        "none",
      );
    });

    test("末尾のアイテムは下線を表示しない", async () => {
      await render(threeItems);

      const items = getItems();
      const last = items[items.length - 1];
      expect(getComputedStyle(shadow(last, ".bottom-line")).display).toBe(
        "none",
      );
      expect(
        getComputedStyle(shadow(items[1], ".bottom-line")).display,
      ).not.toBe("none");
    });

    test("先頭のアイテムはドットの位置をそろえる余白が入る", async () => {
      await render(threeItems);

      const [first, middle] = getItems();
      const firstPadding = parseFloat(
        getComputedStyle(shadow(first, ".flow")).paddingBlockStart,
      );
      const middlePadding = parseFloat(
        getComputedStyle(shadow(middle, ".flow")).paddingBlockStart,
      );

      expect(middlePadding).toBe(0);
      expect(firstPadding).toBeGreaterThan(middlePadding);
    });

    test("アイテムが 1 件だけの場合は上線も下線も表示しない", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
        </mi-timeline>
      `);

      const only = getItems()[0];
      expect(getComputedStyle(shadow(only, ".top-line")).display).toBe("none");
      expect(getComputedStyle(shadow(only, ".bottom-line")).display).toBe(
        "none",
      );
    });

    test("見出しなどを挟んでも先頭のアイテムは上線を表示しない", async () => {
      await render(`
        <mi-timeline>
          <h2>沿革</h2>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
        </mi-timeline>
      `);

      const [first] = getItems();
      expect(getComputedStyle(shadow(first, ".top-line")).display).toBe("none");
    });

    test("ラッパー要素でくくっても位置を判定できる", async () => {
      await render(`
        <mi-timeline>
          <div>
            <mi-timeline-item>1</mi-timeline-item>
            <mi-timeline-item>2</mi-timeline-item>
            <mi-timeline-item>3</mi-timeline-item>
          </div>
        </mi-timeline>
      `);

      const [first, middle, last] = getItems();
      expect(getComputedStyle(shadow(first, ".top-line")).display).toBe("none");
      expect(getComputedStyle(shadow(middle, ".top-line")).display).not.toBe(
        "none",
      );
      expect(getComputedStyle(shadow(last, ".bottom-line")).display).toBe(
        "none",
      );
    });

    test("入れ子のタイムラインのアイテムは外側の数に含めない", async () => {
      // 外側から見た末尾は「2」。入れ子の 2-1 / 2-2 を数えてしまうと
      // 「2」が中間になり、下線が宙に浮く。
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>
            2
            <mi-timeline>
              <mi-timeline-item>2-1</mi-timeline-item>
              <mi-timeline-item>2-2</mi-timeline-item>
            </mi-timeline>
          </mi-timeline-item>
        </mi-timeline>
      `);

      const outerLast = getItems()[1];
      expect(getComputedStyle(shadow(outerLast, ".bottom-line")).display).toBe(
        "none",
      );
    });
  });

  describe("hidden", () => {
    test("hidden を付けると非表示になる", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item hidden>2</mi-timeline-item>
        </mi-timeline>
      `);

      const [shown, hiddenItem] = getItems();
      expect(getComputedStyle(hiddenItem).display).toBe("none");
      expect(getComputedStyle(shown).display).not.toBe("none");
    });

    test("末尾を hidden にすると、見えている末尾の下線が消える", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
          <mi-timeline-item hidden>3</mi-timeline-item>
        </mi-timeline>
      `);

      const [, visibleLast] = getItems();
      expect(
        getComputedStyle(shadow(visibleLast, ".bottom-line")).display,
      ).toBe("none");
    });

    test("先頭を hidden にすると、見えている先頭の上線が消える", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item hidden>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
          <mi-timeline-item>3</mi-timeline-item>
        </mi-timeline>
      `);

      const [, visibleFirst] = getItems();
      expect(getComputedStyle(shadow(visibleFirst, ".top-line")).display).toBe(
        "none",
      );
    });

    test("あとから hidden を切り替えても追従する", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
          <mi-timeline-item>3</mi-timeline-item>
        </mi-timeline>
      `);

      const [, second, third] = getItems();
      expect(getComputedStyle(shadow(second, ".bottom-line")).display).not.toBe(
        "none",
      );

      third.hidden = true;
      await waitForPositions();

      expect(getComputedStyle(shadow(second, ".bottom-line")).display).toBe(
        "none",
      );
    });

    test("あとからアイテムを消しても追従する", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
          <mi-timeline-item>3</mi-timeline-item>
        </mi-timeline>
      `);

      const [, second, third] = getItems();
      expect(getComputedStyle(shadow(second, ".bottom-line")).display).not.toBe(
        "none",
      );

      third.remove();
      await waitForPositions();

      expect(getComputedStyle(shadow(second, ".bottom-line")).display).toBe(
        "none",
      );
    });

    test("あとからアイテムを足しても追従する", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
        </mi-timeline>
      `);

      const timeline = document.querySelector("mi-timeline") as HTMLElement;
      const [, second] = getItems();
      expect(getComputedStyle(shadow(second, ".bottom-line")).display).toBe(
        "none",
      );

      const added = document.createElement("mi-timeline-item");
      timeline.append(added);
      await waitForPositions();
      await added.updateComplete;

      expect(getComputedStyle(shadow(second, ".bottom-line")).display).not.toBe(
        "none",
      );
      expect(getComputedStyle(shadow(added, ".bottom-line")).display).toBe(
        "none",
      );
    });
  });

  describe("mi-timeline の外で単体使用した場合", () => {
    test("接続線を表示しない（Figma の group=false 相当）", async () => {
      await render(`
        <mi-timeline-item>1</mi-timeline-item>
        <mi-timeline-item>2</mi-timeline-item>
      `);

      for (const item of getItems()) {
        expect(getComputedStyle(shadow(item, ".top-line")).display).toBe(
          "none",
        );
        expect(getComputedStyle(shadow(item, ".bottom-line")).display).toBe(
          "none",
        );
      }
    });
  });
});
