import "@/components/text-field/x-large";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTextFieldXLarge } from "@/components/text-field/x-large";

const meta: Meta<SpTextFieldXLarge> = {
  component: "sp-text-field-x-large",
  args: {
    label: "ラベル",
    error: "エラーテキストが入ります。",
    placeholder: "プレースホルダー",
    disabled: false,
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
  },
};
export default meta;

export const Default: StoryObj<SpTextFieldXLarge> = {
  render: ({ label, error, placeholder, disabled }) => {
    return html`<sp-text-field-x-large
      placeholder=${placeholder}
      label=${label}
      ?disabled=${disabled}
      error=${error}
    >
    </sp-text-field-x-large>`;
  },
};
