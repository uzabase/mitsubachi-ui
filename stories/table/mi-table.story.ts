import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";
import "../../src/components/table/mi-table-col";
import "../../src/components/checkbox/mi-checkbox";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiTable } from "../../src/components/table/mi-table";
import type {
  MiTableHeaderCell,
  TableSortState,
} from "../../src/components/table/mi-table-header-cell";

const meta = {
  component: "mi-table",
  title: "Table/mi-table",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "データを行と列で表示するテーブルコンポーネントです。グリッドは比較・分析向け、リストは一覧・閲覧向け。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    view: {
      control: "select",
      options: ["grid", "list"],
      description:
        "テーブルのビューモード。グリッドは比較・分析向け、リストは一覧・閲覧向け",
    },
    label: {
      type: "string",
      description: "テーブルのアクセシブルラベル（スクリーンリーダー向け）",
    },
  },
  args: {
    view: "grid",
    label: "サンプルテーブル",
  },
} satisfies Meta<MiTable>;

export default meta;
type Story = StoryObj<MiTable>;

/* ==============================
   サンプルデータ
   ============================== */

interface SampleRow {
  id: number;
  name: string;
  text: string | null;
  revenue: number;
  ratio: string;
  date: string;
  description: string;
}

const sampleData: SampleRow[] = [
  {
    id: 1,
    name: "LabelLabelLabelLabelLabelLabelLabelLabel",
    text: "Text",
    revenue: 99,
    ratio: "99.00%",
    date: "2025/01/01",
    description: "Text",
  },
  {
    id: 2,
    name: "Text",
    text: "Text",
    revenue: 999,
    ratio: "99.00%",
    date: "2025/02/01",
    description: "Text",
  },
  {
    id: 3,
    name: "Text",
    text: "Text",
    revenue: 999,
    ratio: "99.00%",
    date: "2025/03/01",
    description: "Text",
  },
  {
    id: 4,
    name: "Label",
    text: null,
    revenue: 9999,
    ratio: "99.00%",
    date: "2025/04/01",
    description: "Text",
  },
  {
    id: 5,
    name: "Label",
    text: null,
    revenue: 9999,
    ratio: "99.00%",
    date: "2025/05/01",
    description: "Text",
  },
  {
    id: 6,
    name: "Label",
    text: null,
    revenue: 99999,
    ratio: "99.00%",
    date: "2025/06/01",
    description:
      "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText",
  },
  {
    id: 7,
    name: "Label",
    text: null,
    revenue: 99999,
    ratio: "99.00%",
    date: "2025/07/01",
    description:
      "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText",
  },
];

/* ==============================
   Grid View
   ============================== */

/**
 * グリッドビュー：行×列の二次元構造で、比較・分析に適したビュー。
 * チェックボックス、ソート、長い文字列の折り返し、
 * 選択行を含むフル機能デモ。
 */
