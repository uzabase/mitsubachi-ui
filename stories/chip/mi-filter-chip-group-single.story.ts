import "../../src/components/chip/mi-filter-chip";
import "../../src/components/chip/mi-filter-chip-group-single";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiFilterChipGroupSingle } from "../../src/components/chip/mi-filter-chip-group-single";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiFilterChipGroupSingleStory = MiFilterChipGroupSingle & {
  onChange?: (...args: unknown[]) => void;
};

const meta = {
  component: "mi-filter-chip-group-single",
  title: "Components/Chip/mi-filter-chip-group-single",
  parameters: {
    docs: {
      description: {
        component: [
          "単一選択の `mi-filter-chip` グループです。常に1つだけが選択されます。",
          'host に `role="radiogroup"` が付き、子の `mi-filter-chip` は `role="radio"` になります。',
          "",
          "グループが何を絞り込むのかを伝えるため、**利用側で `aria-label` を必ず指定してください**。",
          "",
          "キーボード操作は ARIA の radiogroup 標準に従います。グループ内で Tab が止まるのは1つだけで、",
          "矢印キー / Home / End で移動し、**移動と同時に選択**されます。無効なチップはスキップします。",
          "",
          "選択が変わると `change` イベント（`bubbles: true`）が発火します。新しい値は `event.target.value` で取得します。",
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
  argTypes: {
    value: {
      control: "text",
      description:
        "現在の選択値。どの子とも一致しない値を指定した場合は、先頭の有効な子へ自動的に戻ります（未選択の状態を作らないため）",
    },
    disabled: {
      control: "boolean",
      description: "グループ全体の無効化（子個別の disabled との OR）",
    },
    onChange: {
      name: "change",
      action: "change",
      description: [
        "選択値が変わったときに発火します。",
        "",
        "```js",
        "group.addEventListener('change', (e) => {",
        "  e.target.value; // '1m'",
        "});",
        "```",
      ].join("\n"),
      table: { category: "Events" },
    },
  },
  args: {
    value: "1m",
    disabled: false,
    onChange: action("change"),
  },
} satisfies Meta<MiFilterChipGroupSingleStory>;

export default meta;
type Story = StoryObj<MiFilterChipGroupSingleStory>;

export const Basic: Story = {
  render: (args) => html`
    <mi-filter-chip-group-single
      aria-label="期間"
      value=${args.value}
      ?disabled=${args.disabled}
      @change=${args.onChange}
    >
      <mi-filter-chip label="1ヶ月" value="1m"></mi-filter-chip>
      <mi-filter-chip label="3ヶ月" value="3m"></mi-filter-chip>
      <mi-filter-chip label="6ヶ月" value="6m"></mi-filter-chip>
      <mi-filter-chip label="1年" value="1y"></mi-filter-chip>
    </mi-filter-chip-group-single>
  `,
  tags: ["!dev-only"],
};

export const PartiallyDisabled: Story = {
  render: (args) => html`
    <mi-filter-chip-group-single
      aria-label="期間"
      value=${args.value}
      @change=${args.onChange}
    >
      <mi-filter-chip label="1ヶ月" value="1m"></mi-filter-chip>
      <mi-filter-chip label="3ヶ月" value="3m" disabled></mi-filter-chip>
      <mi-filter-chip label="6ヶ月" value="6m"></mi-filter-chip>
      <mi-filter-chip label="1年" value="1y" disabled></mi-filter-chip>
    </mi-filter-chip-group-single>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "無効なチップは矢印キーでの移動時にスキップされ、Tab でもフォーカスできません。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const GroupDisabled: Story = {
  args: { disabled: true },
  render: (args) => html`
    <mi-filter-chip-group-single
      aria-label="期間"
      value=${args.value}
      ?disabled=${args.disabled}
      @change=${args.onChange}
    >
      <mi-filter-chip label="1ヶ月" value="1m"></mi-filter-chip>
      <mi-filter-chip label="3ヶ月" value="3m"></mi-filter-chip>
      <mi-filter-chip label="6ヶ月" value="6m"></mi-filter-chip>
    </mi-filter-chip-group-single>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "グループの `disabled` は子すべてを無効化します（子個別の `disabled` との OR）。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const WithoutValue: Story = {
  render: (args) => html`
    <mi-filter-chip-group-single aria-label="期間" @change=${args.onChange}>
      <mi-filter-chip label="1ヶ月"></mi-filter-chip>
      <mi-filter-chip label="3ヶ月"></mi-filter-chip>
      <mi-filter-chip label="1年"></mi-filter-chip>
    </mi-filter-chip-group-single>
  `,
  parameters: {
    docs: {
      description: {
        story: [
          "`value` を省略すると `label` がそのまま値になります。",
          "`value` を省略した `<option>` がテキストコンテンツを値にするのと同じ挙動です。",
          "",
          "識別子と表示テキストを分ける必要がなければ、この書き方で済みます。",
          "Actions パネルで `change` を見ると、値としてラベルが流れていることを確認できます。",
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
};

export const Wrap: Story = {
  render: (args) => html`
    <div style="inline-size: 240px; border: 1px dashed #ccc; padding: 8px;">
      <mi-filter-chip-group-single
        aria-label="業種"
        value="finance"
        @change=${args.onChange}
      >
        <mi-filter-chip label="金融" value="finance"></mi-filter-chip>
        <mi-filter-chip label="小売・卸売" value="retail"></mi-filter-chip>
        <mi-filter-chip label="情報通信サービス業" value="it"></mi-filter-chip>
      </mi-filter-chip-group-single>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "幅に収まらないチップは次の行へ折り返し、チップ単体のラベルも折り返して表示されます。",
      },
    },
  },
  tags: ["!dev-only"],
};
