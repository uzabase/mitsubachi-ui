import "../../src/components/text-field/text-field-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import type { MiTextFieldUnit } from "../../src/components/text-field/text-field-unit";

type StoryArgs = MiTextFieldUnit & { error: string };

const meta = {
  component: "mi-text-field-unit",
  title: "Components/TextField/mi-text-field-unit",
  argTypes: {
    text: { type: "string" },
    error: { type: "string" },
    placeholder: { type: "string" },
    supportText: { type: "string" },
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
    text: "ラベル",
    error: "エラーテキストが入ります",
    placeholder: "プレースホルダー",
    supportText: "サポートテキスト",
    required: false,
    disabled: false,
    name: "surname",
    value: "Yamada",
    type: "text",
    autocomplete: "",
  },
  tags: ["!dev-only"],
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: ({
    text,
    type,
    error,
    supportText,
    required,
    placeholder,
    disabled,
    name,
    value,
    autocomplete,
  }) => {
    return html`<mi-text-field-unit
      placeholder=${placeholder}
      text=${text}
      ?required=${required}
      ?disabled=${disabled}
      name=${name}
      support-text=${supportText}
      value=${value}
      autocomplete=${autocomplete || nothing}
      type=${type}
    >
      ${error ? html`<span slot="error">${error}</span>` : nothing}
    </mi-text-field-unit>`;
  },
};

/** `slot="error"` に渡した要素が、テキストフィールドの下にエラーメッセージとして表示されます。 */
export const WithError: Story = {
  render: () => html`
    <mi-text-field-unit
      text="姓"
      support-text="サポートテキスト"
      placeholder="プレースホルダー"
      name="surname"
    >
      <span slot="error">エラーテキストが入ります</span>
    </mi-text-field-unit>
  `,
};

/**
 * `slot="error"` は複数渡せます。要素ごとに1件のエラーとして、渡した順に表示されます。
 */
export const WithMultipleErrors: Story = {
  render: () => html`
    <mi-text-field-unit
      text="姓"
      placeholder="プレースホルダー"
      name="surname"
      value="やまだ"
    >
      <span slot="error">姓を入力してください</span>
      <span slot="error">全角文字は使用できません</span>
      <span slot="error">20文字以内で入力してください</span>
    </mi-text-field-unit>
  `,
};

/** `required` を指定すると、ラベルの横に「必須」バッジが表示されます。 */
export const Required: Story = {
  render: () => html`
    <mi-text-field-unit
      text="姓"
      support-text="サポートテキスト"
      placeholder="プレースホルダー"
      name="surname"
      required
    ></mi-text-field-unit>
  `,
};

/** `disabled` を指定すると入力できません。エラーがあっても表示されません。 */
export const Disabled: Story = {
  render: () => html`
    <mi-text-field-unit text="姓" value="入力できません" disabled>
      <span slot="error">disabled のときはエラーを表示しません</span>
    </mi-text-field-unit>
  `,
};

export const All: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;"
    >
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">通常</p>
        <mi-text-field-unit
          text="姓"
          placeholder="プレースホルダー"
        ></mi-text-field-unit>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          サポートテキストあり
        </p>
        <mi-text-field-unit
          text="姓"
          support-text="サポートテキスト"
          placeholder="プレースホルダー"
        ></mi-text-field-unit>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">必須</p>
        <mi-text-field-unit
          text="姓"
          placeholder="プレースホルダー"
          required
        ></mi-text-field-unit>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          エラー（1件）
        </p>
        <mi-text-field-unit text="姓" placeholder="プレースホルダー">
          <span slot="error">エラーテキストが入ります</span>
        </mi-text-field-unit>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">
          エラー（複数件）
        </p>
        <mi-text-field-unit text="姓" placeholder="プレースホルダー">
          <span slot="error">姓を入力してください</span>
          <span slot="error">全角文字は使用できません</span>
          <span slot="error">20文字以内で入力してください</span>
        </mi-text-field-unit>
      </div>
      <div>
        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">disabled</p>
        <mi-text-field-unit
          text="姓"
          value="入力できません"
          disabled
        ></mi-text-field-unit>
      </div>
    </div>
  `,
};
