import "../../src/components/link-tag/mi-link-tag";
import "../../src/components/link-tag/mi-link-tag-group";

import { afterEach, describe, expect, test } from "vitest";

import type { MiLinkTagGroup } from "../../src/components/link-tag/mi-link-tag-group";

function getGroup() {
  return document.querySelector("mi-link-tag-group") as MiLinkTagGroup;
}

function getContainer() {
  return getGroup().shadowRoot?.querySelector(".container") as HTMLElement;
}

async function render(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-link-tag-group");
  await getGroup().updateComplete;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-link-tag-group", () => {
  test("コンテナがレンダリングされる", async () => {
    await render(`<mi-link-tag-group></mi-link-tag-group>`);

    expect(getContainer()).toBeTruthy();
  });

  test("子の mi-link-tag がスロットに割り当てられる", async () => {
    await render(`
      <mi-link-tag-group>
        <mi-link-tag href="#">金融</mi-link-tag>
        <mi-link-tag href="#">小売</mi-link-tag>
      </mi-link-tag-group>
    `);

    const slot = getContainer().querySelector("slot") as HTMLSlotElement;
    const assigned = slot
      .assignedElements()
      .filter((el) => el.tagName.toLowerCase() === "mi-link-tag");

    expect(assigned).toHaveLength(2);
  });

  test("タグ同士の間隔は 4px（Figma の値）", async () => {
    await render(`
      <mi-link-tag-group>
        <mi-link-tag href="#">金融</mi-link-tag>
      </mi-link-tag-group>
    `);

    expect(getComputedStyle(getContainer()).gap).toBe("4px");
  });

  describe("show-more", () => {
    // 何個目で折り返すかは環境のフォント描画に左右されるため、個数は断定しない。
    // 「隠れたタグがあるか」「ボタンが出るか」という関係だけを検証する。
    const manyTags = Array.from(
      { length: 20 },
      (_, i) => `<mi-link-tag href="#">タグ${i}</mi-link-tag>`,
    ).join("");

    const getMoreButton = () =>
      getGroup().shadowRoot?.querySelector<HTMLElement>(".more") ?? null;

    const isMoreVisible = () =>
      !!getMoreButton() && !getMoreButton()!.classList.contains("is-hidden");

    const hiddenTags = () => [
      ...document.querySelectorAll("mi-link-tag[data-mi-overflow]"),
    ];

    async function renderConstrained(attrs: string) {
      // 高さ・幅はラッパーではなく group 自身に指定する（利用側もこう書く）
      await render(`
        <mi-link-tag-group
          style="inline-size: 300px; block-size: 24px;"
          ${attrs}
        >${manyTags}</mi-link-tag-group>
      `);
      // ResizeObserver による再計算を待つ
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await getGroup().updateComplete;
    }

    test("show-more を指定しない場合はボタンを描画せず、タグも隠さない", async () => {
      await renderConstrained("");

      expect(getMoreButton()).toBeNull();
      expect(hiddenTags()).toHaveLength(0);
    });

    test("高さに収まらないタグを隠し、もっと見るボタンを表示する", async () => {
      await renderConstrained("show-more");

      expect(isMoreVisible()).toBe(true);
      expect(hiddenTags().length).toBeGreaterThan(0);
    });

    test("高さの指定が無ければ何も隠さずボタンも出さない", async () => {
      await render(`
        <mi-link-tag-group style="inline-size: 300px;" show-more
          >${manyTags}</mi-link-tag-group
        >
      `);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await getGroup().updateComplete;

      expect(isMoreVisible()).toBe(false);
      expect(hiddenTags()).toHaveLength(0);
    });

    test("もっと見るボタンはスクリーンリーダー向けの名前を持つ", async () => {
      await renderConstrained("show-more");

      const button = getMoreButton()!;
      expect(button.tagName.toLowerCase()).toBe("button");
      expect(button.getAttribute("aria-label")).toBe("もっと見る");
    });

    test("もっと見るを押すと全てのタグが表示され、ボタンが消える", async () => {
      await renderConstrained("show-more");
      expect(hiddenTags().length).toBeGreaterThan(0);

      getMoreButton()!.click();
      await getGroup().updateComplete;

      expect(hiddenTags()).toHaveLength(0);
      expect(getMoreButton()).toBeNull();
    });

    test("展開すると指定した高さを超えて全てのタグ分の高さになる", async () => {
      await renderConstrained("show-more");
      const group = getGroup();
      // 折り畳み時は指定どおり 1行分の高さに収まっている
      expect(Math.round(group.getBoundingClientRect().height)).toBe(24);

      getMoreButton()!.click();
      await group.updateComplete;

      // 展開後はタグがはみ出さないよう高さが伸びる
      expect(group.getBoundingClientRect().height).toBeGreaterThan(24);
      expect(getComputedStyle(group).overflow).toBe("visible");
    });
  });

  describe("size の一括制御", () => {
    const tags = () =>
      [...document.querySelectorAll("mi-link-tag")] as HTMLElement[];

    test("size を指定しない場合は medium になる", async () => {
      await render(`
        <mi-link-tag-group>
          <mi-link-tag href="#">金融</mi-link-tag>
        </mi-link-tag-group>
      `);

      expect(getGroup().size).toBe("medium");
      expect(tags()[0].getAttribute("size")).toBe("medium");
    });

    test("group の size が全ての子に配られる", async () => {
      await render(`
        <mi-link-tag-group size="x-small">
          <mi-link-tag href="#">金融</mi-link-tag>
          <mi-link-tag href="#">小売</mi-link-tag>
        </mi-link-tag-group>
      `);

      for (const tag of tags()) {
        expect(tag.getAttribute("size")).toBe("x-small");
      }
    });

    // ガイドライン: 個別の link-tag のサイズを内側で変更しない（group が一括制御する）
    test("子に個別指定した size は group の値で上書きされる", async () => {
      await render(`
        <mi-link-tag-group size="small">
          <mi-link-tag href="#" size="x-small">金融</mi-link-tag>
          <mi-link-tag href="#" size="medium">小売</mi-link-tag>
        </mi-link-tag-group>
      `);

      for (const tag of tags()) {
        expect(tag.getAttribute("size")).toBe("small");
      }
    });

    test("group の size を更新すると子にも反映される", async () => {
      await render(`
        <mi-link-tag-group>
          <mi-link-tag href="#">金融</mi-link-tag>
        </mi-link-tag-group>
      `);

      const group = getGroup();
      group.size = "small";
      await group.updateComplete;

      expect(tags()[0].getAttribute("size")).toBe("small");
    });

    test("後から追加した子にも size が配られる", async () => {
      await render(`<mi-link-tag-group size="x-small"></mi-link-tag-group>`);

      const group = getGroup();
      const tag = document.createElement("mi-link-tag");
      tag.setAttribute("href", "#");
      tag.textContent = "金融";
      group.append(tag);
      // slotchange の発火とその反映を待つ
      await group.updateComplete;
      await group.updateComplete;

      expect(tag.getAttribute("size")).toBe("x-small");
    });

    test("想定外の size は medium として子に配られる", async () => {
      await render(`
        <mi-link-tag-group size="invalid">
          <mi-link-tag href="#">金融</mi-link-tag>
        </mi-link-tag-group>
      `);

      expect(tags()[0].getAttribute("size")).toBe("medium");
    });
  });
});
