import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpIcon } from "../../src/components/icon";

const allIconTypes = [
  "app",
  "bell",
  "check-circle",
  "check-circle-fill",
  "check-small",
  "chevron-down",
  "chevron-down-small",
  "chevron-right-small",
  "chevron-up-small",
  "cross-small",
  "download",
  "draghandle",
  "error-fill",
  "exit",
  "gear",
  "globe",
  "information-circle",
  "lock-fill",
  "menu",
  "more-vertical",
  "open-in-new",
  "person",
  "question-circle",
  "search",
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
                style="margin-bottom: 8px; width: 24px; height: 24px;"
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
