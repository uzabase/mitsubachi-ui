import "../../src/components/table/mi-table";
import "../../src/components/table/mi-table-head";
import "../../src/components/table/mi-table-body";
import "../../src/components/table/mi-table-row";
import "../../src/components/table/mi-table-col";
import "../../src/components/table/mi-table-header-cell";
import "../../src/components/table/mi-table-body-cell";
import "../../src/components/checkbox/mi-checkbox";
import "../../src/components/button/mi-neutral-button";
import "../../src/components/button/mi-icon-button";
import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiTable } from "../../src/components/table/mi-table";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiTableStory = MiTable & {
  onSortChange?: (e: Event) => void;
};

const meta = {
  component: "mi-table",
  title: "Components/Table/mi-table",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "テーブルコンポーネント群。`view` プロパティで Grid / List ビューを切り替えられる。ソート可能なヘッダーセルは `sort-state` を設定すると有効になる。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    view: {
      control: "select",
      options: ["grid", "list"],
      description: "ビューモード",
    },
    onSortChange: {
      name: "sort-change",
      action: "sort-change",
      description: "ソートボタンクリック時",
      table: { category: "Events" },
    },
  },
  args: {
    view: "grid",
    onSortChange: action("sort-change"),
  },
} satisfies Meta<MiTableStory>;

export default meta;
type Story = StoryObj<MiTableStory>;

/** Grid ビュー（デフォルト） */
export const Grid: Story = {
  render: (args) => html`
    <mi-table view="${args.view}" label="サンプルテーブル">
      <mi-table-col width="40px"></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col width="100px"></mi-table-col>
      <mi-table-col width="160px"></mi-table-col>
      <mi-table-col width="100px"></mi-table-col>
      <mi-table-col width="120px"></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col width="120px"></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-header-cell>
          <mi-table-header-cell>Title</mi-table-header-cell>
          <mi-table-header-cell>
            文字列
            <mi-icon-button
              slot="action"
              icon-type="menu"
              variant="ghost"
              size="small"
              aria-label="カラムメニュー"
            ></mi-icon-button>
          </mi-table-header-cell>
          <mi-table-header-cell
            sort-state="descending"
            @sort-change="${args.onSortChange}"
          >
            営業利益
            <mi-icon-button
              slot="action"
              icon-type="menu"
              variant="ghost"
              size="small"
              aria-label="カラムメニュー"
            ></mi-icon-button>
          </mi-table-header-cell>
          <mi-table-header-cell
            sort-state="default"
            @sort-change="${args.onSortChange}"
            >数字</mi-table-header-cell
          >
          <mi-table-header-cell
            sort-state="default"
            @sort-change="${args.onSortChange}"
            >日付</mi-table-header-cell
          >
          <mi-table-header-cell
            sort-state="default"
            @sort-change="${args.onSortChange}"
            >長い文字列長い文字列長い文字列長い文字列長い文字列長い文字列</mi-table-header-cell
          >
          <mi-table-header-cell
            >ボタンなどのコンポーネントやリッチテキスト</mi-table-header-cell
          >
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">
            <mi-icon slot="icon" type="building"></mi-icon>
            Text
          </mi-table-body-cell>
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">
            <mi-icon slot="icon" type="building"></mi-icon>
            Text
          </mi-table-body-cell>
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="number">999</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">
            <mi-icon slot="icon" type="building"></mi-icon>
            Text
          </mi-table-body-cell>
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="number">999</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">Text</mi-table-body-cell>
          <mi-table-body-cell></mi-table-body-cell>
          <mi-table-body-cell content-type="number">9,999</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row selected>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox checked></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">Text</mi-table-body-cell>
          <mi-table-body-cell></mi-table-body-cell>
          <mi-table-body-cell content-type="number">9,999</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell>Text</mi-table-body-cell>
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">
            <mi-icon slot="icon" type="building"></mi-icon>
            TextTextTextTextText
          </mi-table-body-cell>
          <mi-table-body-cell></mi-table-body-cell>
          <mi-table-body-cell content-type="number">99,999</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell
            >TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</mi-table-body-cell
          >
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell content-type="title">Text</mi-table-body-cell>
          <mi-table-body-cell></mi-table-body-cell>
          <mi-table-body-cell content-type="number">99,999</mi-table-body-cell>
          <mi-table-body-cell content-type="number">99.00%</mi-table-body-cell>
          <mi-table-body-cell content-type="date"
            >2025/00/00</mi-table-body-cell
          >
          <mi-table-body-cell
            >TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</mi-table-body-cell
          >
          <mi-table-body-cell content-type="slot">
            <mi-neutral-button variant="secondary" size="medium"
              >Slot</mi-neutral-button
            >
          </mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};

/** List ビュー */
export const List: Story = {
  args: {
    view: "list",
  },
  render: (args) => html`
    <mi-table view="${args.view}" label="ユーザー一覧">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell
            sort-state="ascending"
            @sort-change="${args.onSortChange}"
            >名前</mi-table-header-cell
          >
          <mi-table-header-cell>部署</mi-table-header-cell>
          <mi-table-header-cell>メールアドレス</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell>田中太郎</mi-table-body-cell>
          <mi-table-body-cell>エンジニアリング</mi-table-body-cell>
          <mi-table-body-cell>tanaka@example.com</mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell>鈴木花子</mi-table-body-cell>
          <mi-table-body-cell>マーケティング</mi-table-body-cell>
          <mi-table-body-cell>suzuki@example.com</mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};

