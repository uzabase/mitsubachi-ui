import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-col";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";
import "../../src/components/icon/index";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiTableBodyCell } from "../../src/components/table/mi-table-body-cell";

const meta = {
  component: "mi-table-body-cell",
  title: "Components/Table/mi-table-body-cell",
  tags: ["!dev-only"],
} satisfies Meta<MiTableBodyCell>;

export default meta;
type Story = StoryObj<MiTableBodyCell>;

/** content-type 一覧 */
export const ContentTypes: Story = {
  render: () => html`
    <mi-table view="grid" label="content-type 一覧">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell>text</mi-table-header-cell>
          <mi-table-header-cell>number</mi-table-header-cell>
          <mi-table-header-cell>date</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell>テキスト</mi-table-body-cell>
          <mi-table-body-cell content-type="number">1,234</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2026-07-28</mi-table-body-cell
          >
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};

/** 空セル（en dash 表示） */
export const EmptyCells: Story = {
  render: () => html`
    <mi-table view="grid" label="空セル">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell>text</mi-table-header-cell>
          <mi-table-header-cell>number</mi-table-header-cell>
          <mi-table-header-cell>date</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell></mi-table-body-cell>
          <mi-table-body-cell content-type="number"></mi-table-body-cell>
          <mi-table-body-cell content-type="date"></mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};

/** アイコン付きセル */
export const WithIcon: Story = {
  render: () => html`
    <mi-table view="grid" label="アイコン付き">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell>ファイル名</mi-table-header-cell>
          <mi-table-header-cell>ステータス</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell>
            <mi-icon slot="icon" type="globe"></mi-icon>
            レポート.pdf
          </mi-table-body-cell>
          <mi-table-body-cell>
            <mi-icon slot="icon" type="check"></mi-icon>
            完了
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell>
            <mi-icon slot="icon" type="globe"></mi-icon>
            プレゼン資料.pptx
          </mi-table-body-cell>
          <mi-table-body-cell>
            <mi-icon slot="icon" type="clock"></mi-icon>
            処理中
          </mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
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
              <mi-table-header-cell>名前</mi-table-header-cell>
              <mi-table-header-cell>部署</mi-table-header-cell>
            </mi-table-row>
          </mi-table-head>
          <mi-table-body>
            <mi-table-row>
              <mi-table-body-cell>田中太郎</mi-table-body-cell>
              <mi-table-body-cell>エンジニアリング</mi-table-body-cell>
            </mi-table-row>
          </mi-table-body>
        </mi-table>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">List</p>
        <mi-table view="list" label="List">
          <mi-table-col></mi-table-col>
          <mi-table-col></mi-table-col>
          <mi-table-head>
            <mi-table-row>
              <mi-table-header-cell>名前</mi-table-header-cell>
              <mi-table-header-cell>部署</mi-table-header-cell>
            </mi-table-row>
          </mi-table-head>
          <mi-table-body>
            <mi-table-row>
              <mi-table-body-cell>田中太郎</mi-table-body-cell>
              <mi-table-body-cell>エンジニアリング</mi-table-body-cell>
            </mi-table-row>
          </mi-table-body>
        </mi-table>
      </div>
    </div>
  `,
};
