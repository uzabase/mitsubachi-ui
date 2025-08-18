import "../../src/components/icon/sp-icon-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpIconLit } from "../../src/components/icon/sp-icon-lit";

const meta = {
  args: {
    type: "information-circle",
  },
  argTypes: {
    type: {
      options: [
        "information-circle",
        "error-fill",
        "person",
        "check-circle-fill",
        "check-circle",
        "check-small",
        "chevron-down",
        "chevron-down-small",
        "globe",
      ],
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpIconLit>;

export default meta;
type Story = StoryObj<SpIconLit>;

export const Default: Story = {
  render: ({ type }) => {
    return html`<sp-icon-lit
      style="display: inline-block; width: 24px; height: 24px;"
      type=${type}
    ></sp-icon-lit>`;
  },
};
