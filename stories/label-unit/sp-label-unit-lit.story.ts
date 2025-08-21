import "../../src/components/label-unit/sp-label-unit-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpLabelUnitLit } from "../../src/components/label-unit/sp-label-unit-lit";

const meta = {
  argTypes: {
    text: { type: "string" },
    supportText: { type: "string" },
  },
  args: {
    text: "ラベル",
    supportText: "サポートテキスト",
  },
  tags: ["!dev-only"],
} satisfies Meta<SpLabelUnitLit>;

export default meta;
type Story = StoryObj<SpLabelUnitLit>;

export const Default: Story = {
  render: ({ text, supportText }) => {
    return html`
      <sp-label-unit-lit
        text=${text}
        support-text=${supportText}
      ></sp-label-unit-lit>
    `;
  },
};
