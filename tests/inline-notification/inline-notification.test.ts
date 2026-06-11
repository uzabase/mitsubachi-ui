import "../../src/components/inline-notification/mi-inline-notification";

import { describe, expect, test } from "vitest";

describe("mi-inline-notification", () => {
  test.each(["information", "success", "warning", "error"])(
    '"%s"属性で指定した型のインライン通知が表示される',
    async (type) => {
      document.body.innerHTML = `
      <mi-inline-notification type=${type}>
        Notificationだよ
      </mi-inline-notification>
    `;
      await customElements.whenDefined("mi-inline-notification");

      const element = document.querySelector("mi-inline-notification");
      expect(
        element?.shadowRoot
          ?.querySelector("mi-icon-color")
          ?.getAttribute("type"),
      ).toBe(type);
    },
  );

  test('type属性を指定しなかった/無効な値を指定した場合、"information"型のインライン通知が表示される', async () => {
    document.body.innerHTML = `
      <mi-inline-notification type="hello">
        Informationだよ
      </mi-inline-notification>
    `;
    await customElements.whenDefined("mi-inline-notification");

    const element = document.querySelector("mi-inline-notification");
    expect(
      element?.shadowRoot?.querySelector("mi-icon-color")?.getAttribute("type"),
    ).toBe("information");
  });

  test.each(["information", "warning"])(
    'variant="secondary"かつtype="%s"の場合、グレーの背景色が適用される',
    async (type) => {
      document.body.innerHTML = `
      <mi-inline-notification type=${type} variant="secondary">
        Notificationだよ
      </mi-inline-notification>
    `;
      await customElements.whenDefined("mi-inline-notification");

      const base = document
        .querySelector("mi-inline-notification")
        ?.shadowRoot?.querySelector(".base");
      expect(base).toBeTruthy();
      expect(getComputedStyle(base!).backgroundColor).toBe(
        "rgb(237, 237, 237)",
      );
    },
  );

  test.each(["success", "error"])(
    'variant="secondary"でもtype="%s"の場合はprimaryと同じ背景色になる（フォールバック）',
    async (type) => {
      document.body.innerHTML = `
      <mi-inline-notification type=${type} variant="secondary">
        Notificationだよ
      </mi-inline-notification>
    `;
      await customElements.whenDefined("mi-inline-notification");

      const base = document
        .querySelector("mi-inline-notification")
        ?.shadowRoot?.querySelector(".base");
      expect(base).toBeTruthy();
      expect(getComputedStyle(base!).backgroundColor).not.toBe(
        "rgb(237, 237, 237)",
      );
    },
  );

  test('variant属性を指定しなかった場合、"primary"（グレー以外の背景）が適用される', async () => {
    document.body.innerHTML = `
      <mi-inline-notification type="information">
        Informationだよ
      </mi-inline-notification>
    `;
    await customElements.whenDefined("mi-inline-notification");

    const base = document
      .querySelector("mi-inline-notification")
      ?.shadowRoot?.querySelector(".base");
    expect(base).toBeTruthy();
    expect(getComputedStyle(base!).backgroundColor).not.toBe(
      "rgb(237, 237, 237)",
    );
  });
});
