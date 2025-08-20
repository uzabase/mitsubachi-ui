import "../../src/components/icon/sp-icon";

import { describe, expect, test } from "vitest";

import type { SpIcon } from "../../src/components/icon/sp-icon";

function getSpIcon() {
  return document.querySelector("sp-icon") as SpIcon;
}

async function waitForLitComponent() {
  const element = getSpIcon();
  await element.updateComplete;
}

describe("sp-icon", () => {
  test("ツールがエラーアイコンを読み上げてはいけない", async () => {
    document.body.innerHTML = `<sp-icon type="error-fill"></sp-icon>`;
    await waitForLitComponent();
    const icon = document
      .querySelector("sp-icon")
      ?.shadowRoot?.querySelector("svg");

    const actual = icon?.getAttribute("aria-hidden");

    expect(actual).toBe("true");
  });

  test("typeで指定したアイコンが表示される", async () => {
    for (const name of [
      "error-fill",
      "information-circle",
      "person",
      "check-circle-fill",
      "check-circle",
      "check-small",
      "chevron-down",
      "chevron-down-small",
      "globe",
    ]) {
      document.body.innerHTML = `<sp-icon type="${name}"></sp-icon>`;
      const icon = document
        .querySelector("sp-icon")
        ?.shadowRoot?.querySelector("svg");

      expect(icon).toBeDefined();
    }
  });
});
