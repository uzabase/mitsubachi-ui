import "../../src/components/menu/control-menu-item";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html,} from "lit";

import type { SpControlMenuItem } from "../../src/components/menu/control-menu-item";

const meta: Meta<SpControlMenuItem> = {
  args: {
    text: "ラベル",
    selected: false,
  },
  tags: ["!dev-only"],
};
export default meta;

export const Default: StoryObj<SpControlMenuItem> = {
  render: ({ text, selected }) => {
    return html`<sp-control-menu-item
    text=${text}
    selected=${selected}
    >
    </sp-text-field-unit>`;
  },
};
