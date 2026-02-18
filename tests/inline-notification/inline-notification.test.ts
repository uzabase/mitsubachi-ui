import "../../src/components/inline-notification/mi-inline-notification";

import { describe, expect, test } from "vitest";

describe("mi-inline-notification", () => {
  test.each(["information", "success", "warning", "error"])("\"%s\"属性で指定した型のインライン通知が表示される", async (type) => {
    document.body.innerHTML = `
      <mi-inline-notification type=${type}>
        Notificationだよ
      </mi-inline-notification>
    `;
    await customElements.whenDefined("mi-inline-notification");

    const element = document.querySelector("mi-inline-notification")!;
    expect(element.shadowRoot!.querySelector("mi-icon-color")!.getAttribute("type")).toBe(type)
  });

  test("type属性を指定しなかった/無効な値を指定した場合、\"information\"型のインライン通知が表示される", async () => {
    document.body.innerHTML = `
      <mi-inline-notification type="hello">
        Informationだよ
      </mi-inline-notification>
    `;
    await customElements.whenDefined("mi-inline-notification");

    const element = document.querySelector("mi-inline-notification")!;
    expect(element.shadowRoot!.querySelector("mi-icon-color")!.getAttribute("type")).toBe("information")
  });
});
