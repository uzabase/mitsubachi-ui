import "@/components/text-field/x-large";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTextFieldXLarge } from "@/components/text-field/x-large";


const meta: Meta<SpTextFieldXLarge> = {
  component: 'sp-text-field-x-large',
  args: {
    label: 'ラベル',
    error: 'エラーテキストが入ります。'
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
};
export default meta;

export const Default: StoryObj<SpTextFieldXLarge> = {
  render: ({label, error}) => {
    return html`<sp-text-field-x-large label=${label} error=${error}></sp-text-field-x-large>`
  }
};
