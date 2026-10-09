import "../../src/components/chip/mi-filter-chip";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiFilterChip } from "../../src/components/chip/mi-filter-chip";

const meta = {
  component: "mi-filter-chip",
  title: "Components/Chip/mi-filter-chip",
  parameters: {
    docs: {
      description: {
        component: [
          "絞り込み条件の1件を表し、クリックで選択をトグルするチップです。",
          "選択中は先頭にチェックアイコンが自動表示されます（アイコンの差し替えはできません）。",
          "",
          "通常は `mi-filter-chip-group-single`（単一選択）または",
          "`mi-filter-chip-group-multiple`（複数選択）の中に配置します。",
          "置かれた場所によって role が変わります（単体・複数選択グループ内 → `button` + `aria-pressed`、",
          "単一選択グループ内 → `radio` + `aria-checked`）。",
          "",
          "公開しているイベントはネイティブの `click` のみです。カスタムイベントはありません。",
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
  argTypes: {
    label: { control: "text", description: "チップに表示するテキスト" },
    value: {
      control: "text",
      description:
        "グループが選択値を識別するための値。未指定のときは label が値になります（ネイティブの <option> と同じ）",
    },
    selected: { control: "boolean", description: "選択状態" },
    disabled: { control: "boolean", description: "無効化状態" },
  },
  args: {
    label: "東京",
    value: "tokyo",
    selected: false,
    disabled: false,
  },
  render: (args) => html`
    <mi-filter-chip
      label=${args.label}
      value=${args.value}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
    ></mi-filter-chip>
  `,
} satisfies Meta<MiFilterChip>;

export default meta;
type Story = StoryObj<MiFilterChip>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const Selected: Story = {
  args: { selected: true },
  parameters: {
    docs: {
      description: {
        story: "選択中はチェックアイコンが表示され、背景色が変わります。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <mi-filter-chip label="未選択" value="a"></mi-filter-chip>
      <mi-filter-chip label="選択中" value="b" selected></mi-filter-chip>
      <mi-filter-chip label="無効" value="c" disabled></mi-filter-chip>
      <mi-filter-chip label="無効・選択中" value="d" selected disabled>
      </mi-filter-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: [
          "`disabled` では背景色を変えず、テキストとアイコンの色だけが薄くなります。",
          "無効なチップは Tab でフォーカスできません。",
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
};

export const LongLabel: Story = {
  render: () => html`
    <div style="inline-size: 240px; border: 1px dashed #ccc; padding: 8px;">
      <mi-filter-chip
        label="とても長いラベルテキストは省略せず折り返して表示されます"
        value="long"
        selected
      ></mi-filter-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "入れ物より幅が広くなる場合、ラベルは省略ではなく折り返して表示されます。",
      },
    },
  },
  tags: ["!dev-only"],
};
