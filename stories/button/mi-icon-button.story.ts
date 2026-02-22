import "../../src/components/button/mi-icon-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import type { MiIconButton } from "../../src/components/button/mi-icon-button";
import {
  iconButtonSizes,
  iconButtonVariants,
} from "../../src/components/button/mi-icon-button";
import { iconTypes } from "../../src/components/icon/icons";

const meta = {
  component: "mi-icon-button",
  title: "Button/mi-icon-button",
  parameters: {
    docs: {
      description: {
        component:
          "テキストを持たず、アイコンのみで操作を表現するコンパクトなボタンです。必ずツールチップで意味を補完してください。",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: iconButtonVariants,
    },
    size: {
      control: { type: "select" },
      options: iconButtonSizes,
    },
    iconType: {
      control: { type: "select" },
      options: iconTypes,
    },
    selected: { type: "boolean" },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    name: { type: "string" },
    value: { type: "string" },
  },
  args: {
    variant: "ghost",
    size: "medium",
    iconType: "search",
    selected: false,
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    type: "button",
  },
  render: (args) => html`
    <mi-icon-button
      variant=${args.variant}
      size=${args.size}
      icon-type=${args.iconType}
      ?selected=${args.selected}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
      type=${args.type || nothing}
    ></mi-icon-button>
  `,
} satisfies Meta<MiIconButton>;

export default meta;
type Story = StoryObj<MiIconButton>;

export const Basic: Story = {
  args: {
    variant: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
    selected: undefined,
  },
  tags: ["!dev-only"],
};

export const ALL: Story = {
  render: () => html`
    <div
      style="display:flex; flex-direction:column; gap:32px; align-items: flex-start;"
    >
      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">バリアント × 状態</caption>
        <thead>
          <tr>
            <th>状態</th>
            ${iconButtonVariants.map((v) => html`<th>${v}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button variant="${v}" icon-type="search"></mi-icon-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>選択中</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button variant="${v}" icon-type="search" selected></mi-icon-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button variant="${v}" icon-type="search" disabled></mi-icon-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${iconButtonVariants.map(
              (v) =>
                html`<td>
                  <mi-icon-button variant="${v}" icon-type="search" loading></mi-icon-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">バリアント × サイズ</caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${iconButtonVariants.map((v) => html`<th>${v}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${iconButtonSizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${iconButtonVariants.map(
                  (v) =>
                    html`<td>
                      <mi-icon-button
                        variant="${v}"
                        size="${size}"
                        icon-type="search"
                      ></mi-icon-button>
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
          "mi-icon-buttonコンポーネントの全パターンを一覧表示します。",
      },
    },
  },
};
