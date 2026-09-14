import "../../src/components/tag/mi-link-tag";
import "../../src/components/tag/mi-link-tag-group";

import { afterEach, describe, expect, test } from "vitest";

import type { MiLinkTagGroup } from "../../src/components/tag/mi-link-tag-group";

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
