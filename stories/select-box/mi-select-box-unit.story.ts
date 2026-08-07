import "../../src/components/select-box/mi-select-box-unit";
import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-menu-radio-group";
import "../../src/components/menu/mi-select-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

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
      description: "選択中の値（option の value に対応する識別子）",
    },
    displayText: {
      control: "text",
      name: "display-text",
      description: "選択中の表示テキスト",
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
    displayText: "",
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
        display-text="${args.displayText}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};

/** 値が選択されている状態 */
export const WithValue: Story = {
  args: {
    value: "sales",
    displayText: "営業",
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
        display-text="${args.displayText}"
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
        display-text="${args.displayText}"
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
    value: "sales",
    displayText: "営業",
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
        display-text="${args.displayText}"
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
        display-text="${args.displayText}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box-unit>
    </div>
  `,
};

/** 選択肢付きの使用例 */
export const WithMenu: Story = {
  decorators: [
    (story) => html`<div style="padding-bottom: 200px;">${story()}</div>`,
  ],
  render: () => {
    const handleChange = (e: Event) => {
      const group = e.target as HTMLElement & { value: string };
      const selected = group.querySelector(
        `mi-select-menu-item[value="${group.value}"]`,
      );
      const unit = group
        .closest("mi-menu")
        ?.querySelector("mi-select-box-unit") as
        | (HTMLElement & { value: string; displayText: string })
        | null;
      if (unit && selected) {
        unit.value = group.value;
        unit.displayText = selected.textContent?.trim() ?? "";
        action("change")({
          value: unit.value,
          displayText: unit.displayText,
        });
      }
    };

    return html`
      <div style="width: 240px;">
        <mi-menu>
          <mi-select-box-unit
            slot="trigger"
            text="部署"
            placeholder="選択してください"
          ></mi-select-box-unit>
          <mi-menu-dropdown>
            <mi-menu-radio-group value="" @change=${handleChange}>
              <mi-select-menu-item value="sales">営業</mi-select-menu-item>
              <mi-select-menu-item value="marketing">
                マーケティング・広報
              </mi-select-menu-item>
              <mi-select-menu-item value="engineering">
                エンジニアリング
              </mi-select-menu-item>
              <mi-select-menu-item value="hr">人事</mi-select-menu-item>
            </mi-menu-radio-group>
          </mi-menu-dropdown>
        </mi-menu>
      </div>
    `;
  },
};
