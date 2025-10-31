import "../../src/components/radio-button/sp-radio-button-text";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { SpRadioButtonText } from "../../src/components/radio-button/sp-radio-button-text";

const meta = {
  component: "sp-radio-button-text",
  argTypes: {
    slot: { type: "string" },
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    slot: "テキスト",
    value: "sp-radio-button-text-value",
    name: "sp-radio-button-text-name",
    checked: false,
    disabled: false,
  },
  render: (args) =>
    html`<sp-radio-button-text
      .value=${args.value}
      .name=${args.name}
      .checked=${args.checked}
      .disabled=${args.disabled}
      >${args.slot}</sp-radio-button-text
    >`,
} satisfies Meta<SpRadioButtonText>;

export default meta;
type Story = StoryObj<SpRadioButtonText>;

export const Basic: Story = {
  tags: ["!dev-only"],
};

export const LongText: Story = {
  args: {
    slot: "長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。長いテキストが入ります。",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledAndChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
