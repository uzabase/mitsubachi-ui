import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-link-menu-item";
import "../../src/components/button/mi-neutral-button";
import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import { iconTypes } from "../../src/components/icon/icons";
import type { MiLinkMenuItem } from "../../src/components/menu/mi-link-menu-item";

/** Storybook 用の型拡張 */
type MiLinkMenuItemStory = MiLinkMenuItem & {
  label?: string;
  iconType?: string;
};

const meta = {
  component: "mi-link-menu-item",
  title: "Menu/mi-link-menu-item",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "別のページや画面に遷移するためのメニュー項目。new-window で外部リンクアイコンが表示される。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    href: { control: "text", description: "リンク先URL" },
    newWindow: {
      control: "boolean",
      description: "新しいウィンドウで開く",
      name: "new-window",
    },
    supportText: {
      control: "text",
      description: "補助テキスト",
      name: "support-text",
    },
    label: { control: "text", description: "ラベルテキスト" },
    iconType: {
      control: "select",
      options: ["(なし)", ...iconTypes],
      description: "アイコンの種類",
      name: "icon-type",
    },
  },
  args: {
    href: "/settings",
    newWindow: false,
    supportText: "",
    label: "設定",
    iconType: "(なし)",
  },
} satisfies Meta<MiLinkMenuItemStory>;

export default meta;
type Story = StoryObj<MiLinkMenuItemStory>;

/** コントロールで href / new-window / supportText / icon を切り替え可能 */
export const Default: Story = {
  render: (args) => {
    const hasIcon = args.iconType && args.iconType !== "(なし)";
    return html`
      <mi-link-menu-item
        href=${args.href}
        ?new-window=${args.newWindow}
        support-text=${args.supportText || ""}
      >
        ${hasIcon
          ? html`<mi-icon slot="icon" type=${args.iconType}></mi-icon>`
          : nothing}
        ${args.label}
      </mi-link-menu-item>
    `;
  },
};

/** 新しいウィンドウで開く */
export const NewWindow: Story = {
  args: {
    href: "https://example.com",
    newWindow: true,
    label: "ヘルプセンター",
  },
  render: Default.render,
};

/** アイコン付き */
export const WithIcon: Story = {
  args: { label: "設定", iconType: "gear" },
  render: Default.render,
};

/** 補助テキスト付き */
export const WithSupportText: Story = {
  args: { label: "設定", supportText: "アカウント設定を変更" },
  render: Default.render,
};

/** カスタムコンテンツ（slot） */
export const SlotContent: Story = {
  render: () => html`
    <mi-link-menu-item href="/dashboard">
      <div style="display: flex; align-items: center; gap: 8px;">
        <mi-icon type="home"></mi-icon>
        <div>
          <div style="font-size: 14px;">ダッシュボード</div>
          <div style="font-size: 12px; color: rgba(0,0,0,0.54);">
            最終更新: 2025/06/01
          </div>
        </div>
      </div>
    </mi-link-menu-item>
  `,
};

/** トリガー付き実例 */
export const MenuWithTrigger: Story = {
  render: () => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">リンクメニュー</mi-neutral-button>
      <mi-menu-dropdown .width=${240}>
        <mi-link-menu-item href="/settings">
          <mi-icon slot="icon" type="gear"></mi-icon>
          設定
        </mi-link-menu-item>
        <mi-link-menu-item href="/profile">
          <mi-icon slot="icon" type="person"></mi-icon>
          プロフィール
        </mi-link-menu-item>
        <mi-link-menu-item
          href="https://example.com"
          new-window
          support-text="外部サイトが開きます"
        >
          ヘルプセンター
        </mi-link-menu-item>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};
