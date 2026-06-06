import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";
import "../../src/components/table/mi-table-col";

import { describe, expect, test } from "vitest";

import type { MiTable } from "../../src/components/table/mi-table";
import type { MiTableBodyCell } from "../../src/components/table/mi-table-body-cell";
import type { MiTableHeaderCell } from "../../src/components/table/mi-table-header-cell";
import type { MiTableRow } from "../../src/components/table/mi-table-row";

async function renderTable(html: string) {
  document.body.innerHTML = html;
  await customElements.whenDefined("mi-table");
  await customElements.whenDefined("mi-table-head");
  await customElements.whenDefined("mi-table-body");
  await customElements.whenDefined("mi-table-row");
  await customElements.whenDefined("mi-table-header-cell");
  await customElements.whenDefined("mi-table-body-cell");
  const table = document.querySelector("mi-table") as MiTable;
  await table.updateComplete;
  return table;
}

describe("mi-table", () => {
  test("view属性がデフォルトでgridになる", async () => {
    const table = await renderTable(`
      <mi-table label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell>Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    expect(table.view).toBe("grid");
    expect(table.getAttribute("view")).toBe("grid");
  });

  test("view属性をlistに設定できる", async () => {
    const table = await renderTable(`
      <mi-table view="list" label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell>Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    expect(table.view).toBe("list");
  });

  test("label属性がaria-labelとして内部divに設定される", async () => {
    const table = await renderTable(`
      <mi-table label="企業一覧">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell>Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    const inner = table.shadowRoot?.querySelector('[role="table"]');
    expect(inner?.getAttribute("aria-label")).toBe("企業一覧");
  });
});

describe("mi-table-row", () => {
  test("selected属性を設定するとaria-selectedが付与される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-body>
          <mi-table-row selected>
            <mi-table-body-cell>テスト</mi-table-body-cell>
          </mi-table-row>
        </mi-table-body>
      </mi-table>
    `);

    const row = document.querySelector("mi-table-row") as MiTableRow;
    await row.updateComplete;

    expect(row.getAttribute("aria-selected")).toBe("true");
  });

  test("selectedがfalseの場合aria-selectedは付与されない", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-body>
          <mi-table-row>
            <mi-table-body-cell>テスト</mi-table-body-cell>
          </mi-table-row>
        </mi-table-body>
      </mi-table>
    `);

    const row = document.querySelector("mi-table-row") as MiTableRow;
    expect(row.getAttribute("aria-selected")).toBeNull();
  });
});

describe("mi-table-header-cell", () => {
  test("role属性がcolumnheaderに設定される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell>Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    expect(cell.getAttribute("role")).toBe("columnheader");
  });

  test("sort-state属性を設定するとsortable属性が付与される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell sort-state="default">Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;

    expect(cell.hasAttribute("sortable")).toBe(true);
  });

  test("sort-state=ascendingのときaria-sort=ascendingが設定される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell sort-state="ascending">Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;

    expect(cell.getAttribute("aria-sort")).toBe("ascending");
  });

  test("ソートボタンクリックでsort-changeイベントが発火する", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell sort-state="default">Title</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-header-cell",
    ) as MiTableHeaderCell;
    await cell.updateComplete;

    let receivedDetail: { sortState: string } | null = null;
    cell.addEventListener("sort-change", ((e: CustomEvent) => {
      receivedDetail = e.detail;
    }) as EventListener);

    const sortButton = cell.shadowRoot?.querySelector(
      ".sort-button",
    ) as HTMLButtonElement;
    sortButton.click();

    expect(receivedDetail).toEqual({ sortState: "ascending" });
  });
});

describe("mi-table-body-cell", () => {
  test("role属性がcellに設定される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-body>
          <mi-table-row>
            <mi-table-body-cell>テスト</mi-table-body-cell>
          </mi-table-row>
        </mi-table-body>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-body-cell",
    ) as MiTableBodyCell;
    expect(cell.getAttribute("role")).toBe("cell");
  });

  test("content-type属性が反映される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-body>
          <mi-table-row>
            <mi-table-body-cell content-type="number">100</mi-table-body-cell>
          </mi-table-row>
        </mi-table-body>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-body-cell",
    ) as MiTableBodyCell;
    expect(cell.getAttribute("content-type")).toBe("number");
  });

  test("空のセルにはダッシュが表示される", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-body>
          <mi-table-row>
            <mi-table-body-cell></mi-table-body-cell>
          </mi-table-row>
        </mi-table-body>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-body-cell",
    ) as MiTableBodyCell;
    await cell.updateComplete;
    // slotchange が非同期で発火するため少し待つ
    await new Promise((r) => setTimeout(r, 0));
    await cell.updateComplete;

    const shadow = cell.shadowRoot;
    expect(shadow?.textContent).toContain("\u2013");
  });

  test("コンテンツがあるセルにはダッシュが表示されない", async () => {
    await renderTable(`
      <mi-table label="テスト">
        <mi-table-body>
          <mi-table-row>
            <mi-table-body-cell>値あり</mi-table-body-cell>
          </mi-table-row>
        </mi-table-body>
      </mi-table>
    `);

    const cell = document.querySelector(
      "mi-table-body-cell",
    ) as MiTableBodyCell;
    await cell.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await cell.updateComplete;

    const shadow = cell.shadowRoot;
    expect(shadow?.textContent).not.toContain("\u2013");
  });
});