export const GridView: Story = {
  args: { view: "grid", label: "グリッドビュー" },
  render: (args) => {
    const handleSortChange = (e: Event) => {
      const detail = (e as CustomEvent<{ sortState: TableSortState }>).detail;
      const cell = e.target as MiTableHeaderCell;
      cell.sortState = detail.sortState;
    };

    return html`
      <mi-table view=${args.view} label=${args.label}>
        <mi-table-col width="40px"></mi-table-col>
        <mi-table-col width="15%"></mi-table-col>
        <mi-table-col width="10%"></mi-table-col>
        <mi-table-col width="15%"></mi-table-col>
        <mi-table-col width="10%"></mi-table-col>
        <mi-table-col width="12%"></mi-table-col>
        <mi-table-col></mi-table-col>
        <mi-table-col width="80px"></mi-table-col>
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell content-type="checkbox" resizable>
              <mi-checkbox></mi-checkbox>
            </mi-table-header-cell>
            <mi-table-header-cell resizable>Title</mi-table-header-cell>
            <mi-table-header-cell resizable>文字列</mi-table-header-cell>
            <mi-table-header-cell
              sort-state="default"
              resizable
              @sort-change=${handleSortChange}
            >
              営業利益
            </mi-table-header-cell>
            <mi-table-header-cell
              sort-state="default"
              resizable
              @sort-change=${handleSortChange}
            >
              数字
            </mi-table-header-cell>
            <mi-table-header-cell
              sort-state="default"
              resizable
              @sort-change=${handleSortChange}
            >
              日付
            </mi-table-header-cell>
            <mi-table-header-cell resizable>
              長い文字列長い文字列長い文字列長い文字列長い文字列長い文字列
            </mi-table-header-cell>
            <mi-table-header-cell resizable>Slot</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
        <mi-table-body>
          ${sampleData.map(
            (row) => html`
              <mi-table-row ?selected=${row.id === 5}>
                <mi-table-body-cell content-type="checkbox">
                  <mi-checkbox ?checked=${row.id === 5}></mi-checkbox>
                </mi-table-body-cell>
                <mi-table-body-cell>${row.name}</mi-table-body-cell>
                <mi-table-body-cell>${row.text ?? ""}</mi-table-body-cell>
                <mi-table-body-cell content-type="number">
                  ${row.revenue.toLocaleString()}
                </mi-table-body-cell>
                <mi-table-body-cell content-type="number">
                  ${row.ratio}
                </mi-table-body-cell>
                <mi-table-body-cell content-type="date">
                  ${row.date}
                </mi-table-body-cell>
                <mi-table-body-cell>${row.description}</mi-table-body-cell>
                <mi-table-body-cell content-type="slot">
                  <button type="button" style="font-size: 12px">Slot</button>
                </mi-table-body-cell>
              </mi-table-row>
            `,
          )}
        </mi-table-body>
      </mi-table>
    `;
  },
};

/* ==============================
   List View
   ============================== */

/**
 * リストビュー：一覧形式で、閲覧・把握に適したビュー。
 * チェックボックス、ソート、選択行を含むフル機能デモ。
 */
export const ListView: Story = {
  args: { view: "list", label: "リストビュー" },
  render: (args) => {
    const handleSortChange = (e: Event) => {
      const detail = (e as CustomEvent<{ sortState: TableSortState }>).detail;
      const cell = e.target as MiTableHeaderCell;
      cell.sortState = detail.sortState;
    };

    return html`
      <mi-table view=${args.view} label=${args.label}>
        <mi-table-col width="40px"></mi-table-col>
        <mi-table-col width="20%"></mi-table-col>
        <mi-table-col width="10%"></mi-table-col>
        <mi-table-col width="15%"></mi-table-col>
        <mi-table-col width="10%"></mi-table-col>
        <mi-table-col width="12%"></mi-table-col>
        <mi-table-col></mi-table-col>
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell content-type="checkbox" resizable>
              <mi-checkbox></mi-checkbox>
            </mi-table-header-cell>
            <mi-table-header-cell resizable>Title</mi-table-header-cell>
            <mi-table-header-cell resizable>文字列</mi-table-header-cell>
            <mi-table-header-cell
              sort-state="default"
              resizable
              @sort-change=${handleSortChange}
            >
              営業利益
            </mi-table-header-cell>
            <mi-table-header-cell
              sort-state="default"
              resizable
              @sort-change=${handleSortChange}
            >
              数字
            </mi-table-header-cell>
            <mi-table-header-cell
              sort-state="default"
              resizable
              @sort-change=${handleSortChange}
            >
              日付
            </mi-table-header-cell>
            <mi-table-header-cell resizable>説明</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
        <mi-table-body>
          ${sampleData.map(
            (row) => html`
              <mi-table-row ?selected=${row.id === 5}>
                <mi-table-body-cell content-type="checkbox">
                  <mi-checkbox ?checked=${row.id === 5}></mi-checkbox>
                </mi-table-body-cell>
                <mi-table-body-cell>${row.name}</mi-table-body-cell>
                <mi-table-body-cell>${row.text ?? ""}</mi-table-body-cell>
                <mi-table-body-cell content-type="number">
                  ${row.revenue.toLocaleString()}
                </mi-table-body-cell>
                <mi-table-body-cell content-type="number">
                  ${row.ratio}
                </mi-table-body-cell>
                <mi-table-body-cell content-type="date">
                  ${row.date}
                </mi-table-body-cell>
                <mi-table-body-cell>${row.description}</mi-table-body-cell>
              </mi-table-row>
            `,
          )}
        </mi-table-body>
      </mi-table>
    `;
  },
};
