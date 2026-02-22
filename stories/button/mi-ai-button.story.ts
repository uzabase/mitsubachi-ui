import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import type { MiAiButton } from "../../src/components/button/mi-ai-button";
import { aiVariants, sizes } from "../../src/components/button/mi-ai-button";

const meta = {
  component: "mi-ai-button",
  title: "Button/mi-ai-button",
  parameters: {
    docs: {
      description: {
        component:
          "AI 機能の起動などに使う AI ボタンです。常に AI 用スタイルで表示されます。",
      },
    },
  },
  argTypes: {
    slot: { type: "string" },
    variant: {
      control: { type: "select" },
      options: aiVariants,
    },
    size: {
      control: { type: "select" },
      options: sizes,
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    selected: { table: { disable: true } },
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
    slot: "AIで生成",
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    type: "button",
  },
  render: (args) => html`
    <mi-ai-button
      variant=${args.variant}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
      type=${args.type || nothing}
    >
      ${args.slot}
    </mi-ai-button>
  `,
} satisfies Meta<MiAiButton>;

export default meta;
type Story = StoryObj<MiAiButton>;

export const Basic: Story = {
  args: {
    variant: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
  },
  tags: ["!dev-only"],
};

export const FullWidth: Story = {
  render: () => html`
    <mi-ai-button style="width: 100%;">AIで生成</mi-ai-button>
    <div style="width: 400px;">
      <mi-ai-button style="width: 100%;">AIで生成</mi-ai-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "ボタンの幅を100%にしたい時はWeb Componentsのデフォルトのスタイルを上書きしてください。",
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
            ${aiVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <mi-ai-button variant="${variant}">AIで生成</mi-ai-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <mi-ai-button variant="${variant}" disabled
                    >AIで生成</mi-ai-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <mi-ai-button variant="${variant}" loading
                    >AIで生成</mi-ai-button
                  >
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
            ${aiVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${aiVariants.map(
                  (variant) =>
                    html`<td>
                      <mi-ai-button variant="${variant}" size="${size}"
                        >AIで生成</mi-ai-button
                      >
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          アイコン付き: バリアント × 状態
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
                  <mi-ai-button icon-type="magic" variant="${variant}">
                    AIで生成
                  </mi-ai-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <mi-ai-button icon-type="magic" variant="${variant}" disabled>
                    AIで生成
                  </mi-ai-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${aiVariants.map(
              (variant) =>
                html`<td>
                  <mi-ai-button icon-type="magic" variant="${variant}" loading>
                    AIで生成
                  </mi-ai-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          アイコン付き: バリアント × サイズ
        </caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${aiVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${aiVariants.map(
                  (variant) =>
                    html`<td>
                      <mi-ai-button
                        icon-type="magic"
                        variant="${variant}"
                        size="${size}"
                      >
                        AIで生成
                      </mi-ai-button>
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
          "mi-ai-buttonコンポーネントの全パターンを一覧表示します。AI機能の起動などに使用するAIボタンです。",
      },
    },
  },
};
