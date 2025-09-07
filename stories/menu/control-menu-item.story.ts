import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpControlMenuItem } from "../../src/components/menu/control-menu-item";

const meta = {
  component: "sp-control-menu-item",
  argTypes: {
    text: { type: "string" },
    selected: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    text: "Text",
    selected: false,
    disabled: false,
  },
  tags: ["!dev-only"],
} satisfies Meta<SpControlMenuItem>;

export default meta;
type Story = StoryObj<SpControlMenuItem>;

export const Default: Story = {
  render: ({ text, selected, disabled }) => {
    return html`
      <sp-control-menu-item
        text=${text}
        tabindex="0"
        ?selected=${selected}
        ?disabled=${disabled}
      >
      </sp-control-menu-item>
    `;
  },
};
