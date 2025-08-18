import "../../src/components/logo/sp-logo-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLogoLit } from "../../src/components/logo/sp-logo-lit";

const meta = {
  component: "sp-logo-lit",
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
} satisfies Meta<SpLogoLit>;

export default meta;
type Story = StoryObj<SpLogoLit>;

export const Default: Story = {
  render: ({ language, brand }) => {
    return html`<sp-logo-lit style="height: 32px; display: flex;" language=${language} brand=${brand}></sp-language>`;
  },
};
