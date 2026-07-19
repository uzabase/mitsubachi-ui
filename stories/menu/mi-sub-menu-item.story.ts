import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-action-menu-item";
import "../../src/components/menu/mi-sub-menu-item";
import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiSubMenuItem } from "../../src/components/menu/mi-sub-menu-item";

const meta = {
  component: "mi-sub-menu-item",
  title: "Menu/mi-sub-menu-item",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "サブメニューを開くためのメニュー項目。hover または click でネストメニューを表示する。階層は最大2階層まで。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<MiSubMenuItem>;

export default meta;
type Story = StoryObj<MiSubMenuItem>;

/** 通常 */
export const Default: Story = {
  render: (args) =>
    html`<mi-sub-menu-item ?disabled=${args.disabled}>
      移動先
    </mi-sub-menu-item>`,
};

/** Disabled 状態 */
export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

/** トリガー付き実例 */
export const MenuWithTrigger: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">Actions</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-action-menu-item>編集</mi-action-menu-item>
        <mi-action-menu-item>複製</mi-action-menu-item>
        <mi-sub-menu-item>
          移動先
          <mi-menu-dropdown slot="submenu" .width=${160}>
            <mi-action-menu-item>フォルダA</mi-action-menu-item>
            <mi-action-menu-item>フォルダB</mi-action-menu-item>
            <mi-action-menu-item>フォルダC</mi-action-menu-item>
          </mi-menu-dropdown>
        </mi-sub-menu-item>
        <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};
