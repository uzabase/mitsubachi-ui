import "../../src/components/chip/mi-input-chip";
import "../../src/components/chip/mi-input-chip-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiInputChipGroup } from "../../src/components/chip/mi-input-chip-group";

const meta = {
  component: "mi-input-chip-group",
  title: "Components/Chip/mi-input-chip-group",
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
} satisfies Meta<MiInputChipGroup>;

export default meta;
type Story = StoryObj<MiInputChipGroup>;

export const Basic: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <mi-input-chip-group aria-label="選択された項目">
        <mi-input-chip label="Apple"></mi-input-chip>
        <mi-input-chip label="Banana"></mi-input-chip>
        <mi-input-chip label="Cherry"></mi-input-chip>
        <mi-input-chip label="Dragon Fruit"></mi-input-chip>
        <mi-input-chip label="Elderberry"></mi-input-chip>
      </mi-input-chip-group>
    </div>
  `,
  tags: ["!dev-only"],
};

export const Wrap: Story = {
  render: () => html`
    <div style="padding: 40px; max-width: 300px;">
      <mi-input-chip-group aria-label="選択された項目">
        <mi-input-chip label="Apple"></mi-input-chip>
        <mi-input-chip label="Banana"></mi-input-chip>
        <mi-input-chip label="Cherry"></mi-input-chip>
        <mi-input-chip label="Dragon Fruit"></mi-input-chip>
        <mi-input-chip label="Elderberry"></mi-input-chip>
      </mi-input-chip-group>
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
      <mi-input-chip-group aria-label="選択された項目">
        <mi-input-chip
          label="とても長いラベルテキストが省略される例"
        ></mi-input-chip>
        <mi-input-chip label="短いラベル"></mi-input-chip>
      </mi-input-chip-group>
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
