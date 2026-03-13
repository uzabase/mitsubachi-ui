import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type MiLogo } from "../../src/components/logo";

const meta = {
  title: "logo/mi-logo [Deprecated]",
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
  parameters: {
    docs: {
      description: {
        component:
          "**⚠️ 非推奨**: 代わりに `mi-speeda-logo` または `mi-uzabase-logo` を使用してください。",
      },
    },
  },
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
