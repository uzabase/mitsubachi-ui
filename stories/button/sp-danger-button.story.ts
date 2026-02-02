import "../../src/components/button/sp-danger-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import {
  dangerVariants,
  type SpDangerButton,
} from "../../src/components/button/sp-danger-button";
import { sizes } from "../../src/components/button/base-button";
import { iconTypes } from "../../src/components/icon/icons";

const meta = {
  component: "sp-danger-button",
  argTypes: {
    slot: { type: "string" },
    variant: {
      control: { type: "select" },
      options: dangerVariants,
      description: "ボタンのバリアント (primary, secondary, ghost)",
    },
    size: {
      control: { type: "select" },
      options: sizes,
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    name: { type: "string" },
    value: { type: "string" },
    iconType: {
      control: { type: "select" },
      options: ["", ...iconTypes],
    },
  },
  args: {
    slot: "削除",
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    iconType: undefined,
  },
  render: (args) => html`
    <sp-danger-button
      variant=${args.variant}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
      icon-type=${args.iconType || nothing}
    >
      ${args.slot}
    </sp-danger-button>
  `,
} satisfies Meta<SpDangerButton>;

export default meta;
type Story = StoryObj<SpDangerButton>;

export const Basic: Story = {
  args: {
    variant: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
  },
  tags: ["!dev-only"],
};

export const ALL: Story = {
  render: () => html`
    <div
      style="display:flex; flex-direction:column; gap:24px; align-items: flex-start;"
    >
      <!-- 基本パターン -->
      <table>
        <caption>
          Danger Button: 基本パターン
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${dangerVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <sp-danger-button variant="${variant}"
                    >削除</sp-danger-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <sp-danger-button variant="${variant}" disabled
                    >削除</sp-danger-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <sp-danger-button variant="${variant}" loading
                    >削除</sp-danger-button
                  >
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <!-- サイズバリエーション -->
      <table>
        <caption>
          Danger Button: サイズバリエーション
        </caption>
        <thead>
          <tr>
            <th>バリアント</th>
            ${sizes.map((size) => html`<th>${size}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${dangerVariants.map(
            (variant) =>
              html`<tr>
                <th>${variant}</th>
                ${sizes.map(
                  (size) =>
                    html`<td>
                      <sp-danger-button variant="${variant}" size="${size}"
                        >削除</sp-danger-button
                      >
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>

      <!-- アイコン付き -->
      <table>
        <caption>
          Danger Button: アイコン付き
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${dangerVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <sp-danger-button icon-type="trash" variant="${variant}">
                    削除
                  </sp-danger-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <sp-danger-button
                    icon-type="trash"
                    variant="${variant}"
                    disabled
                  >
                    削除
                  </sp-danger-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <sp-danger-button
                    icon-type="trash"
                    variant="${variant}"
                    loading
                  >
                    削除
                  </sp-danger-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "sp-danger-buttonコンポーネントの全パターンを一覧表示します。",
      },
    },
  },
};
