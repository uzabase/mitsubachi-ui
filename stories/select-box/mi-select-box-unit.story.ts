import "../../src/components/select-box/mi-select-box-unit";
import "../../src/components/menu/mi-select-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiSelectBoxUnit } from "../../src/components/select-box/mi-select-box-unit";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiSelectBoxUnitStory = MiSelectBoxUnit & {
  onChange?: (...args: unknown[]) => void;
};

/** args に登録されたハンドラ（既定は Actions パネルへのログ出力）へ橋渡しする */
const onChangeOf =
  (args: { onChange?: (...args: unknown[]) => void }) => (e: Event) => {
    const el = e.target as MiSelectBoxUnit;
    args.onChange?.({ value: el.value, displayText: el.displayText });
  };

const options = html`
  <mi-select-menu-item value="sales">営業</mi-select-menu-item>
  <mi-select-menu-item value="marketing">マーケティング</mi-select-menu-item>
  <mi-select-menu-item value="engineering"
    >エンジニアリング</mi-select-menu-item
  >
`;

const meta = {
  component: "mi-select-box-unit",
  title: "Components/SelectBox/mi-select-box-unit",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ラベル付きセレクトボックス。mi-label-unit と mi-select-box を組み合わせたラッパーコンポーネントです。選択肢は mi-select-menu-item を直接の子として並べます。",
      },
    },
  },
  decorators: [
    (story) => html`<div style="padding-bottom: 240px;">${story()}</div>`,
  ],
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
      description:
        "選択中の値（mi-select-menu-item の value に対応する識別子）",
    },
    name: {
      control: "text",
      description: "フォーム送信時の名前",
    },
    error: {
      control: "text",
      description: "エラーメッセージ",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    displayText: {
      table: { disable: true },
    },
    onChange: {
      name: "change",
      description: [
        "選択値が変更されたときに発火します。",
        "",
        "```js",
        "unit.addEventListener('change', (e) => {",
        "  e.target.value;       // 'sales'",
        "  e.target.displayText; // '営業'",
        "});",
        "```",
      ].join("\n"),
      table: { category: "Events", type: { summary: "Event" } },
    },
  },
  args: {
    text: "部署",
    required: false,
    variant: "primary",
    size: "medium",
    placeholder: "選択してください",
    value: "",
    name: "department",
    error: "",
    disabled: false,
    onChange: action("change"),
  },
  render: (args) => html`
    <mi-select-box-unit
      text="${args.text}"
      ?required="${args.required}"
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      .value="${args.value}"
      name="${args.name}"
      error="${args.error}"
      ?disabled="${args.disabled}"
      @change=${onChangeOf(args)}
    >
      ${options}
    </mi-select-box-unit>
  `,
} satisfies Meta<MiSelectBoxUnitStory>;

export default meta;
type Story = StoryObj<MiSelectBoxUnitStory>;

/** デフォルト */
export const Default: Story = {};

/** 値が選択されている状態 */
export const WithValue: Story = {
  args: { value: "sales" },
};

/** 必須バッジ付き */
export const Required: Story = {
  args: { required: true },
};

/** エラー状態 */
export const WithError: Story = {
  args: { required: true, error: "部署を選択してください" },
};

/** 無効状態 */
export const Disabled: Story = {
  args: { disabled: true, value: "sales" },
};

/** ラベルなし */
export const WithoutLabel: Story = {
  args: { text: "" },
};
