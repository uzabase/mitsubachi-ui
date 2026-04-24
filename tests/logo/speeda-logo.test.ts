import "../../src/components/logo/speeda-logo";

import { describe, expect, test } from "vitest";

describe("mi-speeda-logo", () => {
  test("デフォルトでSVGが表示される", async () => {
    document.body.innerHTML = `<mi-speeda-logo></mi-speeda-logo>`;
    await customElements.whenDefined("mi-speeda-logo");
    const svg = document
      .querySelector("mi-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("logo-language=zhのとき中国語のロゴが表示される", async () => {
    document.body.innerHTML = `<mi-speeda-logo logo-language="zh"></mi-speeda-logo>`;
    await customElements.whenDefined("mi-speeda-logo");
    const svg = document
      .querySelector("mi-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("sub-brand=ai-agentのときAI Agentロゴが表示される", async () => {
    document.body.innerHTML = `<mi-speeda-logo sub-brand="ai-agent"></mi-speeda-logo>`;
    await customElements.whenDefined("mi-speeda-logo");
    const svg = document
      .querySelector("mi-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("sub-brand=expert-researchのときExpert Researchロゴが表示される", async () => {
    document.body.innerHTML = `<mi-speeda-logo sub-brand="expert-research"></mi-speeda-logo>`;
    await customElements.whenDefined("mi-speeda-logo");
    const svg = document
      .querySelector("mi-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseのとき反転ロゴが表示される", async () => {
    document.body.innerHTML = `<mi-speeda-logo inverse></mi-speeda-logo>`;
    await customElements.whenDefined("mi-speeda-logo");
    const svg = document
      .querySelector("mi-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("no-symbolのときシンボルなしロゴが表示される", async () => {
    document.body.innerHTML = `<mi-speeda-logo no-symbol></mi-speeda-logo>`;
    await customElements.whenDefined("mi-speeda-logo");
    const svg = document
      .querySelector("mi-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseの有無でSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <mi-speeda-logo id="normal"></mi-speeda-logo>
      <mi-speeda-logo id="inverse" inverse></mi-speeda-logo>
    `;
    await customElements.whenDefined("mi-speeda-logo");
    const normalSvg = document
      .querySelector("#normal")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const inverseSvg = document
      .querySelector("#inverse")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(normalSvg).not.toBe(inverseSvg);
  });

  test("logo-languageの違いでSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <mi-speeda-logo id="en" logo-language="en"></mi-speeda-logo>
      <mi-speeda-logo id="zh" logo-language="zh"></mi-speeda-logo>
    `;
    await customElements.whenDefined("mi-speeda-logo");
    const enSvg = document
      .querySelector("#en")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const zhSvg = document
      .querySelector("#zh")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(enSvg).not.toBe(zhSvg);
  });
});
