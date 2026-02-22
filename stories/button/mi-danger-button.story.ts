import "../../src/components/button/mi-danger-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import type { MiDangerButton } from "../../src/components/button/mi-danger-button";
import {
  dangerVariants,
  sizes,
} from "../../src/components/button/mi-danger-button";
import { iconTypes } from "../../src/components/icon/icons";

const meta = {
  component: "mi-danger-button",
  title: "Button/mi-danger-button",
  parameters: {
    docs: {
      description: {
        component:
          "削除・破壊的操作などに使う Danger ボタンです。常に Danger スタイルで表示されます。",
      },
    },
  },
  argTypes: {
    slot: { type: "string" },
    variant: {
      control: { type: "select" },
      options: dangerVariants,
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
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    name: { type: "string" },
    value: { type: "string" },
    iconType: {
      control: { type: "select" },
      options: ["", ...iconTypes],
    },
  },
  args: {
    slot: "削除する",
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    iconType: undefined,
    type: "button",
  },
  render: (args) => html`
    <mi-danger-button
      variant=${args.variant}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
      icon-type=${args.iconType || nothing}
      type=${args.type || nothing}
    >
      ${args.slot}
    </mi-danger-button>
  `,
} satisfies Meta<MiDangerButton>;

export default meta;
type Story = StoryObj<MiDangerButton>;

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
    <mi-danger-button style="width: 100%;">削除する</mi-danger-button>
    <div style="width: 400px;">
      <mi-danger-button style="width: 100%;">削除する</mi-danger-button>
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
        <caption style="text-align: left;">バリアント × 状態</caption>
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
                  <mi-danger-button variant="${variant}">ボタン</mi-danger-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <mi-danger-button variant="${variant}" disabled>ボタン</mi-danger-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <mi-danger-button variant="${variant}" loading>ボタン</mi-danger-button>
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
            ${dangerVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${dangerVariants.map(
                  (variant) =>
                    html`<td>
                      <mi-danger-button variant="${variant}" size="${size}"
                        >ボタン</mi-danger-button
                      >
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">アイコン付き: バリアント × 状態</caption>
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
                  <mi-danger-button icon-type="trash" variant="${variant}">
                    削除
                  </mi-danger-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <mi-danger-button icon-type="trash" variant="${variant}" disabled>
                    削除
                  </mi-danger-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${dangerVariants.map(
              (variant) =>
                html`<td>
                  <mi-danger-button icon-type="trash" variant="${variant}" loading>
                    削除
                  </mi-danger-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">アイコン付き: バリアント × サイズ</caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${dangerVariants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${dangerVariants.map(
                  (variant) =>
                    html`<td>
                      <mi-danger-button
                        icon-type="trash"
                        variant="${variant}"
                        size="${size}"
                      >
                        削除
                      </mi-danger-button>
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
          "mi-danger-buttonコンポーネントの全パターンを一覧表示します。削除・破壊的操作などに使用するDangerボタンです。",
      },
    },
  },
};
