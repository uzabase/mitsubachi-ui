import "../../src/components/report-heading/mi-report-heading";
import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import {
  type MiReportHeading,
  reportHeadingLevels,
} from "../../src/components/report-heading/mi-report-heading";

const meta: Meta<MiReportHeading> = {
  component: "mi-report-heading",
  title: "Components/ReportHeading/mi-report-heading",
  parameters: {
    docs: {
      description: {
        component: [
          "レポートや記事などの読み物コンテンツの中で、内容の区切りや構造を示す見出しです。",
          "`level` の値に対応した HTML の見出し要素（`<h1>`〜`<h6>`）としてレンダリングされます。",
          "",
          "> **Note:** UI（画面）の見出しには使いません。読み物コンテンツの見出しにのみ使用してください。",
          '> 見出しの階層は飛ばさないでください（`level="2"` の次に `level="4"` など）。',
          "> 見た目だけを理由にレベルを選ぶと、文書構造が崩れてスクリーンリーダーの見出しナビゲーションを妨げます。",
        ].join("\n"),
      },
    },
  },
  args: {
    level: 1,
    appearanceLevel: undefined,
  },
  argTypes: {
    level: {
      control: { type: "select" },
      options: [...reportHeadingLevels],
      description:
        "見出しの階層。`<h1>`〜`<h6>` に対応します。範囲外の値を指定した場合は `1` として扱います",
    },
    appearanceLevel: {
      control: { type: "select" },
      options: ["未指定", ...reportHeadingLevels],
      mapping: { 未指定: undefined },
      description:
        "見た目だけを別のレベルに差し替えます。**通常は指定しません**。未指定なら `level` と同じ見た目になります",
    },
  },
  tags: ["!dev-only"],
};
export default meta;

type Story = StoryObj<MiReportHeading>;

export const Default: Story = {
  render: ({ level, appearanceLevel }) => html`
    <mi-report-heading
      level=${level}
      appearance-level=${appearanceLevel ?? nothing}
    >
      市場環境の変化
    </mi-report-heading>
  `,
};

export const Levels: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "level 1〜6 の見た目です。level 2 には下線、level 3 には左に赤いバーが付きます。level 6 は文字色が弱くなります。",
          "",
          "コンポーネント自体は上下の余白を持ちません（この例では並べるために外側で余白を付けています）。",
          "周囲のコンポーネントとの余白はレイアウト側で設定してください。",
          "",
          "画面幅 720px 以下では level 1 と level 6 のタイポグラフィが自動で切り替わります。",
        ].join("\n"),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${reportHeadingLevels.map(
        (level) => html`
          <mi-report-heading level=${level}>
            level ${level} の見出し
          </mi-report-heading>
        `,
      )}
    </div>
  `,
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`action` スロットに要素を入れると、見出しの右端にアクション領域が表示されます。スロットが空のときは領域自体が描画されません。",
      },
    },
  },
  render: ({ level, appearanceLevel }) => html`
    <mi-report-heading
      level=${level}
      appearance-level=${appearanceLevel ?? nothing}
    >
      市場環境の変化
      <mi-neutral-button slot="action" variant="secondary">
        編集
      </mi-neutral-button>
      <mi-neutral-button slot="action" variant="secondary">
        共有
      </mi-neutral-button>
    </mi-report-heading>
  `,
};

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "見出しが長い場合は折り返します。アクション領域は折り返さず、右端に残ります。",
      },
    },
  },
  render: ({ level, appearanceLevel }) => html`
    <div style="max-inline-size: 480px;">
      <mi-report-heading
        level=${level}
        appearance-level=${appearanceLevel ?? nothing}
      >
        国内外の市場環境の変化と、それにともなう事業ポートフォリオの見直しについての考察
        <mi-neutral-button slot="action" variant="secondary">
          編集
        </mi-neutral-button>
      </mi-report-heading>
    </div>
  `,
};

/**
 * **見出しレベル（`level`）と見た目は揃っているのが原則です。** 通常は `level` だけを指定してください。
 *
 * 文書構造と見た目が一致しない配置でのみ、`appearance-level` で
 * **文書構造（h1〜h6）はそのままに見た目だけ**を差し替えられます。
 *
 * 下の例は「ページに他の `<h1>` が無いため構造上は `<h1>` にしたいが、見た目は level 2 にしたい」場合です。
 * どちらも `<h1>` として描画されますが、見た目だけが異なります。
 */
export const AppearanceOverride: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <mi-report-heading level="1">
        level=1（既定。見た目も level 1）
      </mi-report-heading>
      <mi-report-heading level="1" appearance-level="2">
        level=1 appearance-level=2（構造は h1、見た目は level 2）
      </mi-report-heading>
    </div>
  `,
};
