import "../../src/components/button/sp-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import {
  sizes,
  type SpButton,
  variants,
} from "../../src/components/button/sp-button";
import { iconTypes } from "../../src/components/icon/icons";

const meta = {
  component: "sp-button",
  argTypes: {
    slot: { type: "string" },
    danger: { type: "boolean" },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    size: {
      control: { type: "select" },
      options: sizes,
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    name: { type: "string" },
    value: { type: "string" },
    iconType: {
      control: { type: "select" },
      options: ["", ...iconTypes],
    },
  },
  args: {
    slot: "ダウンロード",
    danger: false,
    variant: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    iconType: undefined,
  },
  render: (args) => html`
    <sp-button
      ?danger=${args.danger}
      variant=${args.variant}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
      icon-type=${args.iconType || nothing}
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
    variant: undefined,
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

export const Icon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        ${sizes.map(
          (size) =>
            html`<sp-button icon-type="arrow-down" size="${size}"
              >ダウンロード</sp-button
            >`,
        )}
      </div>
      <div style="display: flex; gap: 16px;">
        ${variants.map(
          (variant) => html`
            <sp-button icon-type="arrow-down" variant="${variant}">
              ダウンロード
            </sp-button>
          `,
        )}
      </div>
      <div style="display: flex; gap: 16px;">
        <sp-button icon-type="arrow-down" danger>ダウンロード</sp-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <sp-button icon-type="arrow-down" loading>ダウンロード</sp-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "アイコンを表示する時はicon-type属性にアイコンの種類を指定してください。sp-iconコンポーネントのtype属性と同じ値を指定できます。",
      },
    },
  },
};

export const OverflowWrap: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- 通常の短いテキスト -->
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          通常のテキスト
        </h3>
        <sp-button>保存</sp-button>
      </div>

      <!-- 改行なしの長い英数字 -->
      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          改行なしの長い英数字（単語区切りなし、幅制限: 400px）
        </h3>
        <sp-button>
          texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
        </sp-button>
      </div>

      <!-- スペース区切りの長い英文 -->
      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          スペース区切りの長い英文（幅制限: 400px）
        </h3>
        <sp-button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua
        </sp-button>
      </div>

      <!-- 長い日本語テキスト -->
      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          長い日本語テキスト（幅制限あり: 400px）
        </h3>
        <sp-button>
          これは非常に長い日本語のテキストです。ボタン内でどのように折り返されるかを確認するためのサンプルです。日本語の場合は自然に折り返しが発生します。さらに長いテキストを追加して確実に複数行になるようにしています。
        </sp-button>
      </div>

      <!-- Flexコンテナ内での挙動 -->
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          Flexコンテナ内（min-width: 0あり）
        </h3>
        <div style="display: flex; gap: 8px; min-width: 0;">
          <div style="flex-shrink: 0;">ラベル:</div>
          <sp-button style="min-width: 0;">
            texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
          </sp-button>
        </div>
      </div>

      <!-- アイコン付きボタンでの長いテキスト -->
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          アイコン付きボタン
        </h3>
        <sp-button icon-type="download">
          ダウンロードボタンの非常に長いテキスト
        </sp-button>
      </div>

      <!-- 異なるサイズでの挙動 -->
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          異なるサイズ（Medium / Large / X-Large）
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <sp-button size="medium">
            Medium サイズの長いテキストテキストテキスト
          </sp-button>
          <sp-button size="large">
            Large サイズの長いテキストテキストテキスト
          </sp-button>
          <sp-button size="xLarge">
            X-Large サイズの長いテキストテキストテキスト
          </sp-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "ボタン内のテキストが長い場合の折り返し動作を確認するためのサンプルです。通常のテキスト、改行なしの長い文字列、スペース区切りの英文、日本語テキスト、Flexコンテナ内での挙動など、様々なパターンを確認できます。",
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
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button variant="${variant}">ボタン</sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button variant="${variant}" disabled>ボタン</sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button variant="${variant}" loading>ボタン</sp-button>
                </td>`,
            )}
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
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button danger variant="${variant}">ボタン</sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button danger variant="${variant}" disabled
                    >ボタン</sp-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button danger variant="${variant}" loading
                    >ボタン</sp-button
                  >
                </td>`,
            )}
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
            <th>バリアント</th>
            ${sizes.map((size) => html`<th>${size}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${variants.map(
            (variant) =>
              html`<tr>
                <th>${variant}</th>
                ${sizes.map(
                  (size) =>
                    html`<td>
                      <sp-button variant="${variant}" size="${size}"
                        >ボタン</sp-button
                      >
                    </td>`,
                )}
              </tr>`,
          )}
          ${variants.map(
            (variant) =>
              html`<tr>
                <th>${variant} (danger)</th>
                ${sizes.map(
                  (size) =>
                    html`<td>
                      <sp-button danger variant="${variant}" size="${size}"
                        >ボタン</sp-button
                      >
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>

      <!-- アイコン付きボタン（ノーマル） -->
      <table>
        <caption>
          アイコン付きボタン: ノーマル
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button icon-type="download" variant="${variant}">
                    ダウンロード
                  </sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button icon-type="download" variant="${variant}" disabled>
                    ダウンロード
                  </sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button icon-type="download" variant="${variant}" loading>
                    ダウンロード
                  </sp-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <!-- アイコン付きボタン（デンジャー） -->
      <table>
        <caption>
          アイコン付きボタン: デンジャー
        </caption>
        <thead>
          <tr>
            <th>状態</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>デフォルト</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button icon-type="download" danger variant="${variant}">
                    ダウンロード
                  </sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button
                    icon-type="download"
                    danger
                    variant="${variant}"
                    disabled
                  >
                    ダウンロード
                  </sp-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <sp-button
                    icon-type="download"
                    danger
                    variant="${variant}"
                    loading
                  >
                    ダウンロード
                  </sp-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <!-- アイコン付きボタン（サイズバリエーション） -->
      <table>
        <caption>
          アイコン付きボタン: サイズバリエーション
        </caption>
        <thead>
          <tr>
            <th>バリアント</th>
            ${sizes.map((size) => html`<th>${size}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${variants.map(
            (variant) =>
              html`<tr>
                <th>${variant}</th>
                ${sizes.map(
                  (size) =>
                    html`<td>
                      <sp-button
                        icon-type="download"
                        variant="${variant}"
                        size="${size}"
                      >
                        ダウンロード
                      </sp-button>
                    </td>`,
                )}
              </tr>`,
          )}
          ${variants.map(
            (variant) =>
              html`<tr>
                <th>${variant} (danger)</th>
                ${sizes.map(
                  (size) =>
                    html`<td>
                      <sp-button
                        icon-type="download"
                        danger
                        variant="${variant}"
                        size="${size}"
                      >
                        ダウンロード
                      </sp-button>
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "sp-buttonコンポーネントの全パターンを一覧表示します。タイプ、バリアント、状態、サイズ、アイコンの有無など、利用可能な全ての組み合わせを確認できます。",
      },
    },
  },
};
