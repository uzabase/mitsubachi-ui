import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpLogo } from "../../src/components/logo";

const meta: Meta<SpLogo> = {
  args: {
    language: "jp",
  },
  argTypes: {
    language: {
      options: ["jp", "en", "cn"],
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
};
export default meta;

export const Default: StoryObj<SpLogo> = {
  render: ({ language }) => {
    return html`<sp-logo style="height: 32px; display: flex;" language=${language}></sp-language>`;
  },
};
