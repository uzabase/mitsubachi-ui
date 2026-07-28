import "../../src/components/select-box/mi-select-box-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiSelectBoxUnit } from "../../src/components/select-box/mi-select-box-unit";

const meta = {
  component: "mi-select-box-unit",
  title: "Components/SelectBox/mi-select-box-unit",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ラベル付きセレクトボックス。mi-label-unit と mi-select-box を組み合わせたラッパーコンポーネントです。",
      },
    },
  },
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    text: {
      control: "text",
      description: "ラベルテキスト",
    },
    required: {
      control: "boolean",
      description: "必須バッジを表示するかどうか",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "バリアント",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "サイズ",
    },
    placeholder: {
      control: "text",
      description: "未選択時のプレースホルダー",
    },
    value: {
      control: "text",
      description: "選択中の値（表示テキスト）",
    },
    error: {
      control: "text",
      description: "エラーメッセージ",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
  },
  args: {
    text: "部署",
    required: false,
    variant: "primary",
    size: "medium",
    placeholder: "選択してください",
    value: "",
    error: "",
    disabled: false,
  },
} satisfies Meta<MiSelectBoxUnit>;

export default meta;
type Story = StoryObj<MiSelectBoxUnit>;

/** デフォルト */
export const Default: Story = {
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box-unit
        text="${args.text}"
        ?required="${args.required}"
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};

/** 値が選択されている状態 */
export const WithValue: Story = {
  args: {
    value: "営業",
  },
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box-unit
        text="${args.text}"
        ?required="${args.required}"
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};

/** エラー状態 */
export const Error: Story = {
  args: {
    error: "選択は必須です",
  },
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box-unit
        text="${args.text}"
        ?required="${args.required}"
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};

/** 無効状態 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: "営業",
  },
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box-unit
        text="${args.text}"
        ?required="${args.required}"
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};

/** ラベルなし */
export const WithoutLabel: Story = {
  args: {
    text: "",
  },
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box-unit
        text="${args.text}"
        ?required="${args.required}"
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};
