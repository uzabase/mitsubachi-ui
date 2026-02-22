import "../../src/components/button/mi-neutral-button";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import {
  type MiNeutralButton,
  sizes,
  variants,
} from "../../src/components/button/mi-neutral-button";
import { iconTypes } from "../../src/components/icon/icons";

const meta = {
  component: "mi-neutral-button",
  title: "Button/mi-neutral-button",
  parameters: {
    docs: {
      description: {
        component: "ノーマル（ニュートラル）ボタンです。",
      },
    },
  },
  argTypes: {
    slot: { type: "string" },
    danger: {
      type: "boolean",
      description:
        "⚠️ このプロパティは非推奨です。Danger スタイルには `mi-danger-button` の利用を推奨します。後方互換のため残しています。",
      table: {
        category: "非推奨",
      },
    },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    variants: {
      control: { type: "select" },
      options: variants,
      description:
        "⚠️ このプロパティは非推奨です。代わりに `variant` を使用してください。後方互換のため残しています。",
      table: {
        category: "非推奨",
      },
    },
    size: {
      control: { type: "select" },
      options: sizes,
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    selected: { type: "boolean" },
    toggle: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
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
    variants: undefined,
    size: "medium",
    loading: false,
    disabled: false,
    selected: false,
    toggle: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
    iconType: undefined,
    type: "button",
  },
  render: (args) => html`
    <mi-neutral-button
      ?danger=${args.danger}
      variant=${args.variant}
      variants=${args.variants || nothing}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      ?selected=${args.selected}
      ?toggle=${args.toggle}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
      icon-type=${args.iconType || nothing}
      type=${args.type || nothing}
    >
      ${args.slot}
    </mi-neutral-button>
  `,
} satisfies Meta<MiNeutralButton>;

export default meta;
type Story = StoryObj<MiNeutralButton>;

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

export const BackwardCompatibility: Story = {
  name: "`mi-button` / `sp-button` タグの後方互換",
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <mi-neutral-button>mi-neutral-button</mi-neutral-button>
      <mi-button>mi-button</mi-button>
      <sp-button>sp-button</sp-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "`<mi-button>` および `<sp-button>` は `<mi-neutral-button>` と同じコンポーネントです。新規では `<mi-neutral-button>` の利用を推奨します。",
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => html`
    <mi-neutral-button style="width: 100%;">ダウンロード</mi-neutral-button>
    <div style="width: 400px;">
      <mi-neutral-button style="width: 100%;">ダウンロード</mi-neutral-button>
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
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          通常のテキスト
        </h3>
        <mi-neutral-button>保存</mi-neutral-button>
      </div>

      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          改行なしの長い英数字（単語区切りなし、幅制限: 400px）
        </h3>
        <mi-neutral-button>
          texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
        </mi-neutral-button>
      </div>

      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          スペース区切りの長い英文（幅制限: 400px）
        </h3>
        <mi-neutral-button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua
        </mi-neutral-button>
      </div>

      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          長い日本語テキスト（幅制限あり: 400px）
        </h3>
        <mi-neutral-button>
          これは非常に長い日本語のテキストです。ボタン内でどのように折り返されるかを確認するためのサンプルです。日本語の場合は自然に折り返しが発生します。さらに長いテキストを追加して確実に複数行になるようにしています。
        </mi-neutral-button>
      </div>

      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          Flexコンテナ内（min-width: 0あり）
        </h3>
        <div style="display: flex; gap: 8px; min-width: 0;">
          <div style="flex-shrink: 0;">ラベル:</div>
          <mi-neutral-button style="min-width: 0;">
            texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
          </mi-neutral-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          アイコン付きボタン
        </h3>
        <mi-neutral-button icon-type="download">
          ダウンロードボタンの非常に長いテキスト
        </mi-neutral-button>
      </div>

      <div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
          異なるサイズ（Medium / Large / X-Large）
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <mi-neutral-button size="medium">
            Medium サイズの長いテキストテキストテキスト
          </mi-neutral-button>
          <mi-neutral-button size="large">
            Large サイズの長いテキストテキストテキスト
          </mi-neutral-button>
          <mi-neutral-button size="xLarge">
            X-Large サイズの長いテキストテキストテキスト
          </mi-neutral-button>
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
      style="display:flex; flex-direction:column; gap:32px; align-items: flex-start;"
    >
      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          バリアント × 状態
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
                  <mi-neutral-button variant="${variant}"
                    >ボタン</mi-neutral-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-neutral-button variant="${variant}" disabled
                    >ボタン</mi-neutral-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-neutral-button variant="${variant}" loading
                    >ボタン</mi-neutral-button
                  >
                </td>`,
            )}
          </tr>
          <tr>
            <th>選択中</th>
            ${variants.map((variant) =>
              ["secondary", "tertiary", "ghost"].includes(variant)
                ? html`<td>
                    <mi-neutral-button variant="${variant}" selected
                      >ボタン</mi-neutral-button
                    >
                  </td>`
                : html`<td>
                    <span style="font-size: 11px; color: rgb(0 0 0 / 45%);"
                      >なし<br />デフォルトスタイルが<br />適用されます</span
                    >
                  </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          バリアント × サイズ
        </caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${variants.map(
                  (variant) =>
                    html`<td>
                      <mi-neutral-button variant="${variant}" size="${size}"
                        >ボタン</mi-neutral-button
                      >
                    </td>`,
                )}
              </tr>`,
          )}
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          アイコン付き: バリアント × 状態
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
                  <mi-neutral-button icon-type="download" variant="${variant}">
                    ダウンロード
                  </mi-neutral-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>無効</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-neutral-button
                    icon-type="download"
                    variant="${variant}"
                    disabled
                  >
                    ダウンロード
                  </mi-neutral-button>
                </td>`,
            )}
          </tr>
          <tr>
            <th>読み込み中</th>
            ${variants.map(
              (variant) =>
                html`<td>
                  <mi-neutral-button
                    icon-type="download"
                    variant="${variant}"
                    loading
                  >
                    ダウンロード
                  </mi-neutral-button>
                </td>`,
            )}
          </tr>
        </tbody>
      </table>

      <table style="border-collapse: separate; border-spacing: 16px 20px;">
        <caption style="text-align: left;">
          アイコン付き: バリアント × サイズ
        </caption>
        <thead>
          <tr>
            <th>サイズ</th>
            ${variants.map((variant) => html`<th>${variant}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${sizes.map(
            (size) =>
              html`<tr>
                <th>${size}</th>
                ${variants.map(
                  (variant) =>
                    html`<td>
                      <mi-neutral-button
                        icon-type="download"
                        variant="${variant}"
                        size="${size}"
                      >
                        ダウンロード
                      </mi-neutral-button>
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
          "mi-neutral-buttonコンポーネントの全パターンを一覧表示します。バリアント・状態・サイズ・アイコンの有無など、利用可能な全ての組み合わせを確認できます。",
      },
    },
  },
};
