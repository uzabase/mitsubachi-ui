import "../../src/components/button/sp-button-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import { type SpButtonLit } from "../../src/components/button/sp-button-lit";

const meta = {
  component: "sp-button-lit",
  argTypes: {
    slot: { type: "string" },
    danger: { type: "boolean" },
    variants: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "large", "xLarge"],
    },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
    onclick: {
      action: "onclick",
    },
    name: { type: "string" },
    value: { type: "string" },
  },
  args: {
    slot: "ダウンロード",
    danger: false,
    variants: "primary",
    size: "medium",
    loading: false,
    disabled: false,
    onclick: action("onclick"),
    name: undefined,
    value: undefined,
  },
  render: (args) => html`
    <sp-button-lit
      ?danger=${args.danger}
      variants=${args.variants}
      size=${args.size}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      @click=${args.onclick}
      name=${args.name || nothing}
      value=${args.value || nothing}
    >
      ${args.slot}
    </sp-button-lit>
  `,
} satisfies Meta<Partial<SpButtonLit> & { slot: string; onclick: () => void }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variants: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variants: "tertiary",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const XLarge: Story = {
  args: {
    size: "xLarge",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    danger: true,
  },
};

export const DangerSecondary: Story = {
  args: {
    danger: true,
    variants: "secondary",
  },
};

export const DangerTertiary: Story = {
  args: {
    danger: true,
    variants: "tertiary",
  },
};
