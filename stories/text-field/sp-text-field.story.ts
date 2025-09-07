import "../../src/components/text-field/text-field";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";

import type { SpTextField } from "../../src/components/text-field/text-field";

const meta = {
  component: "sp-text-field",
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
} satisfies Meta<SpTextField>;

export default meta;
type Story = StoryObj<SpTextField>;

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
    return html`<sp-text-field
      placeholder=${placeholder || nothing}
      ?disabled=${disabled}
      name=${name}
      value=${value}
      error=${error}
      type=${type}
      autocomplete=${autocomplete || nothing}
    >
    </sp-text-field>`;
  },
};
