import "../../src/components/radio-button/mi-radio-button-text";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import type { MiRadioButtonText } from "../../src/components/radio-button/mi-radio-button-text";

const meta = {
  component: "mi-radio-button-text",
  argTypes: {
    slot: { type: "string" },
    value: { type: "string" },
    name: { type: "string" },
    checked: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  args: {
    slot: "テキスト",
    value: "mi-radio-button-text-value",
    name: "mi-radio-button-text-name",
    checked: false,
    disabled: false,
  },
  render: (args) =>
    html`<mi-radio-button-text
      .value=${args.value}
      .name=${args.name}
      .checked=${args.checked}
      .disabled=${args.disabled}
      >${args.slot}</mi-radio-button-text
    >`,
} satisfies Meta<MiRadioButtonText>;

export default meta;
type Story = StoryObj<MiRadioButtonText>;

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
