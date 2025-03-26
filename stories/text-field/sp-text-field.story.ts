import "../../src/components/text-field/text-field-unit";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTextField } from "../../src/components/text-field/text-field";

const meta: Meta<SpTextField> = {
  args: {
    error: "エラーテキストが入ります",
    placeholder: "プレースホルダー",
    disabled: false,
    name: "surname",
    value: "Yamada",
    type: "text",
  },
  argTypes: {
    type: {
      options: ["text", "password"],
      control: { type: "select" },
    },
  },
};
export default meta;

export const Default: StoryObj<SpTextField> = {
  render: ({ type, error, placeholder, disabled, name, value }) => {
    return html`<sp-text-field
      placeholder=${placeholder}
      ?disabled=${disabled}
      name=${name}
      value=${value}
      error=${error}
      type=${type}
    >
    </sp-text-field>`;
  },
};
