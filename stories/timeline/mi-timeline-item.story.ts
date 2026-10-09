import "../../src/components/timeline/mi-timeline";
import "../../src/components/timeline/mi-timeline-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiTimelineItem } from "../../src/components/timeline/mi-timeline-item";

const meta = {
  component: "mi-timeline-item",
  title: "Components/Timeline/mi-timeline-item",
  parameters: {
    docs: {
      description: {
        component: [
          "時系列上のひとつの出来事を表すアイテムです。",
          "左側にドットと接続線、右側に slot のコンテンツを表示します。",
          "",
          "mi-timeline の中に並べて使います。先頭の上線・末尾の下線は",
          "親の mi-timeline が表示中のアイテムを数えて判定するため、",
          "位置を指定するプロパティはありません。",
          "",
          "emphasized はドットの色でしか表現されないため、色が判別できないユーザーにも",
          "伝わるよう slot のコンテンツ側でも補完してください。",
          "",
          "slot の中身のレイアウトは利用側で組みます。",
          "代表的な組み方は mi-timeline のストーリーにまとめてあります。",
        ].join("\n"),
      },
    },
  },
  args: {
    emphasized: false,
  },
  argTypes: {
    emphasized: {
      control: { type: "boolean" },
      description: "強調表示（ドットの色が変わる）",
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiTimelineItem>;

export default meta;
type Story = StoryObj<MiTimelineItem>;

export const Basic: Story = {
  render: ({ emphasized }) => html`
    <mi-timeline aria-label="職歴">
      <mi-timeline-item ?emphasized=${emphasized}>
        2026年1月15日 正式リリース
      </mi-timeline-item>
      <mi-timeline-item>2025年12月3日 ベータ版を公開</mi-timeline-item>
    </mi-timeline>
  `,
};

/** emphasized を付けるとドットが強調色になります。 */
export const Emphasized: Story = {
  render: () => html`
    <mi-timeline aria-label="ステータスの推移">
      <mi-timeline-item emphasized>最新（emphasized）</mi-timeline-item>
      <mi-timeline-item>通常</mi-timeline-item>
      <mi-timeline-item>通常</mi-timeline-item>
    </mi-timeline>
  `,
};
