import "../../src/components/avatar/mi-avatar";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import { type MiAvatar } from "../../src/components/avatar/mi-avatar";

const meta = {
  component: "mi-avatar",
  title: "Avatar/mi-avatar",
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
  render: (args) => html`
    <mi-avatar
      src=${args.src || nothing}
      alt=${args.alt || nothing}
      initials=${args.initials || nothing}
      size=${args.size || nothing}
      color=${args.color || nothing}
      ?inactive=${args.inactive}
      @click=${args.onclick}
    >
    </mi-avatar>
  `,
} satisfies Meta<MiAvatar>;

export default meta;
type Story = StoryObj<MiAvatar>;

export const Basic: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
  },
  parameters: {
    controls: { disable: false },
    actions: { disable: false },
    interactions: { disable: false },
  },
};

export const AboutInitials: Story = {
  render: () => html`
    <div style="padding: 16px; line-height: 1.6;">
      イニシャル表示機能の詳細については、<a
        href="?path=/docs/avatar-mi-avatar-withinitials--docs"
        style="color: #1976d2; text-decoration: none; font-weight: 500;"
        >WithInitialsストーリー</a
      >で確認できます。
    </div>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    docs: {
      description: {
        story:
          "イニシャル表示機能の詳細については、[WithInitialsストーリー](?path=/docs/avatar-mi-avatar-withinitials--docs)で確認できます。",
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    src: "",
    initials: "",
    size: "medium",
  },
  parameters: {
    controls: { disable: false },
    actions: { disable: false },
    interactions: { disable: true },
    docs: {
      description: {
        story: "画像もイニシャルもない場合、アイコン（person）が表示されます。",
      },
    },
  },
};

export const Inactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <div style="margin-bottom: 12px; font-weight: bold; font-size: 16px;">
          Inactive状態
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <div style="text-align: center;">
            <mi-avatar
              src="https://i.pravatar.cc/150?img=3"
              alt="削除されたユーザー"
              inactive
            ></mi-avatar>
            <div style="margin-top: 8px; font-size: 12px;">画像</div>
          </div>
          <div style="text-align: center;">
            <mi-avatar initials="TA" color="plum" inactive></mi-avatar>
            <div style="margin-top: 8px; font-size: 12px;">イニシャル</div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    docs: {
      description: {
        story:
          "休止状態・停止状態を表すinactive属性。削除されたアカウントなど、視覚的に無効化されていることを示す場合に使用します。\n\n" +
          "**Disabledとの違い**: Disabledは「操作ができない状態」を表すのに対し、Inactiveは「休止・停止状態」を視覚的に表現します。",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <div style="margin-bottom: 8px; font-weight: bold;">画像</div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <mi-avatar
            size="small"
            src="https://i.pravatar.cc/150?img=2"
            alt="ユーザー"
          ></mi-avatar>
          <mi-avatar
            size="medium"
            src="https://i.pravatar.cc/150?img=2"
            alt="ユーザー"
          ></mi-avatar>
          <mi-avatar
            size="large"
            src="https://i.pravatar.cc/150?img=2"
            alt="ユーザー"
          ></mi-avatar>
          <mi-avatar
            size="x-large"
            src="https://i.pravatar.cc/150?img=2"
            alt="ユーザー"
          ></mi-avatar>
          <mi-avatar
            size="2x-large"
            src="https://i.pravatar.cc/150?img=2"
            alt="ユーザー"
          ></mi-avatar>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 8px; font-weight: bold;">イニシャル</div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <mi-avatar size="small" color="plum">TA</mi-avatar>
          <mi-avatar size="medium" color="violet">TA</mi-avatar>
          <mi-avatar size="large" color="blue">TA</mi-avatar>
          <mi-avatar size="x-large" color="viridian">TA</mi-avatar>
          <mi-avatar size="2x-large" color="green">TA</mi-avatar>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 8px; font-weight: bold;">アイコン</div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <mi-avatar size="small"></mi-avatar>
          <mi-avatar size="medium"></mi-avatar>
          <mi-avatar size="large"></mi-avatar>
          <mi-avatar size="x-large"></mi-avatar>
          <mi-avatar size="2x-large"></mi-avatar>
        </div>
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    docs: {
      description: {
        story:
          "サイズは small, medium, large, x-large, 2x-large の5種類があります。画像、イニシャル、アイコンの各パターンで確認できます。",
      },
    },
  },
};

export const FallbackBehavior: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <mi-avatar src="https://invalid-url.example.com/image.jpg" color="brown"
        >JY</mi-avatar
      >
      <mi-avatar src="" color="red">CI</mi-avatar>
      <mi-avatar color="plum">KW</mi-avatar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "画像の読み込みに失敗した場合、自動的にイニシャルにフォールバックします。",
      },
    },
  },
};

export const ALL: Story = {
  render: () => html`
    <style>
      .all-patterns-container {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 100%;
      }
      .all-patterns-container table {
        border-collapse: collapse;
        width: 100%;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
      }
      .all-patterns-container caption {
        text-align: left;
        font-weight: bold;
        font-size: 16px;
        padding: 16px;
        background: #f5f5f5;
        border-bottom: 2px solid #e0e0e0;
      }
      .all-patterns-container th {
        background: #fafafa;
        padding: 12px 16px;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #e0e0e0;
      }
      .all-patterns-container td {
        padding: 16px;
        text-align: center;
        border-bottom: 1px solid #f0f0f0;
        vertical-align: middle;
      }
      .all-patterns-container tbody tr:last-child td {
        border-bottom: none;
      }
      .all-patterns-container tbody tr:hover {
        background: #fafafa;
      }
    </style>
    <div class="all-patterns-container">
      <table>
        <caption>
          サイズバリエーション（画像）
        </caption>
        <thead>
          <tr>
            <th>Small</th>
            <th>Medium</th>
            <th>Large</th>
            <th>X-Large</th>
            <th>2X-Large</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <mi-avatar
                size="small"
                src="https://i.pravatar.cc/150?img=7"
                alt="ユーザー"
              ></mi-avatar>
            </td>
            <td>
              <mi-avatar
                size="medium"
                src="https://i.pravatar.cc/150?img=8"
                alt="ユーザー"
              ></mi-avatar>
            </td>
            <td>
              <mi-avatar
                size="large"
                src="https://i.pravatar.cc/150?img=9"
                alt="ユーザー"
              ></mi-avatar>
            </td>
            <td>
              <mi-avatar
                size="x-large"
                src="https://i.pravatar.cc/150?img=10"
                alt="ユーザー"
              ></mi-avatar>
            </td>
            <td>
              <mi-avatar
                size="2x-large"
                src="https://i.pravatar.cc/150?img=11"
                alt="ユーザー"
              ></mi-avatar>
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          サイズバリエーション（イニシャル）
        </caption>
        <thead>
          <tr>
            <th>Small</th>
            <th>Medium</th>
            <th>Large</th>
            <th>X-Large</th>
            <th>2X-Large</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><mi-avatar size="small" color="plum">TA</mi-avatar></td>
            <td><mi-avatar size="medium" color="violet">TA</mi-avatar></td>
            <td><mi-avatar size="large" color="blue">TA</mi-avatar></td>
            <td><mi-avatar size="x-large" color="viridian">TA</mi-avatar></td>
            <td><mi-avatar size="2x-large" color="green">TA</mi-avatar></td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          サイズバリエーション（アイコン）
        </caption>
        <thead>
          <tr>
            <th>Small</th>
            <th>Medium</th>
            <th>Large</th>
            <th>X-Large</th>
            <th>2X-Large</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><mi-avatar size="small"></mi-avatar></td>
            <td><mi-avatar size="medium"></mi-avatar></td>
            <td><mi-avatar size="large"></mi-avatar></td>
            <td><mi-avatar size="x-large"></mi-avatar></td>
            <td><mi-avatar size="2x-large"></mi-avatar></td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          イニシャルのパターン
        </caption>
        <thead>
          <tr>
            <th>入力</th>
            <th>アバター</th>
            <th>出力</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"ta"</td>
            <td><mi-avatar color="plum">TA</mi-avatar></td>
            <td>"TA"</td>
            <td>小文字→大文字</td>
          </tr>
          <tr>
            <td>"TARO"</td>
            <td><mi-avatar color="violet">TA</mi-avatar></td>
            <td>"TA"</td>
            <td>4文字→2文字</td>
          </tr>
          <tr>
            <td>" hs "</td>
            <td><mi-avatar color="blue">HS</mi-avatar></td>
            <td>"HS"</td>
            <td>空白除去</td>
          </tr>
          <tr>
            <td>"A"</td>
            <td><mi-avatar color="viridian">A</mi-avatar></td>
            <td>"A"</td>
            <td>1文字</td>
          </tr>
          <tr>
            <td>"9."</td>
            <td><mi-avatar color="green">9.</mi-avatar></td>
            <td>"9."</td>
            <td>記号混在</td>
          </tr>
          <tr>
            <td>"a1b2"</td>
            <td><mi-avatar color="brown">A1</mi-avatar></td>
            <td>"A1"</td>
            <td>アルファベットと数字</td>
          </tr>
          <tr>
            <td>"123"</td>
            <td><mi-avatar color="red">12</mi-avatar></td>
            <td>"12"</td>
            <td>数字のみ</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          カラーバリエーション（イニシャル表示時のみ有効）
        </caption>
        <thead>
          <tr>
            <th>カラー</th>
            <th>アバター</th>
            <th>カラーコード</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>デフォルト（グレー）</td>
            <td><mi-avatar color="">DE</mi-avatar></td>
            <td>rgba(0, 0, 0, 0.05)</td>
          </tr>
          <tr>
            <td>plum</td>
            <td><mi-avatar color="plum">PL</mi-avatar></td>
            <td>#910091</td>
          </tr>
          <tr>
            <td>violet</td>
            <td><mi-avatar color="violet">VI</mi-avatar></td>
            <td>#3E31D5</td>
          </tr>
          <tr>
            <td>blue</td>
            <td><mi-avatar color="blue">BL</mi-avatar></td>
            <td>#214DDE</td>
          </tr>
          <tr>
            <td>viridian</td>
            <td><mi-avatar color="viridian">VR</mi-avatar></td>
            <td>#0D8282</td>
          </tr>
          <tr>
            <td>green</td>
            <td><mi-avatar color="green">GR</mi-avatar></td>
            <td>#008744</td>
          </tr>
          <tr>
            <td>brown</td>
            <td><mi-avatar color="brown">BR</mi-avatar></td>
            <td>#AE6022</td>
          </tr>
          <tr>
            <td>red</td>
            <td><mi-avatar color="red">RD</mi-avatar></td>
            <td>#D30030</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "mi-avatarコンポーネントの全パターンを一覧表示します。画像、イニシャル、アイコンの3種類の表示パターンと、5種類のサイズバリエーション、8種類のカラーバリエーションを確認できます。",
      },
    },
  },
};
