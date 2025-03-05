import "../../src/components/button/sp-button";

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";

import { type SpButton } from "../../src/components/button/sp-button";
import {
  size,
  variants,
} from "../../src/components/button/ub-button";

const meta = {
  component: "sp-button",
  argTypes: {
    slot: { type: "string" },
    danger: {type: "boolean"},
    variants: {
      control: { type: "select" },
      options: variants,
    },
    size: {
      control: { type: "select" },
      options: size,
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    name: {type: "string"},
    value: {type: "string"},
    type: {
      control: {type: "select"},
      options: [undefined, "submit", "reset", "button"],
    }
  },
  args: {
    slot: "ダウンロード",
    danger: false,
    variants: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    type: undefined,
  },
  render: (args) => html`
    <sp-button
      ?danger=${args.danger}
      variants=${args.variants}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      type=${args.type || nothing}
      value=${args.value || nothing}
    >
      ${args.slot}
    </sp-button>
  `,
} satisfies Meta<SpButton>;

export default meta;
type Story = StoryObj<SpButton>;

export const Basic: Story = {
  args: {
    danger: undefined,
    variants: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
  },
  tags: ["!dev-only"],
};

export const FullWidth: Story = {
  render: () => html`
    <sp-button style="width: 100%;">ダウンロード</sp-button>
    <div style="width: 400px;">
      <sp-button style="width: 100%;">ダウンロード</sp-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "ボタンの幅を100%にしたい時はWeb Componentsのデフォルトのスタイルを上書きしてください。",
      },
    },
  },
};

export const OverflowWrap: Story = {
  render: () => html`
    <p style="overflow-wrap: break-word;">
      texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
    </p>
    <sp-button>text</sp-button>
    <sp-button>text</sp-button>
    <sp-button
      >texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</sp-button
    >
    <sp-button
      >texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</sp-button
    >
    <sp-button
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.</sp-button
    >
    <sp-button
      >にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご</sp-button
    >
    <div style="display: flex; min-width: 0;">
      <div>サンプルdiv</div>
      <sp-button
        >texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</sp-button
      >
    </div>
    <div style="display: flex; min-width: 0;">
      <div>サンプルdiv</div>
      <sp-button
        >texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</sp-button
      >
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "文字の折り返しを確認する",
      },
    },
  },
};

export const ALL: Story = {
  render: () => html`
    <div
      style="display:flex; flex-direction:column; gap:24px; align-items: flex-start;"
    >
      <!-- ノーマルタイプ -->
      <table>
        <caption>
          タイプ: ノーマル
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            <th>プライマリ</th>
            <th>セカンダリ</th>
            <th>ターシャリ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            <td>
              <sp-button variants="primary">ボタン</sp-button>
            </td>
            <td>
              <sp-button variants="secondary">ボタン</sp-button>
            </td>
            <td>
              <sp-button variants="tertiary">ボタン</sp-button>
            </td>
          </tr>
          <tr>
            <th>無効</th>
            <td>
              <sp-button variants="primary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button variants="secondary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button variants="tertiary" disabled
                >ボタン</sp-button
              >
            </td>
          </tr>
          <tr>
            <th>読み込み中</th>
            <td>
              <sp-button variants="primary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button variants="secondary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button variants="tertiary" loading
                >ボタン</sp-button
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- デンジャータイプ -->
      <table>
        <caption>
          タイプ: デンジャー
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            <th>プライマリ</th>
            <th>セカンダリ</th>
            <th>ターシャリ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            <td>
              <sp-button danger variants="primary">ボタン</sp-button>
            </td>
            <td>
              <sp-button danger variants="secondary">ボタン</sp-button>
            </td>
            <td>
              <sp-button danger variants="tertiary">ボタン</sp-button>
            </td>
          </tr>
          <tr>
            <th>無効</th>
            <td>
              <sp-button danger variants="primary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button danger variants="secondary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button danger variants="tertiary" disabled
                >ボタン</sp-button
              >
            </td>
          </tr>
          <tr>
            <th>読み込み中</th>
            <td>
              <sp-button danger variants="primary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button danger variants="secondary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button danger variants="tertiary" loading
                >ボタン</sp-button
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- サイズバリエーション -->
      <table>
        <caption>
          サイズバリエーション
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>medium</th>
            <th>large</th>
            <th>xLarge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ノーマル</td>
            <td><sp-button size="medium">ボタン</sp-button></td>
            <td><sp-button size="large">ボタン</sp-button></td>
            <td><sp-button size="xLarge">ボタン</sp-button></td>
          </tr>
          <tr>
            <td>デンジャー</td>
            <td><sp-button danger size="medium">ボタン</sp-button></td>
            <td><sp-button danger size="large">ボタン</sp-button></td>
            <td><sp-button danger size="xLarge">ボタン</sp-button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "sp-buttonコンポーネントの全パターンを一覧表示します。タイプ、バリアント、状態、サイズなど、利用可能な全ての組み合わせを確認できます。",
      },
    },
  },
};
