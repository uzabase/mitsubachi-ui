import "../../src/components/text-field/text-field";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { TemplateResult } from "lit";
import { html, nothing } from "lit";

import type { MiTextField } from "../../src/components/text-field/text-field";

type StoryArgs = MiTextField & { errorSlot: TemplateResult | typeof nothing };

const meta = {
  component: "mi-text-field",
  title: "Components/TextField/mi-text-field",
  argTypes: {
    errorSlot: {
      name: 'slot="error"',
      control: "radio",
      options: ["none", "text", "withLink", "multiple"],
      mapping: {
        none: nothing,
        text: html`<span slot="error">エラーテキストが入ります</span>`,
        withLink: html`<span slot="error"
          >エラーが発生しました。詳しくは<a href="#">こちら</
          >をご覧ください。</span
        >`,
        multiple: html`<span slot="error">エラーテキストが入ります</span>
          <span slot="error">エラーテキストが入ります</span>
          <span slot="error">エラーテキストが入ります</span>`,
      },
      table: { category: "Slots" },
    },
    placeholder: { type: "string" },
    required: { type: "boolean" },
    disabled: { type: "boolean" },
    name: { type: "string" },
    value: { type: "string" },
    type: {
      options: ["text", "password"],
      control: { type: "select" },
    },
    autocomplete: { type: "string" },
  },
  args: {
    placeholder: "プレースホルダー",
    required: false,
    disabled: false,
    name: "surname",
    value: "Yamada",
    type: "text",
    autocomplete: undefined,
    errorSlot: "none" as unknown as TemplateResult,
  },
  tags: ["!dev-only"],
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: ({
    type,
    placeholder,
    required,
    disabled,
    name,
    value,
    autocomplete,
    errorSlot,
  }) => {
    return html`<mi-text-field
      placeholder=${placeholder || nothing}
      ?required=${required}
      ?disabled=${disabled}
      name=${name}
      value=${value}
      type=${type}
      autocomplete=${autocomplete || nothing}
    >
      ${errorSlot}
    </mi-text-field>`;
  },
};

/** `slot="error"` に渡した要素が、テキストフィールドの下にエラーメッセージとして表示されます。 */
export const WithError: Story = {
  render: () => html`
    <mi-text-field placeholder="プレースホルダー" name="surname">
      <span slot="error">エラーテキストが入ります</span>
    </mi-text-field>
  `,
};

/**
 * `slot="error"` は複数渡せます。要素ごとに1件のエラーとして、渡した順に表示されます。
 */
export const WithMultipleErrors: Story = {
  render: () => html`
    <mi-text-field placeholder="プレースホルダー" name="surname" value="やまだ">
      <span slot="error">姓を入力してください</span>
      <span slot="error">全角文字は使用できません</span>
      <span slot="error">20文字以内で入力してください</span>
    </mi-text-field>
  `,
};

/** エラーメッセージ内の HTML 構造は保持されるため、リンクを含められます。 */
export const WithErrorLink: Story = {
  render: () => html`
    <mi-text-field placeholder="プレースホルダー" name="surname">
      <span slot="error"
        >エラーが発生しました。詳しくは<a href="#">こちら</a
        >をご覧ください。</span
      >
    </mi-text-field>
  `,
};

/**
 * `required` を指定すると入力欄に `aria-required="true"` が付きます。
 * このコンポーネント自体はラベルを持たないため見た目は変わりません。
 * 「必須」バッジを表示する場合は `mi-text-field-unit` を使用してください。
 */
export const Required: Story = {
  render: () => html`
    <mi-text-field
      placeholder="プレースホルダー"
      name="surname"
      required
    ></mi-text-field>
  `,
};

/** `disabled` を指定すると入力できません。エラーがあっても表示されません。 */
export const Disabled: Story = {
  render: () => html`
    <mi-text-field name="surname" value="入力できません" disabled>
      <span slot="error">disabled のときはエラーを表示しません</span>
    </mi-text-field>
  `,
};

/** `type="password"` を指定すると入力内容が伏せ字になります。 */
export const Password: Story = {
  render: () => html`
    <mi-text-field
      type="password"
      placeholder="パスワード"
      name="password"
      value="password1234"
      autocomplete="current-password"
    ></mi-text-field>
  `,
};

export const All: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">通常</p>
        <mi-text-field placeholder="プレースホルダー"></mi-text-field>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          エラー（1件）
        </p>
        <mi-text-field placeholder="プレースホルダー">
          <span slot="error">エラーテキストが入ります</span>
        </mi-text-field>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          エラー（複数件）
        </p>
        <mi-text-field placeholder="プレースホルダー">
          <span slot="error">姓を入力してください</span>
          <span slot="error">全角文字は使用できません</span>
          <span slot="error">20文字以内で入力してください</span>
        </mi-text-field>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          エラー（リンクあり）
        </p>
        <mi-text-field placeholder="プレースホルダー">
          <span slot="error"
            >エラーが発生しました。詳しくは<a href="#">こちら</a
            >をご覧ください。</span
          >
        </mi-text-field>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">password</p>
        <mi-text-field type="password" value="password1234"></mi-text-field>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">disabled</p>
        <mi-text-field value="入力できません" disabled></mi-text-field>
      </div>
    </div>
  `,
};
