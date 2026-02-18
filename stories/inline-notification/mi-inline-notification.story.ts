import "../../src/components/inline-notification/mi-inline-notification";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  type MiInlineNotification,
  types,
} from "../../src/components/inline-notification/mi-inline-notification";

const meta: Meta<MiInlineNotification> = {
  component: "mi-inline-notification",
  args: {
    type: "information",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["information", "success", "warning", "error"],
    },
  },
  tags: [],
};
export default meta;

type Story = StoryObj<MiInlineNotification>;

export const Default: Story = {
  render: ({ type }) => {
    return html`
      <mi-inline-notification type=${type}>
        Hello, world!
      </mi-inline-notification>
    `;
  },
};

export const MultiLineChildren: Story = {
  render: ({ type }) => {
    return html`
      <mi-inline-notification type=${type}>
        <div>Hello, world!</div>
        <div>Hello, world!</div>
      </mi-inline-notification>
    `;
  },
};

export const All: Story = {
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${types.map(
          (type) =>
            html`
              <mi-inline-notification type=${type}>
                ${type}
              </mi-inline-notification>
            `,
        )}
      </div>
    `;
  },
};
