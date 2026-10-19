import "../../src/components/timeline/mi-timeline";
import "../../src/components/timeline/mi-timeline-item";

import { afterEach, describe, expect, test } from "vitest";

import type { MiTimeline } from "../../src/components/timeline/mi-timeline";
import type { MiTimelineItem } from "../../src/components/timeline/mi-timeline-item";

function getTimeline() {
  return document.querySelector("mi-timeline") as MiTimeline;
}

function getSlot() {
  return getTimeline().shadowRoot?.querySelector("slot") as HTMLSlotElement;
}

function getItems() {
  return [...document.querySelectorAll("mi-timeline-item")];
}

function getContents(item: MiTimelineItem) {
  return item.shadowRoot?.querySelector(".contents") as HTMLElement;
}

async function render(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-timeline");
  await customElements.whenDefined("mi-timeline-item");
  await getTimeline().updateComplete;
  for (const item of getItems()) {
    await item.updateComplete;
  }
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-timeline", () => {
  describe("構造", () => {
    test("ラッパー要素を描かず slot だけをレンダリングする", async () => {
      await render(`<mi-timeline></mi-timeline>`);

      const children = [...(getTimeline().shadowRoot?.children ?? [])];

      expect(children.map((el) => el.tagName.toLowerCase())).toEqual(["slot"]);
    });

    test("子の mi-timeline-item がスロットに割り当てられる", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
        </mi-timeline>
      `);

      const assigned = getSlot()
        .assignedElements()
        .filter((el) => el.tagName.toLowerCase() === "mi-timeline-item");

      expect(assigned).toHaveLength(2);
    });
  });

  describe("アクセシビリティ", () => {
    test("ホストに role=list が設定される", async () => {
      await render(`
        <mi-timeline>
          <mi-timeline-item>1</mi-timeline-item>
        </mi-timeline>
      `);

      expect(getTimeline().getAttribute("role")).toBe("list");
    });

    test("利用側が指定した role は上書きしない", async () => {
      await render(`
        <mi-timeline role="none">
          <mi-timeline-item>1</mi-timeline-item>
        </mi-timeline>
      `);

      expect(getTimeline().getAttribute("role")).toBe("none");
    });

    test("利用側が書いた aria-label がリスト（ホスト）に付く", async () => {
      await render(`
        <mi-timeline aria-label="沿革">
          <mi-timeline-item>1</mi-timeline-item>
        </mi-timeline>
      `);

      const timeline = getTimeline();

      expect(timeline.getAttribute("role")).toBe("list");
      expect(timeline.getAttribute("aria-label")).toBe("沿革");
    });
  });

  describe("hidden", () => {
    test("hidden を付けると非表示になる", async () => {
      await render(`
        <mi-timeline hidden>
          <mi-timeline-item>1</mi-timeline-item>
        </mi-timeline>
      `);

      expect(getComputedStyle(getTimeline()).display).toBe("none");
    });
  });

  describe("item-spacing", () => {
    test("指定しない場合は normal になる", async () => {
      await render(`<mi-timeline></mi-timeline>`);

      expect(getTimeline().itemSpacing).toBe("normal");
    });

    test("プロパティで指定した値が属性に反映される", async () => {
      await render(`<mi-timeline></mi-timeline>`);

      const timeline = getTimeline();
      timeline.itemSpacing = "loose";
      await timeline.updateComplete;

      expect(timeline.getAttribute("item-spacing")).toBe("loose");
    });

    test("想定外の値でも利用側が書いた属性を書き換えない", async () => {
      await render(`<mi-timeline item-spacing="invalid"></mi-timeline>`);

      const timeline = getTimeline();
      await timeline.updateComplete;

      expect(timeline.getAttribute("item-spacing")).toBe("invalid");
    });

    test("loose は normal よりアイテム間の余白が広い", async () => {
      const markup = (spacing: string) => `
        <mi-timeline item-spacing="${spacing}">
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
        </mi-timeline>
      `;

      await render(markup("normal"));
      const normal = parseFloat(
        getComputedStyle(getContents(getItems()[0])).paddingBlockEnd,
      );

      await render(markup("loose"));
      const loose = parseFloat(
        getComputedStyle(getContents(getItems()[0])).paddingBlockEnd,
      );

      expect(loose).toBeGreaterThan(normal);
    });

    test("想定外の値のときは normal と同じ余白になる", async () => {
      const markup = (spacing: string) => `
        <mi-timeline item-spacing="${spacing}">
          <mi-timeline-item>1</mi-timeline-item>
          <mi-timeline-item>2</mi-timeline-item>
        </mi-timeline>
      `;

      await render(markup("normal"));
      const normal = getComputedStyle(
        getContents(getItems()[0]),
      ).paddingBlockEnd;

      await render(markup("invalid"));
      const invalid = getComputedStyle(
        getContents(getItems()[0]),
      ).paddingBlockEnd;

      expect(invalid).toBe(normal);
    });
  });
});
