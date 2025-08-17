import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpIcon } from "../../src/components/icon";

const meta: Meta<SpIcon> = {
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
};
export default meta;

export const Default: StoryObj<SpIcon> = {
  render: ({ type }) => {
    return html`<sp-icon
      style="display: inline-block; width: 24px; height: 24px;"
      type=${type}
    ></sp-icon>`;
  },
};
