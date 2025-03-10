import "../../src/components/label-unit";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpLabelUnit } from "../../src/components/label-unit";

const meta: Meta<SpLabelUnit> = {
  args: {
    text: "ラベル",
    supporttext: "サポートテキスト",
  },
};
export default meta;

export const Default: StoryObj<SpLabelUnit> = {
  render: ({ text, supporttext }) => {
    return html`<sp-label-unit text=${text} supporttext=${supporttext}>
    </sp-label-unit>`;
  },
};
