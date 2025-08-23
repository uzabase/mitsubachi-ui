import "../../src/components/label-unit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLabelUnit } from "../../src/components/label-unit";

const meta = {
  component: "sp-label-unit",
  argTypes: {
    text: { type: "string" },
    supportText: { type: "string" },
  },
  args: {
    text: "ラベル",
    supportText: "サポートテキスト",
  },
  tags: ["!dev-only"],
} satisfies Meta<SpLabelUnit>;

export default meta;
type Story = StoryObj<SpLabelUnit>;

export const Default: Story = {
  render: ({ text, supportText }) => {
    return html`
      <sp-label-unit text=${text} support-text=${supportText}></sp-label-unit>
    `;
  },
};
