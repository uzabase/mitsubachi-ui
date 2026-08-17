import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-col";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiTableRow } from "../../src/components/table/mi-table-row";

const meta = {
  component: "mi-table-row",
  title: "Components/Table/mi-table-row",
  tags: ["!dev-only"],
} satisfies Meta<MiTableRow>;

export default meta;
type Story = StoryObj<MiTableRow>;

/** 通常行 + 選択行 */
export const SelectedRow: Story = {
  render: () => html`
    <mi-table view="grid" label="選択状態">
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
          <mi-table-body-cell>通常行</mi-table-body-cell>
          <mi-table-body-cell>エンジニアリング</mi-table-body-cell>
        </mi-table-row>
        <mi-table-row selected>
          <mi-table-body-cell>選択行</mi-table-body-cell>
          <mi-table-body-cell>マーケティング</mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell>通常行</mi-table-body-cell>
          <mi-table-body-cell>営業</mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};
