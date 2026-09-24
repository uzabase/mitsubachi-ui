// このファイルは mi-timeline だけを import する。
// mi-timeline-item を一緒に import しないことで、
// mi-timeline 側の副作用 import が効いていることを確かめる。
import "../../src/components/timeline/mi-timeline";

import { describe, expect, test } from "vitest";

describe("mi-timeline の登録", () => {
  test("mi-timeline を import すると mi-timeline-item も登録される", () => {
    expect(customElements.get("mi-timeline")).toBeTruthy();
    expect(customElements.get("mi-timeline-item")).toBeTruthy();
  });
});
