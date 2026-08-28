import "../../src/components/link-tag/mi-link-tag";
import "../../src/components/link-tag/mi-link-tag-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { LinkTagSize } from "../../src/components/link-tag/mi-link-tag";
import type { MiLinkTagGroup } from "../../src/components/link-tag/mi-link-tag-group";

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

function tags(size: LinkTagSize) {
  return labels.map(
    (label) => html`<mi-link-tag href="#" size=${size}>${label}</mi-link-tag>`,
  );
}

const meta = {
  component: "mi-link-tag-group",
  title: "Components/LinkTag/mi-link-tag-group",
  parameters: {
    docs: {
      description: {
        component: [
          "複数の mi-link-tag を一定の間隔で並べるコンテナです。",
          "幅に収まらないタグは次の行へ折り返します。",
          "",
          "サイズは mi-link-tag 側の `size` で指定します。タグの間隔はサイズによらず一定のため、",
          "グループはサイズに関与しません。",
        ].join("\n"),
      },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiLinkTagGroup>;

export default meta;
type Story = StoryObj<MiLinkTagGroup>;

export const Basic: Story = {
  render: () => html`<mi-link-tag-group>${tags("medium")}</mi-link-tag-group>`,
};

/** コンテナの幅に収まらないタグは次の行へ折り返します。 */
export const Wrapped: Story = {
  render: () => html`
    <div style="inline-size: 360px; outline: 1px dashed #ccc;">
      <mi-link-tag-group>${tags("medium")}</mi-link-tag-group>
    </div>
  `,
};

/** タグの間隔はサイズによらず一定です。 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <mi-link-tag-group>${tags("x-small")}</mi-link-tag-group>
      <mi-link-tag-group>${tags("small")}</mi-link-tag-group>
      <mi-link-tag-group>${tags("medium")}</mi-link-tag-group>
    </div>
  `,
};
