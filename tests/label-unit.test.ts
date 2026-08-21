import "../src/components/label-unit";

import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

describe("mi-label-unit", () => {
  test("空文字でないtext属性の値は表示される", async () => {
    document.body.innerHTML = `<mi-label-unit text="ラベル"></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");

    const a = page.getByText("ラベル");

    expect(a.element().textContent).toBe("ラベル");
  });

  test("空文字でないsupport-text属性の値は表示される", async () => {
    document.body.innerHTML = `<mi-label-unit support-text="サポート" text="ラベル"></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");

    const a = page.getByText("サポート");

    expect(a.element().textContent).toBe("サポート");
  });

  test("ラベルと補足テキストの高さが環境に依存しない", async () => {
    // line-height を明示しないと normal（フォント依存）になり、OS によって高さが変わる。
    // Figma の指定は label 21px（14px × 150%）/ 補足 16px（12px × 130% = 15.6px）
    document.body.innerHTML = `<mi-label-unit text="ラベル" support-text="補足"></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");
    const sut = document.querySelector("mi-label-unit")!;
    await sut.updateComplete;

    const label = sut.shadowRoot!.querySelector(".label")!;
    const support = sut.shadowRoot!.querySelector(".support")!;

    expect(label.getBoundingClientRect().height).toBe(21);
    expect(support.getBoundingClientRect().height).toBeCloseTo(15.6, 1);
  });

  test("required属性を指定すると、必須バッジが表示される", async () => {
    document.body.innerHTML = `<mi-label-unit text="ラベル" required></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");

    const badge = document
      .querySelector("mi-label-unit")
      ?.shadowRoot?.querySelector(".required");

    expect(badge?.textContent).toBe("必須");
  });

  test("required属性を指定しないと、必須バッジは表示されない", async () => {
    document.body.innerHTML = `<mi-label-unit text="ラベル"></mi-label-unit>`;
    await customElements.whenDefined("mi-label-unit");

    const badge = document
      .querySelector("mi-label-unit")
      ?.shadowRoot?.querySelector(".required");

    expect(badge).toBeNull();
  });
});
