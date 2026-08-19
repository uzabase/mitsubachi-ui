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
