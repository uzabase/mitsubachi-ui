import "../../src/components/select-box/mi-select-box";
import "../../src/components/menu/mi-menu";
import "../../src/components/menu/mi-menu-dropdown";
import "../../src/components/menu/mi-menu-radio-group";
import "../../src/components/menu/mi-select-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiSelectBox } from "../../src/components/select-box/mi-select-box";

const meta = {
  component: "mi-select-box",
  title: "Components/SelectBox/mi-select-box",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "セレクトボックスのトリガーコンポーネント。mi-menu の trigger スロットに配置して使用します。",
      },
    },
  },
  decorators: [
    (story) => html`<div style="padding-bottom: 200px;">${story()}</div>`,
  ],
  tags: ["autodocs", "!dev-only"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "バリアント。primary は枠線付き全幅、secondary はコンパクト",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description:
        "サイズ。small は secondary バリアントでのみ有効（primary では常に medium 扱い）",
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
      description: "エラーメッセージ（空でなければエラー状態）",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    placeholder: "選択してください",
    value: "",
    error: "",
    disabled: false,
  },
} satisfies Meta<MiSelectBox>;

export default meta;
type Story = StoryObj<MiSelectBox>;

/** Primary（デフォルト） */
export const Default: Story = {
  render: (args) => {
    if (args.variant === "primary" && args.size === "small") {
      return html`<p style="color: #999; font-size: 14px;">
        primary + small の組み合わせは存在しません。small は secondary
        バリアントでのみ有効です。
      </p>`;
    }
    return html`
      <div style="width: 240px;">
        <mi-select-box
          variant="${args.variant}"
          size="${args.size}"
          placeholder="${args.placeholder}"
          value="${args.value}"
          error="${args.error}"
          ?disabled="${args.disabled}"
        ></mi-select-box>
      </div>
    `;
  },
};

/** 値が選択されている状態 */
export const WithValue: Story = {
  args: {
    value: "営業",
  },
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box>
    </div>
  `,
};

/** Secondary バリアント */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    value: "営業",
  },
  render: (args) => html`
    <mi-select-box
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      error="${args.error}"
      ?disabled="${args.disabled}"
    ></mi-select-box>
  `,
};

/** Small サイズ（secondary のみ） */
export const Small: Story = {
  args: {
    variant: "secondary",
    size: "small",
    value: "エンジニアリング",
  },
  render: (args) => html`
    <mi-select-box
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      error="${args.error}"
      ?disabled="${args.disabled}"
    ></mi-select-box>
  `,
};

/** エラー状態 */
export const Error: Story = {
  args: {
    error: "選択は必須です",
  },
  render: (args) => html`
    <div style="width: 240px;">
      <mi-select-box
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box>
    </div>
  `,
};

/** エラー状態（Secondary） */
export const ErrorSecondary: Story = {
  args: {
    variant: "secondary",
    error: "選択は必須です",
  },
  render: (args) => html`
    <mi-select-box
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      error="${args.error}"
      ?disabled="${args.disabled}"
    ></mi-select-box>
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
      <mi-select-box
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box>
    </div>
  `,
};

/** 長いテキスト（省略表示） */
export const LongText: Story = {
  args: {
    value:
      "とても長いテキストが入る場合は省略されて表示されます。テキストオーバーフローの確認用です。",
  },
  render: (args) => html`
    <div style="width: 200px;">
      <mi-select-box
        variant="${args.variant}"
        size="${args.size}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        error="${args.error}"
        ?disabled="${args.disabled}"
      ></mi-select-box>
    </div>
  `,
};

/** mi-menu と組み合わせた使用例 */
export const WithMenu: Story = {
  render: () => html`
    <div style="width: 240px;">
      <mi-menu>
        <mi-select-box slot="trigger" placeholder="部署を選択"></mi-select-box>
        <mi-menu-dropdown>
          <mi-menu-radio-group value="">
            <mi-select-menu-item value="sales">営業</mi-select-menu-item>
            <mi-select-menu-item value="marketing">
              マーケティング
            </mi-select-menu-item>
            <mi-select-menu-item value="engineering">
              エンジニアリング
            </mi-select-menu-item>
          </mi-menu-radio-group>
        </mi-menu-dropdown>
      </mi-menu>
    </div>
  `,
};

/** バリアント・サイズ一覧 */
export const AllVariants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 16px; width: 300px;"
    >
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          primary / medium
        </p>
        <mi-select-box
          variant="primary"
          size="medium"
          value="営業"
        ></mi-select-box>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          primary / small
        </p>
        <mi-select-box
          variant="primary"
          size="small"
          value="該当なし（primary は常に medium）"
        ></mi-select-box>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          secondary / medium
        </p>
        <mi-select-box
          variant="secondary"
          size="medium"
          value="営業"
        ></mi-select-box>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          secondary / small
        </p>
        <mi-select-box
          variant="secondary"
          size="small"
          value="営業"
        ></mi-select-box>
      </div>
    </div>
  `,
};
