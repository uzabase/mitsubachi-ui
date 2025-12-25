import "../../src/components/logo";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpUzabaseLogo } from "../../src/components/logo";

const meta = {
  component: "sp-uzabase-logo",
  args: {
    inverse: false,
  },
  argTypes: {
    inverse: {
      control: { type: "boolean" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpUzabaseLogo>;

export default meta;
type Story = StoryObj<SpUzabaseLogo>;

export const Default: Story = {
  render: ({ inverse }) => {
    return html`<sp-uzabase-logo ?inverse=${inverse}></sp-uzabase-logo>`;
  },
};

export const Inverse: Story = {
  render: () => {
    return html`
      <div style="background: #333; padding: 24px; border-radius: 8px;">
        <sp-uzabase-logo inverse></sp-uzabase-logo>
      </div>
    `;
  },
};

export const All: Story = {
  render: () => {
    return html`
      <div
        style="
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        "
      >
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th
                style="padding: 12px 16px; background: #f5f5f5; text-align: left;"
              >
                logo
              </th>
              <th
                style="padding: 12px 16px; background: #f5f5f5; text-align: left;"
              >
                inverse
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 4rem;">
              <td style="padding: 12px 16px; border-top: 1px solid #e0e0e0;">
                <sp-uzabase-logo></sp-uzabase-logo>
              </td>
              <td
                style="padding: 12px 16px; border-top: 1px solid #e0e0e0; font-family: monospace;"
              >
                false
              </td>
            </tr>
            <tr style="background: #333; color: #fff; height: 4rem;">
              <td style="padding: 12px 16px; border-top: 1px solid #555;">
                <sp-uzabase-logo inverse></sp-uzabase-logo>
              </td>
              <td
                style="padding: 12px 16px; border-top: 1px solid #555; font-family: monospace;"
              >
                true
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },
};
