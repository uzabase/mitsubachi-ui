// mi-timeline だけを import することで、mi-timeline.ts の副作用 import が効いて
// いることを確かめる。他のテストと統合すると mi-timeline-item も import され意味を失う
import "../../src/components/timeline/mi-timeline";

import { describe, expect, test } from "vitest";

describe("mi-timeline の登録", () => {
  test("mi-timeline を import すると mi-timeline-item も登録される", () => {
    expect(customElements.get("mi-timeline")).toBeTruthy();
    expect(customElements.get("mi-timeline-item")).toBeTruthy();
  });
});
