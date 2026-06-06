import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/checkbox/mi-checkbox";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiTableHeaderCell } from "../../src/components/table/mi-table-header-cell";

/** Grid ビューでラップ */
function gridWrapper(content: unknown) {
  return html`
    <mi-table view="grid" label="Header cell demo">
      <mi-table-head>
        <mi-table-row>${content}</mi-table-row>
      </mi-table-head>
    </mi-table>
  `;
}

/** List ビューでラップ */
function listWrapper(content: unknown) {
  return html`
    <mi-table view="list" label="Header cell demo">
      <mi-table-head>
        <mi-table-row>${content}</mi-table-row>
      </mi-table-head>
    </mi-table>
  `;
}

const meta = {
  component: "mi-table-header-cell",
  title: "Table/mi-table-header-cell",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "テーブルのヘッダーセルを表示するコンポーネントです。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    contentType: {
      control: "select",
      options: ["text", "checkbox", "icon-button"],
      description: "セルのコンテンツタイプ",
    },
    sortState: {
      control: "select",
      options: [undefined, "default", "ascending", "descending"],
      description: "現在のソート状態",
    },
    resizable: {
      control: "boolean",
      description: "カラム幅のリサイズを許可するかどうか",
    },
  },
} satisfies Meta<MiTableHeaderCell>;

export default meta;
type Story = StoryObj<MiTableHeaderCell>;

/* ==============================
   Grid ビュー: テキスト
   ============================== */

/** Grid: テキスト（デフォルト状態） */
export const GridTextDefault: Story = {
  render: () =>
    gridWrapper(html`<mi-table-header-cell>Title</mi-table-header-cell>`),
};

/** Grid: テキスト（Hover 状態） */
export const GridTextHover: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-header-cell sort-state="default">
        Title
      </mi-table-header-cell>`,
    ),
  parameters: { pseudo: { hover: true } },
};

/* ==============================
   Grid ビュー: ソート
   ============================== */

/** Grid: ソート可能（未ソート） */
export const GridSortDefault: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-header-cell sort-state="default">
        Title
      </mi-table-header-cell>`,
    ),
};

/** Grid: ソート昇順 */
export const GridSortAscending: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-header-cell sort-state="ascending">
        Title
      </mi-table-header-cell>`,
    ),
};

/** Grid: ソート降順 */
export const GridSortDescending: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-header-cell sort-state="descending">
        Title
      </mi-table-header-cell>`,
    ),
};

/** Grid: ソートボタン（Focus Visible 状態） */
export const GridSortFocusVisible: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-header-cell sort-state="default">
        Title
      </mi-table-header-cell>`,
    ),
  parameters: { pseudo: { focusVisible: ["button"] } },
};

/* ==============================
   Grid ビュー: チェックボックス
   ============================== */

/** Grid: チェックボックス */
export const GridCheckbox: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-header-cell content-type="checkbox">
        <mi-checkbox></mi-checkbox>
      </mi-table-header-cell>`,
    ),
};

/* ==============================
   List ビュー: テキスト
   ============================== */

/** List: テキスト（デフォルト状態） */
export const ListTextDefault: Story = {
  render: () =>
    listWrapper(html`<mi-table-header-cell>Title</mi-table-header-cell>`),
};

/** List: テキスト（Hover 状態） */
export const ListTextHover: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-header-cell sort-state="default">
        Title
      </mi-table-header-cell>`,
    ),
  parameters: { pseudo: { hover: true } },
};

/* ==============================
   List ビュー: ソート
   ============================== */

/** List: ソート可能（未ソート） */
export const ListSortDefault: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-header-cell sort-state="default">
        Title
      </mi-table-header-cell>`,
    ),
};

/** List: ソート昇順 */
export const ListSortAscending: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-header-cell sort-state="ascending">
        Title
      </mi-table-header-cell>`,
    ),
};

/** List: ソート降順 */
export const ListSortDescending: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-header-cell sort-state="descending">
        Title
      </mi-table-header-cell>`,
    ),
};

/** List: ソートボタン（Focus Visible 状態） */
export const ListSortFocusVisible: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-header-cell sort-state="default">
        Title
      </mi-table-header-cell>`,
    ),
  parameters: { pseudo: { focusVisible: ["button"] } },
};

/* ==============================
   List ビュー: チェックボックス
   ============================== */

/** List: チェックボックス */
export const ListCheckbox: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-header-cell content-type="checkbox">
        <mi-checkbox></mi-checkbox>
      </mi-table-header-cell>`,
    ),
};

/* ==============================
   カラムアクション一覧
   ============================== */

/** カラムアクション一覧（メニュー付きヘッダーの比較） */
export const ColumnActionAllStates: Story = {
  render: () => {
    const menuItems = [
      { label: "昇順でソート", onClick: () => {}, selected: false },
      { label: "降順でソート", onClick: () => {}, selected: false },
      { label: "カラムを非表示", onClick: () => {}, selected: false },
    ];

    // menuItems はプロパティなので JS で設定
    const setMenuItems = (e: Event) => {
      const cell = e.target as MiTableHeaderCell;
      if (cell.tagName === "MI-TABLE-HEADER-CELL") {
        cell.menuItems = menuItems;
      }
    };

    return html`
      <mi-table view="grid" label="カラムアクション一覧">
        <mi-table-head>
          <mi-table-row>
            <mi-table-header-cell @connectedCallback=${setMenuItems}>
              メニュー付き
            </mi-table-header-cell>
            <mi-table-header-cell sort-state="default">
              ソート+メニュー
            </mi-table-header-cell>
            <mi-table-header-cell sort-state="ascending">
              昇順+メニュー
            </mi-table-header-cell>
            <mi-table-header-cell>メニューなし</mi-table-header-cell>
          </mi-table-row>
        </mi-table-head>
      </mi-table>
    `;
  },
};
