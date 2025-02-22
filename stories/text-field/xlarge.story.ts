import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { SpTextField } from "@/components/text-field/x-large";

const meta: Meta<SpTextField> = {};
export default meta;

export const FullWidth: StoryObj<SpTextField> = {
  render: () => html`<span>doge</span>`,
};
