import "../../src/components/button/sp-ai-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import {
  aiVariants,
  type SpAiButton,
} from "../../src/components/button/sp-ai-button";
import { sizes } from "../../src/components/button/base-button";
import { iconTypes } from "../../src/components/icon/icons";

const meta = {
  component: "sp-ai-button",
  argTypes: {
    slot: { type: "string" },
    variant: {
      control: { type: "select" },
      options: aiVariants,
      description: "ボタンのバリアント (primary, secondary)",
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
    slot: "AIで生成",
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
    <sp-ai-button
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
    </sp-ai-button>
  `,
} satisfies Meta<SpAiButton>;

export default meta;
type Story = StoryObj<SpAiButton>;

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
          AI Button: 基本パターン
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${aiVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <sp-ai-button variant="${variant}">AIで生成</sp-ai-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <sp-ai-button variant="${variant}" disabled
                    >AIで生成</sp-ai-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <sp-ai-button variant="${variant}" loading
                    >AIで生成</sp-ai-button
                  >
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <!-- サイズバリエーション -->
      <table>
        <caption>
          AI Button: サイズバリエーション
        </caption>
        <thead>
          <tr>
            <th>バリアント</th>
            ${sizes.map((size) => html`<th>${size}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${aiVariants.map(
            (variant) =>
              html`<tr>
                <th>${variant}</th>
                ${sizes.map(
                  (size) =>
                    html`<td>
                      <sp-ai-button variant="${variant}" size="${size}"
                        >AIで生成</sp-ai-button
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
          AI Button: アイコン付き
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${aiVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <sp-ai-button icon-type="magic-fill" variant="${variant}">
                    AIで生成
                  </sp-ai-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <sp-ai-button
                    icon-type="magic-fill"
                    variant="${variant}"
                    disabled
                  >
                    AIで生成
                  </sp-ai-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <sp-ai-button
                    icon-type="magic-fill"
                    variant="${variant}"
                    loading
                  >
                    AIで生成
                  </sp-ai-button>
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
        story: "sp-ai-buttonコンポーネントの全パターンを一覧表示します。",
      },
    },
  },
};
