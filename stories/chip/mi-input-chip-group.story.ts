import "../../src/components/chip/mi-input-chip-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiInputChipGroup } from "../../src/components/chip/mi-input-chip-group";

const sampleItems = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
  { id: "3", label: "Cherry" },
  { id: "4", label: "Dragon Fruit" },
  { id: "5", label: "Elderberry" },
];

const meta = {
  component: "mi-input-chip-group",
  title: "Chip/mi-input-chip-group",
  parameters: {
    docs: {
      description: {
        component: [
          "複数の mi-input-chip をまとめて表示するグループコンポーネントです。",
          "ユーザーが入力した内容を要素ごとに整理して表示し、個別に削除できます。",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    items: { control: "object" },
    onRemove: {
      name: "remove",
      action: "remove",
      description: "Chip の削除ボタンがクリックされたとき",
      table: { category: "Events" },
    },
  },
  args: {
    items: sampleItems,
    onRemove: action("remove"),
  },
  render: (args) => html`
    <div style="padding: 40px;">
      <mi-input-chip-group
        .items=${args.items}
        aria-label="選択された項目"
        @remove=${args.onRemove}
      ></mi-input-chip-group>
    </div>
  `,
} satisfies Meta<MiInputChipGroup & { onRemove: () => void }>;

export default meta;
type Story = StoryObj<MiInputChipGroup>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Wrap: Story = {
  render: () => html`
    <div style="padding: 40px; max-width: 300px;">
      <mi-input-chip-group
        .items=${sampleItems}
        aria-label="選択された項目"
        @remove=${action("remove")}
      ></mi-input-chip-group>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "幅が狭い場合、Chip が折り返して表示されます。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const LongLabel: Story = {
  render: () => html`
    <div style="padding: 40px; max-width: 200px;">
      <mi-input-chip-group
        .items=${[
          { id: "1", label: "とても長いラベルテキストが省略される例" },
          { id: "2", label: "短いラベル" },
        ]}
        aria-label="選択された項目"
        @remove=${action("remove")}
      ></mi-input-chip-group>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "ラベルが長い場合、テキストが省略（ellipsis）されます。",
      },
    },
  },
  tags: ["!dev-only"],
};
