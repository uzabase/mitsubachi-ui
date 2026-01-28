import "../../src/components/logo";

import { describe, expect, test } from "vitest";

describe("mi-logo", () => {
  test("brandがuzabaseのとき当社のロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="uzabase"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const logo = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isUzabaseLogo(logo)).toBeTruthy();
  });
  test("brandがspeeda, language=jaのときスピーダの英語のロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="speeda" language="en"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const logo = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isEnSpeedaLogo(logo)).toBeTruthy();
  });
  test("brandがspeeda, language=jaのときスピーダの日本語のロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="speeda" language="ja"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const logo = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isJaSpeedaLogo(logo)).toBeTruthy();
  });
  test("brandがspeeda, language=zhのときスピーダの中国語のロゴが表示される", async () => {
    document.body.innerHTML = `<mi-logo brand="speeda" language="zh"></mi-logo>`;
    await customElements.whenDefined("mi-logo");
    const logo = document
      .querySelector("mi-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isZhSpeedaLogo(logo)).toBeTruthy();
  });
});

function isJaSpeedaLogo(logo: SVGSVGElement | null | undefined): boolean {
  return (
    logo?.getElementsByTagName("g")[0].getAttribute("clip-path") ===
    "url(#clip0_10_438)"
  );
}

function isEnSpeedaLogo(logo: SVGSVGElement | null | undefined): boolean {
  return (
    logo?.getAttribute("viewBox") === "0 0 74 26" &&
    logo.getElementsByTagName("g").length === 0
  );
}

function isZhSpeedaLogo(logo: SVGSVGElement | null | undefined): boolean {
  return logo!.getAttribute("viewBox") === "0 0 134 20";
}

function isUzabaseLogo(logo: SVGSVGElement | null | undefined): boolean {
  return logo!.getAttribute("viewBox") === "0 0 118 19";
}
