import "../../src/components/helper-text/mi-helper-text";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  type MiHelperText,
  sizes,
  statuses,
} from "../../src/components/helper-text/mi-helper-text";

const meta: Meta<MiHelperText> = {
  component: "mi-helper-text",
  title: "Components/HelperText/mi-helper-text",
  args: {
    status: "error",
    size: "small",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: [...statuses],
    },
    size: {
      control: { type: "select" },
      options: [...sizes],
    },
  },
  tags: ["!dev-only"],
};
export default meta;

type Story = StoryObj<MiHelperText>;

export const Default: Story = {
  render: ({ status, size }) => {
    return html`
      <mi-helper-text status=${status} size=${size}>
        ヘルパーテキストのメッセージ
      </mi-helper-text>
    `;
  },
};

export const All: Story = {
  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${sizes.map(
          (size) => html`
            <div>
              <strong>${size}</strong>
              <div
                style="display: flex; flex-direction: column; gap: 8px; margin-block-start: 8px;"
              >
                ${statuses.map(
                  (status) => html`
                    <mi-helper-text status=${status} size=${size}>
                      ${status} のヘルパーテキスト
                    </mi-helper-text>
                  `,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  },
};
