import "../../src/components/tag/mi-link-tag";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  linkTagSizes,
  type MiLinkTag,
} from "../../src/components/tag/mi-link-tag";

const meta: Meta<MiLinkTag> = {
  component: "mi-link-tag",
  title: "Components/Tag/mi-link-tag",
  parameters: {
    docs: {
      description: {
        component: [
          "コンテンツの属性・分類・出典を簡潔に示すタグです。",
          "タグ自体がクリック可能なリンクとして機能し、関連するカテゴリや項目へ遷移します。",
          "",
          "中身は素の `<a href>` のため、クリックでの遷移・キーボード操作はブラウザのネイティブ挙動です。",
          "カスタムイベントは公開していません。",
        ].join("\n"),
      },
    },
  },
  args: {
    href: "#",
    size: "medium",
  },
  argTypes: {
    href: {
      control: { type: "text" },
      description:
        "リンク先URL。未指定のときは `<a>` に `href` を出力しないため、フォーカスも遷移もできません",
    },
    size: {
      control: { type: "select" },
      options: [...linkTagSizes],
      description: "タグのサイズ",
    },
  },
  render: ({ href, size }) => html`
    <mi-link-tag href=${href} size=${size}>金融</mi-link-tag>
  `,
  tags: ["!dev-only"],
};

export default meta;

type Story = StoryObj<MiLinkTag>;

export const Default: Story = {};

/** サイズは `x-small` / `small` / `medium` の3種です。デフォルトは `medium` です。 */
export const Sizes: Story = {
  render: ({ href }) => html`
    <div style="display: flex; align-items: center; gap: 8px;">
      ${linkTagSizes.map(
        (size) =>
          html`<mi-link-tag href=${href} size=${size}>${size}</mi-link-tag>`,
      )}
    </div>
  `,
};

/**
 * ラベルが幅に収まらない場合は末尾を省略記号で切り詰めます。
 * 収まるタグはそのまま表示されます。
 */
export const LongText: Story = {
  render: ({ href, size }) => html`
    <div style="display: flex; flex-wrap: wrap; gap: 4px; inline-size: 160px;">
      <mi-link-tag href=${href} size=${size}>
        非常に長いカテゴリ名が入った場合のタグ
      </mi-link-tag>
      <mi-link-tag href=${href} size=${size}>そんな</mi-link-tag>
      <mi-link-tag href=${href} size=${size}>長く</mi-link-tag>
      <mi-link-tag href=${href} size=${size}>ない</mi-link-tag>
      <mi-link-tag href=${href} size=${size}>タグ</mi-link-tag>
    </div>
  `,
};

/** `href` を指定しない場合はリンクとして機能しません（フォーカスもできません）。 */
export const WithoutHref: Story = {
  render: ({ size }) => html` <mi-link-tag size=${size}>金融</mi-link-tag> `,
};
