import "../../src/components/floating-button/mi-floating-button";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "mi-floating-button",
  args: {
    loading: false,
  },
  argTypes: {
    loading: { type: "boolean" },
  },
  render: (args) =>
    html`<mi-floating-button ?loading=${args.loading}></mi-floating-button>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
