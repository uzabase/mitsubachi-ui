import "../../src/components/logo/uzabase-logo";

import { describe, expect, test } from "vitest";

describe("mi-uzabase-logo", () => {
  test("デフォルトでSVGが表示される", async () => {
    document.body.innerHTML = `<mi-uzabase-logo></mi-uzabase-logo>`;
    await customElements.whenDefined("mi-uzabase-logo");
    const svg = document
      .querySelector("mi-uzabase-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseのとき反転ロゴが表示される", async () => {
    document.body.innerHTML = `<mi-uzabase-logo inverse></mi-uzabase-logo>`;
    await customElements.whenDefined("mi-uzabase-logo");
    const svg = document
      .querySelector("mi-uzabase-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseの有無でSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <mi-uzabase-logo id="normal"></mi-uzabase-logo>
      <mi-uzabase-logo id="inverse" inverse></mi-uzabase-logo>
    `;
    await customElements.whenDefined("mi-uzabase-logo");
    const normalSvg = document
      .querySelector("#normal")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const inverseSvg = document
      .querySelector("#inverse")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(normalSvg).not.toBe(inverseSvg);
  });
});
