import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpIcon } from "../../src/components/icon";

const allIconTypes = [
  "error-fill",
  "information-circle",
  "person",
  "check-circle-fill",
  "check-circle",
  "check-small",
  "chevron-down",
  "chevron-down-small",
  "globe",
];

const meta = {
  args: {
    type: "information-circle",
  },
  argTypes: {
    type: {
      options: allIconTypes,
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpIcon>;

export default meta;
type Story = StoryObj<SpIcon>;

export const Default: Story = {
  render: ({ type }) => {
    return html`<sp-icon
      style="display: inline-block; width: 24px; height: 24px;"
      type=${type}
    ></sp-icon>`;
  },
};

export const AllIcons: Story = {
  render: () => {
    return html`
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 24px; padding: 16px;"
      >
        ${allIconTypes.map(
          (iconType) => html`
            <div
              style="display: flex; flex-direction: column; align-items: center;"
            >
              <sp-icon
                style="display: inline-block; width: 32px; height: 32px; margin-bottom: 8px;"
                type=${iconType}
              ></sp-icon>
              <div
                style="font-size: 12px; text-align: center; word-break: break-all;"
              >
                ${iconType}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  },
};
