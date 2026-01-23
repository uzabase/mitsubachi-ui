import "../../src/components/text-field/text-field-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import type { MiTextFieldUnit } from "../../src/components/text-field/text-field-unit";

const meta = {
  component: "mi-text-field-unit",
  argTypes: {
    text: { type: "string" },
    error: { type: "string" },
    placeholder: { type: "string" },
    supportText: { type: "string" },
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
    disabled: false,
    name: "surname",
    value: "Yamada",
    type: "text",
    autocomplete: "",
  },
  tags: ["!dev-only"],
} satisfies Meta<MiTextFieldUnit>;

export default meta;
type Story = StoryObj<MiTextFieldUnit>;

export const Default: Story = {
  render: ({
    text,
    type,
    error,
    supportText,
    placeholder,
    disabled,
    name,
    value,
    autocomplete,
  }) => {
    return html`<mi-text-field-unit
      placeholder=${placeholder}
      text=${text}
      ?disabled=${disabled}
      name=${name}
      support-text=${supportText}
      value=${value}
      error=${error}
      autocomplete=${autocomplete || nothing}
      type=${type}
    >
    </mi-text-field-unit>`;
  },
};
