import "../../src/components/text-field-unit";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTextFieldUnit } from "../../src/components/text-field-unit";

const meta: Meta<SpTextFieldUnit> = {
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

export const Default: StoryObj<SpTextFieldUnit> = {
  render: ({ label, error, placeholder, disabled, name, value }) => {
    return html`<sp-text-field-unit
      placeholder=${placeholder}
      label=${label}
      ?disabled=${disabled}
      name=${name}
      value=${value}
      error=${error}
    >
    </sp-text-field-unit>`;
  },
};