/** チェックボックス付き + 選択状態 */
export const WithCheckbox: Story = {
  render: (args) => html`
    <mi-table view="${args.view}" label="ユーザー一覧">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-header-cell>
          <mi-table-header-cell
            sort-state="default"
            @sort-change="${args.onSortChange}"
            >名前</mi-table-header-cell
          >
          <mi-table-header-cell>部署</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row selected>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox checked></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell>田中太郎</mi-table-body-cell>
          <mi-table-body-cell>エンジニアリング</mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell content-type="checkbox">
            <mi-checkbox></mi-checkbox>
          </mi-table-body-cell>
          <mi-table-body-cell>鈴木花子</mi-table-body-cell>
          <mi-table-body-cell>マーケティング</mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};

/** 空セルの表示（en dash） */
export const EmptyCells: Story = {
  render: (args) => html`
    <mi-table view="${args.view}" label="データ一覧">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell>名前</mi-table-header-cell>
          <mi-table-header-cell>値</mi-table-header-cell>
          <mi-table-header-cell>備考</mi-table-header-cell>
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell>項目A</mi-table-body-cell>
          <mi-table-body-cell content-type="number">100</mi-table-body-cell>
          <mi-table-body-cell>テスト</mi-table-body-cell>
        </mi-table-row>
        <mi-table-row>
          <mi-table-body-cell>項目B</mi-table-body-cell>
          <mi-table-body-cell content-type="number"></mi-table-body-cell>
          <mi-table-body-cell></mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};

/** ソート状態の切り替え */
export const SortStates: Story = {
  render: (args) => html`
    <mi-table view="${args.view}" label="ソート確認">
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-col></mi-table-col>
      <mi-table-head>
        <mi-table-row>
          <mi-table-header-cell
            sort-state="default"
            @sort-change="${args.onSortChange}"
            >未ソート</mi-table-header-cell
          >
          <mi-table-header-cell
            sort-state="ascending"
            @sort-change="${args.onSortChange}"
            >昇順</mi-table-header-cell
          >
          <mi-table-header-cell
            sort-state="descending"
            @sort-change="${args.onSortChange}"
            >降順</mi-table-header-cell
          >
        </mi-table-row>
      </mi-table-head>
      <mi-table-body>
        <mi-table-row>
          <mi-table-body-cell>データ1</mi-table-body-cell>
          <mi-table-body-cell>データ2</mi-table-body-cell>
          <mi-table-body-cell>データ3</mi-table-body-cell>
        </mi-table-row>
      </mi-table-body>
    </mi-table>
  `,
};
