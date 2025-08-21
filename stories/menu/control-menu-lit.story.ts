import "../../src/components/menu/control-menu/sp-control-menu-lit";
import "../../src/components/menu/control-menu-item/sp-control-menu-item-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpControlMenuLit } from "../../src/components/menu/control-menu/sp-control-menu-lit";

const meta = {
  args: {},
  tags: ["!dev-only"],
} satisfies Meta<SpControlMenuLit>;

export default meta;
type Story = StoryObj<SpControlMenuLit>;

export const Default: Story = {
  render: () => {
    return html`
      <sp-control-menu-lit>
        <sp-control-menu-item-lit text="日本語"></sp-control-menu-item-lit>
        <sp-control-menu-item-lit
          text="English"
          selected
          tabindex="0"
        ></sp-control-menu-item-lit>
        <sp-control-menu-item-lit
          text="中文"
          disabled
        ></sp-control-menu-item-lit>
      </sp-control-menu-lit>
    `;
  },
};
