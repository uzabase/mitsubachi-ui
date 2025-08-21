import "../../src/components/menu/control-menu/sp-control-menu";
import "../../src/components/menu/control-menu-item/sp-control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpControlMenu } from "../../src/components/menu/control-menu/sp-control-menu";

const meta = {
  component: "sp-control-menu",
  args: {},
  tags: ["!dev-only"],
} satisfies Meta<SpControlMenu>;

export default meta;
type Story = StoryObj<SpControlMenu>;

export const Default: Story = {
  render: () => {
    return html`
      <sp-control-menu>
        <sp-control-menu-item text="日本語"></sp-control-menu-item>
        <sp-control-menu-item
          text="English"
          selected
          tabindex="0"
        ></sp-control-menu-item>
        <sp-control-menu-item
          text="中文"
          disabled
        ></sp-control-menu-item>
      </sp-control-menu>
    `;
  },
};
