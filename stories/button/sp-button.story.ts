import "../../src/components/button/sp-button";

import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import {
  buttonType,
  size,
  type SpButton,
  variants,
} from "../../src/components/button/sp-button";

const meta = {
  component: "sp-button",
  argTypes: {
    slot: { type: "string" },
    type: {
      control: { type: "select" },
      options: buttonType,
    },
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
  },
  args: {
    slot: "ダウンロード",
    type: "normal",
    variants: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
  },
  render: (args) => html`
    <sp-button
      type=${args.type}
      variants=${args.variants}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
    >
      ${args.slot}
    </sp-button>
  `,
} satisfies Meta<SpButton>;

export default meta;
type Story = StoryObj<SpButton>;

export const Basic: Story = {
  args: {
    type: undefined,
    variants: undefined,
    size: undefined,
    loading: undefined,
    disabled: undefined,
  },
  tags: ["!dev-only"],
};

export const OverflowWrap: Story = {
  render: () => html`
    <p style="overflow-wrap: break-word;">
      texttexttexttexttexttexttextttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
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
      >にほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんごにほんご</sp-button
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
              <sp-button type="normal" variants="primary">ボタン</sp-button>
            </td>
            <td>
              <sp-button type="normal" variants="secondary">ボタン</sp-button>
            </td>
            <td>
              <sp-button type="normal" variants="tertiary">ボタン</sp-button>
            </td>
          </tr>
          <tr>
            <th>無効</th>
            <td>
              <sp-button type="normal" variants="primary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="normal" variants="secondary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="normal" variants="tertiary" disabled
                >ボタン</sp-button
              >
            </td>
          </tr>
          <tr>
            <th>読み込み中</th>
            <td>
              <sp-button type="normal" variants="primary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="normal" variants="secondary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="normal" variants="tertiary" loading
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
              <sp-button type="danger" variants="primary">ボタン</sp-button>
            </td>
            <td>
              <sp-button type="danger" variants="secondary">ボタン</sp-button>
            </td>
            <td>
              <sp-button type="danger" variants="tertiary">ボタン</sp-button>
            </td>
          </tr>
          <tr>
            <th>無効</th>
            <td>
              <sp-button type="danger" variants="primary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="danger" variants="secondary" disabled
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="danger" variants="tertiary" disabled
                >ボタン</sp-button
              >
            </td>
          </tr>
          <tr>
            <th>読み込み中</th>
            <td>
              <sp-button type="danger" variants="primary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="danger" variants="secondary" loading
                >ボタン</sp-button
              >
            </td>
            <td>
              <sp-button type="danger" variants="tertiary" loading
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
            <td><sp-button type="danger" size="medium">ボタン</sp-button></td>
            <td><sp-button type="danger" size="large">ボタン</sp-button></td>
            <td><sp-button type="danger" size="xLarge">ボタン</sp-button></td>
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
