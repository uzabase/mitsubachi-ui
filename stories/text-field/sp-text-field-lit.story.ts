import "../../src/components/text-field/text-field/sp-text-field-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type SpTextFieldLit } from "../../src/components/text-field/text-field/sp-text-field-lit";

const meta = {
  component: "sp-text-field-lit",
  argTypes: {
    error: { type: "string" },
    placeholder: { type: "string" },
    disabled: { type: "boolean" },
    name: { type: "string" },
    value: { type: "string" },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    autocomplete: { type: "string" },
    oninput: {
      action: "input",
    },
  },
  args: {
    error: "",
    placeholder: "テキストを入力してください",
    disabled: false,
    name: "textfield",
    value: "",
    type: "text",
    autocomplete: "off",
    oninput: action("input"),
  },
  render: (args) => html`
    <sp-text-field-lit
      error=${args.error}
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      name=${args.name}
      .value=${args.value}
      type=${args.type}
      autocomplete=${args.autocomplete}
      @input=${args.oninput}
    ></sp-text-field-lit>
  `,
} satisfies Meta<Partial<SpTextFieldLit> & { oninput: () => void }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "初期値が設定されています",
  },
};

export const WithError: Story = {
  args: {
    error: "入力内容にエラーがあります",
    value: "無効な値",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "無効状態",
  },
};

export const DisabledWithError: Story = {
  args: {
    disabled: true,
    error: "エラーがありますが無効状態なので表示されません",
    value: "無効状態でエラーあり",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "パスワードを入力",
    autocomplete: "current-password",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "メールアドレスを入力",
    autocomplete: "email",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "数値を入力",
  },
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;"
    >
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: bold;"
          >名前</label
        >
        <sp-text-field-lit
          name="name"
          placeholder="山田太郎"
          autocomplete="name"
          @input=${action("name-input")}
        ></sp-text-field-lit>
      </div>

      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: bold;"
          >メールアドレス</label
        >
        <sp-text-field-lit
          name="email"
          type="email"
          placeholder="example@email.com"
          autocomplete="email"
          @input=${action("email-input")}
        ></sp-text-field-lit>
      </div>

      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: bold;"
          >パスワード</label
        >
        <sp-text-field-lit
          name="password"
          type="password"
          placeholder="8文字以上"
          autocomplete="current-password"
          @input=${action("password-input")}
        ></sp-text-field-lit>
      </div>

      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: bold;"
          >年齢</label
        >
        <sp-text-field-lit
          name="age"
          type="number"
          placeholder="25"
          @input=${action("age-input")}
        ></sp-text-field-lit>
      </div>

      <button
        type="submit"
        style="padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        送信
      </button>
    </form>
  `,
};

export const ErrorStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <h3>正常状態</h3>
        <sp-text-field-lit
          placeholder="正常な入力フィールド"
          value="正常な値"
        ></sp-text-field-lit>
      </div>

      <div>
        <h3>エラー状態</h3>
        <sp-text-field-lit
          error="必須項目です"
          placeholder="エラーのある入力フィールド"
        ></sp-text-field-lit>
      </div>

      <div>
        <h3>エラー状態（値あり）</h3>
        <sp-text-field-lit
          error="メールアドレスの形式が正しくありません"
          value="invalid-email"
          placeholder="メールアドレス"
        ></sp-text-field-lit>
      </div>

      <div>
        <h3>無効状態</h3>
        <sp-text-field-lit
          disabled
          placeholder="無効な入力フィールド"
          value="編集できません"
        ></sp-text-field-lit>
      </div>

      <div>
        <h3>無効状態（エラーあり - エラーは表示されない）</h3>
        <sp-text-field-lit
          disabled
          error="このエラーは表示されません"
          placeholder="無効でエラーのある入力フィールド"
          value="編集できません"
        ></sp-text-field-lit>
      </div>
    </div>
  `,
};

export const LongError: Story = {
  args: {
    error:
      "これは非常に長いエラーメッセージの例です。複数行にわたる可能性があり、ユーザーに詳細な情報を提供する場合に使用されます。エラーメッセージが長い場合の表示を確認できます。",
    value: "エラーのある値",
  },
};
