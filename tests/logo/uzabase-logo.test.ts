import "../../src/components/logo/uzabase-logo";

import { describe, expect, test } from "vitest";

describe("sp-uzabase-logo", () => {
  test("デフォルトでSVGが表示される", async () => {
    document.body.innerHTML = `<sp-uzabase-logo></sp-uzabase-logo>`;
    await customElements.whenDefined("sp-uzabase-logo");
    const svg = document
      .querySelector("sp-uzabase-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseのとき反転ロゴが表示される", async () => {
    document.body.innerHTML = `<sp-uzabase-logo inverse></sp-uzabase-logo>`;
    await customElements.whenDefined("sp-uzabase-logo");
    const svg = document
      .querySelector("sp-uzabase-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseの有無でSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <sp-uzabase-logo id="normal"></sp-uzabase-logo>
      <sp-uzabase-logo id="inverse" inverse></sp-uzabase-logo>
    `;
    await customElements.whenDefined("sp-uzabase-logo");
    const normalSvg = document
      .querySelector("#normal")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const inverseSvg = document
      .querySelector("#inverse")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(normalSvg).not.toBe(inverseSvg);
  });
});
