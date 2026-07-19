import "../../src/components/chip/mi-input-chip";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiInputChip } from "../../src/components/chip/mi-input-chip";

const meta = {
  component: "mi-input-chip",
  title: "Chip/mi-input-chip",
  parameters: {
    docs: {
      description: {
        component: [
          "ユーザーが入力した内容を要素ごとに整理して表示するための Chip コンポーネントです。",
          "企業やユーザーアカウントの入力などで利用され、×ボタンで入力内容を削除できます。",
          "",
          "> **Note:** React 版（mitsubachi-ui-react）には `disabled` プロパティがありますが、",
          "> 現在の Figma デザインには disabled バリアントが定義されていないため、本コンポーネントでは未実装です。",
          "> Figma に disabled が追加された際に対応予定です。",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    label: { type: "string" },
    onRemove: {
      name: "remove",
      action: "remove",
      description: "削除ボタンがクリックされたとき",
      table: { category: "Events" },
    },
  },
  args: {
    label: "Label",
    onRemove: action("remove"),
  },
  render: (args) => html`
    <div style="padding: 40px; display: inline-block;">
      <mi-input-chip
        label=${args.label}
        @remove=${args.onRemove}
      ></mi-input-chip>
    </div>
  `,
} satisfies Meta<MiInputChip & { onRemove: () => void }>;

export default meta;
type Story = StoryObj<MiInputChip>;

export const Basic: Story = {
  args: {
    label: "Apple",
  },
  tags: ["!dev-only"],
};
