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

import type { MiMenu } from "../../src/components/menu/mi-menu";

const meta = {
  component: "mi-menu",
  title: "Menu/mi-menu",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "トリガー要素のクリックで開き、外側クリックまたは ESC で閉じるドロップダウンメニュー。",
      },
    },
  },
  decorators: [
    (story) => html`<div style="padding-bottom: 200px;">${story()}</div>`,
  ],
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    open: {
      control: "boolean",
      description: "開閉状態",
    },
  },
} satisfies Meta<MiMenu>;

export default meta;
type Story = StoryObj<MiMenu>;

/** 基本的なメニュー */
export const Default: Story = {
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

/** グループ付きメニュー */
export const WithGroups: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">Actions</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-menu-group>
          <mi-action-menu-item>編集</mi-action-menu-item>
          <mi-action-menu-item>複製</mi-action-menu-item>
        </mi-menu-group>
        <mi-menu-group>
          <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
        </mi-menu-group>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};

/** グループラベル付きメニュー */
export const WithGroupLabels: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">Actions</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-menu-group label="編集操作">
          <mi-action-menu-item>編集</mi-action-menu-item>
          <mi-action-menu-item>複製</mi-action-menu-item>
        </mi-menu-group>
        <mi-menu-group label="その他">
          <mi-action-menu-item>エクスポート</mi-action-menu-item>
          <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
        </mi-menu-group>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};

/** 各種メニューアイテムの混在 */
export const MixedItems: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">ユーザーメニュー</mi-neutral-button>
      <mi-menu-dropdown .width=${240}>
        <mi-menu-group>
          <mi-link-menu-item href="/settings">設定</mi-link-menu-item>
          <mi-link-menu-item href="https://example.com" new-window>
            ヘルプセンター
          </mi-link-menu-item>
        </mi-menu-group>
        <mi-menu-group>
          <mi-action-menu-item variant="danger">
            ログアウト
          </mi-action-menu-item>
        </mi-menu-group>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};

/** サブメニュー */
export const WithSubMenu: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">Actions</mi-neutral-button>
      <mi-menu-dropdown>
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
    </mi-menu>
  `,
};

/** ラジオグループ（単一選択） */
export const WithRadioGroup: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">部署を選択</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-menu-radio-group value="sales">
          <mi-select-menu-item value="sales">営業</mi-select-menu-item>
          <mi-select-menu-item value="marketing">
            マーケティング・広報
          </mi-select-menu-item>
          <mi-select-menu-item value="engineering">
            エンジニアリング
          </mi-select-menu-item>
          <mi-select-menu-item value="hr">人事</mi-select-menu-item>
        </mi-menu-radio-group>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};

/** 任意選択ラジオグループ（「指定なし」付き） */
export const WithOptionalRadioGroup: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">部署を選択</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-menu-radio-group value="">
          <mi-select-menu-item value="">指定なし</mi-select-menu-item>
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
  `,
};

/** 長いリスト（スクロール確認） */
export const LongList: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">Long list</mi-neutral-button>
      <mi-menu-dropdown>
        ${Array.from(
          { length: 20 },
          (_, i) =>
            html`<mi-action-menu-item>
              メニュー項目 ${i + 1}
            </mi-action-menu-item>`,
        )}
      </mi-menu-dropdown>
    </mi-menu>
  `,
};
