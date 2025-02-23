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
    name: 'namae',
    value: 'atai',
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
  render: ({ label, error, placeholder, disabled, name, value }) => {
    return html`<form method="post" action="http://localhost:3000">
    <sp-text-field-x-large
      placeholder=${placeholder}
      label=${label}
      name=${name}
      value=${value}
      ?disabled=${disabled}
      error=${error}
    >
    </sp-text-field-x-large>
    <button type="submit" name="tugi" value="aa">a</button>
    </form>
    `;
  },
};
