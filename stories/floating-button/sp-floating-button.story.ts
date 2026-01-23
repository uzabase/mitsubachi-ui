import "../../src/components/floating-button/sp-floating-button";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-floating-button",
  args: {
    loading: false,
  },
  argTypes: {
    loading: { type: "boolean" },
  },
  render: (args) =>
    html`<sp-floating-button ?loading=${args.loading}></sp-floating-button>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
