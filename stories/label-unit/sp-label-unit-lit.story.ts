import "../../src/components/label-unit/sp-label-unit-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLabelUnitLit } from "../../src/components/label-unit/sp-label-unit-lit";

const meta = {
  component: "sp-label-unit-lit",
  argTypes: {
    text: { type: "string" },
    supportText: { type: "string" },
  },
  args: {
    text: "ラベル",
    supportText: "",
  },
  render: (args) => html`
    <sp-label-unit-lit
      text=${args.text}
      support-text=${args.supportText}
    ></sp-label-unit-lit>
  `,
} satisfies Meta<Partial<SpLabelUnitLit> & { supportText: string }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  args: {
    text: "名前",
    supportText: "",
  },
};

export const WithSupportText: Story = {
  args: {
    text: "メールアドレス",
    supportText: "会社のメールアドレスを入力してください",
  },
};

export const SupportTextOnly: Story = {
  args: {
    text: "",
    supportText: "サポートテキストのみ",
  },
};

export const Empty: Story = {
  args: {
    text: "",
    supportText: "",
  },
};

export const LongText: Story = {
  args: {
    text: "とても長いラベルテキストの例です。長いテキストがどのように表示されるかを確認できます。",
    supportText:
      "こちらも長いサポートテキストの例です。補足説明が長い場合の表示を確認することができます。複数行にわたる場合もあります。",
  },
};

export const Examples: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <h3>基本的な使用例</h3>
        <sp-label-unit-lit text="ユーザー名"></sp-label-unit-lit>
      </div>

      <div>
        <h3>サポートテキスト付き</h3>
        <sp-label-unit-lit
          text="パスワード"
          support-text="8文字以上で英数字を含む必要があります"
        ></sp-label-unit-lit>
      </div>

      <div>
        <h3>サポートテキストのみ</h3>
        <sp-label-unit-lit
          support-text="オプションの入力項目です"
        ></sp-label-unit-lit>
      </div>

      <div>
        <h3>空のラベル（非表示）</h3>
        <sp-label-unit-lit></sp-label-unit-lit>
        <p style="font-size: 12px; color: #666; margin: 8px 0 0 0;">
          ※上記は空なので何も表示されません
        </p>
      </div>
    </div>
  `,
};
