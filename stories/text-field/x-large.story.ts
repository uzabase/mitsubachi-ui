import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import { SpTextFieldXLarge } from "@/components/text-field/x-large";
import "@/components/text-field/x-large";


const meta: Meta<SpTextFieldXLarge> = {
  component: 'sp-text-field-x-large',
};
export default meta;

export const Deafult: StoryObj<SpTextFieldXLarge> = {
  render: () => html`<sp-text-field-x-large error="doge"></sp-text-field-x-large>`,
};
