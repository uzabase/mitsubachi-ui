import "../../src/components/tag/mi-link-tag-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { linkTagSizes } from "../../src/components/tag/mi-link-tag";
import type { MiLinkTagGroup } from "../../src/components/tag/mi-link-tag-group";

const labels = [
  "金融",
  "製造業",
  "小売",
  "IT・通信",
  "不動産",
  "医療・ヘルスケア",
  "エネルギー",
  "物流",
  "教育",
  "農業",
];

const tags = labels.map(
  (label) => html`<mi-link-tag href="#">${label}</mi-link-tag>`,
);

const meta = {
  component: "mi-link-tag-group",
  title: "Components/Tag/mi-link-tag-group",
  parameters: {
    docs: {
      description: {
        component: [
          "複数の mi-link-tag を一定の間隔で並べるコンテナです。",
          "幅に収まらないタグは次の行へ折り返します。",
          "",
          "内包する mi-link-tag のサイズは、このグループの `size` で一括制御します。",
          "個別の mi-link-tag に `size` を指定しても、グループの値で上書きされます。",
        ].join("\n"),
      },
    },
  },
  args: {
    size: "medium",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: [...linkTagSizes],
      description: "内包する mi-link-tag のサイズ",
    },
    showMore: {
      control: { type: "boolean" },
      description:
        "高さに収まらないタグを隠し、末尾に「もっと見る」ボタンを表示します（高さの指定が必要）",
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiLinkTagGroup>;

export default meta;
type Story = StoryObj<MiLinkTagGroup>;

export const Basic: Story = {
  render: ({ size }) =>
    html`<mi-link-tag-group size=${size}>${tags}</mi-link-tag-group>`,
};

/** コンテナの幅に収まらないタグは次の行へ折り返します。 */
export const Wrapped: Story = {
  render: ({ size }) => html`
    <div style="inline-size: 360px; outline: 1px dashed #ccc;">
      <mi-link-tag-group size=${size}>${tags}</mi-link-tag-group>
    </div>
  `,
};

/** サイズはグループ側で指定します。タグの間隔はサイズによらず一定です。 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${linkTagSizes.map(
        (size) =>
          html`<mi-link-tag-group size=${size}>${tags}</mi-link-tag-group>`,
      )}
    </div>
  `,
};

/**
 * `show-more` を指定すると、**自身の高さ**に収まらないタグを隠し、末尾に「もっと見る」（`...`）を
 * 表示します。押すと残りのタグが表示されます（畳むことはできません）。
 *
 * **高さを指定しないと機能しません。** 何行分表示するかは高さで決まります
 * （下の例は 1行分の `block-size: 24px`）。幅・高さとも普通の CSS で指定でき、
 * 専用のプロパティはありません。
 */
export const ShowMore: Story = {
  render: ({ size }) => html`
    <mi-link-tag-group
      size=${size}
      show-more
      style="max-inline-size: 360px; block-size: 24px; outline: 1px dashed #ccc;"
    >
      ${tags}
    </mi-link-tag-group>
  `,
};

/** 高さを 2行分にすると 2行まで表示されます。行数は高さで決まります。 */
export const ShowMoreTwoRows: Story = {
  render: ({ size }) => html`
    <mi-link-tag-group
      size=${size}
      show-more
      style="max-inline-size: 360px; block-size: 52px; outline: 1px dashed #ccc;"
    >
      ${tags}
    </mi-link-tag-group>
  `,
};

/** 高さの指定が無い場合は何も隠れず、「もっと見る」も表示されません。 */
export const ShowMoreWithoutHeightLimit: Story = {
  render: ({ size }) => html`
    <mi-link-tag-group
      size=${size}
      show-more
      style="max-inline-size: 360px; outline: 1px dashed #ccc;"
    >
      ${tags}
    </mi-link-tag-group>
  `,
};
