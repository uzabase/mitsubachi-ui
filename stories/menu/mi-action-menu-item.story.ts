import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-action-menu-item";
import "../../src/components/button/mi-neutral-button";
import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import { iconTypes } from "../../src/components/icon/icons";
import type { MiActionMenuItem } from "../../src/components/menu/mi-action-menu-item";

/** Storybook 用の型拡張 */
type MiActionMenuItemStory = MiActionMenuItem & {
  label?: string;
  iconType?: string;
  onClick?: (e: Event) => void;
};

const meta = {
  component: "mi-action-menu-item",
  title: "Components/Menu/mi-action-menu-item",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "画面遷移を伴わずに特定のアクションを実行するメニュー項目。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "danger"],
      description: "バリアント",
    },
    disabled: {
      control: "boolean",
      description: "無効化状態",
    },
    supportText: {
      control: "text",
      description: "補助テキスト",
      name: "support-text",
    },
    label: {
      control: "text",
      description: "ラベルテキスト",
    },
    iconType: {
      control: "select",
      options: ["(なし)", ...iconTypes],
      description: "アイコンの種類",
      name: "icon-type",
    },
    onClick: {
      name: "click",
      action: "click",
      description: "メニュー項目がクリックされたとき",
      table: { category: "Events" },
    },
  },
  args: {
    variant: "neutral",
    disabled: false,
    supportText: "",
    label: "編集",
    iconType: "(なし)",
    onClick: action("click"),
  },
} satisfies Meta<MiActionMenuItemStory>;

export default meta;
type Story = StoryObj<MiActionMenuItemStory>;

/** コントロールで variant / disabled / supportText / icon を切り替え可能 */
export const Default: Story = {
  render: (args) => {
    const hasIcon = args.iconType && args.iconType !== "(なし)";
    return html`
      <mi-action-menu-item
        variant=${args.variant}
        ?disabled=${args.disabled}
        support-text=${args.supportText || ""}
        @click=${args.onClick}
      >
        ${hasIcon
          ? html`<mi-icon slot="icon" type=${args.iconType}></mi-icon>`
          : nothing}
        ${args.label}
      </mi-action-menu-item>
    `;
  },
};

/** アイコン付き */
export const WithIcon: Story = {
  args: { label: "編集", iconType: "pencil-square" },
  render: Default.render,
};

/** 補助テキスト付き */
export const WithSupportText: Story = {
  args: { label: "編集", supportText: "変更は即座に反映されます" },
  render: Default.render,
};

/** アイコン + 補助テキスト */
export const WithIconAndSupportText: Story = {
  args: {
    label: "編集",
    iconType: "pencil-square",
    supportText: "変更は即座に反映されます",
  },
  render: Default.render,
};

/** Danger バリアント */
export const Danger: Story = {
  args: { variant: "danger", label: "削除", iconType: "cross" },
  render: Default.render,
};

/** 長いテキスト（折り返し確認） */
export const LongText: Story = {
  args: {
    label: "長いラベルテキスト長いラベルテキスト長いラベルテキスト",
    supportText:
      "長い補助テキスト長い補助テキスト長い補助テキスト長い補助テキスト",
  },
  render: Default.render,
};

/** 全状態一覧 */
export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <div style="inline-size: 200px;">
        <mi-action-menu-item>
          <mi-icon slot="icon" type="pencil-square"></mi-icon>
          Neutral
        </mi-action-menu-item>
        <mi-action-menu-item disabled>
          <mi-icon slot="icon" type="pencil-square"></mi-icon>
          Neutral (disabled)
        </mi-action-menu-item>
      </div>
      <div style="inline-size: 200px;">
        <mi-action-menu-item variant="danger">
          <mi-icon slot="icon" type="cross"></mi-icon>
          Danger
        </mi-action-menu-item>
        <mi-action-menu-item variant="danger" disabled>
          <mi-icon slot="icon" type="cross"></mi-icon>
          Danger (disabled)
        </mi-action-menu-item>
      </div>
    </div>
  `,
};

/** トリガー付き実例 */
export const MenuWithTrigger: Story = {
  decorators: [
    (story) => html`<div style="padding-bottom: 200px;">${story()}</div>`,
  ],
  render: (args) => html`
    <mi-menu>
      <mi-neutral-button slot="trigger">その他の操作</mi-neutral-button>
      <mi-menu-dropdown>
        <mi-action-menu-item @click=${args.onClick}>
          <mi-icon slot="icon" type="pencil-square"></mi-icon>
          編集
        </mi-action-menu-item>
        <mi-action-menu-item @click=${args.onClick}>
          <mi-icon slot="icon" type="copy"></mi-icon>
          複製
        </mi-action-menu-item>
        <mi-action-menu-item disabled @click=${args.onClick}>
          <mi-icon slot="icon" type="download"></mi-icon>
          アーカイブ
        </mi-action-menu-item>
        <mi-action-menu-item variant="danger" @click=${args.onClick}>
          <mi-icon slot="icon" type="cross"></mi-icon>
          削除
        </mi-action-menu-item>
      </mi-menu-dropdown>
    </mi-menu>
  `,
};
