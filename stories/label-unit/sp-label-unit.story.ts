import "../../src/components/label-unit";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { SpLabelUnit } from "../../src/components/label-unit";

const meta: Meta<SpLabelUnit> = {
  args: {
    text: "ラベル",
    supportText: "サポートテキスト",
  },
};
export default meta;

export const Default: StoryObj<SpLabelUnit> = {
  render: ({ text, supportText }) => {
    return html`<sp-label-unit text=${text} support-text=${supportText}>
    </sp-label-unit>`;
  },
};
