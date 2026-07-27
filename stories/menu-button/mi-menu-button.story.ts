import "../../src/components/menu-button/mi-menu-button";
import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-action-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import { iconTypes } from "../../src/components/icon/icons";
import {
  type MiMenuButton,
  sizes,
  variants,
} from "../../src/components/menu-button/mi-menu-button";

const meta = {
  component: "mi-menu-button",
  title: "Components/Button/mi-menu-button",
  parameters: {
    docs: {
      description: {
        component:
          "メニューを開くためのトリガーボタン。mi-menu の trigger スロットに配置して使用します。",
      },
    },
  },
  argTypes: {
    slot: { type: "string" },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    size: {
      control: { type: "select" },
      options: sizes,
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    iconType: {
      control: { type: "select" },
      options: ["", ...iconTypes],
    },
  },
  args: {
    slot: "メニュー",
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    iconType: undefined,
  },
  render: (args) => html`
    <mi-menu-button
      variant=${args.variant}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      icon-type=${args.iconType || nothing}
    >
      ${args.slot}
    </mi-menu-button>
  `,
} satisfies Meta<MiMenuButton>;

export default meta;
type Story = StoryObj<MiMenuButton>;

export const Basic: Story = {
  args: {
    variant: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
  },
  tags: ["!dev-only"],
};

export const WithMenu: Story = {
  name: "WithMenu",
  render: () => html`
    <mi-menu>
      <mi-menu-button slot="trigger" variant="secondary">
        アクション
      </mi-menu-button>
      <mi-menu-dropdown>
        <mi-action-menu-item>編集</mi-action-menu-item>
        <mi-action-menu-item>複製</mi-action-menu-item>
        <mi-action-menu-item variant="danger">削除</mi-action-menu-item>
      </mi-menu-dropdown>
    </mi-menu>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "mi-menu の trigger スロットに mi-menu-button を配置し、クリックでドロップダウンメニューを表示します。",
      },
      story: { height: "250px" },
    },
  },
};

export const WithIcon: Story = {
  name: "WithIcon",
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <mi-menu-button icon-type="download" variant="primary">
        ダウンロード
      </mi-menu-button>
      <mi-menu-button icon-type="person" variant="secondary">
        ユーザー
      </mi-menu-button>
      <mi-menu-button icon-type="search" variant="ghost">検索</mi-menu-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "icon-type 属性で先頭にアイコンを表示できます。右端の chevron アイコンは常に表示されます。",
      },
    },
  },
};

export const ALL: Story = {
  render: () => html`
    <div
      style="display:flex; flex-direction:column; gap:32px; align-items: flex-start;"
    >
      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          バリアント × 状態
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-menu-button variant="${variant}">メニュー</mi-menu-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-menu-button variant="${variant}" disabled>
                    メニュー
                  </mi-menu-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-menu-button variant="${variant}" loading>
                    メニュー
                  </mi-menu-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          バリアント × サイズ
        </caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${variants.map(
                  (variant) =>
                    html`<td>
                      <mi-menu-button variant="${variant}" size="${size}">
                        メニュー
                      </mi-menu-button>
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          アイコン付き: バリアント × サイズ
        </caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${variants.map(
                  (variant) =>
                    html`<td>
                      <mi-menu-button
                        icon-type="download"
                        variant="${variant}"
                        size="${size}"
                      >
                        ダウンロード
                      </mi-menu-button>
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "mi-menu-button の全パターンを一覧表示します。バリアント・状態・サイズ・アイコンの有無など、利用可能な全ての組み合わせを確認できます。",
      },
    },
  },
};
