import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpIcon } from "../../src/components/icon";

const meta: Meta<SpIcon> = {
  args: {
    type: "error-fill",
  },
  argTypes: {
    type: {
      options: ["error-fill"],
      control: { type: "select" },
    },
  },
};
export default meta;

export const Default: StoryObj<SpIcon> = {
  render: ({ type }) => {
    return html`<sp-icon type=${type}></sp-icon>`;
  },
};
