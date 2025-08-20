import "../../src/components/logo/sp-logo";

import { describe, expect, test } from "vitest";

function getSpLogo() {
  return document.querySelector("sp-logo") as SpLogo;
}

async function waitForLitComponent() {
  const element = getSpLogo();
  await element.updateComplete;
}

describe("sp-logo", () => {
  test("brandがuzabaseのとき当社のロゴが表示される", async () => {
    document.body.innerHTML = `<sp-logo brand="uzabase"></sp-logo>`;
    await waitForLitComponent();
    const logo = document
      .querySelector("sp-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isUzabaseLogo(logo)).toBeTruthy();
  });
  test("brandがspeeda, language=jaのときスピーダの英語のロゴが表示される", async () => {
    document.body.innerHTML = `<sp-logo brand="speeda" language="en"></sp-logo>`;
    await waitForLitComponent();
    const logo = document
      .querySelector("sp-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isEnSpeedaLogo(logo)).toBeTruthy();
  });
  test("brandがspeeda, language=jaのときスピーダの日本語のロゴが表示される", async () => {
    document.body.innerHTML = `<sp-logo brand="speeda" language="ja"></sp-logo>`;
    await waitForLitComponent();
    const logo = document
      .querySelector("sp-logo")
      ?.shadowRoot?.querySelector("svg");
    expect(isJaSpeedaLogo(logo)).toBeTruthy();
  });
  test("brandがspeeda, language=zhのときスピーダの中国語のロゴが表示される", async () => {
    document.body.innerHTML = `<sp-logo brand="speeda" language="zh"></sp-logo>`;
    await waitForLitComponent();
    const logo = document
      .querySelector("sp-logo")
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
