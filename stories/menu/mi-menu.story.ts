import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-menu-group";
import "../../src/components/menu/mi-action-menu-item";
import "../../src/components/menu/mi-link-menu-item";
import "../../src/components/menu/mi-select-menu-item";
import "../../src/components/menu/mi-menu-radio-group";
import "../../src/components/menu/mi-sub-menu-item";
import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiMenu } from "../../src/components/menu/mi-menu";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiMenuStory = MiMenu & {
  onChange?: (e: Event) => void;
};

const meta = {
  component: "mi-menu",
  title: "Components/Menu/mi-menu",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "トリガー要素のクリックで開き、外側クリックまたは ESC で閉じるドロップダウンメニュー。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    open: {
      control: "boolean",
      description: "開閉状態",
    },
    onChange: {
      name: "change",
      action: "change",
      description: "ラジオグループの選択値が変更されたとき",
      table: { category: "Events" },
    },
  },
  args: {
    onChange: action("change"),
  },
} satisfies Meta<MiMenuStory>;

export default meta;
type Story = StoryObj<MiMenuStory>;

/** 基本的なメニュー */
export const Default: Story = {
  render: () => html`
    <mi-menu-dropdown position-static open>
      <mi-action-menu-item>編集</mi-action-menu-item>
      <mi-action-menu-item>複製</mi-action-menu-item>
      <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
    </mi-menu-dropdown>
  `,
};

/** グループ付きメニュー */
export const WithGroups: Story = {
  render: () => html`
    <mi-menu-dropdown position-static open>
      <mi-menu-group>
        <mi-action-menu-item>編集</mi-action-menu-item>
        <mi-action-menu-item>複製</mi-action-menu-item>
      </mi-menu-group>
      <mi-menu-group>
        <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
      </mi-menu-group>
    </mi-menu-dropdown>
  `,
};

/** グループラベル付きメニュー */
export const WithGroupLabels: Story = {
  render: () => html`
    <mi-menu-dropdown position-static open>
      <mi-menu-group label="編集操作">
        <mi-action-menu-item>編集</mi-action-menu-item>
        <mi-action-menu-item>複製</mi-action-menu-item>
      </mi-menu-group>
      <mi-menu-group label="その他">
        <mi-action-menu-item>エクスポート</mi-action-menu-item>
        <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
      </mi-menu-group>
    </mi-menu-dropdown>
  `,
};

/** 各種メニューアイテムの混在 */
export const MixedItems: Story = {
  render: () => html`
    <mi-menu-dropdown position-static open .width=${240}>
      <mi-menu-group>
        <mi-link-menu-item href="/settings">設定</mi-link-menu-item>
        <mi-link-menu-item href="https://example.com" new-window>
          ヘルプセンター
        </mi-link-menu-item>
      </mi-menu-group>
      <mi-menu-group>
        <mi-action-menu-item variant="danger"> ログアウト </mi-action-menu-item>
      </mi-menu-group>
    </mi-menu-dropdown>
  `,
};

/** サブメニュー */
export const WithSubMenu: Story = {
  render: () => html`
    <mi-menu-dropdown position-static open>
      <mi-action-menu-item>編集</mi-action-menu-item>
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
  `,
};

/** ラジオグループ（単一選択） */
export const WithRadioGroup: Story = {
  render: (args) => html`
    <mi-menu-dropdown position-static open>
      <mi-menu-radio-group value="ja" @change=${args.onChange}>
        <mi-select-menu-item value="ja">日本語</mi-select-menu-item>
        <mi-select-menu-item value="en">English</mi-select-menu-item>
        <mi-select-menu-item value="zh">中文</mi-select-menu-item>
      </mi-menu-radio-group>
    </mi-menu-dropdown>
  `,
};

/** 長いリスト（スクロール確認） */
export const LongList: Story = {
  render: () => html`
    <mi-menu-dropdown position-static open>
      ${Array.from(
        { length: 20 },
        (_, i) =>
          html`<mi-action-menu-item>
            メニュー項目 ${i + 1}
          </mi-action-menu-item>`,
      )}
    </mi-menu-dropdown>
  `,
};

/** トリガー付きの実例 */
export const WithTrigger: Story = {
  decorators: [
    (story) => html`<div style="padding-bottom: 200px;">${story()}</div>`,
  ],
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">Actions</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-action-menu-item>編集</mi-action-menu-item>
        <mi-action-menu-item>複製</mi-action-menu-item>
        <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};
