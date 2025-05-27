import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpControlMenuItem } from "../../src/components/menu/control-menu-item";

const meta: Meta<SpControlMenuItem> = {
  args: {
    text: "Text",
    selected: false,
    disabled: false,
  },
  tags: ["!dev-only"],
};
export default meta;

export const Default: StoryObj<SpControlMenuItem> = {
  render: ({ text, selected, disabled }) => {
    return html`<sp-control-menu-item
      text=${text}
      tabindex="0"
      ?selected=${selected}
      ?disabled=${disabled}
    >
    </sp-control-menu-item>`;
  },
};
