import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-body-cell";
import "../../src/components/checkbox/mi-checkbox";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiTableBodyCell } from "../../src/components/table/mi-table-body-cell";

/** Grid ビューでラップ */
function gridWrapper(content: unknown) {
  return html`
    <mi-table view="grid" label="Body cell demo">
      <mi-table-body>
        <mi-table-row>${content}</mi-table-row>
      </mi-table-body>
    </mi-table>
  `;
}

/** List ビューでラップ */
function listWrapper(content: unknown) {
  return html`
    <mi-table view="list" label="Body cell demo">
      <mi-table-body>
        <mi-table-row>${content}</mi-table-row>
      </mi-table-body>
    </mi-table>
  `;
}

/** 選択行の Grid ラッパー */
function gridSelectedWrapper(content: unknown) {
  return html`
    <mi-table view="grid" label="Body cell demo">
      <mi-table-body>
        <mi-table-row selected>${content}</mi-table-row>
      </mi-table-body>
    </mi-table>
  `;
}

/** 選択行の List ラッパー */
function listSelectedWrapper(content: unknown) {
  return html`
    <mi-table view="list" label="Body cell demo">
      <mi-table-body>
        <mi-table-row selected>${content}</mi-table-row>
      </mi-table-body>
    </mi-table>
  `;
}

const meta = {
  component: "mi-table-body-cell",
  title: "Table/mi-table-body-cell",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "テーブルのボディセルを表示するコンポーネントです。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    contentType: {
      control: "select",
      options: ["text", "number", "date", "checkbox", "icon-button", "slot"],
      description: "セルのコンテンツタイプ。表示の配置やスタイルが変わる",
    },
  },
} satisfies Meta<MiTableBodyCell>;

export default meta;
type Story = StoryObj<MiTableBodyCell>;

/* ==============================
   Grid ビュー: テキスト
   ============================== */

/** Grid: テキスト */
export const GridText: Story = {
  render: () =>
    gridWrapper(html`<mi-table-body-cell>Label</mi-table-body-cell>`),
};

/** Grid: テキスト（Hover 状態） */
export const GridTextHover: Story = {
  render: () =>
    gridWrapper(html`<mi-table-body-cell>Label</mi-table-body-cell>`),
  parameters: { pseudo: { hover: true } },
};

/* ==============================
   Grid ビュー: 数値
   ============================== */

/** Grid: 数値 */
export const GridNumber: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell content-type="number">
        99,999
      </mi-table-body-cell>`,
    ),
};

/* ==============================
   Grid ビュー: 日付
   ============================== */

/** Grid: 日付 */
export const GridDate: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell content-type="date">
        2025/01/01
      </mi-table-body-cell>`,
    ),
};

/* ==============================
   Grid ビュー: Null
   ============================== */

/** Grid: Null 値（children なし） */
export const GridNull: Story = {
  render: () => gridWrapper(html`<mi-table-body-cell></mi-table-body-cell>`),
};

/* ==============================
   Grid ビュー: チェックボックス
   ============================== */

/** Grid: チェックボックス（未チェック） */
export const GridCheckboxUnchecked: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell content-type="checkbox">
        <mi-checkbox></mi-checkbox>
      </mi-table-body-cell>`,
    ),
};

/** Grid: チェックボックス（チェック済み） */
export const GridCheckboxChecked: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell content-type="checkbox">
        <mi-checkbox checked></mi-checkbox>
      </mi-table-body-cell>`,
    ),
};

/* ==============================
   Grid ビュー: スロット
   ============================== */

/** Grid: スロット（カスタムコンテンツ） */
export const GridSlot: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell content-type="slot">
        <button type="button" style="font-size: 12px">アクション</button>
      </mi-table-body-cell>`,
    ),
};

/* ==============================
   Grid ビュー: テキスト + アイコン
   ============================== */

/** Grid: テキスト + アイコン */
export const GridTextWithIcon: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell>
        <mi-icon slot="icon" type="person" size="20"></mi-icon>
        Label
      </mi-table-body-cell>`,
    ),
};

/** Grid: テキスト + アイコン（長いテキスト・上揃え確認用） */
export const GridTextWithIconLongText: Story = {
  render: () =>
    gridWrapper(
      html`<mi-table-body-cell>
        <mi-icon slot="icon" type="person" size="20"></mi-icon>
        LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel
      </mi-table-body-cell>`,
    ),
};

/* ==============================
   Grid ビュー: 選択行
   ============================== */

/** Grid: 選択行内のセル */
export const GridSelected: Story = {
  render: () =>
    gridSelectedWrapper(html`<mi-table-body-cell>Label</mi-table-body-cell>`),
};

/* ==============================
   List ビュー
   ============================== */

/** List: テキスト */
export const ListText: Story = {
  render: () =>
    listWrapper(html`<mi-table-body-cell>Label</mi-table-body-cell>`),
};

/** List: 数値 */
export const ListNumber: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-body-cell content-type="number">
        99,999
      </mi-table-body-cell>`,
    ),
};

/** List: Null 値 */
export const ListNull: Story = {
  render: () => listWrapper(html`<mi-table-body-cell></mi-table-body-cell>`),
};

/* ==============================
   List ビュー: テキスト + アイコン
   ============================== */

/** List: テキスト + アイコン */
export const ListTextWithIcon: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-body-cell>
        <mi-icon slot="icon" type="person" size="20"></mi-icon>
        Label
      </mi-table-body-cell>`,
    ),
};

/** List: テキスト + アイコン（長いテキスト・中央揃え確認用） */
export const ListTextWithIconLongText: Story = {
  render: () =>
    listWrapper(
      html`<mi-table-body-cell>
        <mi-icon slot="icon" type="person" size="20"></mi-icon>
        LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel
      </mi-table-body-cell>`,
    ),
};

/** List: 選択行内のセル */
export const ListSelected: Story = {
  render: () =>
    listSelectedWrapper(html`<mi-table-body-cell>Label</mi-table-body-cell>`),
};
