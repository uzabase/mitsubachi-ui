import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import {SpTextFieldXLarge } from  "../../src/components/text-field/x-large";




const meta: Meta<SpTextFieldXLarge> = {
    render: (args) => html`
      <span>doge</span>
    `
};
export default meta;

export const FullWidth: StoryObj<SpTextFieldXLarge> = {
  render: () => html`
    <sp-text-field-x-large></sp-text-field-x-large>`,
};