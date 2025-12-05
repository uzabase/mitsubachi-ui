import "../../src/components/floating-button/sp-floating-button";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = {
  component: "sp-floating-button",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<sp-floating-button></sp-floating-button>`,
  tags: ["!dev-only"],
};
