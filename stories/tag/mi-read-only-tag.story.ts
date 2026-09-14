import "../../src/components/tag/mi-read-only-tag";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  type MiReadOnlyTag,
  readOnlyTagTypes,
} from "../../src/components/tag/mi-read-only-tag";

const meta: Meta<MiReadOnlyTag> = {
  component: "mi-read-only-tag",
  title: "Components/Tag/mi-read-only-tag",
  parameters: {
    docs: {
      description: {
        component: [
          "情報の分類・属性・状態を示す表示専用のタグです。",
          "ユーザー操作はできません（リンクでもボタンでもありません）。",
          "ナビゲーションとしても機能させたい場合は `mi-link-tag` を使用してください。",
          "",
          "`type` の違いは色でしか表現されないため、色が判別できないユーザーにも意味が伝わるよう、",
          "ラベル文言だけで意味が分かるようにしてください（例: 「終了」「エラー」）。",
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
  args: {
    type: "neutral",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: [...readOnlyTagTypes],
      description: "タグの意味（色）",
    },
    iconType: {
      control: { type: "text" },
      description:
        "ラベルの先頭に表示するアイコンの種類（mi-icon の type）。未指定なら表示しません",
    },
  },
};
export default meta;

type Story = StoryObj<MiReadOnlyTag>;

export const Default: Story = {
  render: ({ type }) => html`
    <mi-read-only-tag type=${type}>ラベル</mi-read-only-tag>
  `,
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      ${readOnlyTagTypes.map(
        (type) => html`
          <mi-read-only-tag type=${type}>${type}</mi-read-only-tag>
        `,
      )}
    </div>
  `,
};

export const WithIcon: Story = {
  args: { iconType: "arrow-up-small" },
  render: ({ type, iconType }) => html`
    <mi-read-only-tag type=${type} icon-type=${iconType}>
      アイコン付き
    </mi-read-only-tag>
  `,
};

export const LongText: Story = {
  render: ({ type }) => html`
    <div style="inline-size: 160px;">
      <mi-read-only-tag type=${type}>
        非常に長いラベルテキストは省略記号で切り詰められます
      </mi-read-only-tag>
    </div>
  `,
};

/** Figma の「使用例」に沿った組み合わせです。 */
export const UsageExamples: Story = {
  render: () => {
    const withIcon = (
      type: "positive" | "negative",
      icon: string,
      labels: string[],
    ) => html`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${labels.map(
          (label) => html`
            <mi-read-only-tag type=${type} icon-type=${icon}>
              ${label}
            </mi-read-only-tag>
          `,
        )}
      </div>
    `;

    return html`
      <div style="display: flex; gap: 40px; align-items: flex-start;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div><mi-read-only-tag type="positive">推奨</mi-read-only-tag></div>
          <div>
            <mi-read-only-tag type="negative">ロック中</mi-read-only-tag>
          </div>
          <div>
            <mi-read-only-tag type="information">現任</mi-read-only-tag>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${withIcon("positive", "arrow-up-small", [
            "黒字化",
            "上昇",
            "増益",
            "増収",
            "増収・増益",
          ])}
          ${withIcon("negative", "arrow-down-small", [
            "赤字化",
            "減少",
            "減益",
            "減収",
            "減収・減益",
          ])}
        </div>
      </div>
    `;
  },
};
