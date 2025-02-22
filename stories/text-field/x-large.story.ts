import "@/components/text-field/x-large";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpTextFieldXLarge } from "@/components/text-field/x-large";


const meta: Meta<SpTextFieldXLarge> = {
  component: 'sp-text-field-x-large',
  args: {
    label: 'foobar',
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    // error: {
    //   control: {
    //     type: 'text',
    //   },
    // },
  },
};
export default meta;

export const Default: StoryObj<SpTextFieldXLarge> = {
  render: (args) => {
    return html`<sp-text-field-x-large label=${args.label} error="doge"></sp-text-field-x-large>`
  }
};
