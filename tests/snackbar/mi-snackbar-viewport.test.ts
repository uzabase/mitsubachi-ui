import "../../src/components/snackbar/mi-snackbar-viewport";

import { afterEach, describe, expect, test } from "vitest";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mi-snackbar-viewport", () => {
  test("タグ名が登録されている", async () => {
    await customElements.whenDefined("mi-snackbar-viewport");
    expect(customElements.get("mi-snackbar-viewport")).toBeDefined();
  });

  test("ライト DOM の子が slot に投影される", async () => {
    document.body.innerHTML = `
      <mi-snackbar-viewport id="vp">
        <span data-testid="child">x</span>
      </mi-snackbar-viewport>
    `;
    await customElements.whenDefined("mi-snackbar-viewport");
    const vp = document.getElementById("vp")!;
    await (vp as HTMLElement & { updateComplete: Promise<unknown> })
      .updateComplete;

    const slot = vp.shadowRoot!.querySelector("slot");
    expect(slot).toBeTruthy();
    expect(slot!.assignedNodes({ flatten: true }).length).toBeGreaterThan(0);
  });
});
