import "../../src/components/text-field/text-field";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import type { MiTextField } from "../../src/components/text-field/text-field";

const meta = {
  component: "mi-text-field",
  argTypes: {
    error: { type: "string" },
    placeholder: { type: "string" },
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
    error: "エラーテキストが入ります",
    placeholder: "プレースホルダー",
    disabled: false,
    name: "surname",
    value: "Yamada",
    type: "text",
    autocomplete: undefined,
  },
  tags: ["!dev-only"],
} satisfies Meta<MiTextField>;

export default meta;
type Story = StoryObj<MiTextField>;

export const Default: Story = {
  render: ({
    type,
    error,
    placeholder,
    disabled,
    name,
    value,
    autocomplete,
  }) => {
    return html`<mi-text-field
      placeholder=${placeholder || nothing}
      ?disabled=${disabled}
      name=${name}
      value=${value}
      error=${error}
      type=${type}
      autocomplete=${autocomplete || nothing}
    >
    </mi-text-field>`;
  },
};
