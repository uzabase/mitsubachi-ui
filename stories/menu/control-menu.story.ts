import "../../src/components/menu/control-menu";
import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiControlMenu } from "../../src/components/menu/control-menu";

const meta = {
  component: "mi-control-menu",
  args: {},
  tags: ["!dev-only"],
} satisfies Meta<MiControlMenu>;

export default meta;
type Story = StoryObj<MiControlMenu>;

export const Default: Story = {
  render: () => {
    return html`
      <mi-control-menu>
        <mi-control-menu-item text="日本語"></mi-control-menu-item>
        <mi-control-menu-item
          text="English"
          selected
          tabindex="0"
        ></mi-control-menu-item>
        <mi-control-menu-item text="中文" disabled></mi-control-menu-item>
      </mi-control-menu>
    `;
  },
};
