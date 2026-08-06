import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-select-menu-item";
import "../../src/components/menu/mi-menu-radio-group";
import "../../src/components/button/mi-neutral-button";
import "../../src/components/select-box/mi-select-box";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiSelectMenuItem } from "../../src/components/menu/mi-select-menu-item";

const meta = {
  component: "mi-select-menu-item",
  title: "Components/Menu/mi-select-menu-item",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "選択状態を持つメニュー項目。mi-menu-radio-group 内で単一選択として動作する。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
    supportText: { control: "text", name: "support-text" },
  },
  args: {
    disabled: false,
    supportText: "",
  },
} satisfies Meta<MiSelectMenuItem>;

export default meta;
type Story = StoryObj<MiSelectMenuItem>;

/** 未選択 */
export const Default: Story = {
  render: (args) => html`
    <mi-menu-radio-group value="">
      <mi-select-menu-item
        value="item"
        ?disabled=${args.disabled}
        support-text=${args.supportText || ""}
      >
        営業
      </mi-select-menu-item>
    </mi-menu-radio-group>
  `,
};

/** 選択済み */
export const Selected: Story = {
  render: (args) => html`
    <mi-menu-radio-group value="item">
      <mi-select-menu-item
        value="item"
        ?disabled=${args.disabled}
        support-text=${args.supportText || ""}
      >
        営業
      </mi-select-menu-item>
    </mi-menu-radio-group>
  `,
};

/** Disabled（未選択） */
export const Disabled: Story = {
  render: () => html`
    <mi-menu-radio-group value="">
      <mi-select-menu-item value="item" disabled>
        マーケティング・広報
      </mi-select-menu-item>
    </mi-menu-radio-group>
  `,
};

/** Disabled（選択済み） */
export const DisabledSelected: Story = {
  render: () => html`
    <mi-menu-radio-group value="item">
      <mi-select-menu-item value="item" disabled>
        マーケティング・広報
      </mi-select-menu-item>
    </mi-menu-radio-group>
  `,
};

/** 全状態一覧 */
export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <div style="inline-size: 200px;">
        <h4 style="margin: 0 0 8px;">未選択</h4>
        <mi-menu-radio-group value="">
          <mi-select-menu-item value="a">通常</mi-select-menu-item>
          <mi-select-menu-item value="b" disabled> 無効 </mi-select-menu-item>
        </mi-menu-radio-group>
      </div>
      <div style="inline-size: 200px;">
        <h4 style="margin: 0 0 8px;">選択済み</h4>
        <mi-menu-radio-group value="a">
          <mi-select-menu-item value="a">通常</mi-select-menu-item>
          <mi-select-menu-item value="b" disabled> 無効 </mi-select-menu-item>
        </mi-menu-radio-group>
      </div>
    </div>
  `,
};

/**
 * トリガーのラベルは固定で、チェックマークで現在の選択状態を示すパターン。
 * 言語切り替えやフィルタ設定など、「現在どれが有効か」を伝える用途に使います。
 */
export const FixedTriggerLabel: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">言語</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-menu-radio-group value="ja">
          <mi-select-menu-item value="ja">日本語</mi-select-menu-item>
          <mi-select-menu-item value="en">English</mi-select-menu-item>
          <mi-select-menu-item value="zh">中文</mi-select-menu-item>
        </mi-menu-radio-group>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};

/**
 * 選択した値をトリガーに表示するパターン。
 * 値の選択が目的の場合は mi-select-box と組み合わせて使います。
 * mi-select-box は選択結果を自動でトリガーに反映します。
 */
export const ValueReflectedToTrigger: Story = {
  render: () => html`
    <div style="width: 240px;">
      <mi-menu>
        <mi-select-box slot="trigger" placeholder="部署を選択"></mi-select-box>
        <mi-menu-dropdown>
          <mi-menu-radio-group value="">
            <mi-select-menu-item value="sales">営業</mi-select-menu-item>
            <mi-select-menu-item value="marketing">
              マーケティング・広報
            </mi-select-menu-item>
            <mi-select-menu-item value="engineering">
              エンジニアリング
            </mi-select-menu-item>
          </mi-menu-radio-group>
        </mi-menu-dropdown>
      </mi-menu>
    </div>
  `,
};

/**
 * mi-menu-radio-group の `change` イベントを Actions パネルで確認できます。
 * 項目をクリックすると `detail.value` に選択された値が記録されます。
 */
export const Events: Story = {
  render: () => html`
    <mi-menu-radio-group value="sales" @change=${action("change")}>
      <mi-select-menu-item value="sales">営業</mi-select-menu-item>
      <mi-select-menu-item value="marketing">
        マーケティング・広報
      </mi-select-menu-item>
      <mi-select-menu-item value="engineering">
        エンジニアリング
      </mi-select-menu-item>
      <mi-select-menu-item value="hr">人事</mi-select-menu-item>
    </mi-menu-radio-group>
  `,
};
