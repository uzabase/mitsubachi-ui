import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-col";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";

import { describe, expect, test, vi } from "vitest";

import type { MiTable } from "../../src/components/table/mi-table";
import type { MiTableBodyCell } from "../../src/components/table/mi-table-body-cell";
import type { MiTableHeaderCell } from "../../src/components/table/mi-table-header-cell";
import type { MiTableRow } from "../../src/components/table/mi-table-row";

describe("mi-table", async () => {
  test("role='table' が設定される", async () => {
    document.body.innerHTML = `
      <mi-table label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell>名前</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `;
    await customElements.whenDefined("mi-table");
    const table = document.querySelector("mi-table") as MiTable;
    await table.updateComplete;
    const inner = table.shadowRoot?.querySelector("table");
    expect(inner?.getAttribute("role")).toBe("table");
  });

  test("label が aria-label に反映される", async () => {
    document.body.innerHTML = `<mi-table label="ユーザー一覧"></mi-table>`;
    await customElements.whenDefined("mi-table");
    const table = document.querySelector("mi-table") as MiTable;
    await table.updateComplete;
    const inner = table.shadowRoot?.querySelector("table");
    expect(inner?.getAttribute("aria-label")).toBe("ユーザー一覧");
  });

  test("view のデフォルトは grid", async () => {
    document.body.innerHTML = `<mi-table label="テスト"></mi-table>`;
    await customElements.whenDefined("mi-table");
    const table = document.querySelector("mi-table") as MiTable;
    expect(table.view).toBe("grid");
    expect(table.getAttribute("view")).toBe("grid");
  });
});

describe("mi-table-head", async () => {
  test("role='rowgroup' が設定される", async () => {
    document.body.innerHTML = `<mi-table-head></mi-table-head>`;
    await customElements.whenDefined("mi-table-head");
    const head = document.querySelector("mi-table-head")!;
    expect(head.getAttribute("role")).toBe("rowgroup");
  });
});

describe("mi-table-body", async () => {
  test("role='rowgroup' が設定される", async () => {
    document.body.innerHTML = `<mi-table-body></mi-table-body>`;
    await customElements.whenDefined("mi-table-body");
    const body = document.querySelector("mi-table-body")!;
    expect(body.getAttribute("role")).toBe("rowgroup");
  });
});

describe("mi-table-row", async () => {
  test("role='row' が設定される", async () => {
    document.body.innerHTML = `<mi-table-row></mi-table-row>`;
    await customElements.whenDefined("mi-table-row");
    const row = document.querySelector("mi-table-row")!;
    expect(row.getAttribute("role")).toBe("row");
  });

  test("selected が reflect される", async () => {
    document.body.innerHTML = `<mi-table-row selected></mi-table-row>`;
    await customElements.whenDefined("mi-table-row");
    const row = document.querySelector("mi-table-row") as MiTableRow;
    expect(row.selected).toBe(true);
    expect(row.getAttribute("aria-selected")).toBe("true");
  });

  test("selected=false のとき aria-selected がない", async () => {
    document.body.innerHTML = `<mi-table-row></mi-table-row>`;
    await customElements.whenDefined("mi-table-row");
    const row = document.querySelector("mi-table-row") as MiTableRow;
    await row.updateComplete;
    expect(row.hasAttribute("aria-selected")).toBe(false);
  });
});

describe("mi-table-header-cell", async () => {
  test("role='columnheader' が設定される", async () => {
    document.body.innerHTML = `<mi-table-header-cell>名前</mi-table-header-cell>`;
    await customElements.whenDefined("mi-table-header-cell");
    const cell = document.querySelector("mi-table-header-cell")!;
    expect(cell.getAttribute("role")).toBe("columnheader");
  });

  test("sort-state が ascending のとき aria-sort='ascending' が設定される", async () => {
    document.body.innerHTML = `<mi-table-header-cell sort-state="ascending">名前</mi-table-header-cell>`;
    await customElements.whenDefined("mi-table-header-cell");
    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;
    expect(cell.getAttribute("aria-sort")).toBe("ascending");
  });

  test("sort-state が default のとき aria-sort がない", async () => {
    document.body.innerHTML = `<mi-table-header-cell sort-state="default">名前</mi-table-header-cell>`;
    await customElements.whenDefined("mi-table-header-cell");
    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;
    expect(cell.hasAttribute("aria-sort")).toBe(false);
  });

  test("sort-change イベントが発火する", async () => {
    document.body.innerHTML = `<mi-table-header-cell sort-state="default">名前</mi-table-header-cell>`;
    await customElements.whenDefined("mi-table-header-cell");
    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;

    const handler = vi.fn();
    cell.addEventListener("sort-change", handler);

    const button = cell.shadowRoot?.querySelector(
      ".sort-button",
    ) as HTMLButtonElement;
    button.click();

    expect(handler).toHaveBeenCalledTimes(1);
    const detail = (handler.mock.calls[0][0] as CustomEvent).detail;
    expect(detail.sortState).toBe("ascending");
  });

  test("sort-change の遷移: default→ascending→descending→default", async () => {
    document.body.innerHTML = `<mi-table-header-cell sort-state="default">名前</mi-table-header-cell>`;
    await customElements.whenDefined("mi-table-header-cell");
    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;

    const states: string[] = [];
    cell.addEventListener("sort-change", (e) => {
      const detail = (e as CustomEvent).detail;
      states.push(detail.sortState);
      cell.sortState = detail.sortState;
    });

    const getButton = () =>
      cell.shadowRoot?.querySelector(".sort-button") as HTMLButtonElement;

    // default → ascending
    getButton().click();
    await cell.updateComplete;

    // ascending → descending
    getButton().click();
    await cell.updateComplete;

    // descending → default
    getButton().click();
    await cell.updateComplete;

    expect(states).toEqual(["ascending", "descending", "default"]);
  });
});

describe("mi-table-body-cell", async () => {
  test("role='cell' が設定される", async () => {
    document.body.innerHTML = `<mi-table-body-cell>テスト</mi-table-body-cell>`;
    await customElements.whenDefined("mi-table-body-cell");
    const cell = document.querySelector("mi-table-body-cell")!;
    expect(cell.getAttribute("role")).toBe("cell");
  });

  test("空のセルにダッシュ（–）が表示される", async () => {
    document.body.innerHTML = `<mi-table-body-cell></mi-table-body-cell>`;
    await customElements.whenDefined("mi-table-body-cell");
    const cell = document.querySelector(
      "mi-table-body-cell",
    ) as MiTableBodyCell;
    await cell.updateComplete;

    const nullValue = cell.shadowRoot?.querySelector(".null-value");
    expect(nullValue?.textContent).toBe("\u2013");
  });

  test("content-type が reflect される", async () => {
    document.body.innerHTML = `<mi-table-body-cell content-type="number">100</mi-table-body-cell>`;
    await customElements.whenDefined("mi-table-body-cell");
    const cell = document.querySelector(
      "mi-table-body-cell",
    ) as MiTableBodyCell;
    expect(cell.getAttribute("content-type")).toBe("number");
  });
});
