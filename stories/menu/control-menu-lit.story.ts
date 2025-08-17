import "../../src/components/menu/control-menu/sp-control-menu-lit";
import "../../src/components/menu/control-menu-item/sp-control-menu-item-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type SpControlMenuLit } from "../../src/components/menu/control-menu/sp-control-menu-lit";

const meta = {
  component: "sp-control-menu-lit",
  argTypes: {},
  args: {},
  render: (args) => html`
    <sp-control-menu-lit>
      <sp-control-menu-item-lit text="項目1"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="項目2"
        selected
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目3"></sp-control-menu-item-lit>
    </sp-control-menu-lit>
  `,
} satisfies Meta<Partial<SpControlMenuLit>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  render: () => html`
    <sp-control-menu-lit>
      <sp-control-menu-item-lit text="ホーム"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="ダッシュボード"
        selected
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="設定"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="ヘルプ"></sp-control-menu-item-lit>
    </sp-control-menu-lit>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    <sp-control-menu-lit>
      <sp-control-menu-item-lit
        text="利用可能な項目"
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="選択された項目"
        selected
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="無効な項目"
        disabled
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="別の利用可能な項目"
      ></sp-control-menu-item-lit>
    </sp-control-menu-lit>
  `,
};

export const ManyItems: Story = {
  render: () => html`
    <sp-control-menu-lit>
      <sp-control-menu-item-lit text="項目 1"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 2"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="項目 3"
        selected
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 4"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 5"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="項目 6"
        disabled
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 7"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 8"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 9"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit text="項目 10"></sp-control-menu-item-lit>
    </sp-control-menu-lit>
  `,
};

export const LongTextItems: Story = {
  render: () => html`
    <sp-control-menu-lit>
      <sp-control-menu-item-lit text="短いテキスト"></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="これは非常に長いメニュー項目のテキストの例です。長いテキストがどのように表示されるかを確認できます。"
        selected
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="中程度の長さのメニュー項目"
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="別の長いメニュー項目の例で、複数行にわたる可能性があります"
        disabled
      ></sp-control-menu-item-lit>
    </sp-control-menu-lit>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <sp-control-menu-lit>
      <sp-control-menu-item-lit
        text="クリック可能な項目 1"
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="クリック可能な項目 2"
        selected
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="クリック可能な項目 3"
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
      <sp-control-menu-item-lit
        text="無効な項目（クリック不可）"
        disabled
        @menu-item-click=${action("menu-item-click")}
      ></sp-control-menu-item-lit>
    </sp-control-menu-lit>
  `,
};

export const DropdownExample: Story = {
  render: () => html`
    <div style="position: relative; display: inline-block;">
      <button
        style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;"
      >
        メニューを開く ▼
      </button>
      <div
        style="position: absolute; top: 100%; left: 0; margin-top: 4px; z-index: 1000;"
      >
        <sp-control-menu-lit>
          <sp-control-menu-item-lit text="新規作成"></sp-control-menu-item-lit>
          <sp-control-menu-item-lit text="編集"></sp-control-menu-item-lit>
          <sp-control-menu-item-lit text="複製"></sp-control-menu-item-lit>
          <sp-control-menu-item-lit
            text="削除"
            disabled
          ></sp-control-menu-item-lit>
        </sp-control-menu-lit>
      </div>
    </div>
  `,
};
