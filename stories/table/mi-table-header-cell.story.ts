import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-col";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiTableHeaderCell } from "../../src/components/table/mi-table-header-cell";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiTableHeaderCellStory = MiTableHeaderCell & {
  onSortChange?: (e: Event) => void;
};

const meta = {
  component: "mi-table-header-cell",
  title: "Components/Table/mi-table-header-cell",
  tags: ["!dev-only"],
  argTypes: {
    onSortChange: {
      name: "sort-change",
      action: "sort-change",
      description: "ソートボタンクリック時",
      table: { category: "Events" },
    },
  },
  args: {
    onSortChange: action("sort-change"),
  },
} satisfies Meta<MiTableHeaderCellStory>;

export default meta;
type Story = StoryObj<MiTableHeaderCellStory>;

/** テキスト（ソートなし） */
export const Default: Story = {
  render: () => html`
    <mi-table view="grid" label="ヘッダーセル例">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell>Title</mi-table-header-cell>
          <mi-table-header-cell>Title</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
    </mi-table>
  `,
};

/** ソート状態（default / ascending / descending） */
export const SortStates: Story = {
  render: (args) => html`
    <mi-table view="grid" label="ソート状態">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell
            sort="default"
            @sort-change="${args.onSortChange}"
            >Default</mi-table-header-cell
          >
          <mi-table-header-cell
            sort="ascending"
            @sort-change="${args.onSortChange}"
            >Ascending</mi-table-header-cell
          >
          <mi-table-header-cell
            sort="descending"
            @sort-change="${args.onSortChange}"
            >Descending</mi-table-header-cell
          >
        </mi-table-row>
      </mi-table-head>
    </mi-table>
  `,
};

/** Grid vs List ビュー */
export const ViewComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">Grid</p>
        <mi-table view="grid" label="Grid">
          <mi-table-col></mi-table-col>
          <mi-table-col></mi-table-col>
          <mi-table-head>
            <mi-table-row>
              <mi-table-header-cell sort="ascending"
                >Title</mi-table-header-cell
              >
              <mi-table-header-cell>Title</mi-table-header-cell>
            </mi-table-row>
          </mi-table-head>
        </mi-table>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">List</p>
        <mi-table view="list" label="List">
          <mi-table-col></mi-table-col>
          <mi-table-col></mi-table-col>
          <mi-table-head>
            <mi-table-row>
              <mi-table-header-cell sort="ascending"
                >Title</mi-table-header-cell
              >
              <mi-table-header-cell>Title</mi-table-header-cell>
            </mi-table-row>
          </mi-table-head>
        </mi-table>
      </div>
    </div>
  `,
};

/** content-type: checkbox */
export const Checkbox: Story = {
  render: () => html`
    <mi-table view="grid" label="Checkbox">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-header-cell>
          <mi-table-header-cell>Title</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
    </mi-table>
  `,
};
