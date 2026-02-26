import "../../src/components/label-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type MiLabelUnit } from "../../src/components/label-unit";

const meta = {
  component: "mi-label-unit",
  argTypes: {
    text: { type: "string" },
    supportText: { type: "string" },
  },
  args: {
    text: "ラベル",
    supportText: "サポートテキスト",
  },
  tags: ["!dev-only"],
} satisfies Meta<MiLabelUnit>;

export default meta;
type Story = StoryObj<MiLabelUnit>;

export const Default: Story = {
  render: ({ text, supportText }) => {
    return html`
      <mi-label-unit text=${text} support-text=${supportText}></mi-label-unit>
    `;
  },
};
