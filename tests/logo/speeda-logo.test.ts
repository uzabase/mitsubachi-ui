import "../../src/components/logo/speeda-logo";

import { describe, expect, test } from "vitest";

describe("sp-speeda-logo", () => {
  test("デフォルトでSVGが表示される", async () => {
    document.body.innerHTML = `<sp-speeda-logo></sp-speeda-logo>`;
    await customElements.whenDefined("sp-speeda-logo");
    const svg = document
      .querySelector("sp-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("logo-language=zhのとき中国語のロゴが表示される", async () => {
    document.body.innerHTML = `<sp-speeda-logo logo-language="zh"></sp-speeda-logo>`;
    await customElements.whenDefined("sp-speeda-logo");
    const svg = document
      .querySelector("sp-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("type=ai-agentのときAI Agentロゴが表示される", async () => {
    document.body.innerHTML = `<sp-speeda-logo type="ai-agent"></sp-speeda-logo>`;
    await customElements.whenDefined("sp-speeda-logo");
    const svg = document
      .querySelector("sp-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("type=expert-researchのときExpert Researchロゴが表示される", async () => {
    document.body.innerHTML = `<sp-speeda-logo type="expert-research"></sp-speeda-logo>`;
    await customElements.whenDefined("sp-speeda-logo");
    const svg = document
      .querySelector("sp-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseのとき反転ロゴが表示される", async () => {
    document.body.innerHTML = `<sp-speeda-logo inverse></sp-speeda-logo>`;
    await customElements.whenDefined("sp-speeda-logo");
    const svg = document
      .querySelector("sp-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("no-symbolのときシンボルなしロゴが表示される", async () => {
    document.body.innerHTML = `<sp-speeda-logo no-symbol></sp-speeda-logo>`;
    await customElements.whenDefined("sp-speeda-logo");
    const svg = document
      .querySelector("sp-speeda-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("inverseの有無でSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <sp-speeda-logo id="normal"></sp-speeda-logo>
      <sp-speeda-logo id="inverse" inverse></sp-speeda-logo>
    `;
    await customElements.whenDefined("sp-speeda-logo");
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
      <sp-speeda-logo id="en" logo-language="en"></sp-speeda-logo>
      <sp-speeda-logo id="zh" logo-language="zh"></sp-speeda-logo>
    `;
    await customElements.whenDefined("sp-speeda-logo");
    const enSvg = document
      .querySelector("#en")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const zhSvg = document
      .querySelector("#zh")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(enSvg).not.toBe(zhSvg);
  });
});
