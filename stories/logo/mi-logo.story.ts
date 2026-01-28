import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type MiLogo } from "../../src/components/logo";

const meta = {
  component: "mi-logo",
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
} satisfies Meta<MiLogo>;

export default meta;
type Story = StoryObj<MiLogo>;

export const Default: Story = {
  render: ({ language, brand }) => {
    return html`<mi-logo
      style="height: 32px; display: flex;"
      language=${language}
      brand=${brand}
    ></mi-logo>`;
  },
};
