import "../../src/components/text-field/x-large";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTextFieldXLarge } from "../../src/components/text-field/x-large";

const meta: Meta<SpTextFieldXLarge> = {
  component: "sp-text-field-x-large",
  args: {
    label: "ラベル",
    error: "",
    placeholder: "プレースホルダー",
    disabled: false,
    name: "surname",
    value: "Yamada",
  },
};
export default meta;

export const Default: StoryObj<SpTextFieldXLarge> = {
  render: ({ label, error, placeholder, disabled, name, value }) => {
    return html`<sp-text-field-x-large
      placeholder=${placeholder}
      label=${label}
      ?disabled=${disabled}
      name=${name}
      value=${value}
      error=${error}
    >
    </sp-text-field-x-large>`;
  },
};
