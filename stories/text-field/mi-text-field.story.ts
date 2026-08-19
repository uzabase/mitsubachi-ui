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
