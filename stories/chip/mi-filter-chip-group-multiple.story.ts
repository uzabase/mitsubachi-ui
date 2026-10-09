import "../../src/components/chip/mi-filter-chip";
import "../../src/components/chip/mi-filter-chip-group-multiple";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiFilterChipGroupMultiple } from "../../src/components/chip/mi-filter-chip-group-multiple";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiFilterChipGroupMultipleStory = MiFilterChipGroupMultiple & {
  onChange?: (...args: unknown[]) => void;
};

const meta = {
  component: "mi-filter-chip-group-multiple",
  title: "Components/Chip/mi-filter-chip-group-multiple",
  parameters: {
    docs: {
      description: {
        component: [
          "複数選択の `mi-filter-chip` グループです。0件選択も許容します。",
          'host に `role="group"` が付き、子の `mi-filter-chip` はトグルボタン（`role="button"` + `aria-pressed`）になります。',
          "",
          "グループが何を絞り込むのかを伝えるため、**利用側で `aria-label` を必ず指定してください**。",
          "",
          "選択状態の実体は各 `mi-filter-chip` の `selected` です。配列プロパティは持たず、",
          "読み取り専用の `values` getter で選択値の一覧を取得します（`event.target.values`）。",
          "",
          'ロービングフォーカスは行いません。`role="group"` 内のトグルボタンは個別に Tab で辿るのが標準の挙動です。',
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "グループ全体の無効化（子個別の disabled との OR）",
    },
    onChange: {
      name: "change",
      action: "change",
      description: [
        "いずれかのチップの選択が切り替わったときに発火します。",
        "",
        "```js",
        "group.addEventListener('change', (e) => {",
        "  e.target.values; // ['finance', 'retail']",
        "});",
        "```",
      ].join("\n"),
      table: { category: "Events" },
    },
  },
  args: {
    disabled: false,
    onChange: action("change"),
  },
} satisfies Meta<MiFilterChipGroupMultipleStory>;

export default meta;
type Story = StoryObj<MiFilterChipGroupMultipleStory>;

/** `values` を Actions に流すため、change を受けて選択値の一覧をログする */
const logValues = (onChange?: (...args: unknown[]) => void) => (e: Event) =>
  onChange?.((e.target as MiFilterChipGroupMultiple).values);

export const Basic: Story = {
  render: (args) => html`
    <mi-filter-chip-group-multiple
      aria-label="業種"
      ?disabled=${args.disabled}
      @change=${logValues(args.onChange)}
    >
      <mi-filter-chip label="金融" value="finance"></mi-filter-chip>
      <mi-filter-chip label="小売" value="retail"></mi-filter-chip>
      <mi-filter-chip label="製造" value="manufacturing"></mi-filter-chip>
      <mi-filter-chip label="情報通信" value="it"></mi-filter-chip>
    </mi-filter-chip-group-multiple>
  `,
  tags: ["!dev-only"],
};

export const MultipleSelected: Story = {
  render: (args) => html`
    <mi-filter-chip-group-multiple
      aria-label="業種"
      @change=${logValues(args.onChange)}
    >
      <mi-filter-chip label="金融" value="finance" selected></mi-filter-chip>
      <mi-filter-chip label="小売" value="retail"></mi-filter-chip>
      <mi-filter-chip
        label="製造"
        value="manufacturing"
        selected
      ></mi-filter-chip>
      <mi-filter-chip label="情報通信" value="it"></mi-filter-chip>
    </mi-filter-chip-group-multiple>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "複数のチップを同時に選択できます。すべて解除して0件にすることもできます。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const Disabled: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <mi-filter-chip-group-multiple
        aria-label="業種（一部無効）"
        @change=${logValues(args.onChange)}
      >
        <mi-filter-chip label="金融" value="finance" selected></mi-filter-chip>
        <mi-filter-chip label="小売" value="retail" disabled></mi-filter-chip>
        <mi-filter-chip label="製造" value="manufacturing"></mi-filter-chip>
      </mi-filter-chip-group-multiple>

      <mi-filter-chip-group-multiple
        aria-label="業種（グループ全体が無効）"
        disabled
      >
        <mi-filter-chip label="金融" value="finance" selected></mi-filter-chip>
        <mi-filter-chip label="小売" value="retail"></mi-filter-chip>
        <mi-filter-chip label="製造" value="manufacturing"></mi-filter-chip>
      </mi-filter-chip-group-multiple>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "上が子個別の `disabled`、下がグループ全体の `disabled` です。両者は OR で効きます。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const Wrap: Story = {
  render: (args) => html`
    <div style="inline-size: 240px; border: 1px dashed #ccc; padding: 8px;">
      <mi-filter-chip-group-multiple
        aria-label="業種"
        @change=${logValues(args.onChange)}
      >
        <mi-filter-chip label="金融" value="finance" selected></mi-filter-chip>
        <mi-filter-chip label="小売・卸売" value="retail"></mi-filter-chip>
        <mi-filter-chip label="情報通信サービス業" value="it"></mi-filter-chip>
      </mi-filter-chip-group-multiple>
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
