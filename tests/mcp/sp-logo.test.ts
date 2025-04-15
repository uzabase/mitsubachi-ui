import { html, render } from "lit";
import { describe, test } from "vitest";


describe("temp", async () => {
  test("temp2", async () => {
    const  a = "b";
    const x = html`aaa=${a}`;

    const b = new HTMLElement();
    render(x, b);

    console.log(b.innerHTML);
  });
});


