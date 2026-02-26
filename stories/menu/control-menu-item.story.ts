import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiControlMenuItem } from "../../src/components/menu/control-menu-item";

const meta = {
  component: "mi-control-menu-item",
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
} satisfies Meta<MiControlMenuItem>;

export default meta;
type Story = StoryObj<MiControlMenuItem>;

export const Default: Story = {
  render: ({ text, selected, disabled }) => {
    return html`
      <mi-control-menu-item
        text=${text}
        tabindex="0"
        ?selected=${selected}
        ?disabled=${disabled}
      >
      </mi-control-menu-item>
    `;
  },
};
