import "../../src/components/inline-notification/mi-inline-notification";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  type MiInlineNotification,
  types,
  variants,
} from "../../src/components/inline-notification/mi-inline-notification";

const meta: Meta<MiInlineNotification> = {
  component: "mi-inline-notification",
  title: "Components/InlineNotification/mi-inline-notification",
  args: {
    type: "information",
    variant: "primary",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["information", "success", "warning", "error"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
  },
  tags: ["!dev-only"],
};
export default meta;

type Story = StoryObj<MiInlineNotification>;

export const Default: Story = {
  render: ({ type, variant }) => {
    return html`
      <mi-inline-notification type=${type} variant=${variant}>
        Hello, world!
      </mi-inline-notification>
    `;
  },
};

export const MultiLineChildren: Story = {
  render: ({ type, variant }) => {
    return html`
      <mi-inline-notification type=${type} variant=${variant}>
        <div>Hello, world!</div>
        <div>Hello, world!</div>
      </mi-inline-notification>
    `;
  },
};

// secondary は information / warning のみ存在する。
// success / error に secondary を指定しても primary と同じ見た目にフォールバックする。
const secondaryTypes = ["information", "warning"] as const;

export const All: Story = {
  render: () => {
    return html`
      <div style="display: flex; gap: 16px;">
        ${variants.map((variant) => {
          const variantTypes = variant === "secondary" ? secondaryTypes : types;
          return html`
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <strong>${variant}</strong>
              ${variantTypes.map(
                (type) => html`
                  <mi-inline-notification type=${type} variant=${variant}>
                    ${type}
                  </mi-inline-notification>
                `,
              )}
              ${variant === "secondary"
                ? html`<small style="color: #0000008a;">
                    success / error は secondary を指定しても primary
                    と同じ見た目になります
                  </small>`
                : null}
            </div>
          `;
        })}
      </div>
    `;
  },
};
