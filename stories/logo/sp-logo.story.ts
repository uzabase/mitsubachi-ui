import "../../src/components/logo/sp-logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLogo } from "../../src/components/logo/sp-logo";

const meta = {
  component: "sp-logo",
  args: {
    language: "ja",
    brand: "uzabase",
  },
  argTypes: {
    language: {
      options: ["ja", "en", "zh"],
      control: { type: "select" },
    },
    brand: {
      options: ["uzabase", "speeda"],
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpLogo>;

export default meta;
type Story = StoryObj<SpLogo>;

export const Default: Story = {
  render: ({ language, brand }) => {
    return html`<sp-logo
      style="height: 32px; display: flex;"
      language=${language}
      brand=${brand}
    ></sp-logo>`;
  },
};
