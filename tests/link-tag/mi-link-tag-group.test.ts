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

  test("子の size には関与しない", async () => {
    await render(`
      <mi-link-tag-group>
        <mi-link-tag href="#" size="x-small">金融</mi-link-tag>
        <mi-link-tag href="#">小売</mi-link-tag>
      </mi-link-tag-group>
    `);

    const [first, second] = [
      ...document.querySelectorAll("mi-link-tag"),
    ] as HTMLElement[];

    expect(first.getAttribute("size")).toBe("x-small");
    expect(second.getAttribute("size")).toBe("medium");
  });
});
