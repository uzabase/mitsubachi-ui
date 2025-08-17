import "../../src/components/text-field/text-field-unit/sp-text-field-unit-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import { type SpTextFieldUnitLit } from "../../src/components/text-field/text-field-unit/sp-text-field-unit-lit";

const meta = {
  component: "sp-text-field-unit-lit",
  argTypes: {
    text: { type: "string" },
    error: { type: "string" },
    placeholder: { type: "string" },
    supportText: { type: "string" },
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
    text: "ラベル",
    error: "",
    placeholder: "テキストを入力してください",
    supportText: "",
    disabled: false,
    name: "textfield",
    value: "",
    type: "text",
    autocomplete: "off",
    oninput: action("input"),
  },
  render: (args) => html`
    <sp-text-field-unit-lit
      text=${args.text}
      error=${args.error}
      placeholder=${args.placeholder}
      support-text=${args.supportText}
      ?disabled=${args.disabled}
      name=${args.name}
      .value=${args.value}
      type=${args.type}
      autocomplete=${args.autocomplete}
      @input=${args.oninput}
    ></sp-text-field-unit-lit>
  `,
} satisfies Meta<
  Partial<SpTextFieldUnitLit> & { supportText: string; oninput: () => void }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSupportText: Story = {
  args: {
    text: "パスワード",
    supportText: "8文字以上で英数字を含む必要があります",
    type: "password",
    placeholder: "パスワードを入力",
  },
};

export const WithError: Story = {
  args: {
    text: "メールアドレス",
    error: "メールアドレスの形式が正しくありません",
    value: "invalid-email",
    placeholder: "example@email.com",
  },
};

export const Disabled: Story = {
  args: {
    text: "編集不可フィールド",
    supportText: "このフィールドは編集できません",
    disabled: true,
    value: "編集不可の値",
  },
};

export const WithoutLabel: Story = {
  args: {
    text: "",
    supportText: "ラベルなしのフィールド",
    placeholder: "ラベルはありません",
  },
};

export const SupportTextOnly: Story = {
  args: {
    text: "",
    supportText: "サポートテキストのみ",
    placeholder: "サポートテキストのみのフィールド",
  },
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <sp-text-field-unit-lit
        text="名前"
        name="name"
        placeholder="山田太郎"
        autocomplete="name"
        @input=${action("name-input")}
      ></sp-text-field-unit-lit>

      <sp-text-field-unit-lit
        text="メールアドレス"
        supportText="会社のメールアドレスを入力してください"
        name="email"
        type="email"
        placeholder="example@company.com"
        autocomplete="email"
        @input=${action("email-input")}
      ></sp-text-field-unit-lit>

      <sp-text-field-unit-lit
        text="パスワード"
        supportText="8文字以上で英数字を含んでください"
        name="password"
        type="password"
        placeholder="パスワード"
        autocomplete="new-password"
        @input=${action("password-input")}
      ></sp-text-field-unit-lit>

      <sp-text-field-unit-lit
        text="電話番号"
        supportText="ハイフンなしで入力してください"
        name="phone"
        type="tel"
        placeholder="09012345678"
        autocomplete="tel"
        @input=${action("phone-input")}
      ></sp-text-field-unit-lit>

      <sp-text-field-unit-lit
        text="年齢"
        name="age"
        type="number"
        placeholder="25"
        @input=${action("age-input")}
      ></sp-text-field-unit-lit>

      <button
        type="submit"
        style="padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        送信
      </button>
    </form>
  `,
};

export const ValidationExample: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <h3>正常状態</h3>
        <sp-text-field-unit-lit
          text="ユーザー名"
          supportText="英数字のみ使用可能です"
          value="validuser123"
          placeholder="ユーザー名を入力"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>エラー状態</h3>
        <sp-text-field-unit-lit
          text="ユーザー名"
          supportText="英数字のみ使用可能です"
          error="無効な文字が含まれています"
          value="invalid-user!"
          placeholder="ユーザー名を入力"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>必須フィールドエラー</h3>
        <sp-text-field-unit-lit
          text="メールアドレス"
          supportText="必須項目です"
          error="メールアドレスを入力してください"
          placeholder="example@email.com"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>フォーマットエラー</h3>
        <sp-text-field-unit-lit
          text="メールアドレス"
          supportText="正しい形式で入力してください"
          error="メールアドレスの形式が正しくありません"
          value="invalid.email"
          placeholder="example@email.com"
        ></sp-text-field-unit-lit>
      </div>
    </div>
  `,
};

export const LongText: Story = {
  args: {
    text: "非常に長いラベルテキストの例です。ラベルが長い場合の表示を確認できます。",
    supportText:
      "これも非常に長いサポートテキストの例です。サポートテキストが長い場合の表示を確認することができます。複数行にわたる場合もあります。",
    placeholder: "長いラベルとサポートテキストのフィールド",
  },
};

export const AllStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 32px; max-width: 500px;"
    >
      <div>
        <h3>基本状態</h3>
        <sp-text-field-unit-lit
          text="基本フィールド"
          placeholder="何か入力してください"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>サポートテキスト付き</h3>
        <sp-text-field-unit-lit
          text="サポート付きフィールド"
          supportText="追加の説明テキストです"
          placeholder="何か入力してください"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>値が入力済み</h3>
        <sp-text-field-unit-lit
          text="入力済みフィールド"
          supportText="既に値が入力されています"
          value="入力された値"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>エラー状態</h3>
        <sp-text-field-unit-lit
          text="エラーフィールド"
          supportText="正しい値を入力してください"
          error="入力値にエラーがあります"
          value="無効な値"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>無効状態</h3>
        <sp-text-field-unit-lit
          text="無効フィールド"
          supportText="このフィールドは編集できません"
          disabled
          value="編集不可"
        ></sp-text-field-unit-lit>
      </div>

      <div>
        <h3>無効状態（エラーあり - 表示されない）</h3>
        <sp-text-field-unit-lit
          text="無効でエラーありフィールド"
          supportText="エラーがありますが無効状態"
          error="このエラーは表示されません"
          disabled
          value="編集不可でエラーあり"
        ></sp-text-field-unit-lit>
      </div>
    </div>
  `,
};
