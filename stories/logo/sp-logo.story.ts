import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpLogo } from "../../src/components/logo";

const meta: Meta<SpLogo> = {
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
};
export default meta;

export const Default: StoryObj<SpLogo> = {
  render: ({ language, brand }) => {
    return html`<sp-logo style="height: 32px; display: flex;" language=${language} brand=${brand}></sp-language>`;
  },
};
