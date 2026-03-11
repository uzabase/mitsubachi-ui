import "../../src/components/logo/mi-logo";

import { describe, expect, test } from "vitest";

describe("mi-logo", () => {
  test("brandがuzabaseのときUzabaseのロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="uzabase"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const svg = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("brandがspeedaのときSpeedaのロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="speeda"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const svg = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("brandがspeeda, language=enのとき英語のSpeedaロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="speeda" language="en"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const svg = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("brandがspeeda, language=zhのとき中国語のSpeedaロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="speeda" language="zh"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const svg = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeDefined();
  });

  test("brandの違いでSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <mi-logo id="uzabase" brand="uzabase"></mi-logo>
      <mi-logo id="speeda" brand="speeda"></mi-logo>
    `;
    await customElements.whenDefined("mi-logo");
    const uzabaseSvg = document
      .querySelector("#uzabase")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const speedaSvg = document
      .querySelector("#speeda")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(uzabaseSvg).not.toBe(speedaSvg);
  });

  test("languageの違いでSpeedaロゴのSVGの内容が異なる", async () => {
    document.body.innerHTML = `
      <mi-logo id="en" brand="speeda" language="en"></mi-logo>
      <mi-logo id="zh" brand="speeda" language="zh"></mi-logo>
    `;
    await customElements.whenDefined("mi-logo");
    const enSvg = document
      .querySelector("#en")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    const zhSvg = document
      .querySelector("#zh")
      ?.shadowRoot?.querySelector("svg")?.outerHTML;
    expect(enSvg).not.toBe(zhSvg);
  });

  test("brandが未指定のときSVGが表示されない", async () => {
    document.body.innerHTML = `<mi-logo></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const svg = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(svg).toBeNull();
  });
});
