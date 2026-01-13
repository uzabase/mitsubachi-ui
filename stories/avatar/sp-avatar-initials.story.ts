import "../../src/components/avatar/sp-avatar";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import { type SpAvatar } from "../../src/components/avatar/sp-avatar";

const meta = {
  component: "sp-avatar",
  title: "Avatar/sp-avatar/WithInitials",
  tags: ["!dev-only"],
  argTypes: {
    src: {
      type: "string",
      description: "アバター画像のURL",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    alt: {
      type: "string",
      description: "画像のalt属性（アクセシビリティ用）",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    initials: {
      type: "string",
      description:
        "イニシャル（画像がない場合に表示される1-2文字のテキスト）。" +
        "セキュリティのため、メールアドレスやフルネームではなく、事前に計算されたイニシャルを渡してください。",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "x-large", "2x-large"],
      description: "アバターのサイズ",
      table: {
        type: {
          summary: '"small" | "medium" | "large" | "x-large" | "2x-large"',
        },
        defaultValue: { summary: '"medium"' },
      },
    },
    onclick: {
      action: "onclick",
      description: "クリック時のイベントハンドラ",
    },
    color: {
      control: { type: "select" },
      options: [
        "",
        "plum",
        "violet",
        "blue",
        "viridian",
        "green",
        "brown",
        "red",
      ],
      description:
        "イニシャル表示時の背景色（plum, violet, blue, viridian, green, brown, red のいずれか、空文字の場合はグレー）",
      table: {
        type: {
          summary:
            '"plum" | "violet" | "blue" | "viridian" | "green" | "brown" | "red" | ""',
        },
        defaultValue: { summary: '""' },
      },
    },
    inactive: {
      control: { type: "boolean" },
      description:
        "休止状態・停止状態を表す（削除されたアカウントなど）。グレースケール + 透明度で視覚的に表現。",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    src: "",
    alt: "",
    initials: "TA",
    size: "medium",
    onclick: action("onclick"),
    inactive: false,
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
} satisfies Meta<SpAvatar>;

export default meta;
type Story = StoryObj<SpAvatar>;

export const Basic: Story = {
  args: {
    initials: "TA",
    color: "plum",
  },
  render: (args) => html`
    <sp-avatar
      src=${args.src || nothing}
      initials=${args.initials || nothing}
      alt=${args.alt || nothing}
      size=${args.size || nothing}
      color=${args.color || nothing}
      ?inactive=${args.inactive}
      @click=${args.onclick}
    >
    </sp-avatar>
  `,
  parameters: {
    controls: { disable: false },
    actions: { disable: false },
    interactions: { disable: false },
    docs: {
      description: {
        story:
          "イニシャルアバターの基本形。Controlsタブで各プロパティを変更して、動作を確認できます。\n\n" +
          "画像がない場合、イニシャルを表示します。フロント側で以下の処理を自動的に行います：\n\n" +
          "- **2文字制限**: 3文字以上入力しても最初の2文字のみ表示\n" +
          "- **大文字変換**: 小文字を入力しても自動的に大文字に変換\n" +
          "- **空白除去**: 前後の空白を自動的に削除\n\n" +
          "⚠️ **セキュリティ上の注意**: メールアドレスやフルネームなどの個人情報を直接渡さないでください。" +
          "イニシャルはバックエンド側で事前に計算し、個人を特定できない形式（1-2文字）で渡してください。\n\n" +
          "### バックエンド側でのイニシャル計算の推奨方法\n\n" +
          "メールアドレスからイニシャルを抽出する場合、以下のロジックを推奨します：\n\n" +
          "1. メールアドレスの@より前の部分（ローカルパート）を取得\n" +
          "2. アルファベットのみを抽出し、最初の2文字を使用\n\n" +
          "**例:**\n" +
          "- `taro.yamada@uzabase.com` → **TA** (アルファベット「t」「a」を抽出)\n" +
          "- `t-a-r-o@uzabase.com` → **TA** (アルファベット「t」「a」を抽出)\n" +
          "- `9.@uzabase.com` → **9.** (アルファベットがないため先頭2文字)",
      },
    },
  },
};

export const LowerCaseToUpperCase: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
    >
      <div style="text-align: center;">
        <sp-avatar initials="ta" color="plum"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "ta"
        </div>
        <div style="font-size: 14px; color: #666;">→ "TA"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="ab" color="violet"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "ab"
        </div>
        <div style="font-size: 14px; color: #666;">→ "AB"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="xy" color="blue"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "xy"
        </div>
        <div style="font-size: 14px; color: #666;">→ "XY"</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "小文字で入力されたイニシャルは、自動的に大文字に変換されます。",
      },
    },
  },
};

export const TwoCharacterLimit: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
    >
      <div style="text-align: center;">
        <sp-avatar initials="TARO" color="plum"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "TARO"
        </div>
        <div style="font-size: 14px; color: #666;">→ "TA"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="HANAKO" color="violet"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "HANAKO"
        </div>
        <div style="font-size: 14px; color: #666;">→ "HA"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="ABC" color="blue"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "ABC"
        </div>
        <div style="font-size: 14px; color: #666;">→ "AB"</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "3文字以上入力された場合、最初の2文字のみが表示されます。",
      },
    },
  },
};

export const WhitespaceRemoval: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
    >
      <div style="text-align: center;">
        <sp-avatar initials="  hs  " color="plum"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: " hs "
        </div>
        <div style="font-size: 14px; color: #666;">→ "HS"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials=" ab " color="violet"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: " ab "
        </div>
        <div style="font-size: 14px; color: #666;">→ "AB"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="   ta   " color="blue"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: " ta "
        </div>
        <div style="font-size: 14px; color: #666;">→ "TA"</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "前後の空白は自動的に除去されます。",
      },
    },
  },
};

export const SingleCharacter: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
    >
      <div style="text-align: center;">
        <sp-avatar initials="A" color="plum"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "A"
        </div>
        <div style="font-size: 14px; color: #666;">→ "A"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="b" color="violet"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "b"
        </div>
        <div style="font-size: 14px; color: #666;">→ "B"</div>
      </div>
      <div style="text-align: center;">
        <sp-avatar initials="Z" color="blue"></sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          入力: "Z"
        </div>
        <div style="font-size: 14px; color: #666;">→ "Z"</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "1文字のイニシャルもサポートされています。",
      },
    },
  },
};

export const ColorVariations: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
    >
      <div style="text-align: center;">
        <sp-avatar color="">DE</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          デフォルト
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="plum">PL</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          plum
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="violet">VI</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          violet
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="blue">BL</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          blue
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="viridian">VR</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          viridian
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="green">GR</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          green
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="brown">BR</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          brown
        </div>
      </div>
      <div style="text-align: center;">
        <sp-avatar color="red">RD</sp-avatar>
        <div style="margin-top: 8px; font-size: 14px; font-weight: 500;">
          red
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "イニシャル表示時のカラーバリエーション。color属性にplum, violet, blue, viridian, green, brown, redを指定することで、7種類のカラーパレットから選択できます。\n\n" +
          "空文字または無効な値が指定された場合は、デフォルトのグレーで表示されます。",
      },
    },
  },
};
