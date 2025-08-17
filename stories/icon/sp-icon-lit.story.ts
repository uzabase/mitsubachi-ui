import "../../src/components/icon/sp-icon-lit";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpIconLit } from "../../src/components/icon/sp-icon-lit";

const iconTypes = [
  "error-fill",
  "information-circle",
  "person",
  "check-circle-fill",
  "check-small",
  "check-circle",
  "chevron-down",
  "chevron-down-small",
  "globe",
] as const;

const meta = {
  component: "sp-icon-lit",
  argTypes: {
    type: {
      control: { type: "select" },
      options: iconTypes,
    },
  },
  args: {
    type: "error-fill",
  },
  render: (args) => html` <sp-icon-lit type=${args.type}></sp-icon-lit> `,
} satisfies Meta<Partial<SpIconLit>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorFill: Story = {
  args: {
    type: "error-fill",
  },
};

export const InformationCircle: Story = {
  args: {
    type: "information-circle",
  },
};

export const Person: Story = {
  args: {
    type: "person",
  },
};

export const CheckCircleFill: Story = {
  args: {
    type: "check-circle-fill",
  },
};

export const CheckSmall: Story = {
  args: {
    type: "check-small",
  },
};

export const CheckCircle: Story = {
  args: {
    type: "check-circle",
  },
};

export const ChevronDown: Story = {
  args: {
    type: "chevron-down",
  },
};

export const ChevronDownSmall: Story = {
  args: {
    type: "chevron-down-small",
  },
};

export const Globe: Story = {
  args: {
    type: "globe",
  },
};

export const AllIcons: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: center;"
    >
      ${iconTypes.map(
        (type) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
          >
            <sp-icon-lit type=${type}></sp-icon-lit>
            <span style="font-size: 12px; text-align: center;">${type}</span>
          </div>
        `,
      )}
    </div>
  `,
};
