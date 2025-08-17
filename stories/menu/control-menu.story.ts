import "../../src/components/menu/control-menu";
import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpControlMenu } from "../../src/components/menu/control-menu";

const meta: Meta<SpControlMenu> = {
  args: {},
  tags: ["!dev-only"],
};
export default meta;

export const Default: StoryObj<SpControlMenu> = {
  render: () => {
    return html`<sp-control-menu>
      <sp-control-menu-item text="日本語"></sp-control-menu-item>
      <sp-control-menu-item
        text="English"
        selected
        tabindex="0"
      ></sp-control-menu-item>
      <sp-control-menu-item text="中文" disabled></sp-control-menu-item>
    </sp-control-menu>`;
  },
};
