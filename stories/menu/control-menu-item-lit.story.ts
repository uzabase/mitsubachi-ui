import "../../src/components/menu/control-menu-item/sp-control-menu-item-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpControlMenuItemLit } from "../../src/components/menu/control-menu-item/sp-control-menu-item-lit";

const meta = {
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
} satisfies Meta<SpControlMenuItemLit>;

export default meta;
type Story = StoryObj<SpControlMenuItemLit>;

export const Default: Story = {
  render: ({ text, selected, disabled }) => {
    return html`
      <sp-control-menu-item-lit
        text=${text}
        tabindex="0"
        ?selected=${selected}
        ?disabled=${disabled}
      >
      </sp-control-menu-item-lit>
    `;
  },
};
