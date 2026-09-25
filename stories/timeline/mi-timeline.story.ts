import "../../src/components/timeline/mi-timeline";
import "../../src/components/timeline/mi-timeline-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  type MiTimeline,
  timelineItemSpacings,
} from "../../src/components/timeline/mi-timeline";
import {
  expert,
  news,
  people,
  sectionHeading,
  timelineLinkStyles,
} from "./content-layouts";

const careers = [
  { date: "2018年07月", text: "常務執行役員" },
  { date: "2018年07月", text: "法人事業統括" },
  { date: "2018年07月", text: "事業戦略・マーケティング担当" },
  {
    date: "2018年07月",
    text: "法人事業統括付(エンタープライズ営業・デジタルマーケティング・カスタマーケア担当)",
  },
  { date: "2018年07月", text: "専務執行役員", current: true, emphasized: true },
];

const careerItems = careers.map(
  ({ date, text, current, emphasized }) => html`
    <mi-timeline-item ?emphasized=${emphasized}>
      ${people(date, text, current)}
    </mi-timeline-item>
  `,
);

const meta = {
  component: "mi-timeline",
  title: "Components/Timeline/mi-timeline",
  parameters: {
    docs: {
      description: {
        component: [
          "出来事や状態の変化を時系列に沿って並べるコンテナです。",
          "中に mi-timeline-item を並べて使います。",
          "",
          "先頭・末尾の接続線の出し分けは、このコンテナが表示中のアイテムを",
          "数えて判定します。hidden を付けたアイテムは数えないので、",
          "末尾を隠しても線が宙に浮きません。",
          "",
          "アイテム同士の間隔は、このコンテナの `item-spacing` で一括制御します。",
          "",
          "アイテムの中身は slot で、レイアウトは利用側で組みます。",
          "代表的な組み方は PeopleLayout / NewsLayout / ExpertLayout にあります。",
        ].join("\n"),
      },
    },
  },
  args: {
    itemSpacing: "normal",
  },
  argTypes: {
    itemSpacing: {
      name: "item-spacing",
      control: { type: "select" },
      options: [...timelineItemSpacings],
      description: "アイテム同士の間隔",
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<MiTimeline>;

export default meta;
type Story = StoryObj<MiTimeline>;

export const Basic: Story = {
  render: ({ itemSpacing }) => html`
    <div style="max-inline-size: 800px;">
      <mi-timeline item-spacing=${itemSpacing} aria-label="職歴">
        ${careerItems}
      </mi-timeline>
    </div>
  `,
};

/** item-spacing でアイテム同士の間隔を切り替えます。 */
export const ItemSpacings: Story = {
  render: () => html`
    <div style="display: flex; gap: 48px; align-items: flex-start;">
      ${timelineItemSpacings.map(
        (spacing) => html`
          <div style="max-inline-size: 360px;">
            <div style="margin-block-end: 8px; font-size: 12px;">
              item-spacing="${spacing}"
            </div>
            <mi-timeline item-spacing=${spacing} aria-label="職歴">
              ${careerItems}
            </mi-timeline>
          </div>
        `,
      )}
    </div>
  `,
};

/** アイテムが 1 件だけの場合は、上下の接続線がどちらも表示されません。 */
export const SingleItem: Story = {
  render: ({ itemSpacing }) => html`
    <div style="max-inline-size: 800px;">
      <mi-timeline item-spacing=${itemSpacing} aria-label="職歴">
        <mi-timeline-item>${people("2018年07月", "取締役")}</mi-timeline-item>
      </mi-timeline>
    </div>
  `,
};

/**
 * 経歴の組み方。
 *
 * 日付を 88px でそろえ、本文を右に置きます。本文には `mi-read-only-tag` のような
 * 別のコンポーネントも混ぜられます。
 *
 * 本文は折り返します（2 件目が折り返しの例）。日付は折り返さず幅を保ちます。
 */
export const PeopleLayout: Story = {
  render: () => html`
    <div style="max-inline-size: 800px;">
      <mi-timeline aria-label="職歴">
        <mi-timeline-item>
          ${people("2018年07月", "常務執行役員")}
        </mi-timeline-item>
        <mi-timeline-item emphasized>
          ${people(
            "2018年07月",
            "法人事業統括付(エンタープライズ営業・デジタルマーケティング・カスタマーケア担当)",
            true,
          )}
        </mi-timeline-item>
      </mi-timeline>
    </div>
  `,
};

/**
 * ニュースの組み方。
 *
 * 日付 / 見出し / 補足を縦に積みます。1 件あたりの情報量が多いので
 * `item-spacing="loose"` と組み合わせます。
 *
 * 補足行のリンクは `<a>` で、`:link` と `:visited` を同じ色にそろえています。
 */
export const NewsLayout: Story = {
  render: () => html`
    <div style="max-inline-size: 800px;">
      ${timelineLinkStyles}
      <mi-timeline item-spacing="loose" aria-label="タイムライン">
        <mi-timeline-item>
          ${news(
            "2025/08/08",
            "豪華キャストを起用したクライムアクション『サンプル101』の日米同時公開を発表",
            "企業リリース：",
            "(株)サンプル・ピクチャーズ]＜犯罪小説の名匠＞の原作を豪華キャストで映画化した超一級のクライムアクション・スリラー『サンプル101』2/13（金）日米同時公開決定！",
          )}
        </mi-timeline-item>
        <mi-timeline-item>
          ${news(
            "2025/08/08",
            "人気サバイバル・スリラーシリーズの続編『サンプル28』の日米同時公開を発表",
            "企業リリース：",
            "映画『サンプル28』 6月20日（金） 日米同時公開決定!",
            "https://example.com/news/sample-28",
          )}
        </mi-timeline-item>
        <mi-timeline-item emphasized>
          ${news(
            "2025/08/08",
            "1980年代からの人気シリーズ最新作『サンプル・レジェンズ』の日本公開を発表",
          )}
        </mi-timeline-item>
      </mi-timeline>
    </div>
  `,
};

/**
 * 在籍履歴の組み方。
 *
 * 会社名・期間・所属をすべて 12px で積み、会社名だけ太字にします。
 * PeopleLayout / NewsLayout と違って全体が 12px なので注意してください。
 */
export const ExpertLayout: Story = {
  render: () => html`
    <div style="max-inline-size: 800px;">
      <mi-timeline aria-label="在籍履歴">
        <mi-timeline-item emphasized>
          ${expert(
            "株式会社サンプルホールディングス",
            "2024/05 - 在籍中",
            "CEO室　マネジャー",
          )}
        </mi-timeline-item>
        <mi-timeline-item>
          ${expert(
            "株式会社サンプルホールディングス",
            "2023/05 - 2024/04",
            "事業戦略本部　マネジャー",
          )}
        </mi-timeline-item>
        <mi-timeline-item>
          ${expert(
            "株式会社サンプルホールディングス",
            "2021/04 - 2023/04",
            "Airプロダクトdivision　マネジャー",
          )}
        </mi-timeline-item>
      </mi-timeline>
    </div>
  `,
};

/**
 * 画面としての組み立て例。
 *
 * 会社ごとに mi-timeline を分けて並べます。1 画面に複数のタイムラインが載るため、
 * それぞれに `aria-label` を付けてスクリーンリーダーで区別できるようにします。
 *
 * 見出しは折りたたみ機能付きの見出しに相当しますが、
 * このライブラリには無いため素の見出しで代用しています。
 */
export const ScreenExample: Story = {
  render: () => html`
    <div style="max-inline-size: 800px;">
      ${sectionHeading("株式会社サンプルグループ")}
      <mi-timeline aria-label="株式会社サンプルグループでの職歴"
        >${careerItems}</mi-timeline
      >

      ${sectionHeading("サンプルバンキングシステム株式会社")}
      <mi-timeline aria-label="サンプルバンキングシステム株式会社での職歴">
        <mi-timeline-item>${people("2018年07月", "取締役")}</mi-timeline-item>
      </mi-timeline>

      ${sectionHeading("株式会社サンプルオファー")}
      <mi-timeline aria-label="株式会社サンプルオファーでの職歴">
        <mi-timeline-item>${people("2018年07月", "取締役")}</mi-timeline-item>
        <mi-timeline-item>${people("2018年07月", "取締役")}</mi-timeline-item>
      </mi-timeline>

      ${sectionHeading("サンプルテクノロジー株式会社")}
      <mi-timeline aria-label="サンプルテクノロジー株式会社での職歴">
        <mi-timeline-item>${people("2018年07月", "取締役")}</mi-timeline-item>
      </mi-timeline>
    </div>
  `,
};
