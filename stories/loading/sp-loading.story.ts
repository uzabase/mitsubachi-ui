import "../../src/components/loading/sp-loading";

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const SIZE_OPTIONS = [
  { value: "medium", label: "medium" },
  { value: "large", label: "large" },
  { value: "xLarge", label: "x-large" },
  { value: "2xLarge", label: "2x-large" },
  { value: "3xLarge", label: "3x-large" },
];

const meta: Meta = {
  component: "sp-loading",
  tags: ["!dev-only"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<sp-loading></sp-loading>`,
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(${SIZE_OPTIONS.length}, 1fr); gap: 20px; align-items: center;"
    >
      ${SIZE_OPTIONS.map(
        (option) => html`
          <div style="text-align: center;">
            <sp-loading size="${option.value}"></sp-loading>
            <div style="margin-top: 8px; font-size: 12px;">${option.label}</div>
          </div>
        `,
      )}
    </div>
  `,
};

export const AISizes: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(${SIZE_OPTIONS.length}, 1fr); gap: 20px; align-items: center;"
    >
      ${SIZE_OPTIONS.map(
        (option) => html`
          <div style="text-align: center;">
            <sp-loading ai size="${option.value}"></sp-loading>
            <div style="margin-top: 8px; font-size: 12px;">${option.label}</div>
          </div>
        `,
      )}
    </div>
  `,
};
