import "../../src/components/helper-text/mi-helper-text";

import { describe, expect, test } from "vitest";

describe("mi-helper-text", () => {
  test.each(["error", "information", "success", "warning"])(
    'status="%s" で指定したステータスのアイコンが表示される',
    async (status) => {
      document.body.innerHTML = `
        <mi-helper-text status="${status}">
          ヘルパーテキスト
        </mi-helper-text>
      `;
      await customElements.whenDefined("mi-helper-text");

      const element = document.querySelector("mi-helper-text");
      expect(
        element?.shadowRoot
          ?.querySelector("mi-icon-color")
          ?.getAttribute("type"),
      ).toBe(status);
    },
  );

  test('status属性を指定しなかった場合、"error" がデフォルトとして適用される', async () => {
    document.body.innerHTML = `
      <mi-helper-text>ヘルパーテキスト</mi-helper-text>
    `;
    await customElements.whenDefined("mi-helper-text");

    const element = document.querySelector("mi-helper-text");
    expect(
      element?.shadowRoot?.querySelector("mi-icon-color")?.getAttribute("type"),
    ).toBe("error");
  });

  test("無効なstatus値を指定した場合、デフォルトの error にフォールバックする", async () => {
    document.body.innerHTML = `
      <mi-helper-text status="invalid">ヘルパーテキスト</mi-helper-text>
    `;
    await customElements.whenDefined("mi-helper-text");

    const element = document.querySelector("mi-helper-text");
    expect(
      element?.shadowRoot?.querySelector("mi-icon-color")?.getAttribute("type"),
    ).toBe("error");
  });

  test.each(["small", "medium", "large"])(
    'size="%s" でアイコンに対応する data-size 属性が設定される',
    async (size) => {
      document.body.innerHTML = `
        <mi-helper-text size="${size}">
          ヘルパーテキスト
        </mi-helper-text>
      `;
      await customElements.whenDefined("mi-helper-text");

      const element = document.querySelector("mi-helper-text");
      const base = element?.shadowRoot?.querySelector(".base");
      expect(base?.getAttribute("data-size")).toBe(size);
    },
  );

  test('size属性を指定しなかった場合、"medium" がデフォルトとして適用される', async () => {
    document.body.innerHTML = `
      <mi-helper-text>ヘルパーテキスト</mi-helper-text>
    `;
    await customElements.whenDefined("mi-helper-text");

    const element = document.querySelector("mi-helper-text");
    const base = element?.shadowRoot?.querySelector(".base");
    expect(base?.getAttribute("data-size")).toBe("medium");
  });

  test('status="error" の場合、エラー色のテキストが適用される', async () => {
    document.body.innerHTML = `
      <mi-helper-text status="error">エラーメッセージ</mi-helper-text>
    `;
    await customElements.whenDefined("mi-helper-text");

    const base = document
      .querySelector("mi-helper-text")
      ?.shadowRoot?.querySelector(".base");
    expect(base).toBeTruthy();
    expect(base?.getAttribute("data-status")).toBe("error");
  });

  test('status="information" の場合、通常色のテキストが適用される', async () => {
    document.body.innerHTML = `
      <mi-helper-text status="information">情報メッセージ</mi-helper-text>
    `;
    await customElements.whenDefined("mi-helper-text");

    const base = document
      .querySelector("mi-helper-text")
      ?.shadowRoot?.querySelector(".base");
    expect(base).toBeTruthy();
    expect(base?.getAttribute("data-status")).toBe("information");
  });
});
