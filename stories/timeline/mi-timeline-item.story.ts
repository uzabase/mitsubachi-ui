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
          "接続線は親の mi-timeline が位置を判定して出し分けるため、",
          "単体で置いたこのストーリーではドットだけが表示されます。",
          "",
          "emphasized はドットの色でしか表現されないため、色が判別できないユーザーにも",
          "伝わるよう slot のコンテンツ側でも補完してください。",
          "",
          "アイテム自体はフォーカス対象にならず、イベントも発火しません。",
          "リンクやボタンは slot の中に置いてください。",
          "",
          "並べたときの見た目と中身の組み方は mi-timeline のストーリーを参照してください。",
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
  render: ({ emphasized }) => html`
    <mi-timeline-item ?emphasized=${emphasized}>
      2026年1月15日 正式リリース
    </mi-timeline-item>
  `,
  tags: ["!dev-only"],
} satisfies Meta<MiTimelineItem>;

export default meta;
type Story = StoryObj<MiTimelineItem>;

export const Basic: Story = {};
